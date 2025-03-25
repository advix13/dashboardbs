'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, User, Phone, Mail, Calendar, Package, MoreHorizontal, Edit } from 'lucide-react';
import Link from 'next/link';

// Define customer type
type Customer = {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  orders: number;
  spent: string;
  lastOrder: string;
  status: string;
};

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  
  // Sample customer data
  const customers: Customer[] = [
    { 
      id: '1001',
      name: 'Chez Maman Restaurant', 
      contact: 'Marie Dupont',
      email: 'contact@chezmaman.com', 
      phone: '+221 78 123 4567', 
      orders: 12,
      spent: '145,000 CFA',
      lastOrder: 'March 15, 2024',
      status: 'active'
    },
    {
      id: '1002',
      name: 'Hotel Baobab',
      contact: 'Ibrahim Diop',
      email: 'reservations@hotelbaobab.com',
      phone: '+221 77 765 4321',
      orders: 32,
      spent: '378,500 CFA',
      lastOrder: 'March 10, 2024',
      status: 'active'
    },
    {
      id: '1003',
      name: 'Le Petit Café', 
      contact: 'Sophie Mendy',
      email: 'info@lepetitcafe.com', 
      phone: '+221 76 234 5678',
      orders: 8,
      spent: '67,200 CFA',
      lastOrder: 'February 25, 2024',
      status: 'active'
    },
    {
      id: '1004',
      name: 'Dakar Fitness Club',
      contact: 'Jean Faye',
      email: 'contact@dakarfitness.com',
      phone: '+221 70 876 5432',
      orders: 15,
      spent: '186,300 CFA',
      lastOrder: 'March 5, 2024',
      status: 'inactive'
    },
    {
      id: '1005',
      name: 'Bleu Horizon Resort',
      contact: 'Aminata Sow',
      email: 'bookings@bleuhorizon.com',
      phone: '+221 78 765 0987',
      orders: 28,
      spent: '314,750 CFA',
      lastOrder: 'March 12, 2024',
      status: 'active'
    },
    {
      id: '1006',
      name: 'Green Valley School',
      contact: 'Omar Ndiaye',
      email: 'admin@greenvalley.edu',
      phone: '+221 77 123 6789',
      orders: 10,
      spent: '97,500 CFA',
      lastOrder: 'February 18, 2024',
      status: 'active'
    },
    {
      id: '1007',
      name: 'Sunset Beach Bar',
      contact: 'Fatou Diallo',
      email: 'manager@sunsetbeach.com',
      phone: '+221 76 543 2109',
      orders: 18,
      spent: '215,400 CFA',
      lastOrder: 'March 8, 2024',
      status: 'active'
    },
    {
      id: '1008',
      name: 'City Hospital',
      contact: 'Dr. Moussa Sarr',
      email: 'logistics@cityhospital.org',
      phone: '+221 70 987 6543',
      orders: 22,
      spent: '243,100 CFA',
      lastOrder: 'March 1, 2024',
      status: 'active'
    }
  ];
  
  // Filter and search customers
  const filteredCustomers = customers.filter(customer => {
    const matchesFilter = filterValue === 'all' || customer.status === filterValue;
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Customer detail component integrated into the page
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };
  
  const handleBackToList = () => {
    setSelectedCustomer(null);
  };
  
  // If a customer is selected, show their details
  if (selectedCustomer) {
    const customer = selectedCustomer;
    
    // Sample order history for the selected customer
    const orderHistory = [
      { 
        id: 'ORD-1001', 
        date: 'March 15, 2024', 
        items: 'Water Bottle 500ml (x24)', 
        total: '12,000 CFA', 
        status: 'Delivered' 
      },
      { 
        id: 'ORD-986', 
        date: 'March 1, 2024', 
        items: 'Water Gallon 5L (x5), Ice Bag 2kg (x3)', 
        total: '33,750 CFA', 
        status: 'Delivered' 
      },
      { 
        id: 'ORD-954', 
        date: 'February 15, 2024', 
        items: 'Water Bottle 1L (x36)', 
        total: '27,000 CFA', 
        status: 'Delivered' 
      }
    ];
    
    return (
      <div>
        {/* Back Navigation and Header */}
        <div className="mb-6">
          <button onClick={handleBackToList} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Customers
          </button>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{customer.name}</h1>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50">
                <Edit size={16} className="mr-2" />
                Edit
              </button>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {customer.status === 'active' ? 'Active' : 'Inactive'}
            </span>
            <span className="text-gray-500 ml-2">Customer ID: CUS-{customer.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Customer Information</h2>
              </div>
              <div className="p-4">
                <div className="mb-4 flex items-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={24} className="text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">{customer.contact}</h3>
                    <p className="text-gray-500">Primary Contact</p>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex items-start">
                    <Mail className="text-gray-400 mt-0.5 mr-3" size={16} />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{customer.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-gray-400 mt-0.5 mr-3" size={16} />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{customer.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100">
                <h3 className="font-semibold mb-3">Customer Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-md p-3">
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <div className="flex items-center mt-1">
                      <Package size={16} className="text-blue-600 mr-1" />
                      <p className="text-lg font-semibold">{customer.orders}</p>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-3">
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <div className="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-lg font-semibold">{customer.spent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Order history */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Order History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{order.items}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Otherwise, show the customer list
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Customers</h1>
        <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus size={16} className="mr-2" />
          Add Customer
        </a>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Search and Filter Bar */}
        <div className="border-b border-gray-200 p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="all">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              </select>
        </div>
      </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewCustomer(customer)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={16} className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.contact}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail size={14} className="text-gray-400 mr-1" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone size={14} className="text-gray-400 mr-1" />
                        <span>{customer.phone}</span>
                    </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.spent}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="text-gray-400 mr-1" />
                      <span>{customer.lastOrder}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCustomers.length}</span> of <span className="font-medium">{filteredCustomers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50">
                  1
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 