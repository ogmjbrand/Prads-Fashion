'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Input from '@/components/Input';
import PaymentGateway from '@/components/PaymentGateway';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { formatPrice, generateWhatsAppMessage, generateWhatsAppLink } from '@/utils/formatting';
import { BRAND, SHIPPING_COST, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '@/utils/constants';
import { CheckCircle2 } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  notes: string;
}

const emptyForm: FormState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  notes: '',
};

export default function CheckoutPage() {
  const { items, clearCart, isHydrated } = useCart();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  });

  const hasPriceOnRequest = cartItems.some((item) => item.product && item.product.price === null);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Full name is required';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    if (!form.address.trim()) next.address = 'Delivery address is required';
    if (!form.city.trim()) next.city = 'City is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    const orderItems = cartItems.map((item) => ({
      name: item.product?.name || 'Unknown item',
      quantity: item.quantity,
      price: item.product?.price ?? null,
      size: item.size,
      color: item.color,
    }));

    const detailLines = [
      `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      `Delivery address: ${form.address}, ${form.city}${form.country ? `, ${form.country}` : ''}`,
      form.notes && `Notes: ${form.notes}`,
    ]
      .filter(Boolean)
      .join('\n');

    const message = `${generateWhatsAppMessage(orderItems, total, form.name)}\n\n${detailLines}`;
    const link = generateWhatsAppLink(message, BRAND.whatsapp);

    window.open(link, '_blank');
    setOrderPlaced(true);
    clearCart();
  };

  if (!isHydrated) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-brand-gray-600">Loading checkout...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <Header />
        <main className="bg-brand-white min-h-[70vh] flex items-center">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <CheckCircle2 className="w-16 h-16 text-brand-gold mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Order Sent!</h1>
            <p className="text-brand-gray-600 mb-8">
              Your order request has been sent to PRADSFASHION on WhatsApp. Angel or the team
              will confirm availability, payment, and delivery details with you directly. If
              WhatsApp didn&apos;t open automatically, message us at{' '}
              <a
                href={`https://wa.me/${BRAND.whatsapp.replace('+', '')}`}
                className="text-brand-gold font-semibold"
              >
                {BRAND.whatsapp}
              </a>
              .
            </p>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="bg-brand-white min-h-[60vh] flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-brand-gray-600 mb-8">Add items to your cart before checking out.</p>
            <Link href="/shop">
              <Button>Browse the Shop</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-brand-white">
        <div className="bg-brand-cream border-b border-brand-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Checkout</h1>
            <p className="text-brand-gray-600">Just a few details and we&apos;ll get your order moving.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery details form */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-6">Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleField('name')}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={handleField('phone')}
                    error={errors.phone}
                    required
                  />
                  <Input
                    label="Email (optional)"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleField('email')}
                  />
                  <Input
                    label="City"
                    placeholder="Enter your city"
                    value={form.city}
                    onChange={handleField('city')}
                    error={errors.city}
                    required
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Delivery Address"
                      placeholder="Street address"
                      value={form.address}
                      onChange={handleField('address')}
                      error={errors.address}
                      required
                    />
                  </div>
                  <Input
                    label="Country"
                    placeholder="Enter your country"
                    value={form.country}
                    onChange={handleField('country')}
                  />
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Order Notes (Optional)</label>
                  <textarea
                    placeholder="Add any special requests or notes"
                    value={form.notes}
                    onChange={handleField('notes')}
                    className="w-full px-4 py-2 border border-brand-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    rows={3}
                  />
                </div>
              </div>

              <PaymentGateway />
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-brand-cream p-6 rounded-lg sticky top-24">
                <h3 className="font-bold text-lg mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6 border-b pb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                      <span className="pr-2">
                        {item.product?.name} x{item.quantity}
                      </span>
                      <span className="whitespace-nowrap font-medium">
                        {formatPrice((item.product?.price || 0) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 mb-6 border-b pb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <Button variant="secondary" fullWidth onClick={handlePlaceOrder}>
                  Place Order via WhatsApp
                </Button>
                <p className="text-xs text-brand-gray-600 mt-3 text-center">
                  {hasPriceOnRequest
                    ? 'Some items are price-on-request — you’ll confirm the final total and delivery with PRADSFASHION on WhatsApp.'
                    : 'You’ll confirm final payment and delivery with PRADSFASHION on WhatsApp.'}
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
