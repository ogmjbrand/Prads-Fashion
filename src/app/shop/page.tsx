import type { Metadata } from 'next';
import ShopPageClient from '@/components/ShopPageClient';

export const metadata: Metadata = {
  title: 'Shop | PRADSFASHION',
  description: 'Browse handcrafted bags and Ankara-print fashion from PRADSFASHION. Filter by category, price, and availability.',
};

export default function ShopPage() {
  return <ShopPageClient />;
}
