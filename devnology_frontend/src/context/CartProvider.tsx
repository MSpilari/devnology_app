"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../types/Product.type";
import { CartContextType } from "../types/CartContext.type";

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setProductsInCart((prev) => {
      const existingProductIndex = prev.findIndex(
        (item) => item.id == product.id
      );

      if (existingProductIndex !== -1 && product.quantidade) {
        const updatedCart = [...prev];

        const existingProduct = { ...updatedCart[existingProductIndex] };
        existingProduct.quantidade! += product.quantidade;

        updatedCart[existingProductIndex] = existingProduct;

        return updatedCart;
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (productId: string) => {
    setProductsInCart((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  const clearCart = () => {
    setProductsInCart([]);
  };

  return (
    <CartContext.Provider
      value={{ productsInCart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
