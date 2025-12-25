import { ArrowLeft, MessageCircle, Package, BadgeCheck, Clock, Tag, Boxes, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Product, formatPrice, generateWhatsAppLink } from "@/data/products";

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailView = ({ product, onBack }: ProductDetailViewProps) => {
  const isApproved = product.izin === "P-IRT";
  const lowestPrice = Math.min(...product.varian.map((v) => v.hargaSatuan));
  const highestPrice = Math.max(...product.varian.map((v) => v.hargaSatuan));

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2 hover:bg-secondary"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Katalog
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Header */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Product Icon */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center shrink-0">
                <Package className="h-12 w-12 md:h-16 md:w-16 text-primary" />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-sm font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {product.kode}
                  </span>
                  <Badge
                    className={`${
                      isApproved
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    {isApproved ? (
                      <BadgeCheck className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {product.izin}
                  </Badge>
                </div>

                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {product.nama}
                </h1>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Tag className="h-4 w-4" />
                  <span>{product.kategori}</span>
                </div>

                {/* Price Range */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    {formatPrice(lowestPrice)}
                  </span>
                  {lowestPrice !== highestPrice && (
                    <>
                      <span className="text-muted-foreground">—</span>
                      <span className="text-xl text-muted-foreground">
                        {formatPrice(highestPrice)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Variants Table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <Boxes className="h-5 w-5 text-primary" />
                Varian Produk ({product.varian.length} pilihan)
              </h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/30">
                    <TableHead className="font-semibold">Kemasan</TableHead>
                    <TableHead className="font-semibold text-right">Harga Satuan</TableHead>
                    <TableHead className="font-semibold text-right">Harga Karton</TableHead>
                    <TableHead className="font-semibold text-right">Hemat/Unit</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.varian.map((v, index) => {
                    // Calculate savings per unit when buying carton
                    const unitsPerCarton = Math.round(v.hargaKarton / v.hargaSatuan);
                    const pricePerUnitCarton = v.hargaKarton / unitsPerCarton;
                    const savings = v.hargaSatuan - pricePerUnitCarton;
                    const savingsPercent = Math.round((savings / v.hargaSatuan) * 100);

                    return (
                      <TableRow key={index} className="group">
                        <TableCell>
                          <div className="font-medium">{v.pack}</div>
                          <div className="text-xs text-muted-foreground">
                            ~{unitsPerCarton} unit/karton
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-lg font-semibold text-primary">
                            {formatPrice(v.hargaSatuan)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-medium">{formatPrice(v.hargaKarton)}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          {savingsPercent > 0 && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              Hemat {savingsPercent}%
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <a
                              href={generateWhatsAppLink(product)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Pesan
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Product Description */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              Informasi Produk
            </h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                <strong className="text-foreground">{product.nama}</strong> adalah produk berkualitas premium dari ALCHO
                yang diformulasi khusus untuk kebutuhan bisnis kuliner profesional. Cocok digunakan untuk
                cloud kitchen, restoran, katering, dan usaha F&B lainnya.
              </p>
              <ul className="mt-4 space-y-2">
                <li>✓ Rasa konsisten dari batch ke batch</li>
                <li>✓ Bahan berkualitas tinggi</li>
                <li>✓ Kemasan praktis untuk penggunaan profesional</li>
                <li>✓ Tersedia dalam berbagai ukuran</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar - Order Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="p-6 bg-card border-border">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Pesan Sekarang
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Produk</span>
                  <span className="font-medium">{product.nama}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Kode</span>
                  <span className="font-mono">{product.kode}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Varian</span>
                  <span>{product.varian.length} pilihan</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mulai dari</span>
                  <span className="font-semibold text-primary">{formatPrice(lowestPrice)}</span>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 mb-3"
              >
                <a href={generateWhatsAppLink(product)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Pesan via WhatsApp
                </a>
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Klik untuk chat dengan admin. Detail produk sudah terisi otomatis.
              </p>
            </Card>

            {/* Additional Info */}
            <div className="mt-4 p-4 bg-secondary/50 rounded-xl">
              <p className="text-xs text-muted-foreground">
                <strong>Catatan:</strong> Harga dapat berubah sewaktu-waktu. Konfirmasi harga terbaru dengan admin sebelum melakukan pemesanan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
