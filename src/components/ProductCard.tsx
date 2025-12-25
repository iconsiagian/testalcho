import { Package, BadgeCheck, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product, formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  index: number;
}

const ProductCard = ({ product, onClick, index }: ProductCardProps) => {
  const mainVariant = product.varian[0];
  const isApproved = product.izin === "P-IRT";

  return (
    <Card
      onClick={onClick}
      className={`group relative overflow-hidden cursor-pointer bg-card border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              {product.kode}
            </span>
          </div>
          <Badge
            variant={isApproved ? "default" : "secondary"}
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

        {/* Product Name */}
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {product.nama}
        </h3>

        {/* Category */}
        <p className="text-sm text-muted-foreground mb-4">{product.kategori}</p>

        {/* Main Variant & Price */}
        <div className="flex items-end justify-between pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{mainVariant.pack}</p>
            <p className="text-lg font-bold text-primary">
              {formatPrice(mainVariant.hargaSatuan)}
            </p>
          </div>
          <span className="text-xs text-muted-foreground">
            +{product.varian.length - 1} varian lain
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
