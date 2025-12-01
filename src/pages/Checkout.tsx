import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Phone, Plus, Trash2, Store, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";

interface ProductItem {
  name: string;
  quantity: string;
  priceType: string;
}

const Checkout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { cart, clearCart, getTotalItems, getTotalPrice } = useCart();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if cart is empty
    if (cart.length === 0) {
      toast({
        title: "購物車是空的",
        description: "請先加入商品到購物車",
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
      // Convert cart items to products format
      const products = cart.map((item) => ({
        name: item.productName,
        quantity: item.quantity.toString(),
        priceType: item.priceType,
        unitPrice: item.unitPrice,
        productType: item.productType,
      }));

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
          productType: "混合訂單",
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

      // Navigate back to home
      navigate("/");
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

    setIsSubmitting(false);
  };

  const contactTimes = [
    "上午 9:00 - 12:00",
    "下午 12:00 - 14:00",
    "下午 14:00 - 17:00",
    "晚上 17:00 - 20:00",
    "皆可聯繫",
  ];

  // Calculate subtotal for each product
  const calculateProductSubtotal = (item: typeof cart[0]) => {
    if (item.productType === "eco") {
      return "請聯繫報價";
    }
    return `NT$${(item.unitPrice * item.quantity).toLocaleString()}`;
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
            <div>
              <h1 className="font-bold text-lg text-foreground">結帳</h1>
            </div>
            <a href="tel:02-2970-2232">
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">立即諮詢</span>
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-6">購物車是空的</p>
                <Link to="/">
                  <Button>返回選購商品</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Cart Summary */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">訂購商品</h2>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                          {item.productName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.productType === "original" ? (
                            <>
                              {item.priceType} NT$
                              {item.unitPrice.toLocaleString()}
                            </>
                          ) : (
                            "環保碳粉匣 - 請聯繫報價"
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          數量: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">小計</p>
                        <p className="font-bold text-foreground">
                          {calculateProductSubtotal(item)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {getTotalPrice() > 0 && (
                    <div className="flex justify-between items-center text-xl font-bold pt-4 border-t">
                      <span>總計</span>
                      <span>NT${getTotalPrice().toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Customer Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">客戶資訊</h2>

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

                  <div className="space-y-2">
                    <Label htmlFor="email">聯絡信箱</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="請輸入您的電子郵件"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

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
                </div>

                {/* Shipping Method */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">配送方式</h2>
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
            )}
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

export default Checkout;
