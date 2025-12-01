import { ArrowRight, Leaf, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Decorative leaves */}
      <div className="absolute top-32 right-20 opacity-20">
        <Leaf className="w-32 h-32 text-primary-foreground animate-float" />
      </div>
      <div className="absolute bottom-40 left-20 opacity-10">
        <Leaf className="w-24 h-24 text-primary-foreground animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-8 animate-fade-up">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground/90">台灣製造 ・ 品質保證</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-up" style={{
          animationDelay: "0.1s"
        }}>
            綠昕科技
            <span className="block mt-2 text-accent">印表機耗材專家</span>
          </h1>

          {/* Subheadline */}
          <p style={{
          animationDelay: "0.2s"
        }} className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up text-center">專注於印表機耗材銷售
 頂級保固   政府信賴   價格優勢   環保認證</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{
          animationDelay: "0.3s"
        }}>
            <Button size="lg" variant="heroSolid" className="text-lg px-8" asChild>
              <a href="#contact">
                立即諮詢
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/10 animate-fade-up" style={{
          animationDelay: "0.4s"
        }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">60萬+</div>
              <div className="text-sm text-primary-foreground/60">台灣雷射印表機</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">300萬</div>
              <div className="text-sm text-primary-foreground/60">年用碳粉匣數量</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">3-5次</div>
              <div className="text-sm text-primary-foreground/60">循環再利用</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(150, 30%, 98%)" />
        </svg>
      </div>
    </section>;
};
export default Hero;