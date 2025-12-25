import { useState, useEffect } from "react";
import { Menu, X, MessageCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/data/products";

interface NavbarProps {
  isDark: boolean;
  toggleDark: () => void;
}

const Navbar = ({ isDark, toggleDark }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Produk", href: "#produk" },
    { name: "Pricelist", href: "#pricelist" },
    { name: "Tentang", href: "#tentang" },
    { name: "Kontak", href: "#kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="font-display text-2xl md:text-3xl font-bold text-primary">
              ALCHO
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Order WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border animate-fade-in">
            <div className="container-custom py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
                >
                  {link.name}
                </a>
              ))}
              <Button
                asChild
                className="mt-2 bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Order WhatsApp
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
