'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, error } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if we're on an auth page
  const isAuthPage = typeof window !== 'undefined' && 
    ['/login', '/signup', '/reset-password'].some(path => window.location.pathname === path);

  // Show a loading state while checking auth
  if (isLoading && !isAuthPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="large" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // For auth pages, don't show the sidebar and header
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Regular dashboard layout with sidebar and header
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
      </div>
    </div>
  );
} 