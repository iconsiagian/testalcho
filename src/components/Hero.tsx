import { ArrowRight, MessageCircle, ChefHat, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/data/products";

const Hero = () => {
  const features = [
    { icon: ChefHat, text: "Kualitas Premium" },
    { icon: Award, text: "Rasa Konsisten" },
    { icon: Sparkles, text: "Cocok untuk F&B" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 rounded-full mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              PT Alfa Omega / PT. NEW ALFA OMEGA UTAMA
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up stagger-1">
            Bumbu & Saus{" "}
            <span className="text-primary">Premium</span>{" "}
            <br className="hidden sm:block" />
            untuk Dapur Bisnis Anda
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            ALCHO membantu rasa konsisten—dari cloud kitchen sampai restoran besar.
            Produk bumbu dan saus berkualitas tinggi untuk kebutuhan kuliner profesional.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up stagger-3">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-lg px-8 py-6"
            >
              <a href="#produk">
                Lihat Produk
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white gap-2 text-lg px-8 py-6"
            >
              <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Order via WhatsApp
              </a>
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 animate-fade-in-up stagger-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2 bg-card/50 rounded-full border border-border/50"
              >
                <feature.icon className="h-5 w-5 text-accent" />
                <span className="font-medium text-foreground/80">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
