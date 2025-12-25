import { Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { products, formatPrice, generatePricelistCSV } from "@/data/products";

const PricelistSection = () => {
  const handleDownload = () => {
    const csv = generatePricelistCSV();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `ALCHO_Pricelist_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="pricelist" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Daftar <span className="text-primary">Harga</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lihat daftar harga lengkap produk ALCHO. Unduh file untuk referensi Anda.
          </p>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-8">
          <Button onClick={handleDownload} size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Unduh Pricelist (CSV)
          </Button>
        </div>

        {/* Price Table */}
        <div className="rounded-xl border border-border overflow-hidden bg-card shadow-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead className="font-semibold">Kode</TableHead>
                  <TableHead className="font-semibold">Nama Produk</TableHead>
                  <TableHead className="font-semibold">Kategori</TableHead>
                  <TableHead className="font-semibold">Kemasan</TableHead>
                  <TableHead className="font-semibold text-right">Harga Satuan</TableHead>
                  <TableHead className="font-semibold text-right">Harga Karton</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) =>
                  product.varian.map((variant, vIndex) => (
                    <TableRow key={`${product.kode}-${vIndex}`}>
                      {vIndex === 0 ? (
                        <>
                          <TableCell
                            rowSpan={product.varian.length}
                            className="font-mono text-sm text-muted-foreground align-top"
                          >
                            {product.kode}
                          </TableCell>
                          <TableCell
                            rowSpan={product.varian.length}
                            className="font-medium align-top"
                          >
                            {product.nama}
                          </TableCell>
                          <TableCell
                            rowSpan={product.varian.length}
                            className="text-muted-foreground align-top"
                          >
                            {product.kategori}
                          </TableCell>
                        </>
                      ) : null}
                      <TableCell>{variant.pack}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {formatPrice(variant.hargaSatuan)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatPrice(variant.hargaKarton)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Note */}
        <Alert className="mt-6 max-w-2xl mx-auto bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-300">
            <strong>Catatan:</strong> Harga dapat berubah sewaktu-waktu. Hubungi admin untuk konfirmasi harga terbaru sebelum melakukan pemesanan.
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
};

export default PricelistSection;
