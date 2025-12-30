import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const comparisonData = [
  {
    aspect: "Konsistensi Rasa",
    alcho: "Rasa terjamin sama di setiap batch produksi",
    regular: "Bervariasi tergantung supplier",
    alchoCheck: true,
    regularCheck: false,
  },
  {
    aspect: "Kontrol Food Cost",
    alcho: "Takaran presisi, mudah dihitung per porsi",
    regular: "Sulit diprediksi karena kualitas tidak stabil",
    alchoCheck: true,
    regularCheck: false,
  },
  {
    aspect: "Standar Kualitas",
    alcho: "Proses produksi terstandarisasi dengan QC ketat",
    regular: "Tidak ada jaminan standar produksi",
    alchoCheck: true,
    regularCheck: false,
  },
  {
    aspect: "Sertifikasi Halal & BPOM",
    alcho: "Tersertifikasi resmi, aman untuk bisnis",
    regular: "Tidak selalu memiliki sertifikasi lengkap",
    alchoCheck: true,
    regularCheck: false,
  },
  {
    aspect: "Skala Bisnis",
    alcho: "Siap untuk cloud kitchen, restoran, hingga katering besar",
    regular: "Terbatas untuk skala kecil",
    alchoCheck: true,
    regularCheck: false,
  },
  {
    aspect: "Efisiensi Operasional",
    alcho: "Hemat waktu persiapan, tinggal pakai",
    regular: "Butuh waktu lebih untuk sortir & persiapan",
    alchoCheck: true,
    regularCheck: false,
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mengapa Memilih ALCHO?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lihat perbedaan nyata antara bumbu & saus premium ALCHO dengan produk biasa di pasaran.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-border bg-card shadow-soft">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10 hover:bg-primary/10">
                  <TableHead className="w-[200px] font-serif text-foreground font-semibold">
                    Aspek
                  </TableHead>
                  <TableHead className="font-serif text-primary font-semibold">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      ALCHO
                    </span>
                  </TableHead>
                  <TableHead className="font-serif text-muted-foreground font-semibold">
                    Produk Biasa
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((item, index) => (
                  <TableRow 
                    key={index}
                    className="hover:bg-secondary/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      {item.aspect}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground">{item.alcho}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                          <X className="w-3 h-3 text-muted-foreground" />
                        </div>
                        <span className="text-muted-foreground">{item.regular}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Trust Closing */}
        <div className="text-center mt-10">
          <p className="text-foreground font-medium">
            Dipercaya oleh{" "}
            <span className="text-primary font-semibold">100+ bisnis F&B</span>{" "}
            di seluruh Indonesia untuk menjaga kualitas dan efisiensi dapur mereka.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
