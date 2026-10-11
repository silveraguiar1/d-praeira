"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "dpraeira-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore corrupted storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const total = items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0,
    );
    return {
      items,
      count,
      total,
      add: (product, quantity = 1) => {
        setItems((prev) => {
          const existing = prev.find((i) => i.product.id === product.id);
          if (existing) {
            return prev.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: Math.min(99, i.quantity + quantity) }
                : i,
            );
          }
          return [...prev, { product, quantity }];
        });
      },
      remove: (productId) =>
        setItems((prev) => prev.filter((i) => i.product.id !== productId)),
      setQuantity: (productId, quantity) => {
        if (quantity < 1) {
          setItems((prev) => prev.filter((i) => i.product.id !== productId));
          return;
        }
        setItems((prev) =>
          prev.map((i) =>
            i.product.id === productId
              ? { ...i, quantity: Math.min(99, quantity) }
              : i,
          ),
        );
      },
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return ctx;
}