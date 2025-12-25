import { useState } from "react";
import { ArrowLeft, MessageCircle, BadgeCheck, Clock, Tag, Boxes, ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Product, ProductVariant, formatPrice, generateWhatsAppLink } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailView = ({ product, onBack }: ProductDetailViewProps) => {
  const { addItem, isInCart } = useCart();
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.varian[0]);
  const [quantity, setQuantity] = useState(1);

  const isApproved = product.izin === "P-IRT";
  const lowestPrice = Math.min(...product.varian.map((v) => v.hargaSatuan));
  const highestPrice = Math.max(...product.varian.map((v) => v.hargaSatuan));
  const inCart = isInCart(product.kode, selectedVariant.pack);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    toast({
      title: "Ditambahkan ke keranjang",
      description: `${product.nama} (${selectedVariant.pack}) x${quantity}`,
    });
    setQuantity(1);
  };

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
          {/* Product Header with Image */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="aspect-square bg-secondary/30">
                <img
                  src={product.gambar}
                  alt={product.nama}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col justify-center">
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
                <div className="flex items-baseline gap-2 mb-4">
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

                {/* Quick Order Button - Mobile */}
                <Button
                  asChild
                  size="lg"
                  className="md:hidden bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <a href={generateWhatsAppLink(product)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Pesan via WhatsApp
                  </a>
                </Button>
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
                    <TableHead className="w-[120px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.varian.map((v, index) => {
                    const unitsPerCarton = Math.round(v.hargaKarton / v.hargaSatuan);
                    const pricePerUnitCarton = v.hargaKarton / unitsPerCarton;
                    const savings = v.hargaSatuan - pricePerUnitCarton;
                    const savingsPercent = Math.round((savings / v.hargaSatuan) * 100);
                    const variantInCart = isInCart(product.kode, v.pack);

                    return (
                      <TableRow 
                        key={index} 
                        className={`group cursor-pointer hover:bg-secondary/30 ${
                          selectedVariant.pack === v.pack ? "bg-primary/5" : ""
                        }`}
                        onClick={() => setSelectedVariant(v)}
                      >
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
                            size="sm"
                            variant={variantInCart ? "default" : "outline"}
                            className={`gap-1 ${variantInCart ? "bg-green-600 hover:bg-green-700" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem(product, v);
                              toast({
                                title: "Ditambahkan ke keranjang",
                                description: `${product.nama} (${v.pack})`,
                              });
                            }}
                          >
                            {variantInCart ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <ShoppingCart className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">
                              {variantInCart ? "Tambah" : "Keranjang"}
                            </span>
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
                Tambah ke Keranjang
              </h3>

              {/* Product Thumbnail */}
              <div className="aspect-square rounded-lg overflow-hidden bg-secondary/30 mb-4">
                <img
                  src={product.gambar}
                  alt={product.nama}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Variant Selection */}
              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-2 block">Pilih Varian</label>
                <div className="grid grid-cols-1 gap-2">
                  {product.varian.map((v) => (
                    <button
                      key={v.pack}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedVariant.pack === v.pack
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{v.pack}</span>
                        <span className="font-semibold text-primary">{formatPrice(v.hargaSatuan)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-2 block">Jumlah</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="flex-1 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center py-3 border-t border-border mb-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(selectedVariant.hargaSatuan * quantity)}
                </span>
              </div>

              <div className="space-y-2">
                <Button
                  size="lg"
                  className={`w-full gap-2 ${inCart ? "bg-green-600 hover:bg-green-700" : ""}`}
                  onClick={handleAddToCart}
                >
                  {inCart ? (
                    <>
                      <Check className="h-5 w-5" />
                      Tambah Lagi
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Tambah ke Keranjang
                    </>
                  )}
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  <a href={generateWhatsAppLink(product)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Pesan Langsung
                  </a>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-3">
                Klik keranjang untuk melihat semua pesanan Anda
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
