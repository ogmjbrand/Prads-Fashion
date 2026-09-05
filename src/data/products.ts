import { Product } from '@/types/product';

// PRADSFASHION CATALOGUE
// Photos and prices supplied by Angel Anifowoshe (@angelina.anifowos on
// TikTok) of her handcrafted pieces. Replace this file (or wire it to a
// real backend such as Supabase) as the catalogue grows.
export const products: Product[] = [
  {
    id: 'flap-rainbow-stripe',
    name: 'Rainbow Stripe Chain Flap Bag',
    price: 45,
    description:
      'Handwoven striped textile flap bag in a bold multicolor stripe (yellow, green, blue, red, white) on a black ground, with a woven chain-and-fabric shoulder strap and silver turn-lock closure.',
    category: 'Flap Bags',
    image: '/products/flap-bag-rainbow-stripe.webp',
    images: ['/products/flap-bag-rainbow-stripe.webp'],
    sizes: ['One Size'],
    colors: ['Multicolor Stripe'],
    inStock: true,
    featured: true,
  },
  {
    id: 'flap-red-stripe',
    name: 'Red Stripe Chain Flap Bag',
    price: 40,
    description:
      'Handwoven striped textile flap bag in red, black, and white, with a woven chain-and-fabric shoulder strap and silver turn-lock closure. Same silhouette as our Rainbow Stripe bag.',
    category: 'Flap Bags',
    image: '/products/flap-bag-red-stripe.webp',
    images: ['/products/flap-bag-red-stripe.webp'],
    sizes: ['One Size'],
    colors: ['Red Stripe'],
    inStock: true,
    featured: true,
  },
  {
    id: 'flap-olive-tan-stripe',
    name: 'Olive & Tan Stripe Flap Bag',
    price: 50,
    description:
      'Handwoven striped textile flap bag in olive, dusty pink, black, and grey, finished with a contrast tan canvas flap band and top handle.',
    category: 'Flap Bags',
    image: '/products/flap-bag-olive-tan-stripe.webp',
    images: ['/products/flap-bag-olive-tan-stripe.webp'],
    sizes: ['One Size'],
    colors: ['Olive & Tan Stripe'],
    inStock: true,
  },
  {
    id: 'flap-yellow-croc',
    name: 'Yellow Croc-Embossed Flap Bag',
    price: 60,
    description:
      'Compact structured flap bag in bright yellow crocodile-embossed leather, with a wood-bead-and-chain double strap and silver box clasp.',
    category: 'Flap Bags',
    image: '/products/flap-bag-yellow-croc.webp',
    images: ['/products/flap-bag-yellow-croc.webp'],
    sizes: ['One Size'],
    colors: ['Yellow Croc'],
    inStock: true,
    featured: true,
  },
  {
    id: 'top-handle-structured',
    name: 'Structured Top-Handle Bag',
    price: 55,
    description:
      'Structured pebbled-leather top-handle bag with a padded loop handle, curved seam detail, and a metal PRADS brand plaque. Available in three finishes.',
    category: 'Top-Handle Bags',
    image: '/products/top-handle-espresso.webp',
    images: [
      '/products/top-handle-espresso.webp',
      '/products/top-handle-burgundy.webp',
      '/products/top-handle-olive-green.webp',
    ],
    sizes: ['One Size'],
    colors: ['Espresso', 'Burgundy', 'Olive Green (Snake-Embossed)'],
    inStock: true,
    featured: true,
  },
  {
    id: 'satchel-croc',
    name: 'Crocodile-Embossed Box-Lock Satchel',
    price: 70,
    description:
      'Structured satchel in crocodile-embossed leather with a padded top handle and a polished box-lock clasp. Available in espresso and purple, shown here alongside a black colourway.',
    category: 'Top-Handle Bags',
    image: '/products/satchel-croc-espresso.webp',
    images: [
      '/products/satchel-croc-espresso.webp',
      '/products/satchel-croc-purple.webp',
      '/products/satchel-croc-trio.webp',
    ],
    sizes: ['One Size'],
    colors: ['Espresso Croc', 'Purple Croc', 'Black Croc'],
    inStock: true,
  },
  {
    id: 'tote-navy-stripe',
    name: 'Navy Stripe Structured Tote',
    price: 65,
    description:
      'Structured woven tote in navy and blue stripes with padded double handles and a metal PRADS brand plaque. Roomy enough for daily and work use.',
    category: 'Tote Bags',
    image: '/products/tote-navy-stripe.webp',
    images: ['/products/tote-navy-stripe.webp'],
    sizes: ['One Size'],
    colors: ['Navy Stripe'],
    inStock: true,
    featured: true,
  },
  {
    id: 'ankara-jumpsuit-orange',
    name: 'Ankara Print Halter Jumpsuit',
    price: 80,
    description:
      'Wide-leg halter jumpsuit in a bold orange and mustard Ankara wax print, with a fitted smocked bodice. Contact us to discuss sizing — this is a made-to-order piece.',
    category: 'Ready-to-Wear',
    image: '/products/ankara-jumpsuit-orange.webp',
    images: ['/products/ankara-jumpsuit-orange.webp'],
    colors: ['Orange Ankara Print'],
    inStock: true,
  },
  {
    id: 'ankara-kaftan-yellow',
    name: 'Ankara Print Kaftan Dress',
    price: 75,
    description:
      'Relaxed, flowing kaftan dress in a yellow and white Ankara print with a striped contrast trim at the sleeves and hem. Contact us to discuss sizing — this is a made-to-order piece.',
    category: 'Ready-to-Wear',
    image: '/products/ankara-kaftan-yellow.webp',
    images: ['/products/ankara-kaftan-yellow.webp'],
    colors: ['Yellow Ankara Print'],
    inStock: true,
  },
];

export const categories = ['All', 'Flap Bags', 'Top-Handle Bags', 'Tote Bags', 'Ready-to-Wear'];
