import React, { useState } from 'react';
import { ethers } from 'ethers'; // ✅ This is correct and should work
import { Wallet, Check, AlertCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WalletStatusProps {
  className?: string;
}

interface EthereumProvider {
  isMetaMask?: boolean;
  request: (...args: any[]) => Promise<any>;
  on?: (...args: any[]) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export const WalletStatus: React.FC<WalletStatusProps> = ({ className }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error('MetaMask is not installed.');
      setError('MetaMask is not installed. Please install it to connect your wallet.');
      return;
    }

    try {
      console.log('Requesting MetaMask connection...');
      setIsConnecting(true);

      // Trigger MetaMask to request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('MetaMask connected. Accounts:', accounts);

      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = web3Provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log('Connected address:', userAddress);

      const userBalance = ethers.utils.formatEther(await signer.getBalance());
      console.log('Wallet balance:', userBalance);

      setAddress(userAddress);
      setBalance(userBalance);
      setIsConnected(true);
      setError(null);
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    console.log('Disconnecting wallet...');
    setIsConnected(false);
    setAddress(null);
    setBalance(null);
    setError(null);
    console.log('Wallet disconnected.');
  };

  const formatAddress = (address: string) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  };

  return (
    <div className={cn("w-full", className)}>
      {!isConnected ? (
        <>
          {error && (
            <div className="mb-2 text-red-500 flex items-center">
              <AlertCircle size={16} className="mr-2" />
              <span className="text-xs">{error}</span>
            </div>
          )}
          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            className={`w-full bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent transition-all duration-300 ${
              isConnecting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isConnecting ? (
              <>
                <Loader size={16} className="mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet size={16} className="mr-2" />
                Connect Wallet
              </>
            )}
          </Button>
        </>
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
          <div className="mt-2 text-sm font-medium">{formatAddress(address || '')}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Balance: {balance} ETH
          </div>
        </div>
      )}
    </div>
  );
};