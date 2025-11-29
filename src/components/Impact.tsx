import { TrendingUp, Leaf, Factory, Globe } from "lucide-react";

const stats = [
  {
    icon: Factory,
    value: "3,000噸",
    label: "年減少廢棄物",
    description: "透過回收再利用減少碳粉匣廢棄物",
  },
  {
    icon: TrendingUp,
    value: "35%+",
    label: "節省成本",
    description: "環保碳粉匣比原廠價格更優惠",
  },
  {
    icon: Leaf,
    value: "零戴奧辛",
    label: "環保無毒",
    description: "避免焚燒產生有害戴奧辛毒氣",
  },
  {
    icon: Globe,
    value: "永續發展",
    label: "愛護地球",
    description: "符合政府綠色採購政策",
  },
];

const Impact = () => {
  return (
    <section id="impact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              環保效益
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              每一個選擇
              <span className="text-gradient block">都為地球帶來改變</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              台灣每年使用超過300萬支碳粉匣，但回收率不到10%。碳粉匣可循環使用3-5次，
              選擇環保再生碳粉匣，既能節省成本，又能減少廢棄物，避免焚燒產生戴奧辛等有害物質。
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              環保署推動資源回收再利用法，鼓勵機關、學校優先採購再生碳粉匣，
              綠昕科技致力於提供優質環保碳粉匣，與您一同實踐綠色消費。
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-eco-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl eco-gradient flex items-center justify-center mb-4 shadow-eco group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-primary font-medium mb-2">{stat.label}</div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
