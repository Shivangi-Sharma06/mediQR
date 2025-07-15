
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Scan, Database, CheckCircle } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 hex-pattern"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-6">
              <div className="h-2 w-2 rounded-full bg-mediqr-primary animate-pulse mr-2"></div>
              <span className="text-xs text-white/70">Fighting counterfeit medicines with blockchain</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              Authenticate Medicine with Blockchain Technology
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8">
              mediQR provides a secure blockchain platform to verify medicine authenticity, protect patients, and enhance trust in pharmaceutical supply chains.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/admin">
                <Button className="bg-gradient-to-r from-mediqr-primary to-mediqr-secondary hover:opacity-90 transition-opacity min-w-[160px]">
                  Admin Dashboard
                </Button>
              </Link>
              <Link to="/verify">
                <Button variant="outline" className="border-mediqr-accent text-mediqr-accent hover:bg-mediqr-accent/10 min-w-[160px]">
                  Verify Medicine
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-mediqr-darker/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-orbitron font-bold text-white mb-4">How mediQR Works</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Our platform combines cutting-edge blockchain technology with simple user interfaces to combat counterfeit medicines.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-mediqr-darker p-6 rounded-lg border border-muted/20 flex flex-col items-center text-center group hover:border-mediqr-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-mediqr-primary/20 flex items-center justify-center mb-4 group-hover:bg-mediqr-primary/30 transition-colors">
                <Database className="h-6 w-6 text-mediqr-primary" />
              </div>
              <h3 className="text-lg font-orbitron font-medium text-white mb-2">Register Medicine</h3>
              <p className="text-white/60 text-sm">Pharmaceutical companies register medicine details on the blockchain.</p>
            </div>

            <div className="bg-mediqr-darker p-6 rounded-lg border border-muted/20 flex flex-col items-center text-center group hover:border-mediqr-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-mediqr-primary/20 flex items-center justify-center mb-4 group-hover:bg-mediqr-primary/30 transition-colors">
                <Shield className="h-6 w-6 text-mediqr-primary" />
              </div>
              <h3 className="text-lg font-orbitron font-medium text-white mb-2">Generate QR</h3>
              <p className="text-white/60 text-sm">Unique QR codes are generated and applied to medicine packaging.</p>
            </div>

            <div className="bg-mediqr-darker p-6 rounded-lg border border-muted/20 flex flex-col items-center text-center group hover:border-mediqr-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-mediqr-primary/20 flex items-center justify-center mb-4 group-hover:bg-mediqr-primary/30 transition-colors">
                <Scan className="h-6 w-6 text-mediqr-primary" />
              </div>
              <h3 className="text-lg font-orbitron font-medium text-white mb-2">Scan and Verify</h3>
              <p className="text-white/60 text-sm">Pharmacists and consumers scan the QR code to verify authenticity.</p>
            </div>

            <div className="bg-mediqr-darker p-6 rounded-lg border border-muted/20 flex flex-col items-center text-center group hover:border-mediqr-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-mediqr-primary/20 flex items-center justify-center mb-4 group-hover:bg-mediqr-primary/30 transition-colors">
                <CheckCircle className="h-6 w-6 text-mediqr-primary" />
              </div>
              <h3 className="text-lg font-orbitron font-medium text-white mb-2">Confirm Status</h3>
              <p className="text-white/60 text-sm">Instantly verify if the medicine is genuine or potentially counterfeit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-mediqr-primary/20 to-mediqr-secondary/10 rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-30"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-4">Ready to secure your medicine supply chain?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">Join pharmaceutical companies worldwide in the fight against counterfeit medicine. Our blockchain solution is easy to implement and provides immediate results.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/admin">
                  <Button className="bg-white text-mediqr-dark hover:bg-white/90 transition-colors min-w-[160px]">
                    Get Started
                  </Button>
                </Link>
                <Link to="/verify">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 min-w-[160px]">
                    Demo Verification
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
