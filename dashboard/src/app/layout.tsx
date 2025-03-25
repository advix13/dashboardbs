'use client';

import { useState } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlueSpring Dashboard",
  description: "Inventory & Order Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
