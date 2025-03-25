'use client';

import React from 'react';
import DashboardCards from '@/components/dashboard/DashboardCards';
import RecentSales from '@/components/dashboard/RecentSales';
import StockLevels from '@/components/dashboard/StockLevels';
import Products from '@/components/dashboard/Products';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome to BlueSpring dashboard</p>
        </div>
        <div className="flex items-center space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <DashboardCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-0">
          {/* Recent Sales */}
          <RecentSales />
          
          {/* Products - Directly below Recent Sales with no gap */}
          <div className="mt-6">
            <Products />
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div>
          <StockLevels />
        </div>
      </div>
    </div>
  );
}
