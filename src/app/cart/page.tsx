import type { Metadata } from 'next';
import CartPageClient from '@/components/CartPageClient';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Your Cart | PRADSFASHION',
};

export default async function CartPage() {
  const products = await getProducts();
  return <CartPageClient products={products} />;
}
