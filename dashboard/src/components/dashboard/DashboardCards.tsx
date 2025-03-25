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
        
        {/* Column 3 */}
        <div className="flex flex-col gap-3 h-auto md:h-64">
          {/* Top Card */}
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
          
          {/* Bottom Card */}
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
        
        {/* Column 4 - Large Card */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md shadow-sm flex flex-col justify-center text-white h-auto md:h-64 min-h-[240px]">
          <div className="text-center p-4">
            <p className="text-xl sm:text-2xl font-bold mb-1">15,898,000 CFA</p>
            <p className="text-xs mb-2">Total Revenue</p>
            <p className="text-xs mb-4 opacity-80">(Monthly Sales Value)</p>
            <div className="border-t border-white/20 pt-3">
              <p className="text-xs">Monthly Growth:</p>
              <div className="flex items-center justify-center">
                <TrendingUp size={14} className="mr-1" />
                <p className="text-base font-medium">+8.7%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards; 