import { CheckCircle2, Award, Users, Building } from "lucide-react";
const features = ["台灣在地製造，品質有保障", "符合環保署認證標準", "專業技術團隊，品管嚴格", "完善售後服務，安心購買", "政府機關、學校採購首選", "提供大量採購優惠價格"];
const About = () => {
  return <section id="about" className="py-20 md:py-28 eco-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image/Visual Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-eco-lg">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full eco-gradient flex items-center justify-center shadow-eco-lg">
                    <Building className="w-16 h-16 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">綠昕科技有限公司</h3>
                  <p className="text-muted-foreground">Lyu Sin Technology Co., Ltd.</p>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-card rounded-xl p-4 shadow-eco-lg border border-border animate-float">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-bold text-foreground">環保認證</div>
                  <div className="text-sm text-muted-foreground">品質保證</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-eco-lg border border-border animate-float-delayed">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-bold text-foreground">專業服務</div>
                  <div className="text-sm text-muted-foreground">值得信賴</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              關於我們
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              專注環保
              <span className="text-gradient block">創造永續價值</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">綠昕科技成立於台灣，專注於印表機耗材銷售。 我們相信，每一個小選擇都能為地球帶來改變。透過專業的技術與嚴格的品管，不僅給您最優質的品質和最好的服務，也替您節省一筆開銷。</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map(feature => <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;