import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, ShoppingCart, Send, Phone, Plus, Trash2, Minus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { MiniCart } from "@/components/MiniCart";
import { CartDialog } from "@/components/CartDialog";
import epson110080 from "@/assets/epson-110080.png";
import epson110079 from "@/assets/epson-110079.png";

interface ProductItem {
  name: string;
  quantity: string;
  priceType: string;
}

const OrderOriginal = () => {
  const { toast } = useToast();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<"110080" | "110079">("110080");
  
  // Product quantities for selection
  const [product110080Qty, setProduct110080Qty] = useState(1);
  const [product110079Qty, setProduct110079Qty] = useState(1);
  
  // Tax options for each product
  const [tax110080, setTax110080] = useState<"untaxed" | "taxed">("untaxed");
  const [tax110079, setTax110079] = useState<"untaxed" | "taxed">("untaxed");

  const [products, setProducts] = useState<ProductItem[]>([
    { name: "", quantity: "1", priceType: "110080-untaxed" }
  ]);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    contactTime: "",
    address: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index: number, field: keyof ProductItem, value: string) => {
    setProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addProduct = () => {
    const defaultPriceType = selectedProduct === "110080" ? "110080-untaxed" : "110079-untaxed";
    setProducts((prev) => [...prev, { name: "", quantity: "1", priceType: defaultPriceType }]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleAddToCart = (
    productId: "110080" | "110079",
    productName: string,
    quantity: number,
    taxOption: "untaxed" | "taxed"
  ) => {
    const basePrice = productId === "110080" ? 3500 : 4550;
    const unitPrice = taxOption === "taxed" ? Math.round(basePrice * 1.05) : basePrice;
    const priceType = taxOption === "taxed" ? "含稅" : "未稅";

    addToCart(productId, productName, quantity, priceType, unitPrice, "original");

    toast({
      title: "✓ 已加入購物車",
      description: `${productName} (${priceType}) x ${quantity}`,
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "購物車已清空",
    });
  };

  const calculateOrderTotal = () => {
    return products.reduce((total, product) => {
      const quantity = parseInt(product.quantity) || 0;
      let price = 0;
      
      if (product.priceType === "110080-untaxed") price = 3500;
      else if (product.priceType === "110080-taxed") price = 3675;
      else if (product.priceType === "110079-untaxed") price = 4550;
      else if (product.priceType === "110079-taxed") price = 4778;
      
      return total + (price * quantity);
    }, 0);
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "購物車是空的",
        description: "請先加入商品到購物車",
        variant: "destructive",
      });
      return;
    }
    
    // Convert cart items to products format
    const cartProducts = cart.map(item => ({
      name: item.productName,
      quantity: item.quantity.toString(),
      priceType: item.priceType,
    }));
    
    setProducts(cartProducts);
    setIsCartDialogOpen(false);
    setIsOrderDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate products
    const hasEmptyProduct = products.some((p) => !p.name.trim());
    if (hasEmptyProduct) {
      toast({
        title: "請填寫產品名稱",
        description: "請確認所有產品名稱都已填寫",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate required fields
    if (!formData.customerName || !formData.phone || !formData.contactTime || !formData.address) {
      toast({
        title: "請填寫必填欄位",
        description: "請確認所有必填欄位都已填寫完成",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke("send-order-email", {
        body: {
          productType: "原廠碳粉匣特價",
          products,
          customerName: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          contactTime: formData.contactTime,
          address: formData.address,
          notes: formData.notes,
        },
      });

      if (error) {
        console.error("Error sending order:", error);
        toast({
          title: "訂單送出失敗",
          description: "請稍後再試或直接電話聯繫我們",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      console.log("Order sent successfully:", data);
      toast({
        title: "訂單已送出！",
        description: "我們將盡快與您聯繫確認訂單詳情",
      });
      
      // Clear cart after successful order
      clearCart();
      
      // Close dialog and reset form
      setIsOrderDialogOpen(false);
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: "訂單送出失敗",
        description: "請稍後再試或直接電話聯繫我們",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Reset form
    setProducts([{ name: "", quantity: "1", priceType: "110080-untaxed" }]);
    setFormData({
      customerName: "",
      phone: "",
      email: "",
      contactTime: "",
      address: "",
      notes: "",
    });

    setIsSubmitting(false);
  };

  const contactTimes = [
    "上午 9:00 - 12:00",
    "下午 12:00 - 14:00",
    "下午 14:00 - 17:00",
    "晚上 17:00 - 20:00",
    "皆可聯繫",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">返回首頁</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg eco-gradient flex items-center justify-center shadow-eco">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-lg leading-tight text-foreground">綠昕科技</span>
                <span className="text-xs text-muted-foreground">環保碳粉匣專家</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MiniCart
                cart={cart}
                getTotalItems={getTotalItems}
                getTotalPrice={getTotalPrice}
                onOpenCart={() => setIsCartDialogOpen(true)}
              />
              <a href="tel:02-2970-2232">
                <Button className="eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg transition-all">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">立即諮詢</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Order Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Product Display Section */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                原廠碳粉匣
              </h1>
              <p className="text-muted-foreground">EPSON 原廠碳粉匣特惠價格</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardContent className="p-0">
                  <div className="bg-white p-6 flex items-center justify-center min-h-[280px]">
                    <img 
                      src={epson110080} 
                      alt="EPSON 110080/S110080 標準容量碳粉匣" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-medium text-foreground leading-snug min-h-[3rem]">
                      【台灣耗材】原廠 EPSON AL-M220DN/M310/M320 (110080/S110080)
                    </h3>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-foreground">
                        {tax110080 === "untaxed" ? "未稅 NT$3,500" : "含稅 NT$3,675"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {tax110080 === "untaxed" ? "含稅 NT$3,675" : "未稅 NT$3,500"}
                      </p>
                    </div>
                    
                    <RadioGroup value={tax110080} onValueChange={(value) => setTax110080(value as "untaxed" | "taxed")} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="untaxed" id="tax-110080-untaxed" />
                        <Label htmlFor="tax-110080-untaxed" className="text-sm cursor-pointer">未稅</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="taxed" id="tax-110080-taxed" />
                        <Label htmlFor="tax-110080-taxed" className="text-sm cursor-pointer">含稅</Label>
                      </div>
                    </RadioGroup>
                    
                    <div className="flex items-center justify-center gap-3 py-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setProduct110080Qty(Math.max(1, product110080Qty - 1))}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {product110080Qty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setProduct110080Qty(product110080Qty + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      className="w-full eco-gradient text-primary-foreground"
                      onClick={() => {
                        handleAddToCart("110080", "EPSON 110080/S110080 標準容量碳粉匣", product110080Qty, tax110080);
                        setProduct110080Qty(1);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      加入購物車
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardContent className="p-0">
                  <div className="bg-white p-6 flex items-center justify-center min-h-[280px]">
                    <img 
                      src={epson110079} 
                      alt="EPSON 110079/S110079/10079 高印量碳粉匣" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-medium text-foreground leading-snug min-h-[3rem]">
                      【台灣耗材】原廠 EPSON M220DN/M310/M320 (110079/S110079/10079)
                    </h3>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-foreground">
                        {tax110079 === "untaxed" ? "未稅 NT$4,550" : "含稅 NT$4,778"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {tax110079 === "untaxed" ? "含稅 NT$4,778" : "未稅 NT$4,550"}
                      </p>
                    </div>
                    
                    <RadioGroup value={tax110079} onValueChange={(value) => setTax110079(value as "untaxed" | "taxed")} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="untaxed" id="tax-110079-untaxed" />
                        <Label htmlFor="tax-110079-untaxed" className="text-sm cursor-pointer">未稅</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="taxed" id="tax-110079-taxed" />
                        <Label htmlFor="tax-110079-taxed" className="text-sm cursor-pointer">含稅</Label>
                      </div>
                    </RadioGroup>
                    
                    <div className="flex items-center justify-center gap-3 py-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setProduct110079Qty(Math.max(1, product110079Qty - 1))}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {product110079Qty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setProduct110079Qty(product110079Qty + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      className="w-full eco-gradient text-primary-foreground"
                      onClick={() => {
                        handleAddToCart("110079", "EPSON 110079/S110079/10079 高印量碳粉匣", product110079Qty, tax110079);
                        setProduct110079Qty(1);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      加入購物車
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Dialog */}
          <Dialog open={isOrderDialogOpen} onOpenChange={(open) => {
            setIsOrderDialogOpen(open);
            if (open) {
              // Reset products with correct initial price type when opening dialog
              const defaultPriceType = selectedProduct === "110080" ? "110080-untaxed" : "110079-untaxed";
              setProducts([{ name: "", quantity: "1", priceType: defaultPriceType }]);
            }
          }}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  訂購資訊 - {selectedProduct === "110080" ? "標準容量碳粉匣 (110080)" : "高印量碳粉匣 (110079)"}
                </DialogTitle>
                <DialogDescription>
                  請填寫完整資訊以便我們為您處理訂單
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                {/* Products */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>
                      訂購產品 <span className="text-destructive">*</span>
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addProduct}
                      className="text-primary"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      新增品項
                    </Button>
                  </div>
                  
                  {products.map((product, index) => (
                    <div key={index} className="flex gap-3 items-start p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label htmlFor={`product-name-${index}`} className="text-sm text-muted-foreground">
                            產品型號
                          </Label>
                          <Input
                            id={`product-name-${index}`}
                            placeholder="例如：110080 或 S110080"
                            value={product.name}
                            onChange={(e) => handleProductChange(index, "name", e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`product-qty-${index}`} className="text-sm text-muted-foreground">
                              數量
                            </Label>
                            <Input
                              id={`product-qty-${index}`}
                              type="number"
                              min="1"
                              placeholder="數量"
                              value={product.quantity}
                              onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor={`product-price-${index}`} className="text-sm text-muted-foreground">
                              價格類型
                            </Label>
                            <Select
                              value={product.priceType}
                              onValueChange={(value) => handleProductChange(index, "priceType", value)}
                            >
                              <SelectTrigger id={`product-price-${index}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {selectedProduct === "110080" ? (
                                  <>
                                    <SelectItem value="110080-untaxed">未稅 NT$3,500</SelectItem>
                                    <SelectItem value="110080-taxed">含稅 NT$3,675</SelectItem>
                                  </>
                                ) : (
                                  <>
                                    <SelectItem value="110079-untaxed">未稅 NT$4,550</SelectItem>
                                    <SelectItem value="110079-taxed">含稅 NT$4,778</SelectItem>
                                  </>
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      {products.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeProduct(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-6"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Customer Name */}
                <div className="space-y-2">
                  <Label htmlFor="customerName">
                    客戶名稱 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    placeholder="請輸入您的姓名或公司名稱"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    聯絡電話 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="請輸入您的聯絡電話"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    聯絡信箱
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="請輸入您的電子郵件"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Contact Time */}
                <div className="space-y-2">
                  <Label htmlFor="contactTime">
                    方便聯繫時間 <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.contactTime}
                    onValueChange={(value) => handleSelectChange("contactTime", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="請選擇方便聯繫的時間" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactTimes.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">
                    寄送地址 <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="請輸入完整寄送地址"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    required
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">備註（選填）</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="如有其他需求請在此說明"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* Order Total */}
                {products.length > 0 && calculateOrderTotal() > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center bg-primary/5 p-4 rounded-lg">
                      <span className="text-lg font-semibold text-foreground">訂單總金額</span>
                      <span className="text-2xl font-bold text-primary">
                        NT${calculateOrderTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>處理中...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      送出訂單
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Cart Dialog */}
          <Dialog open={isCartDialogOpen} onOpenChange={setIsCartDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl">購物車</DialogTitle>
                    <DialogDescription>
                      查看您選擇的商品
                    </DialogDescription>
                  </div>
                  {cart.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearCart}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      清空購物車
                    </Button>
                  )}
                </div>
              </DialogHeader>
              
              {cart.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>購物車是空的</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item.productName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.priceType.includes("untaxed") ? "未稅" : "含稅"} NT${item.unitPrice.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateCartItemQuantity(index, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateCartItemQuantity(index, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right min-w-[5rem]">
                        <p className="font-bold text-foreground">
                          NT${(item.unitPrice * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold mb-4">
                      <span>總計</span>
                      <span>NT${getTotalPrice().toLocaleString()}</span>
                    </div>
                    
                    <Button
                      onClick={proceedToCheckout}
                      className="w-full eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg"
                      size="lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      前往結帳
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 綠昕科技有限公司 版權所有
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OrderOriginal;
