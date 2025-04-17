
import React from 'react';
import { useAppStore } from '../../store';
import { Wallet, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WalletStatusProps {
  className?: string;
}

export const WalletStatus: React.FC<WalletStatusProps> = ({ className }) => {
  const { wallet, connectWallet, disconnectWallet } = useAppStore();
  const { isConnected, address, balance } = wallet;
  
  const formatAddress = (address: string) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  };
  
  return (
    <div className={cn("w-full", className)}>
      {!isConnected ? (
        <Button 
          onClick={connectWallet} 
          className="w-full bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent transition-all duration-300"
        >
          <Wallet size={16} className="mr-2" />
          Connect Wallet
        </Button>
      ) : (
        <div className="w-full glass-morphism rounded-md p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-primary/30 flex items-center justify-center mr-2">
                <Check size={12} className="text-primary" />
              </div>
              <span className="text-xs">Connected</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs px-2 text-red-400 hover:text-red-300 hover:bg-transparent"
              onClick={disconnectWallet}
            >
              Disconnect
            </Button>
          </div>
          <div className="mt-2 text-sm font-medium">{formatAddress(address)}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Balance: {balance} ETH
          </div>
        </div>
      )}
    </div>
  );
};
