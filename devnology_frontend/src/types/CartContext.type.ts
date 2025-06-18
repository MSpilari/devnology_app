import { Product } from "./Product.type";

type CartContextType = {
  productsInCart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

export type { CartContextType };
