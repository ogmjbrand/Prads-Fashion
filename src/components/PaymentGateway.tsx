'use client';

/**
 * Payment integration boundary.
 *
 * No payment processor credentials have been provided yet. This component is
 * the single isolated place to wire up a real gateway (e.g. Stripe, Paystack,
 * Flutterwave) later — swap its contents for the provider's hosted checkout
 * or Elements/Widget, and call `onPaid()` on success. Until then it is
 * disabled and WhatsApp ordering is the working payment path.
 */
export default function PaymentGateway() {
  return (
    <div className="border border-dashed border-brand-gray-300 rounded-lg p-6 bg-brand-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Pay by Card</h3>
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-gray-500 bg-brand-gray-200 px-2 py-1 rounded">
          Coming soon
        </span>
      </div>
      <p className="text-sm text-brand-gray-600">
        Online card payment isn&apos;t connected yet. Place your order via WhatsApp below and
        PRADSFASHION will confirm payment details with you directly.
      </p>
    </div>
  );
}
