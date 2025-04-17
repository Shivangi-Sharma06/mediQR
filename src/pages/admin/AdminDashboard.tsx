import React, { useState } from 'react';
import { useAppStore } from '@/store';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, QrCode } from 'lucide-react';
import { auth } from '@/lib/firebase'; // Import Firebase auth
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';

const AdminDashboard: React.FC = () => {
  const { medicines } = useAppStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
        <div className="glass-morphism p-6 rounded-lg w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md border border-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
                    <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md border border-muted-foreground text-black focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-between">
            <Button onClick={handleLogin} className="bg-primary text-white px-4 py-2 rounded-md">
              Login
            </Button>
            <Button onClick={handleSignup} className="bg-secondary text-white px-4 py-2 rounded-md">
              Signup
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Medicines',
      value: medicines.length,
      icon: <PlusCircle className="h-5 w-5 text-primary" />,
      href: '/admin/medicine-entry',
    },
    {
      title: 'QR Codes Generated',
      value: medicines.filter((m) => m.qrCode).length,
      icon: <QrCode className="h-5 w-5 text-primary" />,
      href: '/admin/qr-generation',
    },
    {
      title: 'Expired Medicines',
      value: medicines.filter((m) => m.expired).length,
      icon: <Search className="h-5 w-5 text-primary" />,
      href: '/admin/search',
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
        {stats.map((stat) => (
          <Link key={stat.title} to={stat.href} className="block">
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
    </div>
  );
};

export default AdminDashboard;