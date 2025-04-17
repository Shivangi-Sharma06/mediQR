import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layers, Database, Search, User, LogOut, Home } from 'lucide-react';
import { useAppStore } from '../../store';
import { WalletStatus } from '../wallet/WalletStatus';

const AdminSidebar: React.FC = () => {
  const logout = useAppStore(state => state.logout);

  return (
    <aside className="w-64 glass-morphism h-screen flex flex-col overflow-hidden z-10">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gradient">MediChain</h1>
        <p className="text-sm text-muted-foreground">Admin Dashboard</p>
      </div>

      <WalletStatus className="mx-4 mb-6" />

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => `
                flex items-center gap-2 p-2 rounded-md transition-all
                ${isActive 
                  ? 'bg-primary/20 text-primary font-medium' 
                  : 'hover:bg-secondary text-foreground/70 hover:text-foreground'
                }
              `}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/medicine-entry"
              className={({ isActive }) => `
                flex items-center gap-2 p-2 rounded-md transition-all
                ${isActive 
                  ? 'bg-primary/20 text-primary font-medium' 
                  : 'hover:bg-secondary text-foreground/70 hover:text-foreground'
                }
              `}
            >
              <Layers size={18} />
              <span>Medicine Entry</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/qr-generation"
              className={({ isActive }) => `
                flex items-center gap-2 p-2 rounded-md transition-all
                ${isActive 
                  ? 'bg-primary/20 text-primary font-medium' 
                  : 'hover:bg-secondary text-foreground/70 hover:text-foreground'
                }
              `}
            >
              <Database size={18} />
              <span>QR Generation</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/search"
              className={({ isActive }) => `
                flex items-center gap-2 p-2 rounded-md transition-all
                ${isActive 
                  ? 'bg-primary/20 text-primary font-medium' 
                  : 'hover:bg-secondary text-foreground/70 hover:text-foreground'
                }
              `}
            >
              <Search size={18} />
              <span>Search Medicines</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <NavLink
          to="/"
          className="flex items-center gap-2 p-2 rounded-md transition-all hover:bg-secondary text-foreground/70 hover:text-foreground"
          onClick={() => logout()}
        >
          <User size={18} />
          <span>Switch to User</span>
        </NavLink>
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-2 p-2 rounded-md text-red-400 transition-all hover:bg-secondary hover:text-red-300"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;