
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-muted/10 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-center mb-6">
          <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-mediqr-primary/60 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-white/50 font-poppins mb-4 md:mb-0">
            © 2025 mediQR. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
