import { Leaf, Facebook, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="hero-gradient pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-primary-foreground">綠昕科技</span>
                <span className="text-xs text-primary-foreground/60">Lyu Sin Technology Co., Ltd.</span>
              </div>
            </a>
            <p className="text-primary-foreground/70 leading-relaxed">
              專注於環保碳粉匣製造與銷售，提供優質產品與專業服務，
              與您一同為地球環保盡一份心力。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">快速連結</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  服務項目
                </a>
              </li>
              <li>
                <a href="#impact" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  環保效益
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  關於我們
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  聯絡我們
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">聯絡資訊</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="w-4 h-4" />
                <span>歡迎來電洽詢</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                <span>服務信箱</span>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/pages/%E7%B6%A0%E6%98%95%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/157211251012798"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook 粉絲專頁</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} 綠昕科技有限公司. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm">
              台灣製造 ・ 環保認證 ・ 品質保證
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
