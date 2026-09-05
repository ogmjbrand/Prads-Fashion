export function formatPrice(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return 'Price on Request';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function calculateDiscount(originalPrice: number, price: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

interface WhatsAppOrderItem {
  name: string;
  quantity: number;
  price: number | null;
  size?: string;
  color?: string;
}

export function generateWhatsAppMessage(
  orderItems: WhatsAppOrderItem[],
  total: number,
  customerName?: string
): string {
  const lines: string[] = [];
  const hasPriceOnRequest = orderItems.some((item) => item.price === null);

  lines.push('Hi PRADSFASHION! I would like to place an order.');
  lines.push('');

  if (customerName) {
    lines.push(`Name: ${customerName}`);
    lines.push('');
  }

  lines.push('Order Summary:');
  orderItems.forEach((item) => {
    const variant = [item.size, item.color].filter(Boolean).join(', ');
    const lineTotal = item.price === null ? 'Price on Request' : formatPrice(item.price * item.quantity);
    lines.push(`- ${item.name}${variant ? ` (${variant})` : ''} x${item.quantity} — ${lineTotal}`);
  });

  lines.push('');
  lines.push(`Total (confirmed items): ${formatPrice(total)}`);
  if (hasPriceOnRequest) {
    lines.push('(Some items are price-on-request — please confirm final pricing.)');
  }
  lines.push('');
  lines.push('Please let me know how to proceed. Thank you!');

  return lines.join('\n');
}

export function generateWhatsAppLink(message: string, phoneNumber: string): string {
  const cleanPhone = phoneNumber.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
