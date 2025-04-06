'use client';

import { useParams } from 'next/navigation';
import ProductForm from '@/components/products/ProductForm';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditProductPage() {
  const params = useParams();
  const productId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Just a small delay to ensure the component mounts properly
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (!productId) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="p-4 rounded-md bg-red-50 text-red-700">
          <h3 className="font-bold text-lg mb-2">Error</h3>
          <p className="mb-4">Product ID is missing or invalid.</p>
          <Link href="/products" className="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link href={`/products/${productId}`} className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft size={18} className="mr-1" />
          <span>Back to Product</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>
        <ProductForm productId={productId} isEdit={true} />
      </div>
    </div>
  );
} 