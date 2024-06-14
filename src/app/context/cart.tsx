"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CartProduct } from '../interfaces/cart';
import { CartContextType } from '../interfaces/cartcontexttype';
import { Article } from '../interfaces/article';
import { Menu } from '../interfaces/menu';

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => { },
  removeFromCart: () => {}
});

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const addToCart = (product: CartProduct) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product: CartProduct) => {
    if ('name_article' in product) {
      setCart(cart.filter((cartItem) => (cartItem as Article).id_article !== product.id_article));
    } else if ('name_menu' in product) {
      setCart(cart.filter((cartItem) => (cartItem as Menu).id_menu !== product.id_menu));
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider }