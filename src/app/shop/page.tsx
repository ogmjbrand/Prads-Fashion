import type { Metadata } from 'next';
import ShopPageClient from '@/components/ShopPageClient';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shop | PRADSFASHION',
  description: 'Browse handcrafted bags and Ankara-print fashion from PRADSFASHION. Filter by category, price, and availability.',
};

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopPageClient products={products} />;
}
