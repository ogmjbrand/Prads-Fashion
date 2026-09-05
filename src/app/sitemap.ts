import { MetadataRoute } from 'next';
import { products } from '@/data/products';

const BASE_URL = 'https://prads-fashion.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/cart',
    '/checkout',
    '/policies',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
