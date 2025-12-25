import { Target, Shield, Users, Leaf } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Konsistensi Rasa",
      description: "Produk kami diformulasi untuk menghasilkan rasa yang konsisten setiap saat.",
    },
    {
      icon: Shield,
      title: "Kualitas Terjamin",
      description: "Bahan baku pilihan dan proses produksi yang terstandarisasi.",
    },
    {
      icon: Users,
      title: "Partner Bisnis F&B",
      description: "Dipercaya oleh cloud kitchen, restoran, dan katering profesional.",
    },
    {
      icon: Leaf,
      title: "Bahan Berkualitas",
      description: "Menggunakan bahan-bahan segar dan berkualitas tinggi.",
    },
  ];

  return (
    <section id="tentang" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Tentang <span className="text-primary">ALCHO</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">ALCHO</strong> adalah merek bumbu dan saus premium yang diproduksi oleh{" "}
                <strong className="text-foreground">PT Alfa Omega / PT. NEW ALFA OMEGA UTAMA</strong>, perusahaan yang berkomitmen menghadirkan produk kuliner berkualitas tinggi untuk industri Food & Beverage Indonesia.
              </p>
              <p>
                Dengan pengalaman bertahun-tahun dalam industri makanan, kami memahami pentingnya konsistensi rasa bagi kesuksesan bisnis kuliner Anda. Setiap produk ALCHO diformulasi dengan cermat untuk memastikan hasil yang sama lezatnya, dari batch pertama hingga seterusnya.
              </p>
              <p>
                Dari cloud kitchen kecil hingga restoran besar, ALCHO hadir sebagai partner terpercaya yang membantu menghadirkan cita rasa otentik Indonesia dalam setiap hidangan.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
