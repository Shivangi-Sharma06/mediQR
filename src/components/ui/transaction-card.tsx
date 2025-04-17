
import React from 'react';
import { Transaction } from '../../types';
import { Copy, Check, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const copyHash = () => {
    navigator.clipboard.writeText(transaction.hash);
    setCopied(true);
    toast({
      title: "Transaction Hash Copied",
      description: "The transaction hash has been copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const statusColors = {
    success: 'text-green-400 bg-green-400/10 border-green-400/30',
    fail: 'text-red-400 bg-red-400/10 border-red-400/30',
    pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  };

  const statusIcons = {
    success: <Check size={16} className="text-green-400" />,
    fail: <XCircle size={16} className="text-red-400" />,
    pending: <Clock size={16} className="text-yellow-400" />,
  };

  return (
    <div className="glass-morphism p-4 rounded-lg mb-4 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between mb-2">
        <div className="flex items-center">
          <span className={`
            flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium
            ${statusColors[transaction.status]}
          `}>
            {statusIcons[transaction.status]}
            <span className="ml-1 capitalize">{transaction.status}</span>
          </span>
          <span className="ml-2 text-xs text-muted-foreground">
            {format(new Date(transaction.timestamp), 'MMM d, yyyy • h:mm a')}
          </span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={copyHash}
          className="h-7 px-2 text-xs"
        >
          {copied ? <Check size={14} className="mr-1 text-green-400" /> : <Copy size={14} className="mr-1" />}
          {copied ? 'Copied!' : 'Copy Hash'}
        </Button>
      </div>
      
      <p className="text-sm mb-2">{transaction.message}</p>
      
      <div className="bg-black/20 rounded p-2">
        <code className="text-xs sm:text-sm break-all text-muted-foreground">
          {transaction.hash}
        </code>
      </div>
    </div>
  );
};
