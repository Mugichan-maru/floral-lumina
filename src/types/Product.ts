// types/Product.ts
export interface Product {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  images: string[];
  description: string;
  features: string[];
  colors?: { name: string; value: string }[];
  inStock: boolean;
  category?: string;
}
