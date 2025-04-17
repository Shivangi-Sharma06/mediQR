
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Landing from "./pages/Landing";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MedicineEntry from "./pages/admin/MedicineEntry";
import QRGeneration from "./pages/admin/QRGeneration";
import SearchMedicines from "./pages/admin/SearchMedicines";
import Notifications from "./pages/admin/Notifications";
import NotFound from "./pages/NotFound";
import { useAppStore } from "./store";

const queryClient = new QueryClient();

const App = () => {
  const { auth } = useAppStore();
  
  // Guard routes based on authentication status
  const AdminRouteGuard = ({ children }: { children: React.ReactNode }) => {
    if (!auth.isAuthenticated || auth.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };
  
  const UserRouteGuard = ({ children }: { children: React.ReactNode }) => {
    if (!auth.isAuthenticated || auth.role !== 'user') {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route */}
            <Route path="/" element={<Landing />} />
            
            {/* Admin routes */}
            <Route 
              path="/admin" 
              element={
                <AdminRouteGuard>
                  <AppLayout role="admin" />
                </AdminRouteGuard>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="medicine-entry" element={<MedicineEntry />} />
              <Route path="qr-generation" element={<QRGeneration />} />
              <Route path="search" element={<SearchMedicines />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
            
            {/* User routes */}
            <Route 
              path="/user" 
              element={
                <UserRouteGuard>
                  <AppLayout role="user" />
                </UserRouteGuard>
              }
            >
              <Route index element={<UserDashboard />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
