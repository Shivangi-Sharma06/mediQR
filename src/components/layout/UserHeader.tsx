
import React from 'react';
import { useAppStore } from '../../store';
import { User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletStatus } from '../wallet/WalletStatus';

const UserHeader: React.FC = () => {
  const logout = useAppStore(state => state.logout);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  return (
    <header className="glass-morphism w-full z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gradient">MediChain</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <WalletStatus />
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => useAppStore.setState(state => ({ 
              auth: { ...state.auth, role: 'admin' } 
            }))}
          >
            <User size={16} className="mr-2" />
            Admin View
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="text-red-400 hover:text-red-300"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </div>
        
        <div className="md:hidden">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-morphism animate-fade-in p-4">
          <div className="flex flex-col space-y-3">
            <WalletStatus />
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                useAppStore.setState(state => ({ auth: { ...state.auth, role: 'admin' } }));
                setIsMobileMenuOpen(false);
              }}
            >
              <User size={16} className="mr-2" />
              Admin View
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="text-red-400 hover:text-red-300"
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
