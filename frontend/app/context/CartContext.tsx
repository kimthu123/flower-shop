'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createCart, addToCart, getCart, updateCartLine, removeCartLine } from '@/lib/shopify';

type CartContextType = {
  cart: any;
  loading: boolean;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      getCart(cartId).then((c) => {
        if (c) setCart(c);
        else localStorage.removeItem('cartId');
      });
    }
  }, []);

  async function addItem(merchandiseId: string, quantity: number = 1) {
    setLoading(true);
    try {
      const cartId = localStorage.getItem('cartId');
      let updatedCart;
      if (cartId) {
        updatedCart = await addToCart(cartId, merchandiseId, quantity);
      } else {
        updatedCart = await createCart(merchandiseId, quantity);
        if (updatedCart?.id) {
          localStorage.setItem('cartId', updatedCart.id);
        }
      }
      if (updatedCart?.id) {
        const fullCart = await getCart(updatedCart.id);
        setCart(fullCart);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateItem(lineId: string, quantity: number) {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;
    setLoading(true);
    try {
      await updateCartLine(cartId, lineId, quantity);
      const fullCart = await getCart(cartId);
      setCart(fullCart);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(lineId: string) {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;
    setLoading(true);
    try {
      await removeCartLine(cartId, lineId);
      const fullCart = await getCart(cartId);
      setCart(fullCart);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
