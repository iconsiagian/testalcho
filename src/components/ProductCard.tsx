import { useState } from "react";
import { BadgeCheck, Clock, ShoppingCart, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  index: number;
}

const ProductCard = ({ product, onClick, index }: ProductCardProps) => {
  const mainVariant = product.varian[0];
  const isApproved = product.izin === "P-IRT";
  const { addItem, isInCart } = useCart();
  const { toast } = useToast();
  const [justAdded, setJustAdded] = useState(false);

  const inCart = isInCart(product.kode, mainVariant.pack);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, mainVariant);
    setJustAdded(true);
    
    toast({
      title: "Ditambahkan ke keranjang",
      description: `${product.nama} (${mainVariant.pack})`,
    });

    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <Card
      onClick={onClick}
      className={`group relative overflow-hidden cursor-pointer bg-card border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity z-10" />

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.gambar}
          alt={product.nama}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant={isApproved ? "default" : "secondary"}
            className={`text-xs shadow-sm ${
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

        {/* Quick Add Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            className={`shadow-lg gap-1.5 ${
              justAdded || inCart
                ? "bg-green-600 hover:bg-green-700"
                : "bg-primary hover:bg-primary/90"
            }`}
            onClick={handleAddToCart}
          >
            {justAdded || inCart ? (
              <>
                <Check className="h-4 w-4" />
                {justAdded ? "Ditambahkan" : "Di Keranjang"}
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Tambah
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Product Code */}
        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
          {product.kode}
        </span>

        {/* Product Name */}
        <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {product.nama}
        </h3>

        {/* Category */}
        <p className="text-sm text-muted-foreground mb-3">{product.kategori}</p>

        {/* Main Variant & Price */}
        <div className="flex items-end justify-between pt-3 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">{mainVariant.pack}</p>
            <p className="text-lg font-bold text-primary">
              {formatPrice(mainVariant.hargaSatuan)}
            </p>
          </div>
          {product.varian.length > 1 && (
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
              +{product.varian.length - 1} varian
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
