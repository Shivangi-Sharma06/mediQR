
import React from 'react';
import QRScanner from '@/components/verify/QRScanner';

const Verify: React.FC = () => {
  return (
    <div className="py-8">
      <QRScanner />
    </div>
  );
};

export default Verify;
