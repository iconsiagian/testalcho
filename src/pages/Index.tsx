import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import PricelistSection from "@/components/PricelistSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference or stored preference
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (stored === "dark" || (!stored && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  };

  return (
    <>
      <Helmet>
        <title>ALCHO - Bumbu & Saus Premium untuk Dapur Bisnis Anda</title>
        <meta
          name="description"
          content="ALCHO adalah produsen bumbu dan saus premium untuk industri F&B. Produk berkualitas tinggi dengan rasa konsisten untuk cloud kitchen, restoran, dan katering profesional."
        />
        <meta
          name="keywords"
          content="bumbu, saus, seasoning, sambal, F&B, restoran, cloud kitchen, katering, ALCHO, PT Alfa Omega"
        />
        <meta property="og:title" content="ALCHO - Bumbu & Saus Premium" />
        <meta
          property="og:description"
          content="Bumbu & Saus Premium untuk Dapur Bisnis Anda. Kualitas terjamin, rasa konsisten."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="id_ID" />
        <link rel="canonical" href="https://alcho.id" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar isDark={isDark} toggleDark={toggleDark} />
        
        <main>
          <Hero />
          <ProductSection />
          <PricelistSection />
          <AboutSection />
          <ContactSection />
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
