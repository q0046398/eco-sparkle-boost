import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, ShoppingCart, Phone, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { CartDialog } from "@/components/CartDialog";
import productPlaceholder from "@/assets/product-placeholder.png";

interface Product {
  id: string;
  brand: string;
  modelNumber: string;
  name: string;
  compatibility: string;
  price: number;
}

// Products data - from CSV (deduplicated by model number, prioritizing lower prices)
const products: Product[] = [
  // Brother
  { id: "eco-1", brand: "Brother", modelNumber: "DCI-B-TN450", name: "TN450 環保碳粉匣", compatibility: "MFC-7360/7360N/MFC-7460DN/7860DW/DCP-7060D/HL-2220/2240D/FAX-2840 高印量", price: 562 },
  
  // Epson
  { id: "eco-2", brand: "Epson", modelNumber: "DCI-E-S050699", name: "S050699 環保碳粉匣", compatibility: "WorkForce AL-M400DN", price: 1113 },
  { id: "eco-3", brand: "Epson", modelNumber: "DCI-E-S110079", name: "S110079 環保碳粉匣", compatibility: "AL-M220DN / AL-M310DN / AL-M320DN", price: 956 },
  
  // Fuji-Xerox
  { id: "eco-4", brand: "Fuji-Xerox", modelNumber: "DCI-X-CWAA0711", name: "CWAA0711 環保碳粉匣", compatibility: "DocuPrint2065/3055", price: 1265 },
  { id: "eco-5", brand: "Fuji-Xerox", modelNumber: "DCI-X-CT201632", name: "CT201632 環保碳粉匣 黑色", compatibility: "DocuPrint CM305df/CP305d", price: 400 },
  { id: "eco-6", brand: "Fuji-Xerox", modelNumber: "DCI-X-CT201633", name: "CT201633 環保碳粉匣 藍色", compatibility: "DocuPrint CM305df/CP305d", price: 425 },
  { id: "eco-7", brand: "Fuji-Xerox", modelNumber: "DCI-X-CT201634", name: "CT201634 環保碳粉匣 紅色", compatibility: "DocuPrint CM305df/CP305d", price: 425 },
  { id: "eco-8", brand: "Fuji-Xerox", modelNumber: "DCI-X-CT201635", name: "CT201635 環保碳粉匣 黃色", compatibility: "DocuPrint CM305df/CP305d", price: 425 },
  { id: "eco-9", brand: "Fuji-Xerox", modelNumber: "DCI-X-CT201938", name: "CT201938 環保碳粉匣", compatibility: "DocuPrint P355d/M355df", price: 1245 },
  { id: "eco-10", brand: "Fuji-Xerox", modelNumber: "DCI-X-CT201664", name: "CT201664 環保碳粉匣 黑色", compatibility: "DocuPrint C5005d", price: 2470 },
  { id: "eco-11", brand: "Fuji-Xerox", modelNumber: "DCI-X-CT201665", name: "CT201665 環保碳粉匣 藍色", compatibility: "DocuPrint C5005d", price: 2551 },
  { id: "eco-12", brand: "Fuji-Xerox", modelNumber: "DCI-X-CT201666", name: "CT201666 環保碳粉匣 紅色", compatibility: "DocuPrint C5005d", price: 2551 },
  { id: "eco-13", brand: "Fuji-Xerox", modelNumber: "DCI-X-CT201667", name: "CT201667 環保碳粉匣 黃色", compatibility: "DocuPrint C5005d", price: 2551 },
  { id: "eco-14", brand: "Fuji-Xerox", modelNumber: "DCI-X-CT202330", name: "CT202330 環保碳粉匣", compatibility: "DocuPrint P225d/P225db/P265dw/M225dw/M225z/M265z", price: 646 },
  
  // HP - LaserJet 5200
  { id: "eco-15", brand: "HP", modelNumber: "DCI-H-Q7516A", name: "Q7516A 環保碳粉匣", compatibility: "LaserJet 5200系列", price: 1103 },
  
  // HP - LaserJet P系列
  { id: "eco-16", brand: "HP", modelNumber: "DCI-H-CB436A", name: "CB436A 環保碳粉匣", compatibility: "LaserJet P1505/P1505n/M1522MFP/M1120MFP", price: 432 },
  { id: "eco-17", brand: "HP", modelNumber: "DCI-H-CB435A", name: "CB435A 環保碳粉匣", compatibility: "LaserJet P1005/P1006", price: 441 },
  { id: "eco-18", brand: "HP", modelNumber: "DCI-H-CE505A", name: "CE505A 環保碳粉匣", compatibility: "LaserJet P2035/n/2055d/dn/x", price: 536 },
  { id: "eco-19", brand: "HP", modelNumber: "DCI-H-CE255X", name: "CE255X 環保碳粉匣 高印量", compatibility: "LaserJet P3015/n/d/dn/x", price: 948 },
  { id: "eco-20", brand: "HP", modelNumber: "DCI-H-CE285A", name: "CE285A 環保碳粉匣", compatibility: "LaserJet P1102w/M1132", price: 443 },
  
  // HP - LaserJet Pro 400 Color
  { id: "eco-21", brand: "HP", modelNumber: "DCI-H-CE410X", name: "CE410X 環保碳粉匣 黑色高印量", compatibility: "LaserJet Pro 400 Color M451/M475", price: 800 },
  { id: "eco-22", brand: "HP", modelNumber: "DCI-H-CE411A", name: "CE411A 環保碳粉匣 藍色", compatibility: "LaserJet Pro 400 Color M451/M475", price: 800 },
  { id: "eco-23", brand: "HP", modelNumber: "DCI-H-CE413A", name: "CE413A 環保碳粉匣 紅色", compatibility: "LaserJet Pro 400 Color M451/M475", price: 800 },
  { id: "eco-24", brand: "HP", modelNumber: "DCI-H-CE412A", name: "CE412A 環保碳粉匣 黃色", compatibility: "LaserJet Pro 400 Color M451/M475", price: 800 },
  
  // HP - LaserJet Pro M401/M425
  { id: "eco-25", brand: "HP", modelNumber: "DCI-H-CF280A", name: "CF280A 環保碳粉匣", compatibility: "LaserJet Pro M401/M425", price: 617 },
  { id: "eco-26", brand: "HP", modelNumber: "DCI-H-CF280X", name: "CF280X 環保碳粉匣 高印量", compatibility: "LaserJet Pro M401/M425", price: 779 },
  
  // HP - LaserJet Enterprise 600
  { id: "eco-27", brand: "HP", modelNumber: "DCI-H-CE390X", name: "CE390X 環保碳粉匣 高印量", compatibility: "LaserJet Enterprise 600 M602dn/M603dn/M4555MFP", price: 1472 },
  
  // HP - Color LaserJet Enterprise CP5525dn
  { id: "eco-28", brand: "HP", modelNumber: "DCI-H-CE271A", name: "CE271A 環保碳粉匣 藍色", compatibility: "Color LaserJet Enterprise CP5525dn", price: 1614 },
  { id: "eco-29", brand: "HP", modelNumber: "DCI-H-CE273A", name: "CE273A 環保碳粉匣 紅色", compatibility: "Color LaserJet Enterprise CP5525dn", price: 1614 },
  { id: "eco-30", brand: "HP", modelNumber: "DCI-H-CE272A", name: "CE272A 環保碳粉匣 黃色", compatibility: "Color LaserJet Enterprise CP5525dn", price: 1614 },
  
  // HP - LaserJet Pro M402/M426
  { id: "eco-31", brand: "HP", modelNumber: "DCI-H-CF226A", name: "CF226A 環保碳粉匣", compatibility: "LaserJet Pro M402n/M402dn", price: 900 },
  { id: "eco-32", brand: "HP", modelNumber: "DCI-H-CF226X", name: "CF226X 環保碳粉匣 高印量", compatibility: "LaserJet Pro M402n/M402dn", price: 1109 },
  
  // HP - LaserJet Pro M501/Enterprise M506
  { id: "eco-33", brand: "HP", modelNumber: "DCI-H-CF287A", name: "CF287A 環保碳粉匣", compatibility: "LaserJet Pro M501dn/Enterprise M506dn/x", price: 1594 },
  { id: "eco-34", brand: "HP", modelNumber: "DCI-H-CF287X", name: "CF287X 環保碳粉匣 高印量", compatibility: "LaserJet Pro M501dn/Enterprise M506dn/x", price: 1821 },
  
  // HP - Color LaserJet Pro M377/M452/M477
  { id: "eco-35", brand: "HP", modelNumber: "DCI-H-CF410A", name: "CF410A 環保碳粉匣 黑色", compatibility: "Color LaserJet Pro MFP M377dw/M452dn/dw/nw/M477fdw/fnw", price: 1225 },
  
  // HP - LaserJet Pro M203/M227
  { id: "eco-36", brand: "HP", modelNumber: "DCI-H-CF230A", name: "CF230A 環保碳粉匣 標準印量", compatibility: "LaserJet Pro M203dw/M227fdw", price: 1060 },
  { id: "eco-37", brand: "HP", modelNumber: "DCI-H-CF230X", name: "CF230X 環保碳粉匣 高印量", compatibility: "LaserJet Pro M203dw/M227fdw", price: 1498 },
  
  // HP - LaserJet Pro M12/M26
  { id: "eco-38", brand: "HP", modelNumber: "DCI-H-CF279A", name: "CF279A 環保碳粉匣", compatibility: "LaserJet Pro M12a/M12w/MFP M26a/M26nw", price: 577 },
  
  // HP - Color LaserJet Pro M154/M181
  { id: "eco-39", brand: "HP", modelNumber: "DCI-H-CF510A", name: "CF510A 環保碳粉匣 黑色", compatibility: "Color LaserJet Pro M154nw/MFP M181fw", price: 1051 },
  { id: "eco-40", brand: "HP", modelNumber: "DCI-H-CF511A", name: "CF511A 環保碳粉匣 藍色", compatibility: "Color LaserJet Pro M154nw/MFP M181fw", price: 1060 },
  { id: "eco-41", brand: "HP", modelNumber: "DCI-H-CF513A", name: "CF513A 環保碳粉匣 紅色", compatibility: "Color LaserJet Pro M154nw/MFP M181fw", price: 1060 },
  { id: "eco-42", brand: "HP", modelNumber: "DCI-H-CF512A", name: "CF512A 環保碳粉匣 黃色", compatibility: "Color LaserJet Pro M154nw/MFP M181fw", price: 1060 },
  
  // HP - Color LaserJet Pro M254/M281
  { id: "eco-43", brand: "HP", modelNumber: "DCI-H-CF500X", name: "CF500X 環保碳粉匣 黑色高印量", compatibility: "Color LaserJet Pro M254dw/MFP M281dw", price: 1134 },
  { id: "eco-44", brand: "HP", modelNumber: "DCI-H-CF501X", name: "CF501X 環保碳粉匣 藍色高印量", compatibility: "Color LaserJet Pro M254dw/MFP M281dw", price: 1134 },
  { id: "eco-45", brand: "HP", modelNumber: "DCI-H-CF503X", name: "CF503X 環保碳粉匣 紅色高印量", compatibility: "Color LaserJet Pro M254dw/MFP M281dw", price: 1134 },
  { id: "eco-46", brand: "HP", modelNumber: "DCI-H-CF502X", name: "CF502X 環保碳粉匣 黃色高印量", compatibility: "Color LaserJet Pro M254dw/MFP M281dw", price: 1134 },
  
  // HP - Color LaserJet Enterprise M552/M553/M577
  { id: "eco-47", brand: "HP", modelNumber: "DCI-H-CF360X", name: "CF360X 環保碳粉匣 黑色高印量", compatibility: "Color LaserJet Enterprise M552dn/M553dn/MFP CM4540/M577dn/M577f/M577z", price: 2201 },
  { id: "eco-48", brand: "HP", modelNumber: "DCI-H-CF361X", name: "CF361X 環保碳粉匣 藍色高印量", compatibility: "Color LaserJet Enterprise M552dn/M553dn/MFP CM4540/M577dn/M577f/M577z", price: 2115 },
  { id: "eco-49", brand: "HP", modelNumber: "DCI-H-CF363X", name: "CF363X 環保碳粉匣 紅色高印量", compatibility: "Color LaserJet Enterprise M552dn/M553dn/MFP CM4540/M577dn/M577f/M577z", price: 2220 },
  { id: "eco-50", brand: "HP", modelNumber: "DCI-H-CF362X", name: "CF362X 環保碳粉匣 黃色高印量", compatibility: "Color LaserJet Enterprise M552dn/M553dn/MFP CM4540/M577dn/M577f/M577z", price: 2220 },
  
  // HP - LaserJet Enterprise M607/M608
  { id: "eco-51", brand: "HP", modelNumber: "DCI-H-CF237A", name: "CF237A 環保碳粉匣 標準印量", compatibility: "LaserJet Enterprise M607dn/M608dn", price: 2169 },
  { id: "eco-52", brand: "HP", modelNumber: "DCI-H-CF237X", name: "CF237X 環保碳粉匣 高印量", compatibility: "LaserJet Enterprise M608dn", price: 2522 },
  
  // HP - LaserJet Pro M404/M428
  { id: "eco-53", brand: "HP", modelNumber: "DCI-H-CF276A", name: "CF276A 環保碳粉匣 標準印量", compatibility: "LaserJet Pro M404dn/MFP M428fdn", price: 1493 },
  { id: "eco-54", brand: "HP", modelNumber: "DCI-H-CF276X", name: "CF276X 環保碳粉匣 高印量", compatibility: "LaserJet Pro M404dn/MFP M428fdn", price: 1968 },
  
  // HP - Color LaserJet Pro M454/M479
  { id: "eco-55", brand: "HP", modelNumber: "DCI-H-W2040X", name: "W2040X 環保碳粉匣 黑色高印量", compatibility: "Color LaserJet Pro M454dn/MFP M479fdw", price: 2126 },
  { id: "eco-56", brand: "HP", modelNumber: "DCI-H-W2041X", name: "W2041X 環保碳粉匣 藍色高印量", compatibility: "Color LaserJet Pro M454dn/MFP M479fdw", price: 2126 },
  { id: "eco-57", brand: "HP", modelNumber: "DCI-H-W2043X", name: "W2043X 環保碳粉匣 紅色高印量", compatibility: "Color LaserJet Pro M454dn/MFP M479fdw", price: 2126 },
  { id: "eco-58", brand: "HP", modelNumber: "DCI-H-W2042X", name: "W2042X 環保碳粉匣 黃色高印量", compatibility: "Color LaserJet Pro M454dn/MFP M479fdw", price: 2126 },
  
  // HP - LaserJet Pro M15/M28
  { id: "eco-59", brand: "HP", modelNumber: "DCI-H-CF248A", name: "CF248A 環保碳粉匣 黑色", compatibility: "LaserJet Pro M15w/M28w", price: 616 },
  
  // HP - LaserJet M610/M611/M612/M634/M635/M636
  { id: "eco-60", brand: "HP", modelNumber: "DCI-H-W1470A", name: "W1470A 環保碳粉匣 黑色標準印量", compatibility: "HP LJ M610/M611/M612/M634/M635/M636", price: 1964 },
  { id: "eco-61", brand: "HP", modelNumber: "DCI-H-W1470X", name: "W1470X 環保碳粉匣 黑色高印量", compatibility: "HP LJ M611/M612/M634/M635/M636", price: 2444 },
  
  // HP - LaserJet Enterprise M507/M528
  { id: "eco-62", brand: "HP", modelNumber: "DCI-H-CF289A", name: "CF289A 環保碳粉匣 黑色標準印量", compatibility: "LaserJet Enterprise M507/MFP M528", price: 1265 },
  { id: "eco-63", brand: "HP", modelNumber: "DCI-H-CF289X", name: "CF289X 環保碳粉匣 黑色高印量", compatibility: "LaserJet Enterprise M507/MFP M528", price: 1670 },
];

