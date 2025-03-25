'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Search, Calendar, Filter, 
  Download, ArrowUpCircle, ArrowDownCircle, 
  RefreshCw, ChevronDown, ChevronUp, 
  ArrowDownUp, Plus, Minus, Edit 
} from 'lucide-react';

export default function InventoryHistoryPage() {
  // Sample inventory movement data
  const sampleMovements = [
    { 
      id: 'MOV-001',
      date: '2023-08-15T09:30:00',
      type: 'add',
      reason: 'purchase',
      product: { 
        id: 1, 
        name: 'Water Bottle - 500ml', 
        sku: 'WTR-B500', 
        category: 'Water' 
      },
      quantityBefore: 180,
      quantityAfter: 250,
      quantity: 70,
      reference: 'PO-20230815',
      location: 'WH-A12',
      user: 'John Doe',
      note: 'Regular inventory restocking'
    },
    { 
      id: 'MOV-002',
      date: '2023-08-14T14:45:00',
      type: 'remove',
      reason: 'sale',
      product: { 
        id: 2, 
        name: 'Water Bottle - 1L', 
        sku: 'WTR-B1000', 
        category: 'Water' 
      },
      quantityBefore: 195,
      quantityAfter: 180,
      quantity: 15,
      reference: 'ORD-10546',
      location: 'WH-A14',
      user: 'John Doe',
      note: 'Order fulfillment'
    },
    { 
      id: 'MOV-003',
      date: '2023-08-14T10:15:00',
      type: 'remove',
      reason: 'damaged',
      product: { 
        id: 4, 
        name: 'Ice Bag - 2kg', 
        sku: 'ICE-B2000', 
        category: 'Ice' 
      },
      quantityBefore: 125,
      quantityAfter: 120,
      quantity: 5,
      reference: '',
      location: 'WH-C01',
      user: 'Jane Smith',
      note: 'Found 5 bags with tears during inspection'
    },
    { 
      id: 'MOV-004',
      date: '2023-08-13T16:20:00',
      type: 'add',
      reason: 'return_from_customer',
      product: { 
        id: 2, 
        name: 'Water Bottle - 1L', 
        sku: 'WTR-B1000', 
        category: 'Water' 
      },
      quantityBefore: 190,
      quantityAfter: 195,
      quantity: 5,
      reference: 'RET-00123',
      location: 'WH-A14',
      user: 'Jane Smith',
      note: 'Customer returned unopened bottles'
    },
    { 
      id: 'MOV-005',
      date: '2023-08-12T11:30:00',
      type: 'set',
      reason: 'correction',
      product: { 
        id: 3, 
        name: 'Water Gallon - 5L', 
        sku: 'WTR-G5000', 
        category: 'Water' 
      },
      quantityBefore: 28,
      quantityAfter: 30,
      quantity: 2,
      reference: '',
      location: 'WH-B05',
      user: 'John Doe',
      note: 'Inventory count correction after physical count'
    },
    { 
      id: 'MOV-006',
      date: '2023-08-11T09:00:00',
      type: 'add',
      reason: 'purchase',
      product: { 
        id: 5, 
        name: 'Ice Bag - 5kg', 
        sku: 'ICE-B5000', 
        category: 'Ice' 
      },
      quantityBefore: 45,
      quantityAfter: 85,
      quantity: 40,
      reference: 'PO-20230811',
      location: 'WH-C02',
      user: 'Jane Smith',
      note: 'Regular restocking'
    },
    { 
      id: 'MOV-007',
      date: '2023-08-10T14:10:00',
      type: 'remove',
      reason: 'sale',
      product: { 
        id: 1, 
        name: 'Water Bottle - 500ml', 
        sku: 'WTR-B500', 
        category: 'Water' 
      },
      quantityBefore: 200,
      quantityAfter: 180,
      quantity: 20,
      reference: 'ORD-10532',
      location: 'WH-A12',
      user: 'John Doe',
      note: 'Order fulfillment'
    },
    { 
      id: 'MOV-008',
      date: '2023-08-10T10:45:00',
      type: 'remove',
      reason: 'theft',
      product: { 
        id: 5, 
        name: 'Ice Bag - 5kg', 
        sku: 'ICE-B5000', 
        category: 'Ice' 
      },
      quantityBefore: 50,
      quantityAfter: 45,
      quantity: 5,
      reference: 'SEC-00012',
      location: 'WH-C02',
      user: 'Jane Smith',
      note: 'Items missing during security check'
    },
  ];

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'add', 'remove', 'set'
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState({
    start: '',
    end: ''
  });

  // Sort states
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Filter and sort the movements
  const filteredMovements = sampleMovements
    .filter(movement => {
      // Search filter
      const searchString = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        movement.product.name.toLowerCase().includes(searchString) ||
        movement.product.sku.toLowerCase().includes(searchString) ||
        movement.reference.toLowerCase().includes(searchString) ||
        movement.id.toLowerCase().includes(searchString);
      
      // Type filter
      const matchesType = filterType === 'all' || movement.type === filterType;
      
      // Category filter
      const matchesCategory = filterCategory === 'all' || 
        movement.product.category === filterCategory;
      
      // Date range filter
      const date = new Date(movement.date);
      const matchesStartDate = !filterDateRange.start || 
        date >= new Date(filterDateRange.start);
      const matchesEndDate = !filterDateRange.end || 
        date <= new Date(`${filterDateRange.end}T23:59:59`);
      
      return matchesSearch && matchesType && matchesCategory && 
        matchesStartDate && matchesEndDate;
    })
    .sort((a, b) => {
      // Sort based on field and direction
      switch (sortField) {
        case 'date':
          return sortDirection === 'asc' 
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'product':
          return sortDirection === 'asc'
            ? a.product.name.localeCompare(b.product.name)
            : b.product.name.localeCompare(a.product.name);
        case 'quantity':
          return sortDirection === 'asc'
            ? a.quantity - b.quantity
            : b.quantity - a.quantity;
        default:
          return 0;
      }
    });

  // Categories derived from the data
  const categories = Array.from(
    new Set(sampleMovements.map(m => m.product.category))
  );

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  // Toggle sort direction or change sort field
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Get movement type icon
  const getMovementTypeIcon = (type: string) => {
    switch (type) {
      case 'add':
        return <ArrowUpCircle className="text-green-500" size={20} />;
      case 'remove':
        return <ArrowDownCircle className="text-red-500" size={20} />;
      case 'set':
        return <RefreshCw className="text-blue-500" size={20} />;
      default:
        return null;
    }
  };

  // Helper to get reason label
  const getReasonLabel = (reason: string) => {
    const reasonMap: Record<string, string> = {
      'purchase': 'Purchase',
      'return_from_customer': 'Return from Customer',
      'production': 'Production',
      'found': 'Inventory Found',
      'sale': 'Sale',
      'damaged': 'Damaged/Expired',
      'theft': 'Theft/Loss',
      'transfer': 'Transfer',
      'correction': 'Count Correction',
      'initial': 'Initial Count'
    };
    
    return reasonMap[reason] || reason;
  };

  // Helper to get type label with proper formatting
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'add': return 'Added';
      case 'remove': return 'Removed';
      case 'set': return 'Set to';
      default: return type;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/inventory" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft size={16} className="mr-1" />
          Back to Inventory
        </Link>
        <h1 className="text-2xl font-bold">Inventory History</h1>
        <p className="text-gray-500">Track and review all stock movements over time</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-grow relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                placeholder="Search by product, SKU, reference..."
              />
            </div>

            {/* Movement Type Filter */}
            <div className="sm:w-40">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                <option value="add">Added</option>
                <option value="remove">Removed</option>
                <option value="set">Adjusted</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="sm:w-40">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Date Range - Start */}
            <div className="sm:w-40">
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={filterDateRange.start}
                  onChange={(e) => setFilterDateRange({...filterDateRange, start: e.target.value})}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full"
                  placeholder="Start Date"
                />
              </div>
            </div>

            {/* Date Range - End */}
            <div className="sm:w-40">
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={filterDateRange.end}
                  onChange={(e) => setFilterDateRange({...filterDateRange, end: e.target.value})}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full"
                  placeholder="End Date"
                />
              </div>
            </div>

            {/* Export Button */}
            <div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                <Download size={16} className="mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movements Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Date & Time Header */}
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date & Time
                    <div className="ml-1">
                      {sortField === 'date' ? (
                        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      ) : (
                        <ArrowDownUp size={14} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </th>
                
                {/* Movement Type Header */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                
                {/* Product Header */}
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('product')}
                >
                  <div className="flex items-center">
                    Product
                    <div className="ml-1">
                      {sortField === 'product' ? (
                        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      ) : (
                        <ArrowDownUp size={14} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </th>
                
                {/* Quantity Header */}
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('quantity')}
                >
                  <div className="flex items-center">
                    Quantity
                    <div className="ml-1">
                      {sortField === 'quantity' ? (
                        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      ) : (
                        <ArrowDownUp size={14} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </th>
                
                {/* Stock Level Header */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                
                {/* Reason Header */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                
                {/* Reference Header */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                
                {/* Location Header */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                
                {/* User Header */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recorded By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMovements.length > 0 ? (
                filteredMovements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-gray-50">
                    {/* Date & Time */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(movement.date)}</div>
                      <div className="text-xs text-gray-500">{movement.id}</div>
                    </td>
                    
                    {/* Movement Type */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getMovementTypeIcon(movement.type)}
                        <span className="text-sm text-gray-900 ml-2">{getTypeLabel(movement.type)}</span>
                      </div>
                    </td>
                    
                    {/* Product */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{movement.product.name}</div>
                      <div className="text-xs text-gray-500">{movement.product.sku}</div>
                    </td>
                    
                    {/* Quantity */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        movement.type === 'add' ? 'text-green-600' :
                        movement.type === 'remove' ? 'text-red-600' :
                        'text-blue-600'
                      }`}>
                        {movement.type === 'add' && <Plus size={14} className="inline mr-1" />}
                        {movement.type === 'remove' && <Minus size={14} className="inline mr-1" />}
                        {movement.type === 'set' && <Edit size={14} className="inline mr-1" />}
                        {movement.quantity}
                      </div>
                    </td>
                    
                    {/* Stock Level */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {movement.quantityBefore} → {movement.quantityAfter}
                      </div>
                    </td>
                    
                    {/* Reason */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getReasonLabel(movement.reason)}</div>
                    </td>
                    
                    {/* Reference */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movement.reference || '-'}</div>
                    </td>
                    
                    {/* Location */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movement.location}</div>
                    </td>
                    
                    {/* User */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movement.user}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-8 whitespace-nowrap text-center text-gray-500">
                    No inventory movements found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredMovements.length}</span> movements
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 