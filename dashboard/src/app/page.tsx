'use client';

import React from 'react';
import DashboardCards from '@/components/dashboard/DashboardCards';
import RecentSales from '@/components/dashboard/RecentSales';
import StockLevels from '@/components/dashboard/StockLevels';
import Products from '@/components/dashboard/Products';

export default function HomePage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm md:text-base">Welcome to BlueSpring dashboard</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <select className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md bg-white text-sm">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <DashboardCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Recent Sales */}
          <RecentSales />
          
          {/* Products */}
          <Products />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-4 md:space-y-6">
          <StockLevels />
        </div>
      </div>
    </div>
  );
}
