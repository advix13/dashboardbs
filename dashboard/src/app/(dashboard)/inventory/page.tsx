'use client';

import React, { useState } from 'react';
import { 
  Droplet, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  AlertTriangle,
  RefreshCcw,
  BarChart3,
  Download
} from 'lucide-react';
import Link from 'next/link';

export default function InventoryPage() {
  // State for the active tab
  const [activeTab, setActiveTab] = useState('all');

  // Sample inventory data for different categories
  const inventoryItems = [
    { 
      id: 1, 
      name: 'Water Bottle - 500ml', 
      sku: 'WTR-B500', 
      category: 'Water', 
      currentStock: 250, 
      minStock: 50, 
      maxStock: 300, 
      locationCode: 'WH-A12',
      lastUpdated: '2024-03-15',
      status: 'Normal' // Normal, Low, Critical
    },
    { 
      id: 2, 
      name: 'Water Bottle - 1L', 
      sku: 'WTR-B1000', 
      category: 'Water', 
      currentStock: 180, 
      minStock: 40, 
      maxStock: 250, 
      locationCode: 'WH-A14',
      lastUpdated: '2024-03-14',
      status: 'Normal'
    },
    { 
      id: 3, 
      name: 'Water Gallon - 5L', 
      sku: 'WTR-G5000', 
      category: 'Water', 
      currentStock: 30, 
      minStock: 25, 
      maxStock: 100, 
      locationCode: 'WH-B05',
      lastUpdated: '2024-03-12',
      status: 'Low'
    },
    { 
      id: 4, 
      name: 'Ice Bag - 2kg', 
      sku: 'ICE-B2000', 
      category: 'Ice', 
      currentStock: 120, 
      minStock: 30, 
      maxStock: 150, 
      locationCode: 'WH-C01',
      lastUpdated: '2024-03-15',
      status: 'Normal'
    },
    { 
      id: 5, 
      name: 'Ice Bag - 5kg', 
      sku: 'ICE-B5000', 
      category: 'Ice', 
      currentStock: 85, 
      minStock: 20, 
      maxStock: 100, 
      locationCode: 'WH-C02',
      lastUpdated: '2024-03-13',
      status: 'Normal'
    },
    { 
      id: 6, 
      name: 'Ice Cubes - Premium', 
      sku: 'ICE-CP100', 
      category: 'Ice', 
      currentStock: 15, 
      minStock: 20, 
      maxStock: 80, 
      locationCode: 'WH-C04',
      lastUpdated: '2024-03-11',
      status: 'Low'
    },
    { 
      id: 7, 
      name: 'Sparkling Water - 750ml', 
      sku: 'WTR-S750', 
      category: 'Water', 
      currentStock: 0, 
      minStock: 15, 
      maxStock: 60, 
      locationCode: 'WH-A18',
      lastUpdated: '2024-03-10',
      status: 'Critical'
    },
    { 
      id: 8, 
      name: 'Water Dispenser - Basic', 
      sku: 'ACC-WD001', 
      category: 'Accessory', 
      currentStock: 12, 
      minStock: 5, 
      maxStock: 20, 
      locationCode: 'WH-D03',
      lastUpdated: '2024-03-08',
      status: 'Normal'
    },
    { 
      id: 9, 
      name: 'Ice Bucket - 1L', 
      sku: 'ACC-IB001', 
      category: 'Accessory', 
      currentStock: 8, 
      minStock: 10, 
      maxStock: 30, 
      locationCode: 'WH-D05',
      lastUpdated: '2024-03-09',
      status: 'Low'
    }
  ];

  // Filter inventory items based on active tab
  const filteredItems = activeTab === 'all' 
    ? inventoryItems 
    : activeTab === 'low-stock' 
      ? inventoryItems.filter(item => item.status === 'Low' || item.status === 'Critical')
      : inventoryItems.filter(item => item.category.toLowerCase() === activeTab);

  // Sample recent inventory movements
  const recentMovements = [
    { 
      id: 'MOV-1001', 
      date: '2024-03-15 14:30', 
      type: 'Received', 
      product: 'Water Bottle - 500ml', 
      quantity: 50, 
      user: 'John Doe',
      note: 'Weekly delivery from supplier'
    },
    { 
      id: 'MOV-1000', 
      date: '2024-03-15 11:15', 
      type: 'Sold', 
      product: 'Ice Bag - 2kg', 
      quantity: 15, 
      user: 'Sarah Brown',
      note: 'Order #ORD-985'
    },
    { 
      id: 'MOV-999', 
      date: '2024-03-14 16:45', 
      type: 'Adjusted', 
      product: 'Water Gallon - 5L', 
      quantity: -3, 
      user: 'Mike Johnson',
      note: 'Damaged during transportation'
    },
    { 
      id: 'MOV-998', 
      date: '2024-03-14 09:20', 
      type: 'Transferred', 
      product: 'Ice Cubes - Premium', 
      quantity: 10, 
      user: 'Emma Wilson',
      note: 'Transferred to secondary warehouse'
    },
    { 
      id: 'MOV-997', 
      date: '2024-03-13 15:10', 
      type: 'Received', 
      product: 'Water Bottle - 1L', 
      quantity: 120, 
      user: 'John Doe',
      note: 'Monthly bulk order'
    }
  ];

  // Function to determine stock level percentage
  const getStockPercentage = (current: number, max: number) => {
    return Math.min(Math.round((current / max) * 100), 100);
  };

  // Function to determine color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Low':
        return 'bg-yellow-100 text-yellow-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to determine color based on movement type
  const getMovementColor = (type: string) => {
    switch (type) {
      case 'Received':
        return 'bg-green-100 text-green-800';
      case 'Sold':
        return 'bg-blue-100 text-blue-800';
      case 'Adjusted':
        return 'bg-orange-100 text-orange-800';
      case 'Transferred':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-gray-500">Track and manage your stock levels</p>
        </div>
        <div className="flex space-x-2">
          <Link href="/inventory/adjust" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <Plus size={18} className="mr-2" />
            Adjust Stock
          </Link>
          <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md flex items-center">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
            <BarChart3 size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold">{inventoryItems.length}</p>
          <div className="mt-2 flex items-center text-sm">
            <div className="flex items-center text-green-600 mr-4">
              <span>Active: {inventoryItems.filter(i => i.status !== 'Critical' || i.currentStock > 0).length}</span>
            </div>
            <div className="flex items-center text-red-600">
              <span>Out of Stock: {inventoryItems.filter(i => i.currentStock === 0).length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Low Stock Alerts</h3>
            <AlertTriangle size={18} className="text-yellow-600" />
          </div>
          <p className="text-2xl font-bold">{inventoryItems.filter(item => item.status === 'Low' || item.status === 'Critical').length}</p>
          <div className="mt-2 flex items-center text-sm">
            <div className="flex items-center text-yellow-600 mr-4">
              <span>Low: {inventoryItems.filter(i => i.status === 'Low').length}</span>
            </div>
            <div className="flex items-center text-red-600">
              <span>Critical: {inventoryItems.filter(i => i.status === 'Critical').length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Recent Activity</h3>
            <Clock size={18} className="text-indigo-600" />
          </div>
          <p className="text-2xl font-bold">{recentMovements.length}</p>
          <div className="mt-2 flex items-center text-sm">
            <div className="flex items-center text-green-600 mr-4">
              <ArrowUpRight size={14} className="mr-1" />
              <span>In: {recentMovements.filter(m => m.type === 'Received').length}</span>
            </div>
            <div className="flex items-center text-blue-600">
              <ArrowDownRight size={14} className="mr-1" />
              <span>Out: {recentMovements.filter(m => m.type === 'Sold' || m.type === 'Transferred').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md bg-white">
                <option>All Categories</option>
                <option>Water</option>
                <option>Ice</option>
                <option>Accessory</option>
              </select>
              <Filter size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md bg-white">
                <option>All Status</option>
                <option>Normal</option>
                <option>Low</option>
                <option>Critical</option>
              </select>
              <Filter size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-4 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-2 px-1 text-sm font-medium ${
                activeTab === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab('water')}
              className={`py-2 px-1 text-sm font-medium ${
                activeTab === 'water'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
            >
              Water Products
            </button>
            <button
              onClick={() => setActiveTab('ice')}
              className={`py-2 px-1 text-sm font-medium ${
                activeTab === 'ice'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
            >
              Ice Products
            </button>
            <button
              onClick={() => setActiveTab('accessory')}
              className={`py-2 px-1 text-sm font-medium ${
                activeTab === 'accessory'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
            >
              Accessories
            </button>
            <button
              onClick={() => setActiveTab('low-stock')}
              className={`py-2 px-1 text-sm font-medium ${
                activeTab === 'low-stock'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
            >
              Low Stock
            </button>
          </nav>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 flex-shrink-0 rounded-md flex items-center justify-center ${
                        item.category === 'Water' ? 'bg-blue-100' : 
                        item.category === 'Ice' ? 'bg-cyan-100' : 'bg-purple-100'
                      }`}>
                        <Droplet size={18} className={`${
                          item.category === 'Water' ? 'text-blue-600' : 
                          item.category === 'Ice' ? 'text-cyan-600' : 'text-purple-600'
                        }`} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.category === 'Water' ? 'bg-blue-100 text-blue-800' : 
                      item.category === 'Ice' ? 'bg-cyan-100 text-cyan-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{item.currentStock} / {item.maxStock}</span>
                        <span className="text-xs text-gray-500">
                          {getStockPercentage(item.currentStock, item.maxStock)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.status === 'Normal' ? 'bg-green-500' : 
                            item.status === 'Low' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${getStockPercentage(item.currentStock, item.maxStock)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.locationCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <RefreshCcw size={16} />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {filteredItems.length} of {inventoryItems.length} products
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm" disabled>Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Recent Inventory Movements */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Inventory Movements</h2>
          <Link href="/inventory/history" className="text-blue-600 text-sm hover:underline">View All Movements</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentMovements.map((movement) => (
                <tr key={movement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {movement.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {movement.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getMovementColor(movement.type)}`}>
                      {movement.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {movement.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={`${
                      movement.type === 'Received' ? 'text-green-600' : 
                      movement.type === 'Sold' || movement.type === 'Adjusted' && movement.quantity < 0 ? 'text-red-600' :
                      'text-blue-600'
                    }`}>
                      {movement.type === 'Received' ? '+' : movement.quantity < 0 ? '' : '−'}
                      {Math.abs(movement.quantity)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {movement.user}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {movement.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 