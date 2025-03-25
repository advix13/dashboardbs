'use client';

import React from 'react';
import { Star, ShoppingBag, Tag, Users, Droplet, BarChart3, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';

const DashboardCards = () => {
  return (
    <div className="w-full bg-gray-50 rounded-lg">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-3 h-auto md:h-64">
          {/* Top Card - Takes 1/2 of the column height */}
          <div className="flex-1 min-h-[120px] md:min-h-0">
            <MetricCard 
              icon={<Star size={18} />}
              iconBgColor="bg-amber-200"
              iconColor="text-amber-600"
              title="Customer Satisfaction"
              value="4.7"
            />
          </div>
          
          {/* Bottom Card - Takes 1/2 of the column height */}
          <div className="flex-1 min-h-[120px] md:min-h-0">
            <MetricCard 
              icon={<Droplet size={18} />}
              iconBgColor="bg-emerald-200"
              iconColor="text-emerald-600"
              title="Water Stock Level"
              value="56,280"
              change={{
                value: "+8%",
                positive: true
              }}
            />
          </div>
        </div>
        
        {/* Column 2 */}
        <div className="flex flex-col gap-3 h-auto md:h-64">
          {/* Top Card */}
          <div className="flex-1 min-h-[120px] md:min-h-0">
            <MetricCard 
              icon={<ShoppingBag size={18} />}
              iconBgColor="bg-blue-200"
              iconColor="text-blue-600"
              title="Active Products"
              value="24"
              change={{
                value: "+2",
                positive: true
              }}
            />
          </div>
          
          {/* Bottom Card */}
          <div className="flex-1 min-h-[120px] md:min-h-0">
            <MetricCard 
              icon={<BarChart3 size={18} />}
              iconBgColor="bg-rose-200"
              iconColor="text-rose-600"
              title="Ice Sales"
              value="12,543"
              change={{
                value: "+12%",
                positive: true
              }}
            />
          </div>
        </div>
        
        {/* Column 3 - Pending Orders & Active Customers */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 h-auto md:h-64 col-span-2 md:col-span-1">
          {/* Pending Orders */}
          <div className="flex-1 min-h-[120px] md:min-h-0">
            <MetricCard 
              icon={<Tag size={18} />}
              iconBgColor="bg-orange-200"
              iconColor="text-orange-600"
              title="Pending Orders"
              value="18"
              change={{
                value: "+3",
                positive: true
              }}
            />
          </div>
          
          {/* Active Customers */}
          <div className="flex-1 min-h-[120px] md:min-h-0">
            <MetricCard 
              icon={<Users size={18} />}
              iconBgColor="bg-purple-200"
              iconColor="text-purple-600"
              title="Active Customers"
              value="798"
              change={{
                value: "+12",
                positive: true
              }}
            />
          </div>
        </div>

        {/* Column 4 - Revenue Card (Desktop) */}
        <div className="hidden md:block h-64">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg p-6 h-full">
            <div className="flex flex-col justify-center h-full">
              <h3 className="text-3xl font-bold mb-2">15,898,000 CFA</h3>
              <p className="text-lg mb-1">Total Revenue</p>
              <p className="text-sm text-blue-100 mb-6">(Monthly Sales Value)</p>
              <div className="flex items-center">
                <p className="text-lg mr-2">Monthly Growth:</p>
                <div className="flex items-center text-green-300">
                  <TrendingUp size={20} className="mr-1" />
                  <span className="text-lg font-semibold">+8.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Card (Mobile Only) */}
      <div className="md:hidden p-4 pt-0">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold mb-2">15,898,000 CFA</h3>
            <p className="text-lg mb-1">Total Revenue</p>
            <p className="text-sm text-blue-100 mb-6">(Monthly Sales Value)</p>
            <div className="flex items-center">
              <p className="text-lg mr-2">Monthly Growth:</p>
              <div className="flex items-center text-green-300">
                <TrendingUp size={20} className="mr-1" />
                <span className="text-lg font-semibold">+8.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards; 