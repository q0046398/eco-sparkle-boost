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
  // HP 黑白雷射碳粉匣
  { id: 1, brand: "HP", model: "Q2613A", compatible: "HP LJ 1300(2500張)", yield: "2,500頁", price: 662, category: "黑色碳粉匣", popular: true },
  { id: 2, brand: "HP", model: "Q2613X", compatible: "HP LJ 1300(4000張)", yield: "4,000頁", price: 945, category: "黑色碳粉匣", popular: false },
  { id: 3, brand: "HP", model: "C7115A", compatible: "HP LJ 1200/1000", yield: "2,500頁", price: 662, category: "黑色碳粉匣", popular: true },
  { id: 4, brand: "HP", model: "C7115X", compatible: "HP LJ 1200/1000", yield: "3,500頁", price: 788, category: "黑色碳粉匣", popular: false },
  { id: 5, brand: "HP", model: "Q5949A", compatible: "HP LJ 1160/1320", yield: "2,500頁", price: 945, category: "黑色碳粉匣", popular: true },
  { id: 6, brand: "HP", model: "Q5949X", compatible: "HP LJ 1320", yield: "6,000頁", price: 1418, category: "黑色碳粉匣", popular: false },
  { id: 7, brand: "HP", model: "Q1338A", compatible: "HP LJ 4200", yield: "12,000頁", price: 1890, category: "黑色碳粉匣", popular: true },
  { id: 8, brand: "HP", model: "Q1339A", compatible: "HP LJ 4300", yield: "18,000頁", price: 2426, category: "黑色碳粉匣", popular: false },
  { id: 9, brand: "HP", model: "C4129X", compatible: "HP LJ 5000", yield: "10,000頁", price: 1244, category: "黑色碳粉匣", popular: true },
  { id: 10, brand: "HP", model: "C4127X", compatible: "HP LJ 4000", yield: "10,000頁", price: 1181, category: "黑色碳粉匣", popular: false },
  { id: 11, brand: "HP", model: "C8061X", compatible: "HP LJ 4100", yield: "10,000頁", price: 1260, category: "黑色碳粉匣", popular: true },
  { id: 12, brand: "HP", model: "C4182X", compatible: "HP LJ 8100/8150/N/DN", yield: "20,000頁", price: 2205, category: "黑色碳粉匣", popular: false },
  { id: 13, brand: "HP", model: "C4092A", compatible: "HP LJ 1100", yield: "2,500頁", price: 630, category: "黑色碳粉匣", popular: false },
  { id: 14, brand: "HP", model: "Q5942X", compatible: "HP LJ 4250/4350", yield: "20,000頁", price: 2205, category: "黑色碳粉匣", popular: false },
  { id: 15, brand: "HP", model: "CB435A", compatible: "HP LJ P1005/P1006", yield: "1,500頁", price: 1037, category: "黑色碳粉匣", popular: true },
  { id: 16, brand: "HP", model: "CB436A", compatible: "HP LJ P1505", yield: "2,000頁", price: 1131, category: "黑色碳粉匣", popular: false },
  { id: 17, brand: "HP", model: "C8543X", compatible: "HP LJ 9000/9040/9050", yield: "30,000頁", price: 4305, category: "黑色碳粉匣", popular: true },
  { id: 18, brand: "HP", model: "C3906F", compatible: "HP LJ 5L/5ML/6L/3100", yield: "2,500頁", price: 580, category: "黑色碳粉匣", popular: false },
  { id: 19, brand: "HP", model: "Q2612A", compatible: "HP LJ 1010/1020/3050/M1005", yield: "2,000頁", price: 580, category: "黑色碳粉匣", popular: true },
  { id: 20, brand: "HP", model: "Q2610A", compatible: "HP LJ 2300", yield: "6,000頁", price: 1003, category: "黑色碳粉匣", popular: false },
  { id: 21, brand: "HP", model: "Q6511A", compatible: "HP LJ 2400/2410/2420/2430", yield: "6,000頁", price: 1490, category: "黑色碳粉匣", popular: false },
  { id: 22, brand: "HP", model: "Q6511X", compatible: "HP LJ 2400/2410/2420/2430", yield: "12,000頁", price: 1879, category: "黑色碳粉匣", popular: false },
  { id: 23, brand: "HP", model: "CE255A", compatible: "HP LJ P3010/P3015 系列(低印量)", yield: "6,000頁", price: 1879, category: "黑色碳粉匣", popular: true },
  { id: 24, brand: "HP", model: "CE255X", compatible: "HP LJ P3010/P3015 系列(高印量)", yield: "12,500頁", price: 2271, category: "黑色碳粉匣", popular: false },
  { id: 25, brand: "HP", model: "CE278A", compatible: "HP LJ P1566/P1606", yield: "2,100頁", price: 1160, category: "黑色碳粉匣", popular: true },
  { id: 26, brand: "HP", model: "CE285A", compatible: "HP LJ P1102W/M1212/M1132", yield: "1,600頁", price: 1160, category: "黑色碳粉匣", popular: true },
  { id: 27, brand: "HP", model: "CC364A", compatible: "HP LJ P4014/4015/4515", yield: "10,000頁", price: 2193, category: "黑色碳粉匣", popular: true },
  { id: 28, brand: "HP", model: "CC364X", compatible: "HP LJ P4014/4015/4515", yield: "24,000頁", price: 2481, category: "黑色碳粉匣", popular: false },
  { id: 29, brand: "HP", model: "Q7551A", compatible: "HP LJ P3005", yield: "6,500頁", price: 1490, category: "黑色碳粉匣", popular: false },
  { id: 30, brand: "HP", model: "Q7551X", compatible: "HP LJ P3005", yield: "13,000頁", price: 1805, category: "黑色碳粉匣", popular: false },
  { id: 31, brand: "HP", model: "Q7553A", compatible: "HP LJ P2015", yield: "3,000頁", price: 1160, category: "黑色碳粉匣", popular: true },
  { id: 32, brand: "HP", model: "Q7553X", compatible: "HP LJ P2015", yield: "7,000頁", price: 1344, category: "黑色碳粉匣", popular: false },
  { id: 33, brand: "HP", model: "Q7570A", compatible: "HP LJ M5025/5035MFP", yield: "15,000頁", price: 2598, category: "黑色碳粉匣", popular: false },
  { id: 34, brand: "HP", model: "CE505A", compatible: "HP LJ P2035/2055A", yield: "2,300頁", price: 1320, category: "黑色碳粉匣", popular: true },
  { id: 35, brand: "HP", model: "CE505X", compatible: "HP LJ P2055X", yield: "6,500頁", price: 1733, category: "黑色碳粉匣", popular: true },
  { id: 36, brand: "HP", model: "Q7516A", compatible: "HP LJ 5200", yield: "12,000頁", price: 2163, category: "黑色碳粉匣", popular: false },
  
  // HP 彩色雷射碳粉匣
  { id: 37, brand: "HP", model: "Q3960A-63A", compatible: "HP Color LJ 2550 黑/藍/黃/紅", yield: "5,000頁", price: 1375, category: "彩色碳粉匣", popular: true },
  { id: 38, brand: "HP", model: "Q6000A-03A", compatible: "HP Color LJ 1600/2600/2605 黑/藍/黃/紅", yield: "2,500頁", price: 1396, category: "彩色碳粉匣", popular: true },
  { id: 39, brand: "HP", model: "Q7560A", compatible: "HP Color LJ 2700/3000 黑", yield: "6,500頁", price: 2867, category: "彩色碳粉匣", popular: false },
  { id: 40, brand: "HP", model: "Q7561/62/63A", compatible: "HP Color LJ 2700/3000 藍/黃/紅", yield: "3,500頁", price: 2293, category: "彩色碳粉匣", popular: false },
  { id: 41, brand: "HP", model: "Q2670A", compatible: "HP Color LJ 3500/3700 黑", yield: "6,000頁", price: 2252, category: "彩色碳粉匣", popular: true },
  { id: 42, brand: "HP", model: "Q2671A-73A", compatible: "HP Color LJ 3500 藍/黃/紅", yield: "4,000頁", price: 2252, category: "彩色碳粉匣", popular: false },
  { id: 43, brand: "HP", model: "Q6470A", compatible: "HP Color LJ 3600/3800 黑", yield: "6,000頁", price: 2399, category: "彩色碳粉匣", popular: true },
  { id: 44, brand: "HP", model: "Q6471A-73A", compatible: "HP Color LJ 3600 藍/黃/紅", yield: "4,000頁", price: 2399, category: "彩色碳粉匣", popular: false },
  { id: 45, brand: "HP", model: "Q2681A-83A", compatible: "HP Color LJ 3700 藍/黃/紅", yield: "6,000頁", price: 2349, category: "彩色碳粉匣", popular: false },
  { id: 46, brand: "HP", model: "Q7581A-83A", compatible: "HP Color LJ 3800 藍/黃/紅", yield: "6,000頁", price: 2530, category: "彩色碳粉匣", popular: false },
  { id: 47, brand: "HP", model: "C9720A", compatible: "HP Color LJ 4600/4650 黑", yield: "9,000頁", price: 2540, category: "彩色碳粉匣", popular: true },
  { id: 48, brand: "HP", model: "C9721A-23A", compatible: "HP Color LJ 4600/4650 藍/黃/紅", yield: "8,000頁", price: 2703, category: "彩色碳粉匣", popular: false },
  { id: 49, brand: "HP", model: "Q5950A", compatible: "HP Color LaserJet 4700n/dn/dtn 黑", yield: "11,000頁", price: 3076, category: "彩色碳粉匣", popular: false },
  { id: 50, brand: "HP", model: "Q5951A-53A", compatible: "HP Color LaserJet 4700n/dn/dtn 藍/黃/紅", yield: "10,000頁", price: 3249, category: "彩色碳粉匣", popular: false },
  { id: 51, brand: "HP", model: "C9730A", compatible: "HP Color LJ 5500/5550 黑", yield: "13,000頁", price: 3375, category: "彩色碳粉匣", popular: true },
  { id: 52, brand: "HP", model: "C9731A-33A", compatible: "HP Color LJ 5500/5550 藍/黃/紅", yield: "12,000頁", price: 3375, category: "彩色碳粉匣", popular: false },
  { id: 53, brand: "HP", model: "CB540A", compatible: "HP CLJ CP1210/1215/CM1300/CP1510/1515/CP1518", yield: "2,200頁", price: 1533, category: "彩色碳粉匣", popular: true },
  { id: 54, brand: "HP", model: "CB541/42/43A", compatible: "HP CLJ CP1210/CM1300/CP1510/CP1518 藍/黃/紅", yield: "1,400頁", price: 1533, category: "彩色碳粉匣", popular: false },
  { id: 55, brand: "HP", model: "CC530A", compatible: "HP CLJ CP2025/CM2320 黑(低)", yield: "3,500頁", price: 1967, category: "彩色碳粉匣", popular: true },
  { id: 56, brand: "HP", model: "CC531/32/33A", compatible: "HP CLJ CP2025/CM2320 藍/黃/紅", yield: "2,800頁", price: 1910, category: "彩色碳粉匣", popular: false },
  { id: 57, brand: "HP", model: "CE250X", compatible: "HP CLJ CP3525/CM3530 黑(高印量)", yield: "10,500頁", price: 3622, category: "彩色碳粉匣", popular: true },
  { id: 58, brand: "HP", model: "CE250A", compatible: "HP CLJ CP3525/CM3530 黑(低印量)", yield: "5,000頁", price: 3103, category: "彩色碳粉匣", popular: false },
  { id: 59, brand: "HP", model: "CE251/52/53A", compatible: "HP CLJ CP3525/CM3530 藍/黃/紅", yield: "7,000頁", price: 3422, category: "彩色碳粉匣", popular: false },
  
  // EPSON 系列
  { id: 60, brand: "EPSON", model: "S050010", compatible: "Epson EPL-5700(T)", yield: "6,000頁", price: 630, category: "黑色碳粉匣", popular: false },
  { id: 61, brand: "EPSON", model: "S051055", compatible: "Epson EPL-5700 感光滾筒", yield: "20,000頁", price: 1339, category: "感光滾筒", popular: true },
  { id: 62, brand: "EPSON", model: "S050087", compatible: "Epson EPL-5900(T)", yield: "6,000頁", price: 630, category: "黑色碳粉匣", popular: false },
  { id: 63, brand: "EPSON", model: "S050166", compatible: "Epson EPL-6200(T)", yield: "6,000頁", price: 1181, category: "黑色碳粉匣", popular: true },
  { id: 64, brand: "EPSON", model: "S050167", compatible: "Epson EPL-6200/6200L(T)", yield: "3,000頁", price: 1024, category: "黑色碳粉匣", popular: false },
  { id: 65, brand: "EPSON", model: "S051099", compatible: "Epson EPL-6200/AcuLaser M1200 感光滾筒", yield: "20,000頁", price: 1181, category: "感光滾筒", popular: true },
  { id: 66, brand: "EPSON", model: "S050523", compatible: "Epson AcuLaser M1200(高)", yield: "3,200頁", price: 1260, category: "黑色碳粉匣", popular: false },
  { id: 67, brand: "EPSON", model: "S050439", compatible: "Epson AcuLaser M2010D/DN", yield: "8,000頁", price: 2352, category: "黑色碳粉匣", popular: true },
  { id: 68, brand: "EPSON", model: "S050440", compatible: "Epson AcuLaser M2010D/DN", yield: "3,500頁", price: 2205, category: "黑色碳粉匣", popular: false },
  { id: 69, brand: "EPSON", model: "S051091", compatible: "Epson EPL-N2500", yield: "10,000頁", price: 2730, category: "黑色碳粉匣", popular: false },
  { id: 70, brand: "EPSON", model: "S050100", compatible: "Epson AcuLaser C900/1900 黑", yield: "4,500頁", price: 1400, category: "彩色碳粉匣", popular: true },
  { id: 71, brand: "EPSON", model: "S050099-97", compatible: "Epson AcuLaser C900/1900 藍/紅/黃", yield: "4,500頁", price: 1740, category: "彩色碳粉匣", popular: false },
  { id: 72, brand: "EPSON", model: "S051111", compatible: "Epson EPL-N3000", yield: "17,000頁", price: 3450, category: "黑色碳粉匣", popular: false },
  { id: 73, brand: "EPSON", model: "S051076/77", compatible: "Epson EPL-N2120", yield: "20,000頁", price: 2450, category: "黑色碳粉匣", popular: true },
  { id: 74, brand: "EPSON", model: "S051068", compatible: "Epson EPL-N2700/2750", yield: "15,000頁", price: 3150, category: "黑色碳粉匣", popular: false },
  
  // Fuji-Xerox 系列
  { id: 75, brand: "Fuji Xerox", model: "CT350251", compatible: "Xerox DocuPrint 205/305/255/202", yield: "10,000頁", price: 2940, category: "黑色碳粉匣", popular: true },
  { id: 76, brand: "Fuji Xerox", model: "106R01246", compatible: "Xerox Phaser3428", yield: "8,000頁", price: 1575, category: "黑色碳粉匣", popular: true },
  { id: 77, brand: "Fuji Xerox", model: "CT200650/51/52", compatible: "Xerox DocuPrint C525A 藍/紅/黃", yield: "4,000頁", price: 1181, category: "彩色碳粉匣", popular: false },
  { id: 78, brand: "Fuji Xerox", model: "CT201114", compatible: "Xerox DocuPrint C1110/1110 黑", yield: "2,000頁", price: 1320, category: "彩色碳粉匣", popular: true },
  { id: 79, brand: "Fuji Xerox", model: "CT201115-17", compatible: "Xerox DocuPrint C1110/1110 藍/紅/黃", yield: "2,000頁", price: 1560, category: "彩色碳粉匣", popular: false },
  
  // IBM 系列
  { id: 80, brand: "IBM", model: "75P5711", compatible: "IBM InfoPrint 1412", yield: "6,000頁", price: 1418, category: "黑色碳粉匣", popular: false },
  
  // Samsung 系列
  { id: 81, brand: "Samsung", model: "ML-1610D2", compatible: "Samsung ML-1610", yield: "2,000頁", price: 1181, category: "黑色碳粉匣", popular: true },
  { id: 82, brand: "Samsung", model: "SCX-4216D3", compatible: "Samsung 4016/4116/4216/SF560/565P/750/755P", yield: "3,000頁", price: 1181, category: "黑色碳粉匣", popular: true },
  { id: 83, brand: "Samsung", model: "ML-1710D3", compatible: "Samsung ML-1510/1710/1740/1750/1710P", yield: "3,000頁", price: 1500, category: "黑色碳粉匣", popular: false },
  { id: 84, brand: "Samsung", model: "SCX-4521D3", compatible: "Samsung SCX-4521F", yield: "3,000頁", price: 1550, category: "黑色碳粉匣", popular: true },
  { id: 85, brand: "Samsung", model: "SF-D560RA", compatible: "Samsung SF-560R/565PR", yield: "3,000頁", price: 1750, category: "黑色碳粉匣", popular: false },
];

