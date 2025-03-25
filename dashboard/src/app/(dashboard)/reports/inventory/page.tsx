'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Calendar,
  Download,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  RefreshCw,
  AlertTriangle,
  ArrowDownUp
} from 'lucide-react';

// Sample data for inventory analytics
const inventoryData = {
  metrics: {
    totalProducts: { value: 45, change: 5.0 },
    stockValue: { value: 182500, change: 8.7 },
    turnoverRate: { value: 4.8, change: 0.6 },
    outOfStockItems: { value: 3, change: -2 }
  },
  stockStatus: [
    { status: 'Optimal Stock', count: 28, percentage: 62 },
    { status: 'Low Stock', count: 8, percentage: 18 },
    { status: 'Overstock', count: 6, percentage: 13 },
    { status: 'Out of Stock', count: 3, percentage: 7 }
  ],
  topPerformers: [
    { name: 'Water Bottle - 500ml', turnover: 8.2, stockDays: 15, profit: 24 },
    { name: 'Water Gallon - 5L', turnover: 7.5, stockDays: 18, profit: 32 },
    { name: 'Ice Bag - 2kg', turnover: 6.8, stockDays: 20, profit: 28 },
    { name: 'Water Bottle - 1L', turnover: 5.9, stockDays: 22, profit: 26 },
    { name: 'Premium Water Dispenser', turnover: 3.2, stockDays: 42, profit: 45 }
  ],
  lowPerformers: [
    { name: 'Water Filter Replacement', turnover: 1.8, stockDays: 68, profit: 35 },
    { name: 'Luxury Water Bottle', turnover: 2.1, stockDays: 60, profit: 40 },
    { name: 'Ice Machine Small', turnover: 2.3, stockDays: 55, profit: 38 },
    { name: 'Water Testing Kit', turnover: 2.5, stockDays: 50, profit: 42 },
    { name: 'Ice Bucket Premium', turnover: 2.7, stockDays: 48, profit: 30 }
  ],
  monthlyTurnover: [
    { month: 'Jan', turnover: 3.8 },
    { month: 'Feb', turnover: 4.0 },
    { month: 'Mar', turnover: 4.2 },
    { month: 'Apr', turnover: 4.5 },
    { month: 'May', turnover: 4.6 },
    { month: 'Jun', turnover: 4.8 }
  ]
};

