
import React from 'react';
import { Outlet } from 'react-router-dom';
import ParticleBackground from '../ParticleBackground';
import { useAppStore } from '../../store';
import { UserRole } from '../../types';
import AdminSidebar from './AdminSidebar';
import UserHeader from './UserHeader';

interface Props {
  role: UserRole;
}

const AppLayout: React.FC<Props> = ({ role }) => {
  const isAdmin = role === 'admin';
  
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Animated background */}
      <ParticleBackground />
      
      {/* Admin layout with sidebar */}
      {isAdmin && (
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 p-4 md:p-6 overflow-y-auto animate-fade-in">
            <Outlet />
          </main>
        </div>
      )}
      
      {/* User layout with top header */}
      {!isAdmin && (
        <div className="flex flex-col min-h-screen">
          <UserHeader />
          <main className="flex-1 p-4 md:p-6 overflow-y-auto animate-fade-in">
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
