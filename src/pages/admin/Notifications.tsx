
import React from 'react';
import { useAppStore } from '@/store';
import { TransactionCard } from '@/components/ui/transaction-card';

const Notifications: React.FC = () => {
  const transactions = useAppStore(state => state.transactions);
  
  // Group transactions by day
  const groupedTransactions = React.useMemo(() => {
    const groups: Record<string, typeof transactions> = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.timestamp);
      const dateKey = date.toISOString().split('T')[0];
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      
      groups[dateKey].push(transaction);
    });
    
    return Object.entries(groups)
      .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
      .map(([date, transactions]) => ({
        date: new Date(date),
        transactions,
      }));
  }, [transactions]);

  const formatDate = (date: Date): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    
    if (dateToCheck.getTime() === today.getTime()) {
      return 'Today';
    } else if (dateToCheck.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Blockchain Notifications</h1>
        <p className="text-muted-foreground">
          Monitor blockchain transactions and events related to medicine authentication
        </p>
      </div>
      
      {groupedTransactions.length === 0 ? (
        <div className="glass-morphism p-8 rounded-lg text-center">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedTransactions.map(({ date, transactions }) => (
            <div key={date.toISOString()}>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                {formatDate(date)}
              </h2>
              
              <div className="space-y-3">
                {transactions.map(transaction => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
