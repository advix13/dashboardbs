'use client';

import React from 'react';
import { ShoppingBag, Droplet, Package } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  title: string;
  price: string;
  status: 'ACTIVE' | 'INACTIVE' | 'OFFLINE';
  stock: number;
  category: 'Water' | 'Ice' | 'Accessory';
};

const productsData: Product[] = [
  {
    id: 1,
    name: 'Ice Cubes – 1kg',
    title: 'Per sachet',
    price: '350 CFA',
    status: 'ACTIVE',
    stock: 120,
    category: 'Ice'
  },
  {
    id: 2,
    name: '19L Dispenser Bottled Water',
    title: 'Per bottle',
    price: '1,500 CFA',
    status: 'ACTIVE',
    stock: 85,
    category: 'Water'
  },
  {
    id: 3,
    name: 'Empty 19L Dispenser Bottle',
    title: 'Bottle only',
    price: '5,000 CFA',
    status: 'INACTIVE',
    stock: 25,
    category: 'Water'
  },
  {
    id: 4,
    name: 'Manual Water Pump',
    title: 'Hand operated',
    price: '3,000 CFA',
    status: 'ACTIVE',
    stock: 15,
    category: 'Accessory'
  },
  {
    id: 5,
    name: 'Electronic Water Pump',
    title: 'Battery powered',
    price: '7,000 CFA',
    status: 'OFFLINE',
    stock: 8,
    category: 'Accessory'
  }
];

const Products = () => {
  // Function to get icon based on category
  const getIcon = (category: 'Water' | 'Ice' | 'Accessory') => {
    switch (category) {
      case 'Water':
        return <Droplet size={20} className="text-blue-600" />;
      case 'Ice':
        return <ShoppingBag size={20} className="text-cyan-600" />;
      case 'Accessory':
        return <Package size={20} className="text-purple-600" />;
    }
  };

  // Function to get background color based on category
  const getBgColor = (category: 'Water' | 'Ice' | 'Accessory') => {
    switch (category) {
      case 'Water':
        return 'bg-blue-100';
      case 'Ice':
        return 'bg-cyan-100';
      case 'Accessory':
        return 'bg-purple-100';
    }
  };

  // Function to get status badge style
  const getStatusBadge = (status: 'ACTIVE' | 'INACTIVE' | 'OFFLINE') => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-yellow-100 text-yellow-800';
      case 'OFFLINE':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Products</h2>
        <button className="text-blue-600 text-sm hover:underline">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productsData.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-lg flex-shrink-0 ${getBgColor(product.category)} flex items-center justify-center`}>
                      {getIcon(product.category)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">ID: {product.id.toString().padStart(4, '0')}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock} units
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded">
                    {product.price}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing 5 products
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Products; 