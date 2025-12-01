import { Shield, Award, Leaf, Handshake } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "最高品質與業界最佳保固",
    description:
      "我們對環保碳粉匣的品質深具信心！因此，我們提供業界最堅實的頂級保固服務，讓您在使用過程中享有百分百的安心。若有任何非人為損壞，我們保證迅速處理，絕不讓保固成為空談。",
  },
  {
    icon: Award,
    title: "政府信賴 實力背書",
    description:
      "作為台灣銀行等多個政府機關共同供應契約的立約商，我們的產品經過國家級標準認證。選擇綠昕，就是選擇一份官方認可的穩定與公信力。",
  },
  {
    icon: Leaf,
    title: "真正環保 國家認證",
    description:
      "我們的回收再利用碳粉匣符合行政院環保署環保標章規格標準。我們堅持採用原廠空匣，並將所有關鍵耗材（感光鼓、刮刀等）替換為全新零件，助您的企業輕鬆達成綠色採購與ESG目標。",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            核心承諾
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            不只提供產品
            <span className="text-gradient block mt-2">更提供長久、安心、專業的列印解決方案</span>
          </h2>
        </div>

        {/* Service Promise Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-10 border border-primary/10 shadow-eco">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl eco-gradient flex items-center justify-center shadow-eco">
                <Handshake className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  超越交易的服務承諾
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  對綠昕而言，每一次訂單不是終點，而是長期合作的起點。我們深信，
                  <span className="text-foreground font-semibold">
                    用心服務好一位客戶，遠比追求無數一次性的訂單重要得多。
                  </span>
                  我們致力於成為您專屬的列印管家，提供持續、穩定的技術支援與耗材管理，確保您的辦公效率永不中斷。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
            綠昕環保列印<span className="text-primary">三大基石</span>
          </h3>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-eco-lg"
            >
              {/* Number Badge */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full eco-gradient flex items-center justify-center text-primary-foreground font-bold text-lg shadow-eco">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <pillar.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h4 className="text-xl font-bold text-foreground mb-4">{pillar.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
