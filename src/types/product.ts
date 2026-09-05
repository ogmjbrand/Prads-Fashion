export interface Product {
  id: string;
  name: string;
  /** null means pricing has not been set yet — show "Price on Request" rather than inventing a number. */
  price: number | null;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  images: string[];
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  rating?: number;
  reviews?: number;
  featured?: boolean;
  /** Marks this as sample/placeholder catalogue data rather than confirmed real inventory. */
  isSample?: boolean;
}
