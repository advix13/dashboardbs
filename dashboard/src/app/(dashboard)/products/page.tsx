'use client';

import React from 'react';
import { ShoppingBag, Search, Filter, Plus } from 'lucide-react';

export default function ProductsPage() {
  // Sample product data
  const products = [
    { id: 1, name: 'Water Bottle - 500ml', category: 'Water', price: '750 CFA', stock: 250, status: 'In Stock' },
    { id: 2, name: 'Water Bottle - 1L', category: 'Water', price: '1,125 CFA', stock: 180, status: 'In Stock' },
    { id: 3, name: 'Water Gallon - 5L', category: 'Water', price: '4,495 CFA', stock: 75, status: 'In Stock' },
    { id: 4, name: 'Ice Bag - 2kg', category: 'Ice', price: '1,750 CFA', stock: 120, status: 'In Stock' },
    { id: 5, name: 'Ice Bag - 5kg', category: 'Ice', price: '3,625 CFA', stock: 85, status: 'In Stock' },
    { id: 6, name: 'Ice Cubes - Premium', category: 'Ice', price: '2,495 CFA', stock: 15, status: 'Low Stock' },
    { id: 7, name: 'Sparkling Water - 750ml', category: 'Water', price: '1,875 CFA', stock: 0, status: 'Out of Stock' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500">Manage your inventory</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus size={18} className="mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md bg-white">
                <option>All Categories</option>
                <option>Water</option>
                <option>Ice</option>
              </select>
              <Filter size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md bg-white">
                <option>All Status</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
              <Filter size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                        <ShoppingBag size={18} className="text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">SKU-{product.id.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing 1 to 7 of 7 products
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm" disabled>Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
} 