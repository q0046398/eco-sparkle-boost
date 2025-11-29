import { Link } from "react-router-dom";
import { Phone, Mail, Recycle, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const recyclingItems = [
  { model: "Q2612A", compatible: "LJ-1010/1020/3050/M1005", yield: "2000張", price: 10 },
  { model: "C3909A", compatible: "LJ-5Si/8000", yield: "2500張", price: 30 },
  { model: "CE410-A/X-CE413A", compatible: "M451/M375/M475", yield: "-", price: 30 },
  { model: "C4096A", compatible: "LJ-2100/2200", yield: "5000張", price: 10 },
  { model: "C7115A", compatible: "LJ-1000/1200/1220", yield: "2500張", price: 5 },
  { model: "C7115X", compatible: "LJ-1000/1200/1220", yield: "3500張", price: 5 },
  { model: "Q5942A", compatible: "LJ-4250/4350", yield: "10000張", price: 40 },
  { model: "Q5942X", compatible: "LJ-4250/4350", yield: "20000張", price: 6 },
  { model: "Q5949A", compatible: "LJ-1160/1320", yield: "2500張", price: 10 },
  { model: "Q5949X", compatible: "LJ-1320/3390", yield: "6000張", price: 10 },
  { model: "C4127X", compatible: "LJ-4000/4050", yield: "10000張", price: 20 },
  { model: "C4129X", compatible: "LJ-5000/5100", yield: "10000張", price: 10 },
  { model: "Q6511A", compatible: "LJ-2400/2410/2420/2430", yield: "6000張", price: 10 },
  { model: "Q6511X", compatible: "LJ-2400/2410/2420/2430", yield: "12000張", price: 20 },
  { model: "Q7551A", compatible: "LJ-P3005", yield: "6500張", price: 10 },
  { model: "Q7551X", compatible: "LJ-P3005", yield: "13000張", price: 30 },
  { model: "Q7553A", compatible: "LJ-P2015", yield: "3000張", price: 10 },
  { model: "Q7553X", compatible: "LJ-P2015", yield: "7000張", price: 20 },
  { model: "Q7516A", compatible: "LJ-5200", yield: "12000張", price: 60 },
  { model: "Q1338A", compatible: "LJ-4200", yield: "12000張", price: 80 },
  { model: "Q1339A", compatible: "LJ-4300", yield: "18000張", price: 100 },
  { model: "C8061X", compatible: "LJ-4100", yield: "10000張", price: 20 },
  { model: "CB435A", compatible: "LJ-P1006", yield: "1500張", price: 10 },
  { model: "CB436A", compatible: "LJ-P1505/M1522", yield: "2000張", price: 10 },
  { model: "CC364A", compatible: "LJ-P4014/P4015/P4515", yield: "10000張", price: 30 },
  { model: "CC364X", compatible: "LJ-P4014/P4015/P4515", yield: "24000張", price: 100 },
  { model: "CE390A/X", compatible: "LJ-4345mfp", yield: "18000張", price: "30/100" },
  { model: "Q7570A", compatible: "LJ-M5035mfp", yield: "15000張", price: 60 },
  { model: "CE505A", compatible: "LJ-P2035/P2055D", yield: "2300張", price: 10 },
  { model: "CE505X", compatible: "LJ-P2035/P2055D", yield: "6500張", price: 130 },
  { model: "CE255A", compatible: "P3015X", yield: "6000張", price: 10 },
  { model: "CE255X", compatible: "P3015X", yield: "12500張", price: 80 },
];

const Recycling = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = recyclingItems.filter(
    (item) =>
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.compatible.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold text-foreground">返回首頁</span>
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="tel:02-2970-2232" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">02-2970-2232</span>
              </a>
              <a href="tel:0925-665321" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">0925-665321</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="eco-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
            <Recycle className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            空匣回收價目表
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            高價回收原廠空碳粉匣，為地球環保盡一份心力
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="搜尋型號或相容機型..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">原廠料號</TableHead>
                    <TableHead className="font-semibold">相容機型</TableHead>
                    <TableHead className="font-semibold text-center">張數</TableHead>
                    <TableHead className="font-semibold text-right">回收價 (元)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item, index) => (
                    <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-primary">{item.model}</TableCell>
                      <TableCell className="text-foreground">{item.compatible}</TableCell>
                      <TableCell className="text-center text-muted-foreground">{item.yield}</TableCell>
                      <TableCell className="text-right font-bold text-destructive">
                        {typeof item.price === "number" ? `$${item.price}` : `$${item.price}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredItems.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                找不到符合的項目
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="mt-8 p-6 bg-secondary/50 rounded-xl border border-border">
            <h3 className="font-semibold text-foreground mb-3">回收須知</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• 以上價格為原廠空匣回收價，實際價格依空匣狀況而定</li>
              <li>• 空匣需保持完整，無破損、無漏粉</li>
              <li>• 提供到府收取服務，歡迎來電洽詢</li>
              <li>• 價格如有變動，以現場報價為準</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 eco-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            立即聯繫我們回收空匣
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            專人到府收取，現金支付，為您提供最便捷的回收服務
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:02-2970-2232" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                02-2970-2232
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href="tel:0925-665321" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                0925-665321
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 綠昕科技. 版權所有.
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <a href="tel:02-2970-2232" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Phone className="w-4 h-4" />
              02-2970-2232
            </a>
            <a href="tel:0925-665321" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Phone className="w-4 h-4" />
              0925-665321
            </a>
            <a href="mailto:service@greentoner.com.tw" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Mail className="w-4 h-4" />
              聯繫我們
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Recycling;
