import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';

const BASE_URL = 'https://prads-fashion.com';

// Product list comes from Supabase and can change without a redeploy, so
// avoid caching a stale sitemap generated at build time.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const products = await getProducts();
  const productRoutes = products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
