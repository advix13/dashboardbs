'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Droplet, Package, Users, BarChart, Truck, UserCog, FileText, Wallet, Settings, HelpCircle, MessageCircle, Share, LayoutDashboard, ShoppingBag, ChevronDown, ChevronRight, PlusCircle, ListFilter } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const BlueSpringNavItem = ({ icon, label, href, active, onClick }: { icon: React.ReactNode; label: string; href: string; active: boolean; onClick?: () => void }) => (
  <Link href={href} onClick={onClick}>
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

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname === '';
    }
    return pathname.startsWith(path);
  };

  const toggleSubMenu = (menu: string) => {
    if (expandedMenus.includes(menu)) {
      setExpandedMenus(expandedMenus.filter(item => item !== menu));
    } else {
      setExpandedMenus([...expandedMenus, menu]);
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-gray-900 text-white z-40
        w-64 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-6 w-6 bg-blue-600 rounded-full mr-2"></div>
            <h1 className="text-lg font-semibold tracking-wider">BLUESPRING</h1>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white focus:outline-none"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Navigation */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-md font-medium">Navigation</h2>
          </div>

          <BlueSpringNavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
            href="/" 
            active={isActive('/')}
            onClick={onClose}
          />
          
          <BlueSpringNavItem 
            icon={<ShoppingBag size={18} />} 
            label="Products" 
            href="/products" 
            active={isActive('/products')}
            onClick={onClose}
          />
          
          <BlueSpringNavItem 
            icon={<Package size={18} />} 
            label="Orders" 
            href="/orders" 
            active={isActive('/orders')}
            onClick={onClose}
          />
          
          <BlueSpringNavItem 
            icon={<Droplet size={18} />} 
            label="Inventory" 
            href="/inventory" 
            active={isActive('/inventory')}
            onClick={onClose}
          />
          
          <BlueSpringNavItem 
            icon={<Users size={18} />} 
            label="Customers" 
            href="/customers" 
            active={isActive('/customers')}
            onClick={onClose}
          />
          
          <BlueSpringNavItem 
            icon={<BarChart size={18} />} 
            label="Reports" 
            href="/reports" 
            active={isActive('/reports')}
            onClick={onClose}
          />

          {/* Settings Section */}
          <div className="mt-8">
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

              <BlueSpringSettingCard 
                icon={<Truck size={18} />} 
                label="Delivery" 
                lastUpdated="Logistics" 
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full px-6 py-4 flex justify-between border-t border-gray-800">
          <Share size={20} className="text-gray-500 cursor-pointer hover:text-gray-300" />
          <HelpCircle size={20} className="text-gray-500 cursor-pointer hover:text-gray-300" />
          <MessageCircle size={20} className="text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>
    </>
  );
} 