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
import productPlaceholder from "@/assets/product-placeholder.png";

interface Product {
  id: string;
  modelNumber: string;
  name: string;
  price: number;
  compatibility: string;
}

const products: Product[] = [
  { id: "S110078", modelNumber: "S110078", name: "EPSON AL-M320DN 原廠超大高印碳粉匣 10078", price: 5400, compatibility: "AL-M320DN" },
  { id: "S110079", modelNumber: "S110079", name: "EPSON M220DN/M310/M320 原廠高印量碳粉匣", price: 4550, compatibility: "M220DN / M310 / M320" },
  { id: "S110080", modelNumber: "S110080", name: "EPSON AL-M220DN/M310/M320 原廠碳粉匣", price: 3500, compatibility: "AL-M220DN / M310 / M320" },
  { id: "C1700組", modelNumber: "C1700組", name: "EPSON AL-C1700/C1750N 原廠碳粉匣 (四色套組)", price: 7200, compatibility: "C1700 / C1750N / CX17NF" },
  { id: "S050166", modelNumber: "S050166", name: "EPSON EPL-6200 / S050166 原廠高容量碳粉匣", price: 2000, compatibility: "EPL-6200" },
  { id: "S050245", modelNumber: "S050245", name: "EPSON C4200/C4200DN 原廠黑色碳粉匣 (S050286)", price: 2450, compatibility: "C4200 / C4200DN" },
  { id: "S050283", modelNumber: "S050283", name: "EPSON C4200/C4200DN 原廠黃色碳粉匣 (S050242)", price: 6400, compatibility: "C4200 / C4200DN" },
  { id: "S050284", modelNumber: "S050284", name: "EPSON C4200/C4200DN 原廠紅色(洋紅)碳粉匣", price: 6400, compatibility: "C4200 / C4200DN" },
  { id: "S050285", modelNumber: "S050285", name: "EPSON C4200/C4200DN 原廠藍色(青色)碳粉匣", price: 6400, compatibility: "C4200 / C4200DN" },
  { id: "S050475", modelNumber: "S050475", name: "EPSON C9200 高容量紅色碳粉", price: 3000, compatibility: "C9200 / C9200N" },
  { id: "S050477", modelNumber: "S050477", name: "EPSON C9200 高容量黑色碳粉", price: 2000, compatibility: "C9200 / C9200N" },
  { id: "S050588", modelNumber: "S050588", name: "EPSON M2410DN/MX21DNF 原廠高容量黑色碳粉匣", price: 1500, compatibility: "M2410DN / MX21DNF" },
  { id: "S050590", modelNumber: "S050590", name: "EPSON AL-C3900/CX37DNF 全新原廠黃色碳粉匣", price: 5814, compatibility: "AL-C3900 / CX37DNF" },
  { id: "S050591", modelNumber: "S050591", name: "EPSON AL-C3900/CX37DNF 全新原廠紅色碳粉匣", price: 5814, compatibility: "AL-C3900 / CX37DNF" },
  { id: "S050592", modelNumber: "S050592", name: "EPSON AL-C3900/CX37DNF 全新原廠藍色碳粉匣", price: 5814, compatibility: "AL-C3900 / CX37DNF" },
  { id: "S050593", modelNumber: "S050593", name: "EPSON AL-C3900/CX37DNF 全新原廠黑色碳粉匣", price: 5814, compatibility: "AL-C3900 / CX37DNF" },
  { id: "S050602", modelNumber: "S050602", name: "EPSON AL-C9300N 全新原廠原裝黃色碳粉匣", price: 6120, compatibility: "AL-C9300N" },
  { id: "S050604", modelNumber: "S050604", name: "EPSON AL-C9300N 全新原廠原裝藍色碳粉匣", price: 6120, compatibility: "AL-C9300N" },
  { id: "S050605", modelNumber: "S050605", name: "EPSON AL-C9300N 全新原廠原裝黑色碳粉匣", price: 3500, compatibility: "AL-C9300N" },
  { id: "S050611", modelNumber: "S050611", name: "EPSON AL-C1700/C1750N 原廠黃色碳粉匣", price: 1867, compatibility: "C1700 / C1750N / CX17NF" },
  { id: "S050612", modelNumber: "S050612", name: "EPSON AL-C1700/C1750N 原廠紅色碳粉匣", price: 1867, compatibility: "C1700 / C1750N / CX17NF" },
  { id: "S050613", modelNumber: "S050613", name: "EPSON AL-C1700/C1750N 原廠藍色碳粉匣", price: 1867, compatibility: "C1700 / C1750N / CX17NF" },
  { id: "S050614", modelNumber: "S050614", name: "EPSON AL-C1700/C1750N 原廠黑色碳粉匣", price: 2000, compatibility: "C1700 / C1750N / CX17NF" },
  { id: "S050691", modelNumber: "S050691", name: "EPSON AL-M300/M300DN/MX300DNF 原廠高容量碳粉匣", price: 5400, compatibility: "AL-M300 / M300DN" },
  { id: "S050747", modelNumber: "S050747", name: "EPSON AL-C300N/DN 全新原廠原裝黃色碳粉匣", price: 8400, compatibility: "AL-C300N / DN" },
  { id: "S050748", modelNumber: "S050748", name: "EPSON AL-C300N/DN 全新原廠原裝紅色碳粉匣", price: 8400, compatibility: "AL-C300N / DN" },
  { id: "S050749", modelNumber: "S050749", name: "EPSON AL-C300N/DN 全新原廠原裝藍色碳粉匣", price: 8400, compatibility: "AL-C300N / DN" },
  { id: "S050750", modelNumber: "S050750", name: "EPSON AL-C300N/DN 全新原廠原裝黑色碳粉匣", price: 5600, compatibility: "AL-C300N / DN" },
  { id: "S050762", modelNumber: "S050762", name: "EPSON AL-M8200 全新原廠原裝高容量碳粉匣", price: 8976, compatibility: "AL-M8200" },
  { id: "S051124", modelNumber: "S051124", name: "EPSON C3800/C3800DN 原廠高容量黃色碳粉匣", price: 6800, compatibility: "AcuLaser C3800 / DN" },
  { id: "S051125", modelNumber: "S051125", name: "EPSON C3800/C3800DN 原廠高容量紅色碳粉匣", price: 6800, compatibility: "AcuLaser C3800 / DN" },
  { id: "S051126", modelNumber: "S051126", name: "EPSON C3800/C3800DN 原廠高容量藍色碳粉匣", price: 6800, compatibility: "AcuLaser C3800 / DN" },
  { id: "S051127", modelNumber: "S051127", name: "EPSON C3800/C3800DN 原廠高容量黑色碳粉匣", price: 5610, compatibility: "AcuLaser C3800 / DN" },
  { id: "S051158", modelNumber: "S051158", name: "EPSON AL-C2800N 全新原廠原裝黃色碳粉匣", price: 6400, compatibility: "AL-C2800N" },
  { id: "S051159", modelNumber: "S051159", name: "EPSON AL-C2800N 全新原廠原裝紅色碳粉匣", price: 6400, compatibility: "AL-C2800N" },
  { id: "S051189", modelNumber: "S051189", name: "EPSON M8000N/M8000 全新原廠碳粉匣", price: 5100, compatibility: "M8000N / M8000" },
  { id: "S050477-2", modelNumber: "S050477", name: "EPSON C9200 黑色高容量碳粉匣感光鼓組", price: 6100, compatibility: "C9200 (感光鼓)" },
  { id: "S051109", modelNumber: "S051109", name: "EPSON AL-C4200 C4200N 全新原廠原裝感光鼓", price: 8600, compatibility: "AL-C4200 / C4200N (感光鼓)" },
  { id: "S051175", modelNumber: "S051175", name: "EPSON C9200 S051175 黃色原廠感光滾筒", price: 7038, compatibility: "C9200 (感光鼓)" },
  { id: "S051176", modelNumber: "S051176", name: "EPSON C9200 S051176 紅色原廠感光滾筒", price: 7038, compatibility: "C9200 (感光鼓)" },
  { id: "S051177", modelNumber: "S051177", name: "EPSON C9200 S051177 藍色原廠感光滾筒", price: 7038, compatibility: "C9200 (感光鼓)" },
  { id: "S051178", modelNumber: "S051178", name: "EPSON C9200 S051178 黑色原廠感光滾筒", price: 7956, compatibility: "C9200 (感光鼓)" },
  { id: "T9691", modelNumber: "T9691", name: "EPSON WF-M5799 全新原廠墨水袋 (黑)", price: 3300, compatibility: "WF-M5799 / WF-M5299" },
  { id: "T9701", modelNumber: "T9701", name: "EPSON WF-M5799 全新原廠墨水袋 (高容量)", price: 11500, compatibility: "WF-M5799 / WF-M5299" },
];

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
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [selectedTaxOptions, setSelectedTaxOptions] = useState<Record<string, "untaxed" | "taxed">>({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.compatibility.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getQuantity = (productId: string) => selectedQuantities[productId] || 1;
  const getTaxOption = (productId: string) => selectedTaxOptions[productId] || "untaxed";

  const setQuantity = (productId: string, qty: number) => {
    setSelectedQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  const setTaxOption = (productId: string, option: "untaxed" | "taxed") => {
    setSelectedTaxOptions(prev => ({ ...prev, [productId]: option }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = getQuantity(product.id);
    const taxOption = getTaxOption(product.id);
    const unitPrice = taxOption === "taxed" ? Math.round(product.price * 1.05) : product.price;
    const priceType = taxOption === "taxed" ? "含稅" : "未稅";

    addToCart(product.id, product.name, quantity, priceType, unitPrice, "original");

    toast({
      title: "✓ 已加入購物車",
      description: `${product.name} (${priceType}) x ${quantity}`,
      duration: 2000,
    });

    // Reset quantity after adding to cart
    setQuantity(product.id, 1);
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
          <div className="max-w-7xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                原廠碳粉匣
              </h1>
              <p className="text-muted-foreground">EPSON 原廠碳粉匣特惠價格</p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="搜尋產品型號、名稱或適用機型..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Product Count */}
            <div className="mb-4 text-center text-muted-foreground">
              共 {filteredProducts.length} 項產品
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const quantity = getQuantity(product.id);
                const taxOption = getTaxOption(product.id);
                const displayPrice = taxOption === "taxed" ? Math.round(product.price * 1.05) : product.price;
                const alternatePrice = taxOption === "taxed" ? product.price : Math.round(product.price * 1.05);

                return (
                  <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    <CardContent className="p-0">
                      <div className="bg-white p-4 flex items-center justify-center min-h-[180px]">
                        <img 
                          src={productPlaceholder} 
                          alt={product.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">型號: {product.modelNumber}</p>
                          <h3 className="font-medium text-sm text-foreground leading-snug min-h-[2.5rem]">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">適用: {product.compatibility}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-lg font-bold text-foreground">
                            {taxOption === "untaxed" ? "未稅" : "含稅"} NT${displayPrice.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {taxOption === "untaxed" ? "含稅" : "未稅"} NT${alternatePrice.toLocaleString()}
                          </p>
                        </div>
                        
                        <RadioGroup 
                          value={taxOption} 
                          onValueChange={(value) => setTaxOption(product.id, value as "untaxed" | "taxed")} 
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="untaxed" id={`tax-${product.id}-untaxed`} />
                            <Label htmlFor={`tax-${product.id}-untaxed`} className="text-sm cursor-pointer">未稅</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="taxed" id={`tax-${product.id}-taxed`} />
                            <Label htmlFor={`tax-${product.id}-taxed`} className="text-sm cursor-pointer">含稅</Label>
                          </div>
                        </RadioGroup>
                        
                        <div className="flex items-center justify-center gap-3 py-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(product.id, Math.max(1, quantity - 1))}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-lg font-semibold min-w-[2rem] text-center">
                            {quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(product.id, quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button 
                          className="w-full eco-gradient text-primary-foreground"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          加入購物車
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>沒有找到符合的產品</p>
              </div>
            )}
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
