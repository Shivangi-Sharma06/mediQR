
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Database, Shield, Fingerprint } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

const Landing: React.FC = () => {
  const { auth, login } = useAppStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(auth.role === 'admin' ? '/admin' : '/user');
    }
  }, [auth, navigate]);

  const handleLogin = (role: 'admin' | 'user') => {
    login(role);
    navigate(role === 'admin' ? '/admin' : '/user');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ParticleBackground />
      
      <div className="flex-1 container mx-auto flex flex-col items-center justify-center px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gradient animate-fade-in">
            MediChain
          </h1>
          <p className="text-xl mb-10 text-muted-foreground animate-fade-in delay-200">
            Blockchain-based medicine authentication system to verify medicine authenticity and combat counterfeiting
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in delay-300">
            <Button 
              onClick={() => handleLogin('admin')} 
              className="px-8 py-6 text-lg bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent"
            >
              Enter Admin Dashboard
            </Button>
            <Button 
              onClick={() => handleLogin('user')} 
              variant="outline"
              className="px-8 py-6 text-lg border-white/20 hover:bg-white/10"
            >
              Enter User Dashboard
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in delay-500">
          <div className="glass-morphism p-6 rounded-xl">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Database size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Blockchain Security</h3>
            <p className="text-sm text-muted-foreground">
              Immutable record-keeping for all medicine data ensures tamper-proof authentication
            </p>
          </div>
          
          <div className="glass-morphism p-6 rounded-xl">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Shield size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">QR Verification</h3>
            <p className="text-sm text-muted-foreground">
              Instant authentication with QR codes linked to secure blockchain records
            </p>
          </div>
          
          <div className="glass-morphism p-6 rounded-xl">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Fingerprint size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">IPFS Storage</h3>
            <p className="text-sm text-muted-foreground">
              Decentralized storage of medicine data using InterPlanetary File System
            </p>
          </div>
        </div>
      </div>
      
      <footer className="py-6 glass-morphism relative z-10">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MediChain - Blockchain Medicine Authentication
        </div>
      </footer>
    </div>
  );
};

export default Landing;
