'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import dynamic from 'next/dynamic';

// Dynamically import the SupabaseStatus component with no SSR
const SupabaseStatus = dynamic(
  () => import('@/components/SupabaseStatus'),
  { ssr: false }
);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  
  // Let's add a keyboard shortcut to show/hide the debug panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+D to toggle debug panel
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setShowDebug(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 mt-16">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        {/* Add Supabase Status for debugging - hidden by default, toggle with Ctrl+Shift+D */}
        {showDebug && <SupabaseStatus />}
        
        {/* Small indicator for debug mode */}
        <div 
          className="fixed bottom-1 right-1 cursor-pointer text-xs text-gray-400 hover:text-gray-600"
          onClick={() => setShowDebug(prev => !prev)}
        >
          {showDebug ? 'Hide Debug' : 'Debug'}
        </div>
      </div>
    </div>
  );
} 