
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, FileText } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { 
      path: '/admin', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      path: '/admin/add-medicine', 
      label: 'Add Medicine', 
      icon: <PlusCircle className="h-5 w-5" /> 
    },
    { 
      path: '/admin/records', 
      label: 'View Records', 
      icon: <FileText className="h-5 w-5" /> 
    }
  ];
  
  return (
    <aside className="w-full md:w-64 bg-mediqr-darker border-r border-muted/20 min-h-[calc(100vh-64px)]">
      <div className="p-4">
        <div className="text-xs uppercase text-white/40 font-semibold tracking-wider mb-4">
          Admin Controls
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-3 py-3 rounded-md transition-all duration-200 ${
                  isActive 
                    ? 'bg-mediqr-primary/20 text-mediqr-primary' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`mr-3 transition-colors ${isActive ? 'text-mediqr-primary' : 'text-white/60 group-hover:text-white'}`}>
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-mediqr-primary animate-pulse-glow"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 mt-8">
        <div className="relative p-4 rounded-lg overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-mediqr-primary to-mediqr-accent"></div>
          <div className="relative">
            <h3 className="text-sm font-semibold text-white mb-1">New to mediQR?</h3>
            <p className="text-xs text-white/70 mb-3">Check our documentation for help</p>
            <a href="#" className="text-xs inline-flex items-center text-mediqr-accent hover:underline">
              Read docs
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6"/></svg>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
