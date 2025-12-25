import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product, ProductVariant } from "@/data/products";

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (productCode: string, variantPack: string) => void;
  updateQuantity: (productCode: string, variantPack: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  isInCart: (productCode: string, variantPack: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, variant: ProductVariant, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.kode === product.kode && item.variant.pack === variant.pack
      );

      if (existingIndex > -1) {
        // Update quantity if item exists
        const newItems = [...prevItems];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
        return newItems;
      }

      // Add new item
      return [...prevItems, { product, variant, quantity }];
    });
  }, []);

  const removeItem = useCallback((productCode: string, variantPack: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.kode === productCode && item.variant.pack === variantPack)
      )
    );
  }, []);

  const updateQuantity = useCallback((productCode: string, variantPack: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productCode, variantPack);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.kode === productCode && item.variant.pack === variantPack
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getItemCount = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.variant.hargaSatuan * item.quantity, 0);
  }, [items]);

  const isInCart = useCallback((productCode: string, variantPack: string) => {
    return items.some(
      (item) => item.product.kode === productCode && item.variant.pack === variantPack
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getTotal,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
