import { CartProduct } from "./cart";

export interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (product: CartProduct) => void;
}