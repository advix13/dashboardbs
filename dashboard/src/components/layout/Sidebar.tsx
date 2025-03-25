'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Droplet, Package, Users, BarChart, Truck, UserCog, FileText, Wallet, Settings, HelpCircle, MessageCircle, Share, LayoutDashboard, ShoppingBag } from 'lucide-react';

const BlueSpringNavItem = ({ icon, label, href, active }: { icon: React.ReactNode; label: string; href: string; active: boolean }) => (
  <Link href={href}>
    <div className={`rounded-md p-3 flex items-center mb-2 ${active ? 'bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
      <div className="text-gray-400 mr-3">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  </Link>
);

const BlueSpringSettingCard = ({ icon, label, lastUpdated }: { icon: React.ReactNode; label: string; lastUpdated: string }) => (
  <div className="bg-gray-800 rounded-md p-3 flex flex-col justify-between">
    <div className="text-gray-400 mb-6">{icon}</div>
    <div>
      <div className="text-sm">{label}</div>
      <div className="text-xs text-gray-400">{lastUpdated}</div>
    </div>
  </div>
);

export default function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname === '';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white rounded-lg overflow-hidden border border-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-6 w-6 bg-blue-600 rounded-full mr-2"></div>
          <h1 className="text-lg font-semibold tracking-wider">BLUESPRING</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
          <img src="https://via.placeholder.com/32" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Main Navigation */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-md font-medium">Navigation</h2>
        </div>

        <BlueSpringNavItem 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard" 
          href="/" 
          active={isActive('/')} 
        />
        
        <BlueSpringNavItem 
          icon={<ShoppingBag size={18} />} 
          label="Products" 
          href="/products" 
          active={isActive('/products')} 
        />
        
        <BlueSpringNavItem 
          icon={<Package size={18} />} 
          label="Orders" 
          href="/orders" 
          active={isActive('/orders')} 
        />
        
        <BlueSpringNavItem 
          icon={<Droplet size={18} />} 
          label="Inventory" 
          href="/inventory" 
          active={isActive('/inventory')} 
        />
        
        <BlueSpringNavItem 
          icon={<Users size={18} />} 
          label="Customers" 
          href="/customers" 
          active={isActive('/customers')} 
        />
        
        <BlueSpringNavItem 
          icon={<BarChart size={18} />} 
          label="Reports" 
          href="/reports" 
          active={isActive('/reports')} 
        />
      </div>

      {/* Settings Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-md font-medium">Management</h2>
          <span className="text-xs text-gray-400">Details</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <BlueSpringSettingCard 
            icon={<UserCog size={18} />} 
            label="Users" 
            lastUpdated="Manage staff" 
          />
          
          <BlueSpringSettingCard 
            icon={<FileText size={18} />} 
            label="Invoices"
            lastUpdated="Billing info" 
          />
          
          <BlueSpringSettingCard 
            icon={<Wallet size={18} />}
            label="Expenses"
            lastUpdated="12 pending"
          />
          
          <BlueSpringSettingCard 
            icon={<Settings size={18} />} 
            label="Settings" 
            lastUpdated="Preferences" 
          />
          
          <BlueSpringSettingCard 
            icon={<Bell size={18} />} 
            label="Alerts" 
            lastUpdated="Notifications" 
          />

          {/* Delivery Card (replacing Add Shortcut) */}
          <BlueSpringSettingCard 
            icon={<Truck size={18} />} 
            label="Delivery" 
            lastUpdated="Logistics" 
          />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-64 px-6 py-4 flex justify-between">
        <Share size={20} className="text-gray-500 cursor-pointer hover:text-gray-300" />
        <HelpCircle size={20} className="text-gray-500 cursor-pointer hover:text-gray-300" />
        <MessageCircle size={20} className="text-gray-500 cursor-pointer hover:text-gray-300" />
      </div>
    </div>
  );
} 