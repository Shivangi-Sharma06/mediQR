import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
  account: string | null;
  setAccount: (acc: string | null) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, account, setAccount }) => {
  return (
    <div className="min-h-screen flex flex-col bg-mediqr-dark">
      <Header setAccount={setAccount} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;