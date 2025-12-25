import { X, MessageCircle, Package, BadgeCheck, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product, formatPrice, generateWhatsAppLink } from "@/data/products";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  if (!product) return null;

  const isApproved = product.izin === "P-IRT";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0">
              <Package className="h-7 w-7 text-primary" />
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

        {/* Variants Table */}
        <div className="mt-6">
          <h4 className="font-semibold text-foreground mb-3">Varian Produk</h4>
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
                  <TableRow key={index}>
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

        {/* Order Button */}
        <div className="mt-6 pt-4 border-t border-border">
          <Button
            asChild
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <a href={generateWhatsAppLink(product)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Pesan Produk Ini via WhatsApp
            </a>
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Klik untuk menghubungi admin dengan detail produk yang sudah terisi otomatis
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
