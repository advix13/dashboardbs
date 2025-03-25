'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  BarChart3,
  Calendar,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  RefreshCw,
  ChevronDown,
  ArrowDownUp
} from 'lucide-react';

// Sample data for sales analysis
const salesData = {
  metrics: {
    totalRevenue: { value: 90500, change: 12.5 },
    totalOrders: { value: 1842, change: 8.2 },
    averageOrderValue: { value: 49.13, change: 3.7 },
    conversionRate: { value: 3.6, change: -0.8 }
  },
  monthlySales: [
    { month: 'Jan', revenue: 65200, orders: 1284, average: 50.78 },
    { month: 'Feb', revenue: 68900, orders: 1356, average: 50.81 },
    { month: 'Mar', revenue: 73500, orders: 1480, average: 49.66 },
    { month: 'Apr', revenue: 79800, orders: 1612, average: 49.50 },
    { month: 'May', revenue: 84100, orders: 1720, average: 48.90 },
    { month: 'Jun', revenue: 90500, orders: 1842, average: 49.13 }
  ],
  topSellingProducts: [
    { name: 'Water Bottle - 500ml', quantity: 1250, revenue: 6250, growth: 15.4 },
    { name: 'Water Gallon - 5L', quantity: 820, revenue: 12300, growth: 20.8 },
    { name: 'Ice Bag - 2kg', quantity: 950, revenue: 9500, growth: 8.6 },
    { name: 'Water Bottle - 1L', quantity: 780, revenue: 4680, growth: 4.2 },
    { name: 'Ice Bag - 5kg', quantity: 650, revenue: 9750, growth: 12.5 },
    { name: 'Premium Water Dispenser', quantity: 120, revenue: 7800, growth: 25.7 },
    { name: 'Smart Water Filter', quantity: 85, revenue: 5525, growth: 30.8 },
    { name: 'Ice Cubes - Premium', quantity: 510, revenue: 3570, growth: -2.3 },
  ],
  salesByCategory: [
    { category: 'Water', revenue: 52500, percentage: 58, growth: 15.2 },
    { category: 'Ice', revenue: 29000, percentage: 32, growth: 9.8 },
    { category: 'Accessories', revenue: 9000, percentage: 10, growth: 22.5 }
  ],
  salesByChannel: [
    { channel: 'Direct Sales', revenue: 45250, percentage: 50, growth: 8.6 },
    { channel: 'Distributors', revenue: 27150, percentage: 30, growth: 12.3 },
    { channel: 'Online Store', revenue: 18100, percentage: 20, growth: 28.7 }
  ],
  salesByRegion: [
    { region: 'North', revenue: 29865, percentage: 33, growth: 14.2 },
    { region: 'South', revenue: 24435, percentage: 27, growth: 10.8 },
    { region: 'East', revenue: 18100, percentage: 20, growth: 8.5 },
    { region: 'West', revenue: 18100, percentage: 20, growth: 15.9 }
  ],
};

