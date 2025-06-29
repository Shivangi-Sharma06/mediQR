import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  const [account, setAccount] = React.useState<string | null>(null);

  const handleConnectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('User rejected the request or there was an error:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const handleDisconnectWallet = () => {
    setAccount(null);
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
        {account ? (
          <div className="flex items-center space-x-2">
            <span className="font-orbitron text-xs text-white bg-green-700/30 px-3 py-1 rounded">
              {`${account.slice(0, 6)}...${account.slice(-4)}`}
            </span>
            <Button
              variant="outline"
              className="font-orbitron text-xs border-red-500 hover:border-red-700"
              onClick={handleDisconnectWallet}
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="font-orbitron text-xs group relative overflow-hidden border-mediqr-accent hover:border-mediqr-highlight"
            onClick={handleConnectWallet}
          >
            <span className="relative z-10">Connect Wallet</span>
            <span className="absolute inset-0 bg-gradient-to-r from-mediqr-accent/20 to-mediqr-highlight/20 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;