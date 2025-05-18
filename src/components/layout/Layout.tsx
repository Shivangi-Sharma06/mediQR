
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-mediqr-dark">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