export default function SalesReportPage() {
  // State for time period
  const [timePeriod, setTimePeriod] = useState('6months');
  const [sortField, setSortField] = useState('revenue');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Toggle sort direction or change sort field
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Sort products by selected field
  const sortedProducts = [...salesData.topSellingProducts].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return (a[sortField as keyof typeof a] as number) > (b[sortField as keyof typeof b] as number) 
      ? multiplier 
      : -multiplier;
  });

  return (
    <div>
      <div className="mb-6">
        <Link href="/reports" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft size={16} className="mr-1" />
          Back to Reports
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Sales Performance</h1>
            <p className="text-gray-500">Detailed analysis of your sales and revenue</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md appearance-none bg-white"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="6months">Last 6 months</option>
                <option value="1year">Last year</option>
                <option value="custom">Custom range</option>
              </select>
            </div>
            <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md flex items-center">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold">{salesData.metrics.totalRevenue.value.toLocaleString()} CFA</h3>
            <div className={`flex items-center mt-1 text-sm ${salesData.metrics.totalRevenue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {salesData.metrics.totalRevenue.change >= 0 ? 
                <TrendingUp size={14} className="mr-1" /> : 
                <TrendingDown size={14} className="mr-1" />
              }
              <span>{salesData.metrics.totalRevenue.change >= 0 ? '+' : ''}{salesData.metrics.totalRevenue.change}% from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <h3 className="text-2xl font-bold">{salesData.metrics.totalOrders.value.toLocaleString()}</h3>
            <div className={`flex items-center mt-1 text-sm ${salesData.metrics.totalOrders.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {salesData.metrics.totalOrders.change >= 0 ? 
                <TrendingUp size={14} className="mr-1" /> : 
                <TrendingDown size={14} className="mr-1" />
              }
              <span>{salesData.metrics.totalOrders.change >= 0 ? '+' : ''}{salesData.metrics.totalOrders.change}% from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Avg. Order Value</p>
            <h3 className="text-2xl font-bold">{salesData.metrics.averageOrderValue.value.toFixed(2)} CFA</h3>
            <div className={`flex items-center mt-1 text-sm ${salesData.metrics.averageOrderValue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {salesData.metrics.averageOrderValue.change >= 0 ? 
                <TrendingUp size={14} className="mr-1" /> : 
                <TrendingDown size={14} className="mr-1" />
              }
              <span>{salesData.metrics.averageOrderValue.change >= 0 ? '+' : ''}{salesData.metrics.averageOrderValue.change}% from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
            <h3 className="text-2xl font-bold">{salesData.metrics.conversionRate.value}%</h3>
            <div className={`flex items-center mt-1 text-sm ${salesData.metrics.conversionRate.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {salesData.metrics.conversionRate.change >= 0 ? 
                <TrendingUp size={14} className="mr-1" /> : 
                <TrendingDown size={14} className="mr-1" />
              }
              <span>{salesData.metrics.conversionRate.change >= 0 ? '+' : ''}{salesData.metrics.conversionRate.change}% from last period</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium">Monthly Sales Trend</h3>
        </div>
        <div className="p-4">
          <div className="h-80 w-full bg-gray-50 rounded-md border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-500">Monthly Revenue & Orders</div>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-600">Orders</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-600">Avg. Order</span>
                </div>
              </div>
            </div>
            
            {/* Graph visualization */}
            <div className="flex h-60 items-end space-x-8 mt-4">
              {salesData.monthlySales.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="relative w-full flex flex-col items-center mb-2">
                    {/* Revenue bar */}
                    <div 
                      className="w-10 bg-blue-500 rounded-t-sm absolute bottom-0" 
                      style={{ height: `${(data.revenue / 100000) * 100}%` }}
                      title={`Revenue: ${data.revenue} CFA`}
                    ></div>
                    
                    {/* Orders bar */}
                    <div 
                      className="w-10 bg-green-500 rounded-t-sm absolute bottom-0 left-12" 
                      style={{ height: `${(data.orders / 2000) * 100}%` }}
                      title={`Orders: ${data.orders}`}
                    ></div>
                    
                    {/* Average order line (positioned based on value) */}
                    <div 
                      className="w-24 h-1 bg-purple-500 absolute" 
                      style={{ bottom: `${(data.average / 60) * 100}%`, left: '-4px' }}
                      title={`Average: ${data.average.toFixed(2)} CFA`}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{data.month}</div>
                </div>
              ))}
            </div>
            
            {/* Y-axis labels */}
            <div className="flex justify-between mt-4">
              <div className="text-xs text-gray-500">0 CFA</div>
              <div className="text-xs text-gray-500">100,000 CFA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Sales by Category */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Sales by Category</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {salesData.salesByCategory.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">{category.category}</div>
                    <div className="text-sm text-gray-500">{category.revenue.toLocaleString()} CFA ({category.percentage}%)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-cyan-500' :
                        'bg-purple-500'
                      }`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs mt-1 ${category.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {category.growth >= 0 ? '+' : ''}{category.growth}% from last period
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales by Channel */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Sales by Channel</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {salesData.salesByChannel.map((channel, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">{channel.channel}</div>
                    <div className="text-sm text-gray-500">{channel.revenue.toLocaleString()} CFA ({channel.percentage}%)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        index === 0 ? 'bg-green-500' : 
                        index === 1 ? 'bg-orange-500' :
                        'bg-pink-500'
                      }`}
                      style={{ width: `${channel.percentage}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs mt-1 ${channel.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {channel.growth >= 0 ? '+' : ''}{channel.growth}% from last period
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales by Region */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Sales by Region</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {salesData.salesByRegion.map((region, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">{region.region}</div>
                    <div className="text-sm text-gray-500">{region.revenue.toLocaleString()} CFA ({region.percentage}%)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        index === 0 ? 'bg-indigo-500' : 
                        index === 1 ? 'bg-amber-500' :
                        index === 2 ? 'bg-emerald-500' :
                        'bg-rose-500'
                      }`}
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs mt-1 ${region.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {region.growth >= 0 ? '+' : ''}{region.growth}% from last period
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium">Top Selling Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('quantity')}
                >
                  <div className="flex items-center justify-end">
                    Quantity
                    <div className="ml-1">
                      {sortField === 'quantity' ? (
                        sortDirection === 'asc' ? '↑' : '↓'
                      ) : (
                        <ArrowDownUp size={14} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('revenue')}
                >
                  <div className="flex items-center justify-end">
                    Revenue
                    <div className="ml-1">
                      {sortField === 'revenue' ? (
                        sortDirection === 'asc' ? '↑' : '↓'
                      ) : (
                        <ArrowDownUp size={14} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('growth')}
                >
                  <div className="flex items-center justify-end">
                    Growth
                    <div className="ml-1">
                      {sortField === 'growth' ? (
                        sortDirection === 'asc' ? '↑' : '↓'
                      ) : (
                        <ArrowDownUp size={14} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-900">{product.quantity.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900">{product.revenue.toLocaleString()} CFA</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`text-sm font-medium ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth >= 0 ? '+' : ''}{product.growth}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium">Insights & Recommendations</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Highlights</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">•</div>
                  <div>Overall revenue grew by <span className="font-medium">12.5%</span> compared to the previous period.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">•</div>
                  <div><span className="font-medium">Water Gallon - 5L</span> continues to be the highest revenue generator.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">•</div>
                  <div>The <span className="font-medium">Online Store</span> channel is growing fastest at <span className="font-medium">28.7%</span>.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-red-600 mr-2">•</div>
                  <div>Conversion rate decreased slightly by <span className="font-medium">0.8%</span> compared to the previous period.</div>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">1.</div>
                  <div>Focus marketing efforts on <span className="font-medium">Smart Water Filters</span> which show the highest growth.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">2.</div>
                  <div>Investigate the declining performance of <span className="font-medium">Ice Cubes - Premium</span>.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">3.</div>
                  <div>Invest more in the <span className="font-medium">Online Store</span> channel to capitalize on its growth.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">4.</div>
                  <div>Develop strategies to improve conversion rate, which has seen a slight decline.</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 