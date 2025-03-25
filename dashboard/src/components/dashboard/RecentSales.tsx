'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from 'lucide-react';

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

const ITEMS_PER_PAGE = 5;

const RecentSales = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sampleData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sampleData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Sales</h2>
        <button className="text-blue-600 text-sm hover:underline">View All</button>
      </div>
      
      {/* Table container with horizontal scroll */}
      <div className="relative">
        {/* Scroll indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 md:hidden"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 md:hidden"></div>
        
        {/* Scrollable table wrapper */}
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Customer</th>
                  <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Product</th>
                  <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Amount</th>
                  <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                  <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Change</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium whitespace-nowrap">{sale.customer}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 whitespace-nowrap">{sale.product}</td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">{sale.amount}</td>
                    <td className="py-4 px-4 text-sm whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        sale.status === 'completed' ? 'bg-green-100 text-green-800' :
                        sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 whitespace-nowrap">{sale.date}</td>
                    <td className="py-4 px-4 text-sm whitespace-nowrap">
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
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4 -mx-4 -mb-4 rounded-b-lg bg-gray-50">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md 
              ${currentPage === 1 
                ? 'text-gray-300 bg-white cursor-not-allowed' 
                : 'text-gray-700 bg-white hover:bg-gray-50'}`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
              ${currentPage === totalPages 
                ? 'text-gray-300 bg-white cursor-not-allowed' 
                : 'text-gray-700 bg-white hover:bg-gray-50'}`}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(startIndex + ITEMS_PER_PAGE, sampleData.length)}
              </span> of{' '}
              <span className="font-medium">{sampleData.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2
                  ${currentPage === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold
                    ${currentPage === index + 1
                      ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2
                  ${currentPage === totalPages 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSales; 