import type { Metadata } from 'next';
import CheckoutPageClient from '@/components/CheckoutPageClient';

export const metadata: Metadata = {
  title: 'Checkout | PRADSFASHION',
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