const brands = ["全部", "Brother", "Epson", "Fuji-Xerox", "HP"];
const ITEMS_PER_PAGE = 20;

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("全部");
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [selectedTaxOptions, setSelectedTaxOptions] = useState<Record<string, "untaxed" | "taxed">>({});
  const [currentPage, setCurrentPage] = useState(1);

  const getQuantity = (productId: string) => selectedQuantities[productId] || 1;
  const getTaxOption = (productId: string) => selectedTaxOptions[productId] || "untaxed";

  const setQuantity = (productId: string, qty: number) => {
    setSelectedQuantities(prev => ({ ...prev, [productId]: Math.max(1, qty) }));
  };

  const setTaxOption = (productId: string, option: "untaxed" | "taxed") => {
    setSelectedTaxOptions(prev => ({ ...prev, [productId]: option }));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.compatibility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "全部" || product.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setCurrentPage(1);
  };

  const handleAddToCart = (product: Product) => {
    const taxOption = getTaxOption(product.id);
    const quantity = getQuantity(product.id);
    const unitPrice = taxOption === "taxed" ? Math.round(product.price * 1.05) : product.price;
    const priceType = taxOption === "taxed" ? "含稅" : "未稅";
    
    addToCart(product.id, `${product.name} (${product.modelNumber})`, quantity, priceType, unitPrice, "eco");

    toast({
      title: "✓ 已加入購物車",
      description: `${product.name} x ${quantity}`,
      duration: 2000,
    });
    
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

      {/* Product Display Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                環保碳粉匣
              </h1>
              <p className="text-muted-foreground">Brother / Epson / Fuji-Xerox / HP 環保碳粉匣</p>
            </div>

            {/* Filters */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <Input
                  type="text"
                  placeholder="搜尋產品型號、名稱或適用機型..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="text-lg"
                />
              </div>
              
              {/* Brand Filter */}
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-muted-foreground">品牌</Label>
                  <Select value={selectedBrand} onValueChange={handleBrandChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Product Count */}
            <div className="mb-4 text-center text-muted-foreground">
              共 {filteredProducts.length} 項產品 (第 {currentPage} / {totalPages || 1} 頁)
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => {
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
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                              {product.brand}
                            </span>
                          </div>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "eco-gradient text-primary-foreground" : ""}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">沒有找到符合條件的產品</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cart Dialog */}
      <CartDialog
        open={isCartDialogOpen}
        onOpenChange={setIsCartDialogOpen}
        cart={cart}
        removeFromCart={removeFromCart}
        updateCartItemQuantity={updateCartItemQuantity}
        clearCart={clearCart}
        getTotalItems={getTotalItems}
        getTotalPrice={getTotalPrice}
      />
    </div>
  );
};

export default OrderEco;
