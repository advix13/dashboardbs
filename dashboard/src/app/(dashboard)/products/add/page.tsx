import Link from 'next/link';
import AddProductForm from '@/components/products/AddProductForm';
import { ArrowLeft } from 'lucide-react';

export default function AddProductPage() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600 mt-1">Create a new product in your inventory</p>
          </div>
          
          <Link
            href="/products"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
      
      <AddProductForm />
    </div>
  );
} 