import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://stvlhikgnjwweafhvcbk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dmxoaWtnbmp3d2VhZmh2Y2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjQ4NzgsImV4cCI6MjA1OTU0MDg3OH0.Y1tui-ao4mA81N3mTI7q2jxcGZYBjf3OaBM0plKIrgg';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Utility function to generate a unique SKU
export const generateSKU = (name: string, category: string) => {
  const prefix = category.substring(0, 2).toUpperCase();
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}${randomNum}${timestamp}`;
};

// Type for product category
export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// Type for product image
export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text?: string;
  title?: string;
  description?: string;
  is_primary: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

// Status type
export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'OFFLINE';

// Type for full product
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description?: string;
  title?: string;
  price: number;
  sale_price?: number;
  cost_price?: number;
  stock: number;
  min_stock?: number;
  max_stock?: number;
  status: ProductStatus;
  weight?: number;
  unit?: string;
  image_url?: string;
  barcode?: string;
  is_featured: boolean;
  is_taxable: boolean;
  created_at?: string;
  updated_at?: string;
  // Relations
  images?: ProductImage[];
  category_info?: ProductCategory;
} 