'use client';

import React from 'react';
import { Droplet, AlertTriangle } from 'lucide-react';

type StockItem = {
  id: number;
  name: string;
  category: 'Water' | 'Ice';
  currentStock: number;
  minStock: number;
  maxStock: number;
  status: 'normal' | 'low' | 'critical';
};

const stockData: StockItem[] = [
  {
    id: 1,
    name: 'Water Bottle - 500ml',
    category: 'Water',
    currentStock: 1250,
    minStock: 200,
    maxStock: 2000,
    status: 'normal'
  },
  {
    id: 2,
    name: 'Water Bottle - 1L',
    category: 'Water',
    currentStock: 850,
    minStock: 150,
    maxStock: 1500,
    status: 'normal'
  },
  {
    id: 3,
    name: 'Water Gallon - 5L',
    category: 'Water',
    currentStock: 120,
    minStock: 50,
    maxStock: 500,
    status: 'normal'
  },
  {
    id: 4,
    name: 'Ice Bag - 2kg',
    category: 'Ice',
    currentStock: 75,
    minStock: 100,
    maxStock: 800,
    status: 'low'
  },
  {
    id: 5,
    name: 'Ice Bag - 5kg',
    category: 'Ice',
    currentStock: 15,
    minStock: 50,
    maxStock: 400,
    status: 'critical'
  }
];

const StockLevels = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Stock Levels</h2>
        <button className="text-blue-600 text-sm hover:underline">Restock</button>
      </div>
      
      <div className="space-y-3">
        {stockData.map((item) => (
          <div key={item.id} className="border border-gray-100 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className={`p-2 rounded-md mr-3 ${
                  item.category === 'Water' ? 'bg-blue-100' : 'bg-cyan-100'
                }`}>
                  <Droplet className={`${
                    item.category === 'Water' ? 'text-blue-600' : 'text-cyan-600'
                  }`} size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
              </div>
              
              {item.status !== 'normal' && (
                <div className={`flex items-center text-xs font-medium ${
                  item.status === 'low' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  <AlertTriangle size={14} className="mr-1" />
                  <span>{item.status === 'low' ? 'Low Stock' : 'Critical'}</span>
                </div>
              )}
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  item.status === 'normal' ? 'bg-green-600' :
                  item.status === 'low' ? 'bg-yellow-500' : 'bg-red-600'
                }`}
                style={{ width: `${(item.currentStock / item.maxStock) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">{item.currentStock} units</span>
              <span className="text-xs text-gray-500">Max: {item.maxStock}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockLevels; 