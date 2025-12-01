import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { MiniCart } from "@/components/MiniCart";
import { CartDialog } from "@/components/CartDialog";
import epson110080 from "@/assets/epson-110080-box.png";
import epson110079 from "@/assets/epson-110079.png";

interface ProductItem {
  name: string;
  quantity: string;
  priceType: string;
}

const OrderOriginal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<"110080" | "110079">("110080");
  
  // Product quantities for selection
  const [product110080Qty, setProduct110080Qty] = useState(1);
  const [product110079Qty, setProduct110079Qty] = useState(1);
  
  // Tax options for each product
  const [tax110080, setTax110080] = useState<"untaxed" | "taxed">("untaxed");
  const [tax110079, setTax110079] = useState<"untaxed" | "taxed">("untaxed");

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
                      onClick={() => {
                        setIsCartDialogOpen(false);
                        navigate("/checkout");
                      }}
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
