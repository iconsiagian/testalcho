import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  companyType: "restaurant" | "cloud-kitchen" | "catering";
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Chef Andi Wijaya",
    role: "Head Chef",
    company: "Warung Nusantara",
    companyType: "restaurant",
    content: "Sejak menggunakan bumbu ALCHO, konsistensi rasa masakan kami terjaga sempurna. Pelanggan selalu puas dengan cita rasa yang sama setiap kunjungan.",
    rating: 5,
    avatar: "AW"
  },
  {
    id: 2,
    name: "Dewi Sartika",
    role: "Owner",
    company: "Dapur Mama Kitchen",
    companyType: "cloud-kitchen",
    content: "Sebagai cloud kitchen dengan 50+ pesanan per hari, kami butuh bumbu yang praktis dan berkualitas. ALCHO menjawab semua kebutuhan kami!",
    rating: 5,
    avatar: "DS"
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Operations Manager",
    company: "Sate Express",
    companyType: "restaurant",
    content: "Kualitas saus ALCHO sangat premium. Pelanggan kami sering bertanya resep rahasia kami, padahal rahasianya adalah produk ALCHO!",
    rating: 5,
    avatar: "BS"
  },
  {
    id: 4,
    name: "Rina Kartika",
    role: "Founder",
    company: "CloudEats Indonesia",
    companyType: "cloud-kitchen",
    content: "Dengan 5 brand virtual kitchen yang kami kelola, ALCHO membantu menjaga standar rasa di semua outlet. Sangat direkomendasikan!",
    rating: 5,
    avatar: "RK"
  },
  {
    id: 5,
    name: "Herman Susanto",
    role: "Executive Chef",
    company: "Catering Berkah",
    companyType: "catering",
    content: "Untuk event besar dengan ribuan porsi, kami percayakan pada bumbu ALCHO. Hasilnya selalu memuaskan klien kami.",
    rating: 5,
    avatar: "HS"
  },
  {
    id: 6,
    name: "Lisa Permata",
    role: "Co-Founder",
    company: "Ayam Geprek Sultan",
    companyType: "restaurant",
    content: "Sambal ALCHO adalah game changer untuk bisnis kami. Pedasnya pas, aromanya khas, dan pelanggan ketagihan!",
    rating: 5,
    avatar: "LP"
  }
];

const companyTypeLabels = {
  restaurant: "Restoran",
  "cloud-kitchen": "Cloud Kitchen",
  catering: "Katering"
};

const companyTypeColors = {
  restaurant: "bg-primary/10 text-primary",
  "cloud-kitchen": "bg-accent/10 text-accent",
  catering: "bg-secondary text-secondary-foreground"
};

const TestimonialsSection = () => {
  return (
    <section id="testimoni" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Testimoni
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Dipercaya oleh Ratusan <span className="text-gradient">Bisnis Kuliner</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dengarkan langsung dari para pelaku bisnis F&B yang telah merasakan kualitas produk ALCHO
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass-card p-6 rounded-2xl hover-lift animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-primary/30 group-hover:text-primary/50 transition-colors" />
              </div>

              {/* Content */}
              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Company Badge */}
              <div className="mt-4 flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${companyTypeColors[testimonial.companyType]}`}>
                  {companyTypeLabels[testimonial.companyType]}
                </span>
                <span className="text-sm text-muted-foreground">
                  {testimonial.company}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "600ms" }}>
          {[
            { value: "500+", label: "Partner Bisnis" },
            { value: "98%", label: "Tingkat Kepuasan" },
            { value: "50+", label: "Kota di Indonesia" },
            { value: "5 Tahun", label: "Pengalaman" }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-background/50 border border-border/50"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
