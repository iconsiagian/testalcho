import { ArrowRight, MessageCircle, ChefHat, Award, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/data/products";
import { useEffect, useState, useCallback } from "react";

// Import slider images
import heroBanner from "@/assets/hero-banner.png";
import bumbuRendang from "@/assets/products/bumbu-rendang.png";
import sambalPedas from "@/assets/products/sambal-pedas.png";
import sausBbq from "@/assets/products/saus-bbq.png";
import bumbuGulai from "@/assets/products/bumbu-gulai.png";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Slider images with premium backgrounds
  const slides = [
    {
      image: heroBanner,
      alt: "Premium bumbu dan saus ALCHO - berbagai rempah dan produk saus berkualitas tinggi",
    },
    {
      image: bumbuRendang,
      alt: "Bumbu Rendang ALCHO - resep autentik kualitas premium",
    },
    {
      image: sambalPedas,
      alt: "Sambal Pedas ALCHO - cita rasa nusantara",
    },
    {
      image: sausBbq,
      alt: "Saus BBQ ALCHO - saus berkualitas untuk bisnis kuliner",
    },
    {
      image: bumbuGulai,
      alt: "Bumbu Gulai ALCHO - bumbu tradisional premium",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation handlers
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10s
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  }, [slides.length]);

  const features = [
    { icon: ChefHat, text: "Kualitas Premium" },
    { icon: Award, text: "Rasa Konsisten" },
    { icon: Sparkles, text: "Cocok untuk F&B" },
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      onMouseEnter={() => {
        setIsHovered(true);
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPaused(false);
      }}
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                transform: `translateY(${scrollY * 0.1}px) scale(1.1)`,
              }}
            />
            {/* Dark Premium Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            {/* Vignette Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.4)_100%)]" />
          </div>
        ))}
      </div>

      {/* Parallax Decorative Elements */}
      <div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl transition-transform duration-100"
        style={{ transform: `translate(${scrollY * 0.15}px, ${scrollY * -0.1}px)` }}
      />
      <div 
        className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl transition-transform duration-100"
        style={{ transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.15}px)` }}
      />
      <div 
        className="absolute top-1/3 left-1/4 w-4 h-4 bg-primary/30 rounded-full"
        style={{ transform: `translateY(${scrollY * -0.3}px)` }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-3 h-3 bg-accent/40 rounded-full"
        style={{ transform: `translateY(${scrollY * -0.4}px)` }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-primary/20 rounded-full"
        style={{ transform: `translateY(${scrollY * -0.25}px)` }}
      />

      {/* Navigation Arrows - Visible on Hover */}
      <button
        onClick={goToPrev}
        className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-card/30 backdrop-blur-sm border border-border/30 text-foreground/70 hover:bg-card/50 hover:text-foreground transition-all duration-300 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-card/30 backdrop-blur-sm border border-border/30 text-foreground/70 hover:bg-card/50 hover:text-foreground transition-all duration-300 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Fixed, not sliding */}
          <div 
            className="text-center lg:text-left"
            style={{ transform: `translateY(${scrollY * 0.05}px)`, opacity: Math.max(0, 1 - scrollY * 0.001) }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full mb-8 animate-fade-in-up">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                PT Alfa Omega / PT. NEW ALFA OMEGA UTAMA
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up stagger-1">
              Bumbu & Saus{" "}
              <span className="text-primary">Premium</span>{" "}
              <br className="hidden sm:block" />
              untuk Dapur Bisnis Anda
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-in-up stagger-2">
              ALCHO membantu rasa konsisten—dari cloud kitchen sampai restoran besar.
              Produk bumbu dan saus berkualitas tinggi untuk kebutuhan kuliner profesional.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-12 animate-fade-in-up stagger-3">
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
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 animate-fade-in-up stagger-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50"
                >
                  <feature.icon className="h-5 w-5 text-accent" />
                  <span className="font-medium text-foreground/80">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Section with parallax */}
          <div 
            className="relative animate-fade-in-up stagger-2 hidden lg:block"
            style={{ transform: `translateY(${scrollY * -0.08}px)` }}
          >
            <div className="relative">
              {/* Decorative elements with enhanced parallax */}
              <div 
                className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
                style={{ transform: `translate(${scrollY * -0.12}px, ${scrollY * -0.15}px)` }}
              />
              <div 
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
                style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.12}px)` }}
              />
              
              {/* Main product image display with slide sync */}
              <div 
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/20 transition-transform duration-300 aspect-square"
                style={{ transform: `scale(${1 + scrollY * 0.0001})` }}
              >
                {slides.map((slide, index) => (
                  <img
                    key={index}
                    src={slide.image}
                    alt={slide.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ))}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>

              {/* Floating badge with parallax */}
              <div 
                className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border border-border/50 animate-float"
                style={{ transform: `translateY(${scrollY * -0.2}px)` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Halal & BPOM</p>
                    <p className="text-sm text-muted-foreground">Tersertifikasi</p>
                  </div>
                </div>
              </div>

              {/* Floating badge right with parallax */}
              <div 
                className="absolute -top-6 -right-6 bg-card/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border border-border/50 animate-float"
                style={{ 
                  animationDelay: "1s",
                  transform: `translateY(${scrollY * -0.25}px)`
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">500+</p>
                    <p className="text-sm text-muted-foreground">Partner Bisnis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? "w-8 h-2 bg-primary" 
                : "w-2 h-2 bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator with fade out on scroll */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollY * 0.005) }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
