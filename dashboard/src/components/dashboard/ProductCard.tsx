'use client';

import React from 'react';
import { ShoppingBag, Droplet, Package, AlertTriangle } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  stock: number;
  maxStock: number;
  category: 'Water' | 'Ice' | 'Accessory';
}

const ProductCard = ({ id, name, price, stock, maxStock, category }: ProductCardProps) => {
  // Calculate stock status
  const stockPercentage = (stock / maxStock) * 100;
  const stockStatus = stockPercentage <= 15 ? 'critical' : stockPercentage <= 30 ? 'low' : 'normal';

  // Get the appropriate icon based on category
  const getIcon = () => {
    switch (category) {
      case 'Water':
        return <Droplet size={18} />;
      case 'Ice':
        return <ShoppingBag size={18} />;
      case 'Accessory':
        return <Package size={18} />;
      default:
        return <ShoppingBag size={18} />;
    }
  };

  // Get background color based on category
  const getBgColor = () => {
    switch (category) {
      case 'Water':
        return 'bg-blue-100';
      case 'Ice':
        return 'bg-cyan-100';
      case 'Accessory':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  // Get text color based on category
  const getTextColor = () => {
    switch (category) {
      case 'Water':
        return 'text-blue-600';
      case 'Ice':
        return 'text-cyan-600';
      case 'Accessory':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="border border-gray-100 rounded-lg p-3 bg-white">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className={`p-2 rounded-md mr-3 ${getBgColor()}`}>
            <div className={getTextColor()}>{getIcon()}</div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">{price}</p>
          </div>
        </div>
        
        {stockStatus !== 'normal' && (
          <div className={`flex items-center text-xs font-medium ${
            stockStatus === 'low' ? 'text-yellow-600' : 'text-red-600'
          }`}>
            <AlertTriangle size={14} className="mr-1" />
            <span>{stockStatus === 'low' ? 'Low Stock' : 'Critical'}</span>
          </div>
        )}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${
            stockStatus === 'normal' ? 'bg-green-600' :
            stockStatus === 'low' ? 'bg-yellow-500' : 'bg-red-600'
          }`}
          style={{ width: `${stockPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">{stock} units</span>
        <span className="text-xs text-gray-500">Max: {maxStock}</span>
      </div>
    </div>
  );
};

export default ProductCard; 