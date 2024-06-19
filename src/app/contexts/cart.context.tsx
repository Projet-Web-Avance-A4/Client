"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { CartProduct } from '../interfaces/cart';
import { CartContextType } from '../interfaces/cartcontexttype';

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
  clearCart: () => { }
});

export { CartContext };

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [cart, setCart] = useState<CartProduct[]>(() => {
    if (typeof localStorage !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const addToCart = (product: CartProduct) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product: CartProduct) => {
    if ('id_dish' in product) {
      setCart(cart.filter((p: CartProduct) => !(('id_dish' in p) && p.id_menu === product.id_menu)));
    } else if ('id_article' in product) {
      setCart(cart.filter((p: CartProduct) => !(('id_article' in p) && p.id_article === product.id_article)));
    }
  }

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };