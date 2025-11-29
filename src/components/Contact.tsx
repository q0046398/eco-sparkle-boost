import { Phone, Mail, MapPin, Clock, MessageCircle, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
  {
    icon: Phone,
    title: "服務專線",
    value: "0925-665-321",
    description: "連絡電話：(02)2970-2232",
  },
  {
    icon: Printer,
    title: "傳真號碼",
    value: "(02)2970-2252",
    description: "傳真訂購服務",
  },
  {
    icon: MessageCircle,
    title: "LINE 客服",
    value: "0925665321",
    description: "加入好友即時諮詢",
    link: "https://line.me/ti/p/~0925665321",
  },
  {
    icon: Mail,
    title: "電子郵件",
    value: "c0925665321@yahoo.com.tw",
    description: "專人回覆您的問題",
    link: "mailto:c0925665321@yahoo.com.tw",
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
            <Card 
              key={info.title} 
              className={`group bg-card border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-eco ${info.link ? 'cursor-pointer' : ''}`}
              onClick={() => info.link && window.open(info.link, info.link.startsWith('mailto') ? '_self' : '_blank')}
            >
              <CardContent className="pt-6 text-center">
                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 shadow-eco group-hover:scale-110 transition-transform ${info.title === 'LINE 客服' ? 'bg-[#00B900]' : 'eco-gradient'}`}>
                  <info.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                <p className={`font-medium ${info.title === 'LINE 客服' ? 'text-[#00B900]' : 'text-primary'}`}>{info.value}</p>
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
                  className="bg-[#00B900] text-white hover:bg-[#00B900]/90"
                  onClick={() => window.open('https://line.me/ti/p/~0925665321', '_blank')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  LINE 線上客服
                </Button>
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  onClick={() => window.location.href = 'tel:0925665321'}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  0925-665-321
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
