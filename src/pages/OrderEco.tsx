import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, ShoppingCart, Send, Phone, Plus, Trash2, Minus, Store, Truck } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { MiniCart } from "@/components/MiniCart";
import { CartDialog } from "@/components/CartDialog";

interface ProductItem {
  name: string;
  quantity: string;
  priceType: string;
}

const OrderEco = () => {
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
  const [selectedBrand, setSelectedBrand] = useState<"HP" | "Canon" | "Brother" | "Samsung">("HP");
  
  // Product quantities for selection
  const [hpQty, setHpQty] = useState(1);
  const [canonQty, setCanonQty] = useState(1);
  const [brotherQty, setBrotherQty] = useState(1);
  const [samsungQty, setSamsungQty] = useState(1);

  const [products, setProducts] = useState<ProductItem[]>([
    { name: "", quantity: "1", priceType: "contact" }
  ]);

  const [shippingMethod, setShippingMethod] = useState<"familymart" | "seven" | "home">("familymart");
  const [storeName, setStoreName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState({
    zipCode: "",
    city: "",
    address: "",
  });

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    contactTime: "",
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
    setProducts((prev) => [...prev, { name: "", quantity: "1", priceType: "contact" }]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleAddToCart = (
    productId: string,
    productName: string,
    quantity: number
  ) => {
    addToCart(productId, productName, quantity, "contact", 0, "eco");

    toast({
      title: "✓ 已加入購物車",
      description: `${productName} x ${quantity}`,
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "購物車已清空",
    });
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
    const cartProducts = cart.map((item) => ({
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
    if (!formData.customerName || !formData.phone || !formData.contactTime) {
      toast({
        title: "請填寫必填欄位",
        description: "請確認所有必填欄位都已填寫完成",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate shipping method specific fields
    if ((shippingMethod === "familymart" || shippingMethod === "seven") && !storeName.trim()) {
      toast({
        title: "請填寫門市名稱",
        description: "請選擇或填寫門市名稱",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (shippingMethod === "home" && (!deliveryAddress.zipCode || !deliveryAddress.city || !deliveryAddress.address)) {
      toast({
        title: "請填寫配送地址",
        description: "請確認郵遞區號、城市和地址都已填寫",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare shipping info based on method
      let shippingInfo = "";
      if (shippingMethod === "familymart") {
        shippingInfo = `全家超商取貨 - ${storeName}`;
      } else if (shippingMethod === "seven") {
        shippingInfo = `7-11 超商取貨 - ${storeName}`;
      } else {
        shippingInfo = `宅配 - ${deliveryAddress.zipCode} ${deliveryAddress.city} ${deliveryAddress.address}`;
      }

      const { data, error } = await supabase.functions.invoke("send-order-email", {
        body: {
          productType: "環保碳粉匣",
          products,
          customerName: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          contactTime: formData.contactTime,
          shippingInfo,
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
    setProducts([{ name: "", quantity: "1", priceType: "contact" }]);
    setFormData({
      customerName: "",
      phone: "",
      email: "",
      contactTime: "",
      notes: "",
    });
    setShippingMethod("familymart");
    setStoreName("");
    setDeliveryAddress({
      zipCode: "",
      city: "",
      address: "",
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
              <Button 
                variant="outline"
                className="relative"
                onClick={() => setIsCartDialogOpen(true)}
              >
                <ShoppingCart className="w-4 h-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
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
                環保碳粉匣
              </h1>
              <p className="text-muted-foreground">台灣製造 ・ 品質優良 ・ 價格實惠 ・ 環保認證</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="bg-white rounded-lg p-8 flex items-center justify-center min-h-[200px] mb-4">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full eco-gradient flex items-center justify-center">
                        <Leaf className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">HP</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground text-center min-h-[2.5rem]">
                      HP 系列環保碳粉匣
                    </h3>
                    <p className="text-sm text-center text-muted-foreground">請聯繫報價</p>
                    
                    <div className="flex items-center justify-center gap-3 py-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setHpQty(Math.max(1, hpQty - 1))}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {hpQty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setHpQty(hpQty + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      className="w-full eco-gradient text-primary-foreground"
                      onClick={() => {
                        handleAddToCart("HP", "HP 系列環保碳粉匣", hpQty);
                        setHpQty(1);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      加入購物車
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="bg-white rounded-lg p-8 flex items-center justify-center min-h-[200px] mb-4">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full eco-gradient flex items-center justify-center">
                        <Leaf className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">Canon</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground text-center min-h-[2.5rem]">
                      Canon 系列環保碳粉匣
                    </h3>
                    <p className="text-sm text-center text-muted-foreground">請聯繫報價</p>
                    
                    <div className="flex items-center justify-center gap-3 py-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCanonQty(Math.max(1, canonQty - 1))}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {canonQty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCanonQty(canonQty + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      className="w-full eco-gradient text-primary-foreground"
                      onClick={() => {
                        handleAddToCart("Canon", "Canon 系列環保碳粉匣", canonQty);
                        setCanonQty(1);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      加入購物車
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="bg-white rounded-lg p-8 flex items-center justify-center min-h-[200px] mb-4">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full eco-gradient flex items-center justify-center">
                        <Leaf className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">Brother</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground text-center min-h-[2.5rem]">
                      Brother 系列環保碳粉匣
                    </h3>
                    <p className="text-sm text-center text-muted-foreground">請聯繫報價</p>
                    
                    <div className="flex items-center justify-center gap-3 py-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setBrotherQty(Math.max(1, brotherQty - 1))}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {brotherQty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setBrotherQty(brotherQty + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      className="w-full eco-gradient text-primary-foreground"
                      onClick={() => {
                        handleAddToCart("Brother", "Brother 系列環保碳粉匣", brotherQty);
                        setBrotherQty(1);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      加入購物車
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="bg-white rounded-lg p-8 flex items-center justify-center min-h-[200px] mb-4">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full eco-gradient flex items-center justify-center">
                        <Leaf className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">Samsung</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground text-center min-h-[2.5rem]">
                      Samsung 系列環保碳粉匣
                    </h3>
                    <p className="text-sm text-center text-muted-foreground">請聯繫報價</p>
                    
                    <div className="flex items-center justify-center gap-3 py-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSamsungQty(Math.max(1, samsungQty - 1))}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {samsungQty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSamsungQty(samsungQty + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      className="w-full eco-gradient text-primary-foreground"
                      onClick={() => {
                        handleAddToCart("Samsung", "Samsung 系列環保碳粉匣", samsungQty);
                        setSamsungQty(1);
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
          <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">訂購資訊</DialogTitle>
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
                            產品名稱
                          </Label>
                          <Input
                            id={`product-name-${index}`}
                            placeholder="請輸入產品型號或名稱"
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
                              報價方式
                            </Label>
                            <Select
                              value={product.priceType}
                              onValueChange={(value) => handleProductChange(index, "priceType", value)}
                            >
                              <SelectTrigger id={`product-price-${index}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="contact">請聯繫報價</SelectItem>
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

                {/* Shipping Method */}
                <div className="space-y-3">
                  <Label>
                    配送方式 <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        shippingMethod === "familymart"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setShippingMethod("familymart")}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          shippingMethod === "familymart" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}>
                          <Store className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">全家超商取貨</p>
                          <p className="text-xs text-muted-foreground">FamilyMart</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        shippingMethod === "seven"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setShippingMethod("seven")}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          shippingMethod === "seven" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}>
                          <Store className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">7-11 超商取貨</p>
                          <p className="text-xs text-muted-foreground">7-ELEVEN</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        shippingMethod === "home"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setShippingMethod("home")}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          shippingMethod === "home" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}>
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">宅配</p>
                          <p className="text-xs text-muted-foreground">Home Delivery</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Store Selection (FamilyMart or 7-Eleven) */}
                  {(shippingMethod === "familymart" || shippingMethod === "seven") && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const url = shippingMethod === "familymart" 
                              ? "https://www.family.com.tw/marketing/inquiry.aspx"
                              : "https://emap.pcsc.com.tw/";
                            window.open(url, "_blank", "noopener,noreferrer");
                          }}
                        >
                          <Store className="w-4 h-4 mr-2" />
                          門市選擇
                        </Button>
                      </div>
                      <Input
                        placeholder="請輸入或貼上選擇的門市名稱"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Home Delivery Address */}
                  {shippingMethod === "home" && (
                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="郵遞區號"
                          value={deliveryAddress.zipCode}
                          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, zipCode: e.target.value })}
                        />
                        <Input
                          placeholder="城市"
                          value={deliveryAddress.city}
                          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                        />
                      </div>
                      <Input
                        placeholder="詳細地址"
                        value={deliveryAddress.address}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
                      />
                    </div>
                  )}
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
          <CartDialog
            open={isCartDialogOpen}
            onOpenChange={setIsCartDialogOpen}
            cart={cart}
            removeFromCart={removeFromCart}
            updateCartItemQuantity={updateCartItemQuantity}
            clearCart={handleClearCart}
            getTotalItems={getTotalItems}
            getTotalPrice={getTotalPrice}
            onCheckout={proceedToCheckout}
          />
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

export default OrderEco;
