import { Award, Building2, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const certifications = [
  {
    title: "中華電信共同供應契約",
    description: "101年印表機回收再利用碳粉匣",
    details: [
      "招標案號：NBJ000207",
      "立約商編號：NBJ000207-21",
      "中華電信北區分公司採購部",
      "100印表機回收再利用碳粉匣",
    ],
    icon: Building2,
  },
  {
    title: "台灣銀行共同供應契約",
    description: "103年印表機回收再利用碳粉匣",
    details: [
      "招標案號：LP5-990036",
      "立約商編號：11P-LP5-3562",
      "台灣銀行(股)公司採購部",
      "100印表機回收再利用碳粉匣",
    ],
    icon: Building2,
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Award className="w-4 h-4 inline-block mr-1" />
            政府認證
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            政府機關共同供應契約
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            綠昕科技為政府機關認可之環保碳粉匣供應商，品質有保證
          </p>
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="group bg-background border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 shadow-card hover:shadow-eco-lg overflow-hidden"
            >
              <div className="eco-gradient p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <cert.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-foreground">
                      {cert.title}
                    </h3>
                    <p className="text-primary-foreground/80 text-sm">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {cert.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">環保署認證</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">政府機關首選</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">品質穩定可靠</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
