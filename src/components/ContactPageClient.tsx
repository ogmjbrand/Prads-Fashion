'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { BRAND, SOCIAL_MEDIA } from '@/utils/constants';
import { generateWhatsAppLink } from '@/utils/formatting';
import { Mail, Phone, CheckCircle2 } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const emptyForm: ContactForm = { name: '', email: '', subject: '', message: '' };

export default function ContactPageClient() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [sent, setSent] = useState(false);

  const handleField = (field: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const next: Partial<Record<keyof ContactForm, string>> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    if (!form.subject.trim()) next.subject = 'Subject is required';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const message = [
      `Hi PRADSFASHION! I have a message from the contact form.`,
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Subject: ${form.subject}`,
      '',
      form.message,
    ].join('\n');

    window.open(generateWhatsAppLink(message, BRAND.whatsapp), '_blank');
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <>
      <Header />
      <main className="bg-brand-white">
        {/* Hero */}
        <div className="bg-brand-cream border-b border-brand-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-brand-gray-600">We&apos;d love to hear from you. Reach out anytime.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              {/* WhatsApp */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-brand-gold" />
                  <span>WhatsApp</span>
                </h3>
                <p className="text-brand-gray-600 mb-3">
                  Chat with us directly on WhatsApp for quick responses.
                </p>
                <a
                  href={`https://wa.me/${BRAND.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold font-semibold hover:text-brand-black"
                >
                  {BRAND.whatsapp}
                </a>
              </div>

              {/* Email */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-brand-gold" />
                  <span>Email</span>
                </h3>
                <p className="text-brand-gray-600 mb-3">
                  Send us an email and we&apos;ll get back to you soon.
                </p>
                <a
                  href="mailto:contact@pradsfashion.com"
                  className="text-brand-gold font-semibold hover:text-brand-black"
                >
                  contact@pradsfashion.com
                </a>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-bold text-lg mb-3">Follow Us</h3>
                <div className="space-y-2">
                  <a
                    href={SOCIAL_MEDIA.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-brand-gold hover:text-brand-black font-semibold"
                  >
                    Instagram
                  </a>
                  <a
                    href={SOCIAL_MEDIA.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-brand-gold hover:text-brand-black font-semibold"
                  >
                    TikTok
                  </a>
                  <a
                    href={SOCIAL_MEDIA.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-brand-gold hover:text-brand-black font-semibold"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-brand-cream p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              {sent ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-brand-gold mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Message Ready to Send</h3>
                  <p className="text-brand-gray-600 mb-6">
                    We opened WhatsApp with your message pre-filled — just hit send there to
                    reach us. If it didn&apos;t open, message us directly at{' '}
                    <a
                      href={`https://wa.me/${BRAND.whatsapp.replace('+', '')}`}
                      className="text-brand-gold font-semibold"
                    >
                      {BRAND.whatsapp}
                    </a>
                    .
                  </p>
                  <Button variant="outline" onClick={() => setSent(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleField('name')}
                      error={errors.name}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Your email"
                      value={form.email}
                      onChange={handleField('email')}
                      error={errors.email}
                      required
                    />
                  </div>

                  <Input
                    label="Subject"
                    placeholder="What is this about?"
                    value={form.subject}
                    onChange={handleField('subject')}
                    error={errors.subject}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      placeholder="Your message"
                      rows={6}
                      value={form.message}
                      onChange={handleField('message')}
                      className="w-full px-4 py-2 border border-brand-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <Button type="submit" variant="primary" fullWidth>
                    Send Message
                  </Button>

                  <p className="text-sm text-brand-gray-600 text-center">
                    Sending opens WhatsApp with your message pre-filled — we don&apos;t have email
                    form handling connected yet, so WhatsApp is the fastest way to reach us.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-brand-black text-brand-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">How do I place an order?</h3>
                <p className="text-brand-gray-300">
                  Browse our collection, add items to your cart, and proceed to checkout.
                  You can also order directly via WhatsApp for personalized assistance.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">What are the shipping options?</h3>
                <p className="text-brand-gray-300">
                  Shipping details and costs will be confirmed with you directly via WhatsApp
                  once our shipping policy is finalized.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Can I return items?</h3>
                <p className="text-brand-gray-300">
                  Please refer to our Return Policy for detailed information.
                  Contact us via WhatsApp for specific return inquiries.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Do you offer custom orders?</h3>
                <p className="text-brand-gray-300">
                  Yes! We love custom projects. Contact us via WhatsApp to discuss your specific requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
