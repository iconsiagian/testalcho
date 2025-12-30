import { ChefHat, Store, Truck, Building2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateWhatsAppLink } from "@/data/products";

// Import menu images
import nasiGorengImg from "@/assets/menu/nasi-goreng.jpg";
import rendangImg from "@/assets/menu/rendang.jpg";
import sotoAyamImg from "@/assets/menu/soto-ayam.jpg";
import ayamBbqImg from "@/assets/menu/ayam-bbq.jpg";
import gulaiKambingImg from "@/assets/menu/gulai-kambing.jpg";
import nasiCampurImg from "@/assets/menu/nasi-campur.jpg";

interface MenuItem {
  name: string;
  description: string;
  alchoProduct: string;
  useCase: string;
  useCaseIcon: React.ReactNode;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Nasi Goreng Spesial",
    description: "Hidangan nasi goreng dengan bumbu khas yang konsisten di setiap porsi.",
    alchoProduct: "Bumbu Nasi Goreng ALCHO",
    useCase: "Cloud Kitchen",
    useCaseIcon: <Building2 className="w-3 h-3" />,
    image: nasiGorengImg,
  },
  {
    name: "Rendang Daging Sapi",
    description: "Menu andalan dengan cita rasa autentik Padang yang terjaga kualitasnya.",
    alchoProduct: "Bumbu Rendang ALCHO",
    useCase: "Restoran",
    useCaseIcon: <Store className="w-3 h-3" />,
    image: rendangImg,
  },
  {
    name: "Soto Ayam Komplit",
    description: "Kuah bening beraroma rempah, siap saji dalam volume besar.",
    alchoProduct: "Bumbu Soto ALCHO",
    useCase: "Katering",
    useCaseIcon: <Truck className="w-3 h-3" />,
    image: sotoAyamImg,
  },
  {
    name: "Ayam Bakar BBQ",
    description: "Ayam panggang dengan olesan saus BBQ yang meresap sempurna.",
    alchoProduct: "Saus BBQ ALCHO",
    useCase: "Cloud Kitchen",
    useCaseIcon: <Building2 className="w-3 h-3" />,
    image: ayamBbqImg,
  },
  {
    name: "Gulai Kambing",
    description: "Hidangan gulai dengan santan dan rempah yang seimbang untuk prasmanan.",
    alchoProduct: "Bumbu Gulai ALCHO",
    useCase: "Katering",
    useCaseIcon: <Truck className="w-3 h-3" />,
    image: gulaiKambingImg,
  },
  {
    name: "Nasi Campur Bali",
    description: "Set menu dengan sambal matah autentik sebagai pelengkap utama.",
    alchoProduct: "Sambal Matah ALCHO",
    useCase: "Restoran",
    useCaseIcon: <Store className="w-3 h-3" />,
    image: nasiCampurImg,
  },
];

const MenuInspirationSection = () => {
  return (
    <section id="inspirasi-menu" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <ChefHat className="w-4 h-4" />
            <span className="text-sm font-medium">Untuk Bisnis F&B</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Inspirasi Menu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contoh penerapan produk ALCHO dalam menu bisnis profesional — 
            siap diadaptasi untuk restoran, cloud kitchen, atau katering Anda.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Use Case Badge - positioned on image */}
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 left-3 gap-1.5 bg-background/90 backdrop-blur-sm text-foreground shadow-sm"
                >
                  {item.useCaseIcon}
                  {item.useCase}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Menu Name */}
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* ALCHO Product Used */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Produk yang digunakan:</p>
                  <p className="text-sm font-medium text-primary">
                    {item.alchoProduct}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" variant="outline" className="gap-2">
            <a href="#produk">
              Lihat Produk Terkait
            </a>
          </Button>
          <Button 
            asChild 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Order via WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuInspirationSection;
