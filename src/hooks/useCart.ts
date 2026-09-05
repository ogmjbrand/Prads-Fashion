'use client';

import { useSyncExternalStore, useCallback } from 'react';
import { cartStore } from '@/lib/cartStore';
import { Product } from '@/types/product';

export function useCart() {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const isHydrated = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.isHydrated,
    () => false
  );

  const addItem = useCallback(
    (product: Product, quantity: number, size?: string, color?: string) =>
      cartStore.addItem(product, quantity, size, color),
    []
  );
  const removeItem = useCallback(
    (productId: string, size?: string, color?: string) =>
      cartStore.removeItem(productId, size, color),
    []
  );
  const updateQuantity = useCallback(
    (productId: string, quantity: number, size?: string, color?: string) =>
      cartStore.updateQuantity(productId, quantity, size, color),
    []
  );
  const clearCart = useCallback(() => cartStore.clearCart(), []);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, count, isHydrated, addItem, removeItem, updateQuantity, clearCart };
}
