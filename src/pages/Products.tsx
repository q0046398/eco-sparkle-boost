import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Filter, ShoppingCart, Leaf, Recycle, Award, Truck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 產品資料
const products = [
  // HP 系列
  { id: 1, brand: "HP", model: "CF248A (48A)", compatible: "HP LaserJet Pro M15/M16/MFP M28/M29", yield: "1,000頁", originalPrice: 1800, recycledPrice: 650, category: "黑色碳粉匣", popular: true },
  { id: 2, brand: "HP", model: "CF258A (58A)", compatible: "HP LaserJet Pro M404/MFP M428", yield: "3,000頁", originalPrice: 3200, recycledPrice: 1100, category: "黑色碳粉匣", popular: true },
  { id: 3, brand: "HP", model: "CF259A (59A)", compatible: "HP LaserJet Pro M304/M404/MFP M428", yield: "3,000頁", originalPrice: 3500, recycledPrice: 1200, category: "黑色碳粉匣", popular: false },
  { id: 4, brand: "HP", model: "CF226A (26A)", compatible: "HP LaserJet Pro M402/MFP M426", yield: "3,100頁", originalPrice: 3000, recycledPrice: 950, category: "黑色碳粉匣", popular: true },
  { id: 5, brand: "HP", model: "CF230A (30A)", compatible: "HP LaserJet Pro M203/MFP M227", yield: "1,600頁", originalPrice: 2200, recycledPrice: 750, category: "黑色碳粉匣", popular: false },
  { id: 6, brand: "HP", model: "CE285A (85A)", compatible: "HP LaserJet Pro P1102/M1132/M1212", yield: "1,600頁", originalPrice: 2000, recycledPrice: 600, category: "黑色碳粉匣", popular: true },
  { id: 7, brand: "HP", model: "CE278A (78A)", compatible: "HP LaserJet Pro P1566/P1606/M1536", yield: "2,100頁", originalPrice: 2200, recycledPrice: 700, category: "黑色碳粉匣", popular: false },
  { id: 8, brand: "HP", model: "CF410A (410A) 四色組", compatible: "HP Color LaserJet Pro M452/MFP M477", yield: "2,300頁", originalPrice: 12000, recycledPrice: 3800, category: "彩色碳粉匣", popular: true },
  
  // Canon 系列
  { id: 9, brand: "Canon", model: "CRG-047", compatible: "Canon imageCLASS LBP113w/MF113w", yield: "1,600頁", originalPrice: 1900, recycledPrice: 650, category: "黑色碳粉匣", popular: false },
  { id: 10, brand: "Canon", model: "CRG-051", compatible: "Canon imageCLASS LBP162dw/MF264dw/MF267dw", yield: "1,700頁", originalPrice: 2100, recycledPrice: 720, category: "黑色碳粉匣", popular: true },
  { id: 11, brand: "Canon", model: "CRG-054", compatible: "Canon imageCLASS MF642Cdw/MF644Cdw", yield: "1,500頁", originalPrice: 2800, recycledPrice: 900, category: "彩色碳粉匣", popular: false },
  { id: 12, brand: "Canon", model: "CRG-055", compatible: "Canon imageCLASS MF743Cdw/LBP664Cx", yield: "2,100頁", originalPrice: 3200, recycledPrice: 1050, category: "彩色碳粉匣", popular: false },
  { id: 13, brand: "Canon", model: "CRG-337", compatible: "Canon imageCLASS MF229dw/MF216n/MF215", yield: "2,400頁", originalPrice: 2500, recycledPrice: 800, category: "黑色碳粉匣", popular: true },
  
  // Brother 系列
  { id: 14, brand: "Brother", model: "TN-2480", compatible: "Brother HL-L2375DW/DCP-L2550DW/MFC-L2715DW", yield: "3,000頁", originalPrice: 2800, recycledPrice: 850, category: "黑色碳粉匣", popular: true },
  { id: 15, brand: "Brother", model: "TN-2460", compatible: "Brother HL-L2375DW/DCP-L2550DW/MFC-L2715DW", yield: "1,200頁", originalPrice: 1500, recycledPrice: 500, category: "黑色碳粉匣", popular: false },
  { id: 16, brand: "Brother", model: "TN-267 四色組", compatible: "Brother HL-L3270CDW/DCP-L3551CDW/MFC-L3750CDW", yield: "2,300頁", originalPrice: 9800, recycledPrice: 3200, category: "彩色碳粉匣", popular: false },
  { id: 17, brand: "Brother", model: "TN-1000", compatible: "Brother HL-1110/DCP-1510/MFC-1810", yield: "1,000頁", originalPrice: 1200, recycledPrice: 400, category: "黑色碳粉匣", popular: true },
  
  // Samsung/Fuji Xerox 系列
  { id: 18, brand: "Samsung", model: "MLT-D111S", compatible: "Samsung Xpress M2020/M2070", yield: "1,000頁", originalPrice: 1800, recycledPrice: 550, category: "黑色碳粉匣", popular: false },
  { id: 19, brand: "Fuji Xerox", model: "CT202330", compatible: "Fuji Xerox DocuPrint P225d/M225dw/M265z", yield: "2,600頁", originalPrice: 2400, recycledPrice: 780, category: "黑色碳粉匣", popular: false },
  { id: 20, brand: "Fuji Xerox", model: "CT202610-13 四色組", compatible: "Fuji Xerox DocuPrint CM315z/CP315dw", yield: "3,000頁", originalPrice: 11000, recycledPrice: 3500, category: "彩色碳粉匣", popular: false },
];

