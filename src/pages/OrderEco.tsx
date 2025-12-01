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
  
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<"HP" | "Canon" | "Brother" | "Samsung">("HP");
  
  // Product quantities for selection
  const [hpQty, setHpQty] = useState(1);
  const [canonQty, setCanonQty] = useState(1);
  const [brotherQty, setBrotherQty] = useState(1);
  const [samsungQty, setSamsungQty] = useState(1);

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
