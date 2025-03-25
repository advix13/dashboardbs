'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Calendar, 
  Download, 
  FileText, 
  Filter,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  BarChart,
  Share2,
  Printer,
  Package,
  Wallet,
  ChevronRight
} from 'lucide-react';

import RevenueChart from '@/components/reports/RevenueChart';
import CategoryChart from '@/components/reports/CategoryChart';
import CustomerAcquisitionChart from '@/components/reports/CustomerAcquisitionChart';

// Sample data for charts and analytics
const sampleData = {
  revenueByMonth: [
    { month: 'Jan', water: 12500, ice: 7800, accessories: 2200 },
    { month: 'Feb', water: 13200, ice: 8100, accessories: 2500 },
    { month: 'Mar', water: 14100, ice: 9200, accessories: 2700 },
    { month: 'Apr', water: 15500, ice: 9800, accessories: 3100 },
    { month: 'May', water: 16200, ice: 10500, accessories: 3300 },
    { month: 'Jun', water: 18100, ice: 11200, accessories: 3500 }
  ],
  topProducts: [
    { name: 'Water Bottle - 500ml', sales: 1250, revenue: 6250 },
    { name: 'Water Gallon - 5L', sales: 820, revenue: 12300 },
    { name: 'Ice Bag - 2kg', sales: 950, revenue: 9500 },
    { name: 'Water Bottle - 1L', sales: 780, revenue: 4680 },
    { name: 'Ice Bag - 5kg', sales: 650, revenue: 9750 }
  ],
  salesByCategory: [
    { category: 'Water', percentage: 58, value: 52500 },
    { category: 'Ice', percentage: 32, value: 29000 },
    { category: 'Accessories', percentage: 10, value: 9000 }
  ],
  customerInsights: {
    totalCustomers: 267,
    newCustomers: 24,
    returningCustomers: 183,
    averageOrderValue: 185.50,
    topCustomer: 'Riverside Resort & Spa',
    topCustomerSpent: 8750
  },
  inventoryMetrics: {
    totalProducts: 15,
    lowStockProducts: 4,
    outOfStockProducts: 1,
    averageTurnoverRate: '6.2 days',
    highestDemand: 'Water Bottle - 500ml',
    lowestDemand: 'Premium Glass Cups (set)'
  },
  // Add fixed customer acquisition data
  customerAcquisition: [
    { month: 'J', percentage: 45 },
    { month: 'J', percentage: 63 },
    { month: 'A', percentage: 41 },
    { month: 'S', percentage: 72 },
    { month: 'O', percentage: 53 },
    { month: 'N', percentage: 64 },
    { month: 'D', percentage: 55 },
    { month: 'J', percentage: 75 },
    { month: 'F', percentage: 56 },
    { month: 'M', percentage: 31 },
    { month: 'A', percentage: 78 },
    { month: 'M', percentage: 47 }
  ]
};

const reportTypes = [
  {
    id: 'sales',
    name: 'Sales Analysis', 
    description: 'Revenue, orders, and product performance',
    icon: <Wallet size={18} />
  },
  { 
    id: 'inventory',
    name: 'Inventory Reports', 
    description: 'Stock levels, movements, and valuation',
    icon: <LineChart size={18} />
  },
  { 
    id: 'customers',
    name: 'Customer Insights', 
    description: 'Customer behavior and demographics',
    icon: <PieChart size={18} />
  },
  { 
    id: 'financial',
    name: 'Financial Reports', 
    description: 'Profit & loss, expenses, revenue',
    icon: <Wallet size={18} />
  }
];

