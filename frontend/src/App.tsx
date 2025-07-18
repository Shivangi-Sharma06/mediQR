import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Admin from "./pages/admin/Admin";
import AddMedicine from "./pages/admin/AddMedicine";
import ViewRecords from "./pages/admin/ViewRecords";
import Verify from "./pages/verify/Verify";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [account, setAccount] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout account={account} setAccount={setAccount}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/add-medicine" element={<AddMedicine account={account} />} />
              <Route path="/admin/records" element={<ViewRecords />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;