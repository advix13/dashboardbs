'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Calendar,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  UserCheck,
  UserPlus,
  UserMinus,
  ArrowDownUp,
  PieChart,
  BarChart
} from 'lucide-react';

// Sample data for customer analytics
const customerData = {
  metrics: {
    totalCustomers: { value: 2874, change: 15.3 },
    activeCustomers: { value: 2105, change: 8.7 },
    newCustomers: { value: 324, change: 12.5 },
    churnRate: { value: 3.2, change: -1.4 }
  },
  monthlyActivity: [
    { month: 'Jan', active: 1650, new: 220, churned: 85 },
    { month: 'Feb', active: 1785, new: 230, churned: 95 },
    { month: 'Mar', active: 1850, new: 245, churned: 80 },
    { month: 'Apr', active: 1940, new: 280, churned: 90 },
    { month: 'May', active: 2030, new: 295, churned: 105 },
    { month: 'Jun', active: 2105, new: 324, churned: 92 }
  ],
  segments: [
    { name: 'Enterprise', count: 142, percentage: 5, avgOrder: 1250, retention: 95 },
    { name: 'Small Business', count: 863, percentage: 30, avgOrder: 480, retention: 82 },
    { name: 'Distributors', count: 574, percentage: 20, avgOrder: 750, retention: 88 },
    { name: 'Retailers', count: 718, percentage: 25, avgOrder: 320, retention: 75 },
    { name: 'Individual', count: 577, percentage: 20, avgOrder: 65, retention: 62 }
  ],
  customersBySales: [
    { range: '0-50,000 CFA', count: 980, percentage: 34 },
    { range: '50,001-250,000 CFA', count: 920, percentage: 32 },
    { range: '250,001-500,000 CFA', count: 460, percentage: 16 },
    { range: '500,001-2,500,000 CFA', count: 345, percentage: 12 },
    { range: '2,500,001+ CFA', count: 169, percentage: 6 }
  ],
  customersByActivity: [
    { type: 'One-time', count: 865, percentage: 30 },
    { type: 'Occasional', count: 720, percentage: 25 },
    { type: 'Regular', count: 835, percentage: 29 },
    { type: 'Frequent', count: 454, percentage: 16 }
  ],
  topCustomers: [
    { name: 'Oceanside Resort', segment: 'Enterprise', orders: 42, totalSpent: 52500, lastOrder: '2023-06-15' },
    { name: 'Smith Distribution Co.', segment: 'Distributors', orders: 36, totalSpent: 27000, lastOrder: '2023-06-20' },
    { name: 'Mountain View Hotel', segment: 'Enterprise', orders: 28, totalSpent: 35000, lastOrder: '2023-06-18' },
    { name: 'Downtown Convenience', segment: 'Retailers', orders: 65, totalSpent: 20800, lastOrder: '2023-06-22' },
    { name: 'Sunset Cafe', segment: 'Small Business', orders: 48, totalSpent: 19200, lastOrder: '2023-06-19' },
    { name: 'Green Valley Grocers', segment: 'Retailers', orders: 57, totalSpent: 18240, lastOrder: '2023-06-21' },
    { name: 'Quick Mart Chain', segment: 'Small Business', orders: 45, totalSpent: 21600, lastOrder: '2023-06-17' },
    { name: 'Lake District Supplies', segment: 'Distributors', orders: 32, totalSpent: 24000, lastOrder: '2023-06-16' }
  ]
};

