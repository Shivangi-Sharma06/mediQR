import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode';

// Reuse this interface in both files if needed
export interface Medicine {
  name: string;
  batchNumber: string;
  expiryDate: string;
  manufacturer: string;
}

export interface QRDisplayProps {
  medicine: Medicine;
  onUpload: () => Promise<void>;
  isUploading: boolean;
}

const QRDisplay: React.FC<QRDisplayProps> = ({ medicine, onUpload, isUploading }) => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrData = `Name: ${medicine.name}\nBatch: ${medicine.batchNumber}`;
        const qrCode = await QRCode.toDataURL(qrData);
        setQrCodeData(qrCode);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [medicine]);

  return (
    <div className="text-center">
      {qrCodeData ? (
        <>
          <img src={qrCodeData} alt="QR Code" className="mx-auto mb-4 w-48 h-48" />
          <p className="mb-2 font-medium">Name: {medicine.name}</p>
          <p className="mb-4 text-sm text-muted-foreground">Batch: {medicine.batchNumber}</p>
          <Button onClick={onUpload} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload to IPFS'}
          </Button>
        </>
      ) : (
        <p>Generating QR Code...</p>
      )}
    </div>
  );
};

export default QRDisplay;