const brands = ["全部品牌", "HP", "EPSON", "Fuji Xerox", "Samsung", "IBM"];
const categories = ["全部類型", "黑色碳粉匣", "彩色碳粉匣", "感光滾筒"];

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

  // Contact phone number from the company info
  const phoneNumber = "02-2970-2232";
  const mobileNumber = "0925-665321";

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
            <a href={`tel:${phoneNumber}`}>
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
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">單價</span>
                        <span className="text-xl font-bold text-primary">
                          NT$ {product.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                            <Leaf className="w-3 h-3 mr-1" />
                            環保再生
                          </Badge>
                          <a href={`tel:${phoneNumber}`}>
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
                    <TableHead className="text-right">單價</TableHead>
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
                      <TableCell className="text-right font-bold text-primary">
                        NT$ {product.price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <a href={`tel:${phoneNumber}`}>
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
              全新環保碳粉匣型號眾多，本公司備有完整之各大廠牌環保碳粉匣品項，<br />
              報價單尚未有報價之型號，歡迎來電洽詢，若您的叫貨量大，歡迎與業務代表議價唷！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${phoneNumber}`}>
                <Button size="lg" className="eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  客服專線：02-2970-2232
                </Button>
              </a>
              <a href={`tel:${mobileNumber}`}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  行動電話：0925-665321
                </Button>
              </a>
            </div>
            <div className="mt-6">
              <Link to="/">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
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
            <a href={`tel:${phoneNumber}`} className="hover:text-primary ml-1">02-2970-2232</a> | 
            <a href={`tel:${mobileNumber}`} className="hover:text-primary ml-1">0925-665321</a> | 
            <span className="ml-1">新北市新莊區五工路125號</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Products;