export default function ReportsPage() {
  // State for active time period and report type
  const [timePeriod, setTimePeriod] = useState('6months');
  const [activeReportType, setActiveReportType] = useState('sales');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-500">Gain insights into your business performance</p>
        </div>
        <div className="flex space-x-2">
          <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md flex items-center">
            <Share2 size={16} className="mr-2" />
            Share
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md flex items-center">
            <Printer size={16} className="mr-2" />
            Print
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md flex items-center">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Time period and report type filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setActiveReportType(report.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm ${
                  activeReportType === report.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {report.icon}
                <span className="ml-2">{report.name}</span>
              </button>
            ))}
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
          </div>
        </div>
      </div>

      {/* Dashboard Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold">45,250,000 CFA</h3>
              <div className="flex items-center mt-1 text-green-600 text-sm">
                <TrendingUp size={14} className="mr-1" />
                <span>+12.5% from last period</span>
              </div>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <DollarSign size={20} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <h3 className="text-2xl font-bold">1,842</h3>
              <div className="flex items-center mt-1 text-green-600 text-sm">
                <TrendingUp size={14} className="mr-1" />
                <span>+8.2% from last period</span>
              </div>
            </div>
            <div className="bg-purple-100 p-2 rounded-md">
              <ShoppingCart size={20} className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg. Order Value</p>
              <h3 className="text-2xl font-bold">24,565 CFA</h3>
              <div className="flex items-center mt-1 text-green-600 text-sm">
                <TrendingUp size={14} className="mr-1" />
                <span>+3.7% from last period</span>
              </div>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
              <BarChart size={20} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Customers</p>
              <h3 className="text-2xl font-bold">267</h3>
              <div className="flex items-center mt-1 text-green-600 text-sm">
                <TrendingUp size={14} className="mr-1" />
                <span>+5.3% from last period</span>
              </div>
            </div>
            <div className="bg-orange-100 p-2 rounded-md">
              <Users size={20} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Revenue Trend</h3>
          </div>
          {/* Updated Revenue chart */}
          <RevenueChart data={sampleData.revenueByMonth} timePeriod={timePeriod} />
        </div>

        {/* Sales Distribution by Category */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Sales by Category</h3>
          </div>
          {/* Updated Category chart */}
          <CategoryChart data={sampleData.salesByCategory} />
        </div>
      </div>

      {/* Additional Reports Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-medium">Top Products</h3>
            <Link href="/reports/products" className="text-blue-600 text-sm hover:underline">
              See All Products
            </Link>
          </div>
          <div className="p-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units Sold
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleData.topProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-900">{product.sales.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900">{product.revenue.toLocaleString()} CFA</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-medium">Customer Insights</h3>
            <Link href="/reports/customers" className="text-blue-600 text-sm hover:underline">
              View Customer Reports
            </Link>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-md p-3">
                <div className="text-sm text-gray-500 mb-1">Total Customers</div>
                <div className="text-xl font-bold">{sampleData.customerInsights.totalCustomers}</div>
              </div>
              <div className="bg-gray-50 rounded-md p-3">
                <div className="text-sm text-gray-500 mb-1">New Customers</div>
                <div className="text-xl font-bold">{sampleData.customerInsights.newCustomers}</div>
                <div className="text-xs text-green-600">This month</div>
              </div>
              <div className="bg-gray-50 rounded-md p-3">
                <div className="text-sm text-gray-500 mb-1">Returning Customers</div>
                <div className="text-xl font-bold">{sampleData.customerInsights.returningCustomers}</div>
              </div>
              <div className="bg-gray-50 rounded-md p-3">
                <div className="text-sm text-gray-500 mb-1">Avg. Order Value</div>
                <div className="text-xl font-bold">{sampleData.customerInsights.averageOrderValue} CFA</div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-sm font-medium mb-2">Top Customer</h4>
              <div className="bg-blue-50 rounded-md p-3">
                <div className="text-lg font-medium text-gray-900">{sampleData.customerInsights.topCustomer}</div>
                <div className="flex justify-between mt-1">
                  <div className="text-sm text-gray-500">Total spent</div>
                  <div className="text-sm font-medium">{sampleData.customerInsights.topCustomerSpent} CFA</div>
                </div>
              </div>
            </div>
            
            {/* Updated Customer Acquisition Chart */}
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Customer Acquisition</h4>
              <CustomerAcquisitionChart data={sampleData.customerAcquisition} />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports Section - NEW SECTION */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium">Detailed Reports</h3>
          <p className="text-sm text-gray-500 mt-1">View comprehensive analysis for specific business areas</p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sales Report Card */}
            <Link href="/reports/sales" className="block border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
              <div className="p-4">
                <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <BarChart3 size={20} className="text-blue-600" />
                </div>
                <h4 className="font-medium mb-1">Sales Performance</h4>
                <p className="text-sm text-gray-500 mb-3">Revenue trends, product performance, and sales channel analysis</p>
                <div className="text-blue-600 text-sm font-medium">View detailed report →</div>
              </div>
            </Link>

            {/* Customer Report Card */}
            <Link href="/reports/customers" className="block border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
              <div className="p-4">
                <div className="bg-purple-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <Users size={20} className="text-purple-600" />
                </div>
                <h4 className="font-medium mb-1">Customer Analytics</h4>
                <p className="text-sm text-gray-500 mb-3">Customer segments, retention metrics, and purchasing patterns</p>
                <div className="text-blue-600 text-sm font-medium">View detailed report →</div>
              </div>
            </Link>

            {/* Inventory Report Card */}
            <Link href="/reports/inventory" className="block border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
              <div className="p-4">
                <div className="bg-green-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <Package size={20} className="text-green-600" />
                </div>
                <h4 className="font-medium mb-1">Inventory Analytics</h4>
                <p className="text-sm text-gray-500 mb-3">Stock turnover, product performance, and inventory valuation</p>
                <div className="text-blue-600 text-sm font-medium">View detailed report →</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium">Available Reports</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/reports/sales" className="block group">
              <div className="border border-gray-200 rounded-md p-4 hover:border-blue-500 hover:shadow-sm transition">
                <div className="flex items-start justify-between">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <BarChart3 size={20} className="text-blue-600" />
                  </div>
                  <div className="text-xs text-gray-500">Last generated: Today</div>
                </div>
                <h4 className="mt-4 font-medium group-hover:text-blue-600">Sales Performance</h4>
                <p className="mt-1 text-sm text-gray-500">Complete breakdown of sales by product, category and time period</p>
              </div>
            </Link>
            
            <Link href="/reports/inventory" className="block group">
              <div className="border border-gray-200 rounded-md p-4 hover:border-blue-500 hover:shadow-sm transition">
                <div className="flex items-start justify-between">
                  <div className="bg-green-100 p-2 rounded-md">
                    <LineChart size={20} className="text-green-600" />
                  </div>
                  <div className="text-xs text-gray-500">Last generated: Yesterday</div>
                </div>
                <h4 className="mt-4 font-medium group-hover:text-blue-600">Inventory Status</h4>
                <p className="mt-1 text-sm text-gray-500">Current stock levels, turnover rates, and restock requirements</p>
              </div>
            </Link>
            
            <Link href="/reports/customers" className="block group">
              <div className="border border-gray-200 rounded-md p-4 hover:border-blue-500 hover:shadow-sm transition">
                <div className="flex items-start justify-between">
                  <div className="bg-purple-100 p-2 rounded-md">
                    <Users size={20} className="text-purple-600" />
                  </div>
                  <div className="text-xs text-gray-500">Last generated: 2 days ago</div>
                </div>
                <h4 className="mt-4 font-medium group-hover:text-blue-600">Customer Analysis</h4>
                <p className="mt-1 text-sm text-gray-500">Customer demographics, purchase patterns, and loyalty metrics</p>
              </div>
            </Link>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/reports/financial" className="block group">
              <div className="border border-gray-200 rounded-md p-4 hover:border-blue-500 hover:shadow-sm transition">
                <div className="flex items-start justify-between">
                  <div className="bg-amber-100 p-2 rounded-md">
                    <DollarSign size={20} className="text-amber-600" />
                  </div>
                  <div className="text-xs text-gray-500">Last generated: 3 days ago</div>
                </div>
                <h4 className="mt-4 font-medium group-hover:text-blue-600">Financial Summary</h4>
                <p className="mt-1 text-sm text-gray-500">Revenue, costs, profit margins, and growth trends</p>
              </div>
            </Link>
            
            <Link href="/reports/generate" className="block group">
              <div className="border border-gray-200 rounded-md p-4 hover:border-blue-500 hover:shadow-sm transition">
                <div className="flex items-start justify-between">
                  <div className="bg-cyan-100 p-2 rounded-md">
                    <FileText size={20} className="text-cyan-600" />
                  </div>
                  <div className="text-xs text-gray-500">Custom reports</div>
                </div>
                <h4 className="mt-4 font-medium group-hover:text-blue-600">Generate Custom Report</h4>
                <p className="mt-1 text-sm text-gray-500">Create a tailored report with your selected metrics and parameters</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 