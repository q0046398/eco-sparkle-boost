import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, ShoppingCart, Send, Phone, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ProductItem {
  name: string;
  quantity: string;
  priceType: string;
}

const OrderOriginal = () => {
  const { toast } = useToast();

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
    setProducts((prev) => [...prev, { name: "", quantity: "1", priceType: "110080-untaxed" }]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts((prev) => prev.filter((_, i) => i !== index));
    }
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
            <a href="tel:02-2970-2232">
              <Button className="eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg transition-all">
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">立即諮詢</span>
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Order Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full eco-gradient mb-4">
                <ShoppingCart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                原廠碳粉匣特價訂購
              </h1>
              <div className="space-y-3 text-muted-foreground mb-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="font-medium text-foreground mb-1">標準容量碳粉匣</p>
                  <p className="text-sm">EPSON AL-M220DN/M310/M320 (110080/S110080)</p>
                  <p className="text-sm font-semibold text-primary">未稅 NT$3,500 ・ 含稅 NT$3,675</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="font-medium text-foreground mb-1">高印量碳粉匣</p>
                  <p className="text-sm">EPSON M220DN/M310/M320 (110079/S110079/10079)</p>
                  <p className="text-sm font-semibold text-primary">未稅 NT$4,550 ・ 含稅 NT$4,778</p>
                </div>
              </div>
            </div>

            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">訂購資訊</CardTitle>
                <CardDescription>
                  請填寫完整資訊以便我們為您處理訂單
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                                型號價格
                              </Label>
                              <Select
                                value={product.priceType}
                                onValueChange={(value) => handleProductChange(index, "priceType", value)}
                              >
                                <SelectTrigger id={`product-price-${index}`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="110080-untaxed">110080 未稅 NT$3,500</SelectItem>
                                  <SelectItem value="110080-taxed">110080 含稅 NT$3,675</SelectItem>
                                  <SelectItem value="110079-untaxed">110079 未稅 NT$4,550</SelectItem>
                                  <SelectItem value="110079-taxed">110079 含稅 NT$4,778</SelectItem>
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
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                如有任何問題，歡迎直接聯繫我們
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:02-2970-2232">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Phone className="w-4 h-4 mr-2" />
                    客服專線：02-2970-2232
                  </Button>
                </a>
                <a href="tel:0925-665321">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Phone className="w-4 h-4 mr-2" />
                    行動電話：0925-665321
                  </Button>
                </a>
              </div>
            </div>
          </div>
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
