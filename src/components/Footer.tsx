import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: MessageCircle, href: "#", label: "WhatsApp" },
  ];

  const quickLinks = [
    { name: "Produk", href: "#produk" },
    { name: "Pricelist", href: "#pricelist" },
    { name: "Tentang", href: "#tentang" },
    { name: "Kontak", href: "#kontak" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-primary mb-4">ALCHO</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Bumbu & Saus Premium untuk Dapur Bisnis Anda. Diproduksi oleh PT Alfa Omega / PT. NEW ALFA OMEGA UTAMA.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Menu</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>WhatsApp: 0812 4918 6623</li>
              <li>Telepon: 031 866 8858</li>
              <li>
                Perm. Pondok Chandra Indah,<br />
                Jl. Nanas / VII 658<br />
                Waru – Sidoarjo
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ALCHO. PT Alfa Omega / PT. NEW ALFA OMEGA UTAMA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
