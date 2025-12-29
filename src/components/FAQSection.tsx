import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "Apa saja produk yang ditawarkan ALCHO?",
    answer: "ALCHO menyediakan berbagai bumbu dan saus premium untuk industri F&B, termasuk bumbu masak (rendang, gulai, soto, nasi goreng), aneka sambal (pedas, matah, bajak), dan berbagai saus (tomat, BBQ, teriyaki, tiram, cabai manis). Semua produk kami diproduksi dengan standar kualitas tinggi untuk kebutuhan bisnis kuliner Anda."
  },
  {
    id: "2",
    question: "Berapa minimum order untuk pembelian produk ALCHO?",
    answer: "Minimum order kami adalah 10 pcs per varian produk. Kami juga menyediakan paket trial untuk Anda yang ingin mencoba produk kami terlebih dahulu sebelum melakukan pemesanan dalam jumlah besar."
  },
  {
    id: "3",
    question: "Apakah produk ALCHO sudah memiliki sertifikasi halal?",
    answer: "Ya, semua produk ALCHO telah tersertifikasi Halal MUI dan terdaftar di BPOM. Kami berkomitmen untuk menyediakan produk yang aman dan berkualitas untuk semua konsumen."
  },
  {
    id: "4",
    question: "Bagaimana cara memesan produk ALCHO?",
    answer: "Anda dapat memesan produk ALCHO dengan mudah melalui WhatsApp kami. Cukup klik tombol 'Order via WhatsApp' atau hubungi nomor +62 812-3456-7890. Tim kami akan membantu Anda memproses pesanan dengan cepat."
  },
  {
    id: "5",
    question: "Berapa lama waktu pengiriman pesanan?",
    answer: "Untuk area Jabodetabek, pengiriman membutuhkan waktu 1-2 hari kerja. Untuk luar Jabodetabek, estimasi pengiriman adalah 3-5 hari kerja tergantung lokasi. Kami bekerja sama dengan berbagai ekspedisi terpercaya untuk memastikan produk sampai dengan aman."
  },
  {
    id: "6",
    question: "Apakah tersedia harga khusus untuk pembelian dalam jumlah besar?",
    answer: "Ya, kami menyediakan harga khusus dan diskon untuk pembelian dalam jumlah besar (wholesale). Silakan hubungi tim sales kami untuk mendapatkan penawaran harga terbaik sesuai kebutuhan bisnis Anda."
  },
  {
    id: "7",
    question: "Berapa lama masa simpan produk ALCHO?",
    answer: "Masa simpan produk ALCHO bervariasi tergantung jenis produk, umumnya 6-12 bulan sejak tanggal produksi jika disimpan dengan benar. Pastikan produk disimpan di tempat sejuk dan kering, serta tutup rapat setelah dibuka."
  },
  {
    id: "8",
    question: "Apakah ALCHO menerima pembuatan produk custom (private label)?",
    answer: "Ya, kami menerima pembuatan produk custom atau private label untuk bisnis Anda. Kami dapat membantu mengembangkan resep khusus sesuai kebutuhan Anda dengan label merek Anda sendiri. Hubungi tim kami untuk diskusi lebih lanjut."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Pertanyaan yang <span className="text-gradient">Sering Ditanyakan</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar produk dan layanan ALCHO
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="glass-card rounded-xl px-6 border-none animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 gap-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-foreground">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <p className="text-muted-foreground mb-4">
            Masih punya pertanyaan lain?
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20ALCHO,%20saya%20ingin%20bertanya%20tentang%20produk%20Anda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
