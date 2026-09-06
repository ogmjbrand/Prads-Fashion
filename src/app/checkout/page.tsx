import type { Metadata } from 'next';
import CheckoutPageClient from '@/components/CheckoutPageClient';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Checkout | PRADSFASHION',
};

export default async function CheckoutPage() {
  const products = await getProducts();
  return <CheckoutPageClient products={products} />;
}
