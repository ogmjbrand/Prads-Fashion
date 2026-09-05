import type { Metadata } from 'next';
import ContactPageClient from '@/components/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact | PRADSFASHION',
  description: 'Get in touch with PRADSFASHION via WhatsApp, email, or our contact form.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
