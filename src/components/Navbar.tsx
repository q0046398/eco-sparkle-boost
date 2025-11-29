import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-transparent.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/products", label: "產品目錄", isRoute: true },
    { href: "#services", label: "服務項目", isRoute: false },
    { href: "#impact", label: "環保效益", isRoute: false },
    { href: "#about", label: "關於我們", isRoute: false },
    { href: "#contact", label: "聯絡我們", isRoute: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <img src={logo} alt="綠昕科技" className="h-12 w-auto object-contain mix-blend-multiply" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-foreground">綠昕科技</span>
              <span className="text-xs text-muted-foreground">環保碳粉匣專家</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-1"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </a>
              )
            ))}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                className="border-[#00B900] text-[#00B900] hover:bg-[#00B900] hover:text-white"
                onClick={() => window.open('https://line.me/ti/p/~0925665321', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                LINE
              </Button>
              <Button 
                className="eco-gradient text-primary-foreground shadow-eco hover:shadow-eco-lg transition-all"
                onClick={() => window.location.href = 'tel:0925665321'}
              >
                <Phone className="w-4 h-4 mr-2" />
                立即諮詢
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors font-medium py-2 flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="flex flex-col gap-2 mt-2">
                <Button 
                  variant="outline"
                  className="border-[#00B900] text-[#00B900] hover:bg-[#00B900] hover:text-white w-full"
                  onClick={() => window.open('https://line.me/ti/p/~0925665321', '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  LINE 線上客服
                </Button>
                <Button 
                  className="eco-gradient text-primary-foreground shadow-eco w-full"
                  onClick={() => window.location.href = 'tel:0925665321'}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  立即諮詢
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