export default function CustomerReportPage() {
  // State for time period and sorting
  const [timePeriod, setTimePeriod] = useState('6months');
  const [sortField, setSortField] = useState('totalSpent');
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
  
  // Sort customers by selected field
  const sortedCustomers = [...customerData.topCustomers].sort((a, b) => {
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
            <h1 className="text-2xl font-bold">Customer Analytics</h1>
            <p className="text-gray-500">Insights into customer behavior and segmentation</p>
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
            <p className="text-sm text-gray-500 mb-1">Total Customers</p>
            <h3 className="text-2xl font-bold">{customerData.metrics.totalCustomers.value.toLocaleString()}</h3>
            <div className={`flex items-center mt-1 text-sm ${customerData.metrics.totalCustomers.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {customerData.metrics.totalCustomers.change >= 0 ? 
                <TrendingUp size={14} className="mr-1" /> : 
                <TrendingDown size={14} className="mr-1" />
              }
              <span>{customerData.metrics.totalCustomers.change >= 0 ? '+' : ''}{customerData.metrics.totalCustomers.change}% from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Active Customers</p>
            <h3 className="text-2xl font-bold">{customerData.metrics.activeCustomers.value.toLocaleString()}</h3>
            <div className={`flex items-center mt-1 text-sm ${customerData.metrics.activeCustomers.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {customerData.metrics.activeCustomers.change >= 0 ? 
                <TrendingUp size={14} className="mr-1" /> : 
                <TrendingDown size={14} className="mr-1" />
              }
              <span>{customerData.metrics.activeCustomers.change >= 0 ? '+' : ''}{customerData.metrics.activeCustomers.change}% from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">New Customers</p>
            <h3 className="text-2xl font-bold">{customerData.metrics.newCustomers.value.toLocaleString()}</h3>
            <div className={`flex items-center mt-1 text-sm ${customerData.metrics.newCustomers.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {customerData.metrics.newCustomers.change >= 0 ? 
                <TrendingUp size={14} className="mr-1" /> : 
                <TrendingDown size={14} className="mr-1" />
              }
              <span>{customerData.metrics.newCustomers.change >= 0 ? '+' : ''}{customerData.metrics.newCustomers.change}% from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Churn Rate</p>
            <h3 className="text-2xl font-bold">{customerData.metrics.churnRate.value}%</h3>
            <div className={`flex items-center mt-1 text-sm ${customerData.metrics.churnRate.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {customerData.metrics.churnRate.change < 0 ? 
                <TrendingDown size={14} className="mr-1" /> : 
                <TrendingUp size={14} className="mr-1" />
              }
              <span>{customerData.metrics.churnRate.change >= 0 ? '+' : ''}{customerData.metrics.churnRate.change}% from last period</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Activity Chart */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium">Customer Activity Trends</h3>
        </div>
        <div className="p-4">
          <div className="h-72 w-full bg-gray-50 rounded-md border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-500">Monthly Customer Activity</div>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-600">Active Customers</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-600">New Customers</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-600">Churned Customers</span>
                </div>
              </div>
            </div>
            
            {/* Graph visualization */}
            <div className="flex h-52 items-end space-x-8 mt-4">
              {customerData.monthlyActivity.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="relative w-full flex flex-col items-center mb-2">
                    {/* Active customers bar */}
                    <div 
                      className="w-10 bg-blue-500 rounded-t-sm absolute bottom-0" 
                      style={{ height: `${(data.active / 2500) * 100}%` }}
                      title={`Active: ${data.active}`}
                    ></div>
                    
                    {/* New customers bar */}
                    <div 
                      className="w-10 bg-green-500 rounded-t-sm absolute bottom-0 left-12" 
                      style={{ height: `${(data.new / 350) * 100}%` }}
                      title={`New: ${data.new}`}
                    ></div>
                    
                    {/* Churned customers bar */}
                    <div 
                      className="w-10 bg-red-500 rounded-t-sm absolute bottom-0 left-24" 
                      style={{ height: `${(data.churned / 120) * 100}%` }}
                      title={`Churned: ${data.churned}`}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{data.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Customer Segments */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Customer Segments</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {customerData.segments.map((segment, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">{segment.name}</div>
                    <div className="text-sm text-gray-500">{segment.count.toLocaleString()} ({segment.percentage}%)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        index === 0 ? 'bg-violet-600' : 
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-cyan-500' :
                        index === 3 ? 'bg-green-500' :
                        'bg-amber-500'
                      }`}
                      style={{ width: `${segment.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Avg. Order: {segment.avgOrder} CFA</span>
                    <span>Retention: {segment.retention}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customers by Activity Level */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Customers by Activity Level</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Purchase Frequency Chart */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Purchase Frequency</h4>
                <div className="space-y-3">
                  {customerData.customersByActivity.map((activity, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <div className="text-xs font-medium">{activity.type}</div>
                        <div className="text-xs text-gray-500">{activity.percentage}%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-red-400' : 
                            index === 1 ? 'bg-yellow-400' :
                            index === 2 ? 'bg-green-400' :
                            'bg-blue-400'
                          }`}
                          style={{ width: `${activity.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spending Ranges Chart */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Spending Ranges</h4>
                <div className="space-y-3">
                  {customerData.customersBySales.map((range, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <div className="text-xs font-medium">{range.range}</div>
                        <div className="text-xs text-gray-500">{range.percentage}%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-indigo-300' : 
                            index === 1 ? 'bg-indigo-400' :
                            index === 2 ? 'bg-indigo-500' :
                            index === 3 ? 'bg-indigo-600' :
                            'bg-indigo-700'
                          }`}
                          style={{ width: `${range.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium">Top Customers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Segment
                </th>
                <th 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('orders')}
                >
                  <div className="flex items-center justify-end">
                    Orders
                    <div className="ml-1">
                      {sortField === 'orders' ? (
                        sortDirection === 'asc' ? '↑' : '↓'
                      ) : (
                        <ArrowDownUp size={14} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('totalSpent')}
                >
                  <div className="flex items-center justify-end">
                    Total Spent
                    <div className="ml-1">
                      {sortField === 'totalSpent' ? (
                        sortDirection === 'asc' ? '↑' : '↓'
                      ) : (
                        <ArrowDownUp size={14} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.segment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-900">{customer.orders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900">{customer.totalSpent.toLocaleString()} CFA</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-500">
                      {new Date(customer.lastOrder).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium">Customer Insights</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Findings</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">•</div>
                  <div><span className="font-medium">Enterprise</span> customers have the highest retention rate at <span className="font-medium">95%</span>.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">•</div>
                  <div>New customer acquisition increased by <span className="font-medium">12.5%</span> compared to last period.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">•</div>
                  <div>The churn rate improved by <span className="font-medium">1.4%</span>, showing better customer retention.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-red-600 mr-2">•</div>
                  <div><span className="font-medium">Individual</span> customers have the lowest retention rate at <span className="font-medium">62%</span>.</div>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Actions</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">1.</div>
                  <div>Develop loyalty program for <span className="font-medium">Individual</span> customers to improve retention.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">2.</div>
                  <div>Focus on converting <span className="font-medium">One-time</span> buyers into repeat customers.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">3.</div>
                  <div>Create targeted promotions for the <span className="font-medium">Small Business</span> segment to increase order frequency.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">4.</div>
                  <div>Implement re-engagement campaign for customers who haven't ordered in the last 30 days.</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 