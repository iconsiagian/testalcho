import { useState } from "react";
import { X, MessageCircle, BadgeCheck, Clock, ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product, ProductVariant, formatPrice, generateWhatsAppLink } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { addItem, isInCart } = useCart();
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isApproved = product.izin === "P-IRT";
  const currentVariant = selectedVariant || product.varian[0];
  const inCart = isInCart(product.kode, currentVariant.pack);

  const handleAddToCart = () => {
    addItem(product, currentVariant, quantity);
    toast({
      title: "Ditambahkan ke keranjang",
      description: `${product.nama} (${currentVariant.pack}) x${quantity}`,
    });
    setQuantity(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary shrink-0">
              <img
                src={product.gambar}
                alt={product.nama}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <DialogTitle className="font-display text-2xl mb-2">
                {product.nama}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                  {product.kode}
                </span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{product.kategori}</span>
                <Badge
                  className={`text-xs ${
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
            </div>
          </div>
        </DialogHeader>

        {/* Variant Selection */}
        <div className="mt-4">
          <h4 className="font-semibold text-foreground mb-3">Pilih Varian</h4>
          <div className="flex flex-wrap gap-2">
            {product.varian.map((variant) => (
              <button
                key={variant.pack}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  currentVariant.pack === variant.pack
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {variant.pack}
                <span className="block text-xs mt-0.5 font-normal">
                  {formatPrice(variant.hargaSatuan)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="mt-6 p-4 bg-secondary/30 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Harga satuan</p>
              <p className="text-2xl font-bold text-primary">
                {formatPrice(currentVariant.hargaSatuan)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Jumlah:</span>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 py-3 border-t border-border">
            <span className="font-medium">Subtotal</span>
            <span className="text-xl font-bold text-primary">
              {formatPrice(currentVariant.hargaSatuan * quantity)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              size="lg"
              onClick={handleAddToCart}
              className={`gap-2 ${inCart ? "bg-green-600 hover:bg-green-700" : ""}`}
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
              className="gap-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              <a href={generateWhatsAppLink(product)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Pesan Langsung
              </a>
            </Button>
          </div>
        </div>

        {/* Variants Table */}
        <div className="mt-4">
          <h4 className="font-semibold text-foreground mb-3">Semua Varian</h4>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead className="font-semibold">Kemasan</TableHead>
                  <TableHead className="font-semibold text-right">Harga Satuan</TableHead>
                  <TableHead className="font-semibold text-right">Harga Karton</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.varian.map((v, index) => (
                  <TableRow 
                    key={index}
                    className={`cursor-pointer hover:bg-secondary/30 ${
                      currentVariant.pack === v.pack ? "bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedVariant(v)}
                  >
                    <TableCell className="font-medium">{v.pack}</TableCell>
                    <TableCell className="text-right text-primary font-semibold">
                      {formatPrice(v.hargaSatuan)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatPrice(v.hargaKarton)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
