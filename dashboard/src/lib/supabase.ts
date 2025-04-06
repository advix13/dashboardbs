import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://stvlhikgnjwweafhvcbk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dmxoaWtnbmp3d2VhZmh2Y2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjQ4NzgsImV4cCI6MjA1OTU0MDg3OH0.Y1tui-ao4mA81N3mTI7q2jxcGZYBjf3OaBM0plKIrgg';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: async (url, options = {}) => {
      try {
        // Add timeout to fetch requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        const fetchOptions = {
          ...options,
          signal: controller.signal,
          headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
          },
        };
        
        const response = await fetch(url, fetchOptions);
        clearTimeout(timeoutId);
        
        // Log any non-2xx responses for debugging
        if (!response.ok) {
          console.error(`Supabase API error: ${response.status} ${response.statusText}`);
          
          // Try to get more error details if possible
          try {
            const errorData = await response.json();
            console.error('Error details:', errorData);
          } catch (e) {
            // Ignore if we can't parse the error response
          }
        }
        
        return response;
      } catch (error: any) {
        console.error('Supabase fetch error:', error);
        if (error.name === 'AbortError') {
          console.error('Request timed out');
        }
        throw error;
      }
    }
  }
});

// Check and log the connection status
export const checkSupabaseConnection = async () => {
  try {
    const start = Date.now();
    const { data, error } = await supabase.from('products').select('count', { count: 'exact' }).limit(1);
    const end = Date.now();
    
    if (error) {
      console.error('Supabase connection check failed:', error);
      return { connected: false, error: error.message, latency: end - start };
    }
    
    console.log(`Supabase connection successful. Latency: ${end - start}ms`);
    return { connected: true, latency: end - start };
  } catch (error: any) {
    console.error('Unexpected error checking Supabase connection:', error);
    return { connected: false, error: error.message };
  }
};

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