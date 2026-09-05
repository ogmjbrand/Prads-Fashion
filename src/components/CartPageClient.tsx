'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { formatPrice, generateWhatsAppMessage, generateWhatsAppLink } from '@/utils/formatting';
import { BRAND, SHIPPING_COST, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '@/utils/constants';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPageClient() {
  const { items, removeItem, updateQuantity, isHydrated } = useCart();

  const cartItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  });

  const hasPriceOnRequest = cartItems.some((item) => item.product && item.product.price === null);

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const handleWhatsAppOrder = () => {
    const orderItems = cartItems.map((item) => ({
      name: item.product?.name || 'Unknown',
      quantity: item.quantity,
      price: item.product?.price ?? null,
    }));

    const message = generateWhatsAppMessage(orderItems, total);
    const link = generateWhatsAppLink(message, BRAND.whatsapp);
    window.open(link, '_blank');
  };

  if (!isHydrated) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-brand-gray-600">Loading cart...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-brand-white">
        {/* Page Header */}
        <div className="bg-brand-cream border-b border-brand-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-brand-gray-600">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-brand-gray-600 mb-8">Start shopping to add items to your cart</p>
              <Button onClick={() => (window.location.href = '/shop')}>Continue Shopping</Button>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="flex gap-4 border border-brand-gray-200 rounded-lg p-4"
                    >
                      {/* Image */}
                      <div className="relative w-24 h-24 bg-brand-cream rounded overflow-hidden flex-shrink-0">
                        {item.product?.image && (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-grow">
                        <h3 className="font-semibold mb-2">{item.product?.name}</h3>
                        {item.size && <p className="text-sm text-brand-gray-600">Size: {item.size}</p>}
                        {item.color && <p className="text-sm text-brand-gray-600">Color: {item.color}</p>}
                        <p className="font-bold mt-2">{formatPrice(item.product?.price || 0)}</p>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.size, item.color)
                          }
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity - 1,
                                item.size,
                                item.color
                              )
                            }
                            className="p-1 hover:bg-brand-cream rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity + 1,
                                item.size,
                                item.color
                              )
                            }
                            className="p-1 hover:bg-brand-cream rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t pt-6">
                  <Button variant="outline" fullWidth onClick={() => (window.location.href = '/shop')}>
                    Continue Shopping
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-brand-cream p-6 rounded-lg sticky top-24">
                  <h3 className="font-bold text-lg mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6 border-b pb-6">
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

                  {hasPriceOnRequest && (
                    <p className="text-xs text-brand-gray-600 mb-4">
                      One or more items are price-on-request — final total will be confirmed via WhatsApp.
                    </p>
                  )}

                  {subtotal < FREE_SHIPPING_THRESHOLD && (
                    <p className="text-xs text-brand-gray-600 mb-4">
                      Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
                    </p>
                  )}

                  <Link href="/checkout" className="block mb-3">
                    <Button variant="primary" fullWidth>
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={handleWhatsAppOrder}
                  >
                    Order via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
