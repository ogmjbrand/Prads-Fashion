import { supabase } from './supabase';
import { Product } from '@/types/product';

interface ProductRow {
  id: string;
  name: string;
  price: number | string | null;
  original_price: number | string | null;
  description: string;
  category: string;
  image: string;
  images: string[];
  cutout_image: string | null;
  sizes: string[] | null;
  colors: string[] | null;
  in_stock: boolean;
  rating: number | string | null;
  reviews: number | null;
  featured: boolean;
  is_sample: boolean;
}

function toNumber(value: number | string | null): number | undefined {
  if (value === null) return undefined;
  return typeof value === 'string' ? parseFloat(value) : value;
}

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    price: row.price === null ? null : (toNumber(row.price) as number),
    originalPrice: toNumber(row.original_price),
    description: row.description,
    category: row.category,
    image: row.image,
    images: row.images ?? [],
    cutoutImage: row.cutout_image ?? undefined,
    sizes: row.sizes ?? undefined,
    colors: row.colors ?? undefined,
    inStock: row.in_stock,
    rating: toNumber(row.rating),
    reviews: row.reviews ?? undefined,
    featured: row.featured,
    isSample: row.is_sample,
  };
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*').order('sort_order');
  if (error) throw error;
  return (data as ProductRow[]).map(mapRow);
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data as ProductRow) : null;
}

export const categories = ['All', 'Flap Bags', 'Top-Handle Bags', 'Tote Bags', 'Ready-to-Wear'];
