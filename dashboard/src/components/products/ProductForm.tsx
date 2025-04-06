'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, generateSKU, ProductImage, Product } from '@/lib/supabase';
import { Save, X, Loader, Trash2 } from 'lucide-react';
import ImageGallery from './ImageGallery';
import CategorySelect from './CategorySelect';

// Initial state for a new product
const getInitialState = (): Omit<Product, 'id' | 'created_at' | 'updated_at' | 'images' | 'category_info'> => ({
  name: '',
  sku: '',
  category: '',
  description: '',
  title: '',
  price: 0,
  sale_price: undefined,
  cost_price: undefined,
  stock: 0,
  min_stock: undefined,
  max_stock: undefined,
  status: 'ACTIVE',
  weight: undefined,
  unit: '',
  image_url: '',
  barcode: '',
  is_featured: false,
  is_taxable: true,
});

type ProductFormProps = {
  productId?: string;  // If provided, we're editing an existing product
  isEdit?: boolean;    // Flag to indicate edit mode
};

export default function ProductForm({ productId, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [product, setProduct] = useState(getInitialState());
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(isEdit);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Load product data if in edit mode
  useEffect(() => {
    if (isEdit && productId) {
      const fetchProduct = async () => {
        setIsDataLoading(true);
        setMessage(null);
        try {
          console.log('Fetching product with ID:', productId);
          
          // Fetch product
          const productResponse = await supabase
            .from('products')
            .select('*')
            .eq('id', productId);
            
          if (productResponse.error) {
            console.error('Error fetching product:', productResponse.error);
            throw new Error(`Failed to fetch product: ${productResponse.error.message}`);
          }
          
          const productData = productResponse.data?.[0];
          if (!productData) {
            throw new Error('Product not found');
          }
          
          console.log('Product data retrieved:', productData);
          setProduct(productData);

          // Fetch product images
          const imageResponse = await supabase
            .from('product_images')
            .select('*')
            .eq('product_id', productId)
            .order('sort_order');
            
          if (imageResponse.error) {
            console.error('Error fetching product images:', imageResponse.error);
            throw new Error(`Failed to fetch product images: ${imageResponse.error.message}`);
          }
          
          console.log('Image data retrieved:', imageResponse.data || []);
          setProductImages(imageResponse.data || []);
        } catch (error: any) {
          console.error('Error loading product:', error);
          setMessage({ 
            type: 'error', 
            text: error.message || 'Failed to load product. Check your internet connection and Supabase configuration.'
          });
        } finally {
          setIsDataLoading(false);
        }
      };

      fetchProduct();
    }
  }, [isEdit, productId]);

  const generateProductSKU = () => {
    if (product.name && product.category) {
      const sku = generateSKU(product.name, product.category);
      setProduct({ ...product, sku });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setProduct({ ...product, [name]: value === '' ? undefined : parseFloat(value) || 0 });
    } else if (name === 'is_featured' || name === 'is_taxable') {
      const checked = (e.target as HTMLInputElement).checked;
      setProduct({ ...product, [name]: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }

    // Auto-generate SKU when name or category changes (only for new products)
    if (!isEdit && (name === 'name' || name === 'category')) {
      // Wait for state to update
      setTimeout(() => {
        if (!product.sku || product.sku === '') {
          generateProductSKU();
        }
      }, 100);
    }
  };

  const handleCategoryChange = (category: string) => {
    setProduct({ ...product, category });
    
    // Auto-generate SKU if name exists (only for new products)
    if (!isEdit && product.name && (!product.sku || product.sku === '')) {
      setTimeout(() => {
        generateProductSKU();
      }, 100);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProduct({ ...product, [name]: checked });
  };

  const handleImagesChange = (images: ProductImage[]) => {
    setProductImages(images);
  };

  const handleMainImageChange = (url: string) => {
    setProduct({ ...product, image_url: url });
  };

  const handleDeleteProduct = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setIsDeleting(true);
    try {
      // Delete product images first
      if (productImages.length > 0) {
        const { error: imageDeleteError } = await supabase
          .from('product_images')
          .delete()
          .eq('product_id', productId);
          
        if (imageDeleteError) {
          console.error('Error deleting product images:', imageDeleteError);
        }
      }
      
      // Then delete the product
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
        
      if (error) throw error;

      // Navigate back to products page
      router.push('/products');
      router.refresh();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to delete product' });
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Validate required fields
      if (!product.name || !product.sku || !product.category || !product.price) {
        throw new Error('Please fill in all required fields');
      }

      let productId = '';

      if (isEdit) {
        // Update the product in Supabase
        const { data, error } = await supabase
          .from('products')
          .update({
            name: product.name,
            sku: product.sku,
            category: product.category,
            description: product.description,
            title: product.title,
            price: product.price,
            sale_price: product.sale_price,
            cost_price: product.cost_price,
            stock: product.stock,
            min_stock: product.min_stock,
            max_stock: product.max_stock,
            status: product.status,
            weight: product.weight,
            unit: product.unit,
            image_url: product.image_url,
            barcode: product.barcode,
            is_featured: product.is_featured,
            is_taxable: product.is_taxable,
            updated_at: new Date().toISOString()
          })
          .eq('id', productId)
          .select();

        if (error) throw error;
        productId = (data && data.length > 0) ? data[0].id : '';
        
        setMessage({ type: 'success', text: 'Product updated successfully!' });
      } else {
        // Insert new product into Supabase
        const { data, error } = await supabase
          .from('products')
          .insert([product])
          .select();

        if (error) throw error;
        productId = (data && data.length > 0) ? data[0].id : '';
        
        setMessage({ type: 'success', text: 'Product added successfully!' });
      }
      
      // Handle product images
      if (productImages.length > 0 && productId) {
        if (isEdit) {
          // For editing: Delete existing images first
          const { error: deleteError } = await supabase
            .from('product_images')
            .delete()
            .eq('product_id', productId);
            
          if (deleteError) {
            console.error('Error deleting existing images:', deleteError.message);
          }
        }
        
        // Insert/re-insert product images
        const imagesToInsert = productImages.map(img => ({
          product_id: productId,
          url: img.url,
          alt_text: img.alt_text || product.name,
          title: img.title || '',
          description: img.description || '',
          is_primary: img.is_primary,
          sort_order: img.sort_order
        }));
        
        const { error: imageError } = await supabase
          .from('product_images')
          .insert(imagesToInsert);
          
        if (imageError) {
          console.error('Error saving image references:', imageError.message);
        }
      }

      // For new products, reset the form
      if (!isEdit) {
        setProduct(getInitialState());
        setProductImages([]);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isDataLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading product data...</p>
      </div>
    );
  }

  // Add a specific section for network errors
  if (message?.type === 'error' && message.text.includes('Failed to fetch')) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="p-4 mb-6 rounded-md bg-red-50 text-red-700">
          <h3 className="font-bold text-lg mb-2">Connection Error</h3>
          <p className="mb-4">{message.text}</p>
          <div className="bg-red-100 p-4 rounded-md">
            <h4 className="font-semibold mb-2">Troubleshooting Steps:</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>Check your internet connection</li>
              <li>Verify that your Supabase project is running and accessible</li>
              <li>Ensure your API keys are correct in the configuration</li>
              <li>Try refreshing the page</li>
              <li>Check browser console for specific error details</li>
            </ol>
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Refresh Page
            </button>
            <button
              onClick={() => router.push('/products')}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>

      {message && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-4 border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="sku"
                  value={product.sku}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-md"
                  required
                />
                <button
                  type="button"
                  onClick={generateProductSKU}
                  className="bg-blue-500 text-white px-3 rounded-r-md hover:bg-blue-600"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CategorySelect 
              value={product.category}
              onChange={handleCategoryChange}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={product.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="OFFLINE">Offline</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Title
            </label>
            <input
              type="text"
              name="title"
              value={product.title || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. Per bottle, Hand operated"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={product.description || ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Pricing Information */}
        <div className="space-y-4 border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Pricing Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (CFA) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost Price (CFA)
              </label>
              <input
                type="number"
                name="cost_price"
                value={product.cost_price || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sale Price (CFA)
              </label>
              <input
                type="number"
                name="sale_price"
                value={product.sale_price || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_taxable"
                checked={product.is_taxable}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-gray-700">Apply Tax</span>
            </label>
          </div>
        </div>

        {/* Inventory Information */}
        <div className="space-y-4 border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Inventory Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Initial Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Stock Level
              </label>
              <input
                type="number"
                name="min_stock"
                value={product.min_stock || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Stock Level
              </label>
              <input
                type="number"
                name="max_stock"
                value={product.max_stock || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <input
                type="text"
                name="unit"
                value={product.unit || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. kg, L, piece"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight/Volume
              </label>
              <input
                type="number"
                name="weight"
                value={product.weight || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Barcode (Optional)
            </label>
            <input
              type="text"
              name="barcode"
              value={product.barcode || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Media & Additional Info */}
        <div className="space-y-4 border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Product Images</h3>
          
          <ImageGallery 
            productId={productId}
            images={productImages} 
            onImagesChange={handleImagesChange}
            mainImageUrl={product.image_url || ''}
            onMainImageChange={handleMainImageChange}
          />
          
          <div className="mt-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_featured"
                checked={product.is_featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-gray-700">Featured Product</span>
            </label>
            <p className="mt-1 text-sm text-gray-500">
              Featured products will be displayed prominently on the storefront.
            </p>
          </div>
        </div>

        {/* Submit Button and Delete Button for Edit Mode */}
        <div className="flex justify-between mt-8">
          {isEdit && (
            <button
              type="button"
              onClick={handleDeleteProduct}
              disabled={isDeleting}
              className={`px-6 py-3 ${confirmDelete ? 'bg-red-600' : 'bg-red-500'} text-white rounded-md hover:bg-red-600 flex items-center space-x-2 ${
                isDeleting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isDeleting ? (
                <>
                  <Loader className="animate-spin h-4 w-4" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  <span>{confirmDelete ? 'Click to Confirm' : 'Delete Product'}</span>
                </>
              )}
            </button>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center space-x-2 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin h-4 w-4" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>{isEdit ? 'Update Product' : 'Save Product'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 