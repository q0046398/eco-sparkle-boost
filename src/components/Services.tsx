import { Printer, Recycle, Truck, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Printer,
    title: "環保碳粉匣銷售",
    description: "全新台灣製造環保碳粉匣，品質優良，價格實惠，適用各大廠牌印表機。",
    features: ["HP", "Canon", "Brother", "Samsung"],
    link: "/products",
  },
  {
    icon: Recycle,
    title: "空匣回收服務",
    description: "高價回收印表機空匣，減少廢棄物產生，為地球盡一份心力。",
    features: ["即時報價", "到府收取", "現金支付"],
    link: "/recycling",
  },
  {
    icon: Truck,
    title: "快速配送",
    description: "全台配送服務，訂購後快速出貨，確保您的辦公需求不中斷。",
    features: ["全台配送", "隔日送達", "免運優惠"],
  },
  {
    icon: ShieldCheck,
    title: "品質保證",
    description: "環保署認證，符合資源回收再利用法規，機關學校首選。",
    features: ["環保認證", "品質穩定", "售後服務"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 eco-gradient-soft">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            我們的服務
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            專業環保碳粉匣服務
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            提供完整的碳粉匣銷售與回收解決方案，助您節省成本同時愛護環境
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const cardContent = (
              <Card 
                className={`group bg-card border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 shadow-card hover:shadow-eco-lg h-full ${service.link ? "cursor-pointer" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 rounded-xl eco-gradient flex items-center justify-center mb-4 shadow-eco group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );

            return service.link ? (
              <Link key={service.title} to={service.link} className="block">
                {cardContent}
              </Link>
            ) : (
              <div key={service.title}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
