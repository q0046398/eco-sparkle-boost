import { Leaf, Facebook, Phone, Mail, MessageCircle, Printer } from "lucide-react";
import logo from "@/assets/logo-transparent.png";

const Footer = () => {
  return (
    <footer className="hero-gradient pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="綠昕科技" className="h-10 w-auto object-contain rounded-md bg-white/90 p-1" />
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
                <Phone className="w-4 h-4 flex-shrink-0" />
                <div>
                  <span className="block">服務專線：0925-665-321</span>
                  <span className="block text-sm">連絡電話：(02)2970-2232</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Printer className="w-4 h-4 flex-shrink-0" />
                <span>傳真：(02)2970-2252</span>
              </li>
              <li>
                <a 
                  href="https://line.me/ti/p/~0925665321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-[#00B900] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>LINE ID：0925665321</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:c0925665321@yahoo.com.tw"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>c0925665321@yahoo.com.tw</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/pages/%E7%B6%A0%E6%98%95%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/157211251012798"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Facebook className="w-4 h-4 flex-shrink-0" />
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
