'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createCart, addToCart, getCart, updateCartLine, removeCartLine } from '@/lib/shopify';

type CartContextType = {
  cart: any;
  loading: boolean;
  isLoaded: boolean;
  error: string | null;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      setIsLoaded(true);
      return;
    }
    getCart(cartId)
      .then((c) => {
        if (c) {
          setCart(c);
        } else {
          localStorage.removeItem('cartId');
        }
      })
      .catch(() => {
        setError('Could not load your cart. Please try again.');
        localStorage.removeItem('cartId');
      })
      .finally(() => setIsLoaded(true));
  }, []);

  async function addItem(merchandiseId: string, quantity: number = 1) {
    setLoading(true);
    setError(null);
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
      } else {
        throw new Error('No cart returned');
      }
    } catch {
      setError('Could not add item to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function updateItem(lineId: string, quantity: number) {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;
    setLoading(true);
    setError(null);
    try {
      await updateCartLine(cartId, lineId, quantity);
      const fullCart = await getCart(cartId);
      setCart(fullCart);
    } catch {
      setError('Could not update item. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(lineId: string) {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;
    setLoading(true);
    setError(null);
    try {
      await removeCartLine(cartId, lineId);
      const fullCart = await getCart(cartId);
      setCart(fullCart);
    } catch {
      setError('Could not remove item. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartContext.Provider value={{ cart, loading, isLoaded, error, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