const brands = ["全部品牌", "HP", "Canon", "Brother", "Samsung", "Fuji Xerox"];
const categories = ["全部類型", "黑色碳粉匣", "彩色碳粉匣"];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("全部品牌");
  const [selectedCategory, setSelectedCategory] = useState("全部類型");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.compatible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "全部品牌" || product.brand === selectedBrand;
    const matchesCategory = selectedCategory === "全部類型" || product.category === selectedCategory;
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const calculateSavings = (original: number, recycled: number) => {
    return Math.round(((original - recycled) / original) * 100);
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
            <a href="tel:02-87921266">
              <Button className="eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg transition-all">
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">立即諮詢</span>
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 eco-gradient opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Recycle className="w-3 h-3 mr-1" />
              環保再生 · 品質保證
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              碳粉匣產品目錄
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              提供各大品牌環保再生碳粉匣，品質媲美原廠，價格更優惠<br />
              為地球盡一份心力，同時節省您的列印成本
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">品質保證</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">免費配送</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">環保認證</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 border-b border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜尋型號或相容機型..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="選擇品牌" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="選擇類型" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                共 {filteredProducts.length} 項產品
              </span>
              <div className="flex border border-border rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
                >
                  <Filter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 transition-colors ${viewMode === "table" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-eco-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="text-xs">
                        {product.brand}
                      </Badge>
                      {product.popular && (
                        <Badge className="bg-accent text-accent-foreground text-xs">
                          熱銷
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">
                      {product.model}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {product.compatible}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">列印量</span>
                        <span className="font-medium text-foreground">{product.yield}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">原廠價</span>
                        <span className="text-muted-foreground line-through">NT$ {product.originalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">環保價</span>
                        <span className="text-xl font-bold text-primary">
                          NT$ {product.recycledPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                            <Leaf className="w-3 h-3 mr-1" />
                            省 {calculateSavings(product.originalPrice, product.recycledPrice)}%
                          </Badge>
                          <a href="tel:02-87921266">
                            <Button size="sm" className="eco-gradient text-primary-foreground">
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              訂購
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>品牌</TableHead>
                    <TableHead>型號</TableHead>
                    <TableHead className="hidden md:table-cell">相容機型</TableHead>
                    <TableHead>列印量</TableHead>
                    <TableHead className="text-right">原廠價</TableHead>
                    <TableHead className="text-right">環保價</TableHead>
                    <TableHead className="text-right">節省</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-primary/5">
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {product.brand}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {product.model}
                          {product.popular && (
                            <Badge className="bg-accent text-accent-foreground text-xs">
                              熱銷
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-xs truncate">
                        {product.compatible}
                      </TableCell>
                      <TableCell>{product.yield}</TableCell>
                      <TableCell className="text-right text-muted-foreground line-through">
                        NT$ {product.originalPrice.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        NT$ {product.recycledPrice.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                          {calculateSavings(product.originalPrice, product.recycledPrice)}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <a href="tel:02-87921266">
                          <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              找不到您需要的型號？
            </h2>
            <p className="text-muted-foreground mb-8">
              我們提供更多品牌與型號的環保碳粉匣，歡迎來電洽詢，<br />
              專業團隊為您提供最適合的解決方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:02-87921266">
                <Button size="lg" className="eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  立即來電：02-8792-1266
                </Button>
              </a>
              <Link to="/">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  返回首頁
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 綠昕科技有限公司 版權所有 | 
            <a href="tel:02-87921266" className="hover:text-primary ml-1">02-8792-1266</a> | 
            <span className="ml-1">新北市新莊區五工路125號</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Products;
