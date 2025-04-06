'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase, Product, ProductCategory } from '@/lib/supabase';
import { PlusCircle, Search, Filter, ShoppingBag, Droplet, Package, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const router = useRouter();
  const [deleteInProgress, setDeleteInProgress] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Check connection to Supabase
        console.log('Checking Supabase connection...');
        
        // Fetch categories first
        console.log('Fetching categories...');
        const categoryResponse = await supabase
          .from('product_categories')
          .select('*')
          .order('name');
        
        if (categoryResponse.error) {
          console.error('Error fetching categories:', categoryResponse.error);
          throw new Error(`Failed to fetch categories: ${categoryResponse.error.message}`);
        }
        
        console.log('Categories fetched successfully:', categoryResponse.data?.length || 0);
        setCategories(categoryResponse.data || []);
        
        // Then fetch products
        await fetchProducts();
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch data';
        console.error('Error fetching data:', err);
        console.error('Network status:', navigator.onLine ? 'Online' : 'Offline');
        
        // Add more diagnostic information for network errors
        if (errorMessage.includes('Failed to fetch') || !navigator.onLine) {
          setError('Network error: Please check your internet connection and verify that the Supabase service is running.');
        } else {
          setError(errorMessage);
        }
        
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching products...');
      let query = supabase.from('products').select('*');
      
      if (activeFilter) {
        query = query.eq('category', activeFilter);
      }
      
      const productsResponse = await query.order('name');
      
      if (productsResponse.error) {
        console.error('Error fetching products:', productsResponse.error);
        throw new Error(`Failed to fetch products: ${productsResponse.error.message}`);
      }
      
      console.log('Products fetched successfully:', productsResponse.data?.length || 0);
      setProducts(productsResponse.data || []);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch products';
      console.error('Error fetching products:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      fetchProducts();
    }
  }, [activeFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCategoryIcon = (category: string) => {
    // Look for predefined categories first
    switch (category) {
      case 'Water':
        return <Droplet size={16} className="text-blue-600" />;
      case 'Ice':
        return <ShoppingBag size={16} className="text-cyan-600" />;
      case 'Accessory':
        return <Package size={16} className="text-purple-600" />;
      default:
        return <Tag size={16} className="text-indigo-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-yellow-100 text-yellow-800';
      case 'OFFLINE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }
    
    setDeleteInProgress(productId);
    try {
      // First delete related product images
      const { error: imageDeleteError } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId);
        
      if (imageDeleteError) {
        console.error('Error deleting product images:', imageDeleteError);
        throw new Error(`Failed to delete product images: ${imageDeleteError.message}`);
      }
      
      // Then delete the product
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
        
      if (error) {
        console.error('Error deleting product:', error);
        throw new Error(`Failed to delete product: ${error.message}`);
      }
      
      // Update local state after successful deletion
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      
    } catch (err: any) {
      console.error('Error deleting product:', err);
      alert(`Error deleting product: ${err.message}`);
    } finally {
      setDeleteInProgress(null);
    }
  };

  // Enhanced error display with troubleshooting information
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="p-4 rounded-md bg-red-50 text-red-700">
          <h3 className="font-bold text-lg mb-2">Error Loading Products</h3>
          <p className="mb-4">{error}</p>
          
          {error.includes('Network error') && (
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
          )}
          
          <div className="mt-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <Link 
          href="/products/add" 
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-5 py-2.5 rounded-md flex items-center hover:bg-blue-700 transition-colors font-medium"
        >
          <PlusCircle size={20} className="mr-2" />
          Add Product
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                activeFilter === null ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.name)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                  activeFilter === category.name ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {getCategoryIcon(category.name)}
                <span className="ml-1">{category.name}</span>
              </button>
            ))}
          </div>
          
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchQuery ? 'No products matching your search' : 'No products found. Add your first product!'}
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                          {product.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product.name} 
                              className="h-10 w-10 rounded object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                              }}
                            />
                          ) : (
                            getCategoryIcon(product.category)
                          )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.title}</div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        {getCategoryIcon(product.category)}
                        <span className="ml-1.5">{product.category}</span>
                      </div>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.price.toLocaleString()} CFA</div>
                      {product.sale_price && (
                        <div className="text-sm text-red-600">{product.sale_price.toLocaleString()} CFA</div>
                      )}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${product.stock <= (product.min_stock || 10) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                        {product.stock} {product.unit ? product.unit : 'units'}
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/products/${product.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </Link>
                      <Link href={`/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        Edit
                      </Link>
                      <Link 
                        href="#"
                        className="text-red-600 hover:text-red-900"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteProduct(product.id);
                        }}
                      >
                        {deleteInProgress === product.id ? 'Deleting...' : 'Delete'}
                      </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
} 