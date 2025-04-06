'use client';

import Link from 'next/link';
import ProductForm from '@/components/products/ProductForm';
import { ArrowLeft } from 'lucide-react';

export default function AddProductPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/products" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft size={18} className="mr-1" />
          <span>Back to Products</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>
        <ProductForm />
      </div>
    </div>
  );
} 