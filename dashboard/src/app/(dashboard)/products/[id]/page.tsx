'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { supabase, Product, ProductImage } from '@/lib/supabase';
import { ArrowLeft, Edit, Trash2, Tag, ShoppingBag, Droplet, Package } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  
  const [product, setProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!productId) {
      setError("Product ID is missing or invalid");
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching product with ID:', productId);
        
        // Fetch product
        const productResponse = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (productResponse.error) {
          console.error('Error fetching product:', productResponse.error);
          throw new Error(`Failed to fetch product: ${productResponse.error.message}`);
        }
        
        if (!productResponse.data) {
          throw new Error('Product not found');
        }

        setProduct(productResponse.data);
        console.log('Product data retrieved:', productResponse.data);

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
        setError(error.message || 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const getCategoryIcon = (category: string) => {
    // Look for predefined categories first
    switch (category) {
      case 'Water':
        return <Droplet size={20} className="text-blue-600" />;
      case 'Ice':
        return <ShoppingBag size={20} className="text-cyan-600" />;
      case 'Accessory':
        return <Package size={20} className="text-purple-600" />;
      default:
        return <Tag size={20} className="text-indigo-600" />;
    }
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
    } catch (error: any) {
      setError(error.message || 'Failed to delete product');
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-red-600 mb-4">{error}</div>
        <Link href="/products" className="text-blue-600 hover:underline flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-gray-600 mb-4">Product not found</div>
        <Link href="/products" className="text-blue-600 hover:underline flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Top Bar with Actions */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/products" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft size={18} className="mr-1" />
          <span>Back to Products</span>
        </Link>
        <div className="flex items-center space-x-3">
          <Link 
            href={`/products/${productId}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Edit size={16} className="mr-1" />
            <span>Edit</span>
          </Link>
          <button
            onClick={handleDeleteProduct}
            disabled={isDeleting}
            className={`px-4 py-2 ${confirmDelete ? 'bg-red-600' : 'bg-red-500'} text-white rounded-md hover:bg-red-600 flex items-center`}
          >
            <Trash2 size={16} className="mr-1" />
            <span>{confirmDelete ? 'Confirm Delete' : 'Delete'}</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Image */}
          <div className="w-full md:w-1/3 flex flex-col">
            <div className="bg-gray-50 border rounded-lg p-4 aspect-square flex items-center justify-center mb-4">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=No+Image';
                  }}
                />
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-2 text-gray-300">
                    {getCategoryIcon(product.category)}
                  </div>
                  <p className="text-sm text-gray-500">No image available</p>
                </div>
              )}
            </div>

            {/* Additional Images Gallery */}
            {productImages.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Gallery Images</h3>
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((image) => (
                    <div key={image.id} className="aspect-square border rounded-md overflow-hidden bg-gray-50">
                      <img 
                        src={image.url} 
                        alt={image.alt_text || product.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Error';
                        }}
                      />
                      {image.is_primary && (
                        <div className="absolute top-0 right-0 bg-yellow-400 text-xs px-1 rounded-bl">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center mb-4">
              <span className={`px-2 py-1 text-xs rounded-full ${
                product.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                product.status === 'INACTIVE' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {product.status}
              </span>
              
              {product.is_featured && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {product.title && (
              <p className="text-gray-600 mb-4">{product.title}</p>
            )}
            
            <div className="flex items-center text-gray-700 mb-4">
              {getCategoryIcon(product.category)}
              <span className="ml-1">{product.category}</span>
            </div>

            <div className="mb-6">
              <p className="text-xl font-bold text-gray-900">{product.price.toLocaleString()} CFA</p>
              {product.sale_price && (
                <p className="text-lg text-red-600">{product.sale_price.toLocaleString()} CFA <span className="text-sm text-gray-500">(Sale Price)</span></p>
              )}
              {product.cost_price && (
                <p className="text-sm text-gray-500">{product.cost_price.toLocaleString()} CFA (Cost Price)</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700">SKU</h3>
                <p className="text-gray-900">{product.sku}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700">Stock</h3>
                <p className={`${product.stock <= (product.min_stock || 10) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                  {product.stock} {product.unit ? product.unit : 'units'}
                </p>
              </div>
              
              {product.min_stock && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Minimum Stock</h3>
                  <p className="text-gray-900">{product.min_stock}</p>
                </div>
              )}
              
              {product.max_stock && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Maximum Stock</h3>
                  <p className="text-gray-900">{product.max_stock}</p>
                </div>
              )}
              
              {product.weight && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Weight/Volume</h3>
                  <p className="text-gray-900">{product.weight} {product.unit || ''}</p>
                </div>
              )}
              
              {product.barcode && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Barcode</h3>
                  <p className="text-gray-900">{product.barcode}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium text-gray-700">Taxable</h3>
                <p className="text-gray-900">{product.is_taxable ? 'Yes' : 'No'}</p>
              </div>
            </div>

            {product.description && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-500 border-t border-gray-200 pt-4">
              <div>
                <span>Created: </span>
                <span>{new Date(product.created_at as string).toLocaleString()}</span>
              </div>
              
              <div>
                <span>Last Updated: </span>
                <span>{new Date(product.updated_at as string).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 