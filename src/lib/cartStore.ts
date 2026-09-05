import { Product } from '@/types/product';

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

const STORAGE_KEY = 'pradsfashion_cart';

type Listener = () => void;

let items: CartItem[] = [];
let hydrated = false;
const listeners = new Set<Listener>();

function sameLine(a: CartItem, productId: string, size?: string, color?: string) {
  return a.productId === productId && a.size === size && a.color === color;
}

function persist() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable (private mode, etc.) — cart just won't persist
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function hydrate() {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      items = JSON.parse(raw);
    }
  } catch {
    items = [];
  }
  emit();
}

export const cartStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    hydrate();
    return () => listeners.delete(listener);
  },
  getSnapshot(): CartItem[] {
    return items;
  },
  getServerSnapshot(): CartItem[] {
    return [];
  },
  isHydrated() {
    return hydrated;
  },
  addItem(product: Product, quantity: number, size?: string, color?: string) {
    const existing = items.find((i) => sameLine(i, product.id, size, color));
    if (existing) {
      items = items.map((i) =>
        sameLine(i, product.id, size, color) ? { ...i, quantity: i.quantity + quantity } : i
      );
    } else {
      items = [...items, { productId: product.id, quantity, size, color }];
    }
    persist();
    emit();
  },
  removeItem(productId: string, size?: string, color?: string) {
    items = items.filter((i) => !sameLine(i, productId, size, color));
    persist();
    emit();
  },
  updateQuantity(productId: string, quantity: number, size?: string, color?: string) {
    if (quantity < 1) {
      cartStore.removeItem(productId, size, color);
      return;
    }
    items = items.map((i) => (sameLine(i, productId, size, color) ? { ...i, quantity } : i));
    persist();
    emit();
  },
  clearCart() {
    items = [];
    persist();
    emit();
  },
};
