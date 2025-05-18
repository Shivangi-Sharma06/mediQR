
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  
  const handleConnectWallet = () => {
    setIsConnected(true);
  };

  return (
    <header className="border-b border-muted/20 backdrop-blur-sm bg-mediqr-darker/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <Shield className="h-7 w-7 text-mediqr-primary group-hover:text-mediqr-accent transition-colors duration-300" />
          <span className="text-xl font-orbitron font-bold text-white">
            medi<span className="text-mediqr-primary">QR</span>
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6">
            <Link to="/admin" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Admin
            </Link>
            <Link to="/verify" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Verify
            </Link>
          </nav>
          <Button 
            variant="outline" 
            className={`font-orbitron text-xs group relative overflow-hidden ${isConnected ? 'border-mediqr-success' : 'border-mediqr-accent hover:border-mediqr-highlight'}`}
            onClick={handleConnectWallet}
          >
            <span className="relative z-10">
              {isConnected ? 'Connected' : 'Connect Wallet'}
            </span>
            <span className={`absolute inset-0 bg-gradient-to-r ${isConnected ? 'from-green-600/20 to-green-500/20' : 'from-mediqr-accent/20 to-mediqr-highlight/20'} transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`}></span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
