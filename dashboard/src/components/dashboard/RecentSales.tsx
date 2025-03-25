'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

type SaleItem = {
  id: number;
  customer: string;
  product: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  change: number;
};

const sampleData: SaleItem[] = [
  {
    id: 1,
    customer: 'Chez Maman Restaurant',
    product: 'Water Bottle - 500ml (x24)',
    amount: '12,000 CFA',
    status: 'completed',
    date: 'Today, 12:42 PM',
    change: 4.5
  },
  {
    id: 2,
    customer: 'Hotel Magnificient',
    product: 'Ice Bag - 5kg (x10)',
    amount: '35,000 CFA',
    status: 'completed',
    date: 'Today, 10:28 AM',
    change: 1.8
  },
  {
    id: 3,
    customer: 'Le Petit Café',
    product: 'Water Gallon - 5L (x5)',
    amount: '22,500 CFA',
    status: 'pending',
    date: 'Today, 09:15 AM',
    change: -2.4
  },
  {
    id: 4,
    customer: 'Beach Resort',
    product: 'Ice Cubes - Premium (x15)',
    amount: '45,000 CFA',
    status: 'completed',
    date: 'Yesterday, 16:42 PM',
    change: 8.7
  },
  {
    id: 5,
    customer: 'City Supermarket',
    product: 'Water Bottle - 1L (x36)',
    amount: '54,000 CFA',
    status: 'failed',
    date: 'Yesterday, 14:30 PM',
    change: -5.2
  }
];

const RecentSales = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Sales</h2>
        <button className="text-blue-600 text-sm hover:underline">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleData.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50">
                <td className="py-3 text-sm text-gray-800 font-medium">{sale.customer}</td>
                <td className="py-3 text-sm text-gray-600">{sale.product}</td>
                <td className="py-3 text-sm font-medium text-gray-800">{sale.amount}</td>
                <td className="py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sale.status === 'completed' ? 'bg-green-100 text-green-800' :
                    sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-600">{sale.date}</td>
                <td className="py-3 text-sm">
                  <div className={`flex items-center ${
                    sale.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {sale.change >= 0 ? 
                      <ArrowUpRight size={16} className="mr-1" /> : 
                      <ArrowDownRight size={16} className="mr-1" />
                    }
                    <span>{Math.abs(sale.change)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSales; 