export default function InventoryReportPage() {
  // State for time period
  const [timePeriod, setTimePeriod] = useState('6months');
  const [sortField, setSortField] = useState('turnover');
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

  return (
    <div>
      <div className="mb-6">
        <Link href="/reports" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft size={16} className="mr-1" />
          Back to Reports
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Inventory Analytics</h1>
            <p className="text-gray-500">Analysis of stock performance and turnover rates</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md appearance-none bg-white"
              >
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
            <p className="text-sm text-gray-500 mb-1">Total Products</p>
            <h3 className="text-2xl font-bold">{inventoryData.metrics.totalProducts.value}</h3>
            <div className={`flex items-center mt-1 text-sm ${inventoryData.metrics.totalProducts.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {inventoryData.metrics.totalProducts.change >= 0 ? 
                <TrendingUp size={14} className="mr-1" /> : 
                <TrendingDown size={14} className="mr-1" />
              }
              <span>{inventoryData.metrics.totalProducts.change >= 0 ? '+' : ''}{inventoryData.metrics.totalProducts.change} from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Inventory Value</p>
            <h3 className="text-2xl font-bold">{inventoryData.metrics.stockValue.value.toLocaleString()} CFA</h3>
            <div className={`flex items-center mt-1 text-sm ${inventoryData.metrics.stockValue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {inventoryData.metrics.stockValue.change >= 0 ? 
                <TrendingUp size={14} className="mr-1" /> : 
                <TrendingDown size={14} className="mr-1" />
              }
              <span>{inventoryData.metrics.stockValue.change >= 0 ? '+' : ''}{inventoryData.metrics.stockValue.change}% from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Turnover Rate</p>
            <h3 className="text-2xl font-bold">{inventoryData.metrics.turnoverRate.value}</h3>
            <div className={`flex items-center mt-1 text-sm ${inventoryData.metrics.turnoverRate.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {inventoryData.metrics.turnoverRate.change >= 0 ? 
                <TrendingUp size={14} className="mr-1" /> : 
                <TrendingDown size={14} className="mr-1" />
              }
              <span>{inventoryData.metrics.turnoverRate.change >= 0 ? '+' : ''}{inventoryData.metrics.turnoverRate.change} from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Out of Stock Items</p>
            <h3 className="text-2xl font-bold">{inventoryData.metrics.outOfStockItems.value}</h3>
            <div className={`flex items-center mt-1 text-sm ${inventoryData.metrics.outOfStockItems.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {inventoryData.metrics.outOfStockItems.change < 0 ? 
                <TrendingDown size={14} className="mr-1" /> : 
                <TrendingUp size={14} className="mr-1" />
              }
              <span>{inventoryData.metrics.outOfStockItems.change >= 0 ? '+' : ''}{inventoryData.metrics.outOfStockItems.change} from last period</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Status & Turnover Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Stock Status */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Stock Status Distribution</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {inventoryData.stockStatus.map((status, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">{status.status}</div>
                    <div className="text-sm text-gray-500">{status.count} items ({status.percentage}%)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        index === 0 ? 'bg-green-500' : 
                        index === 1 ? 'bg-yellow-500' :
                        index === 2 ? 'bg-blue-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${status.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Turnover Trend */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Monthly Turnover Rate</h3>
          </div>
          <div className="p-4">
            <div className="h-64 w-full bg-gray-50 rounded-md border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-500">Higher is better</div>
              </div>
              
              {/* Graph visualization */}
              <div className="flex h-40 items-end space-x-8 mt-4">
                {inventoryData.monthlyTurnover.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-10 bg-blue-500 rounded-t-sm" 
                      style={{ height: `${(data.turnover / 10) * 100}%` }}
                      title={`Turnover: ${data.turnover}`}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2">{data.month}</div>
                  </div>
                ))}
              </div>
              
              {/* Y-axis labels */}
              <div className="flex justify-between mt-4">
                <div className="text-xs text-gray-500">0</div>
                <div className="text-xs text-gray-500">10</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers & Low Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Performing Products */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Top Performing Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Turnover Rate
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days in Stock
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profit Margin %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryData.topPerformers.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-green-600 font-medium">{product.turnover.toFixed(1)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-900">{product.stockDays}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900">{product.profit}%</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Performing Products */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Low Performing Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Turnover Rate
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days in Stock
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profit Margin %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryData.lowPerformers.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-red-600 font-medium">{product.turnover.toFixed(1)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-900">{product.stockDays}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900">{product.profit}%</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium">Inventory Insights & Recommendations</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Analysis</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">•</div>
                  <div>Overall inventory turnover has improved by <span className="font-medium">0.6</span> points compared to last period.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">•</div>
                  <div><span className="font-medium">Water Bottle - 500ml</span> has the highest turnover rate at <span className="font-medium">8.2</span>.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">•</div>
                  <div><span className="font-medium">Out of stock</span> items reduced by <span className="font-medium">2</span> compared to last period.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-red-600 mr-2">•</div>
                  <div><span className="font-medium">Water Filter Replacement</span> has the lowest turnover at <span className="font-medium">1.8</span> with <span className="font-medium">68 days</span> in stock.</div>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">1.</div>
                  <div>Consider promotional pricing for <span className="font-medium">Water Filter Replacement</span> and other slow-moving items.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">2.</div>
                  <div>Increase stock levels for <span className="font-medium">Water Bottle - 500ml</span> to capitalize on high turnover.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">3.</div>
                  <div>Review purchasing strategy for <span className="font-medium">Luxury Water Bottle</span> to reduce days in inventory.</div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-600 mr-2">4.</div>
                  <div>Consider bundling slow-moving items with popular products to increase overall turnover.</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 