
import React from 'react';
import { useAppStore } from '@/store';
import { Card } from '@/components/ui/card';
import { TransactionCard } from '@/components/ui/transaction-card';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, QrCode, Bell } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { medicines, transactions } = useAppStore();
  
  const stats = [
    {
      title: 'Total Medicines',
      value: medicines.length,
      icon: <PlusCircle className="h-5 w-5 text-primary" />,
      href: '/admin/medicine-entry',
    },
    {
      title: 'QR Codes Generated',
      value: medicines.filter(m => m.qrCode).length,
      icon: <QrCode className="h-5 w-5 text-primary" />,
      href: '/admin/qr-generation',
    },
    {
      title: 'Expired Medicines',
      value: medicines.filter(m => m.expired).length,
      icon: <Search className="h-5 w-5 text-primary" />,
      href: '/admin/search',
    },
    {
      title: 'Transactions',
      value: transactions.length,
      icon: <Bell className="h-5 w-5 text-primary" />,
      href: '/admin/notifications',
    },
  ];
  
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col items-start mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to mediQR</h1>
        <p className="text-muted-foreground">
          Dashboard overview of your blockchain medicine authentication system
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Link 
            key={stat.title} 
            to={stat.href} 
            className="block"
          >
            <Card className="glass-morphism hover:bg-white/10 transition-all p-5 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          {transactions.slice(0, 3).map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
          <Link 
            to="/admin/notifications"
            className="text-primary text-sm hover:underline block mt-2"
          >
            View all transactions
          </Link>
        </div>
        
        <div className="glass-morphism p-6 rounded-lg animate-float">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <ol className="space-y-4">
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 flex-shrink-0">1</span>
              <div>
                <h3 className="font-medium">Add New Medicine</h3>
                <p className="text-sm text-muted-foreground">Enter medicine details in the Medicine Entry Form</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 flex-shrink-0">2</span>
              <div>
                <h3 className="font-medium">Generate QR Codes</h3>
                <p className="text-sm text-muted-foreground">Create and download QR codes for each medicine</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 flex-shrink-0">3</span>
              <div>
                <h3 className="font-medium">Upload to IPFS</h3>
                <p className="text-sm text-muted-foreground">Store QR codes securely on the blockchain via IPFS</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 flex-shrink-0">4</span>
              <div>
                <h3 className="font-medium">Monitor Transactions</h3>
                <p className="text-sm text-muted-foreground">Track blockchain transactions in the Notifications page</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
