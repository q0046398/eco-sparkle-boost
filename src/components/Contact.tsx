import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
  {
    icon: Phone,
    title: "電話諮詢",
    value: "歡迎來電洽詢",
    description: "大量採購可議價",
  },
  {
    icon: Mail,
    title: "電子郵件",
    value: "隨時與我們聯繫",
    description: "專人回覆您的問題",
  },
  {
    icon: MapPin,
    title: "服務據點",
    value: "台灣",
    description: "全台配送服務",
  },
  {
    icon: Clock,
    title: "服務時間",
    value: "週一至週五",
    description: "09:00 - 18:00",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            聯絡我們
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            準備好開始節省了嗎？
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            若您有大量採購需求，歡迎來電議價。我們期待為您提供最優質的服務。
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info) => (
            <Card key={info.title} className="group bg-card border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-eco">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl eco-gradient flex items-center justify-center mb-4 shadow-eco group-hover:scale-110 transition-transform">
                  <info.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                <p className="text-primary font-medium">{info.value}</p>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto eco-gradient border-0 shadow-eco-lg">
            <CardContent className="py-12 px-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary-foreground" />
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                有任何問題嗎？
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                我們的專業團隊隨時準備為您解答所有關於環保碳粉匣的問題
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  onClick={() => window.open('https://www.facebook.com/pages/%E7%B6%A0%E6%98%95%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/157211251012798', '_blank')}
                >
                  Facebook 專頁
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  LINE 線上客服
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
