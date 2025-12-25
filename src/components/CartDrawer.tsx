import { ShoppingCart, X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, clearCart, getItemCount, getTotal } = useCart();
  const itemCount = getItemCount();
  const total = getTotal();

  const generateWhatsAppOrder = () => {
    if (items.length === 0) return "";

    const phone = "6281249186623";
    let message = "Halo Admin ALCHO, saya ingin memesan:\n\n";

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.nama}*\n`;
      message += `   Kode: ${item.product.kode}\n`;
      message += `   Varian: ${item.variant.pack}\n`;
      message += `   Jumlah: ${item.quantity} pcs\n`;
      message += `   Subtotal: ${formatPrice(item.variant.hargaSatuan * item.quantity)}\n\n`;
    });

    message += `---\n*Total: ${formatPrice(total)}*\n\n`;
    message += "Mohon konfirmasi ketersediaan dan ongkos kirim. Terima kasih!";

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-24 right-6 z-40 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-elevated"
        >
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-display">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Keranjang Belanja
            {itemCount > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({itemCount} item)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">Keranjang kosong</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Tambahkan produk ke keranjang untuk melanjutkan pemesanan
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.kode}-${item.variant.pack}`}
                    className="flex gap-3 p-3 bg-secondary/30 rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-background shrink-0">
                      <img
                        src={item.product.gambar}
                        alt={item.product.nama}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm line-clamp-1">
                        {item.product.nama}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.variant.pack}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {formatPrice(item.variant.hargaSatuan)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.product.kode, item.variant.pack)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.product.kode, item.variant.pack, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.product.kode, item.variant.pack, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="pt-4 space-y-4">
              <Separator />

              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({itemCount} item)</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <a href={generateWhatsAppOrder()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Pesan via WhatsApp
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 text-destructive hover:text-destructive"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4" />
                  Kosongkan Keranjang
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                *Harga belum termasuk ongkos kirim. Konfirmasi dengan admin.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
