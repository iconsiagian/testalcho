import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generateWhatsAppLink } from "@/data/products";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated form submission
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih, kami akan segera menghubungi Anda.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "0812 4918 6623",
      href: generateWhatsAppLink(),
      color: "text-green-600",
    },
    {
      icon: Phone,
      label: "Telepon",
      value: "031 866 8858",
      href: "tel:0318668858",
      color: "text-primary",
    },
    {
      icon: MapPin,
      label: "Alamat",
      value: "Perm. Pondok Chandra Indah, Jl. Nanas / VII 658 Waru – Sidoarjo",
      href: "https://maps.google.com/?q=Perm.+Pondok+Chandra+Indah,+Jl.+Nanas+VII+658+Waru+Sidoarjo",
      color: "text-accent",
    },
  ];

  return (
    <section id="kontak" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hubungi <span className="text-primary">Kami</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ada pertanyaan atau ingin melakukan pemesanan? Jangan ragu untuk menghubungi kami.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 group"
                >
                  <div className={`p-3 rounded-lg bg-secondary ${contact.color}`}>
                    <contact.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{contact.label}</p>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Map Embed */}
            <div className="rounded-xl overflow-hidden border border-border h-64 lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5!2d112.75!3d-7.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjEnMDAuMCJTIDExMsKwNDUnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi ALCHO"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Kirim Pesan
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@contoh.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Pesan</Label>
                <Textarea
                  id="message"
                  placeholder="Tulis pesan atau pertanyaan Anda..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full gap-2">
                <Send className="h-4 w-4" />
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
