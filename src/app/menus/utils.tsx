import { useCart } from '@/app/context/cart';
import { CartItem } from '../interfaces/cart';

export const useCartActions = () => {
  const { addToCart } = useCart();
  const { cart } = useCart();

  const handleAddToCart = (product: CartItem) => {
    addToCart(product);
    console.log(cart);
  };

  return { handleAddToCart };
};