import React from 'react';
import { Button } from '@/components/ui/button';
import type { Medicine } from '@/types';

interface QRDisplayProps {
  qrCodeData: string;
  medicine: Medicine;
  onUpload: () => Promise<void>;
  isUploading: boolean;
}

export const QRDisplay: React.FC<QRDisplayProps> = ({
  qrCodeData,
  medicine,
  onUpload,
  isUploading,
}) => {
  return (
    <div className="text-center">
      <img
        src={`data:image/png;base64,${qrCodeData}`}
        alt="QR Code"
        className="mx-auto mb-4 w-48 h-48"
      />
      <p className="mb-2 font-medium">Medicine: {medicine.name}</p>
      <p className="mb-4 text-sm text-muted-foreground">
        Batch No: {medicine.batchNumber}
      </p>
      <Button onClick={onUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload to IPFS'}
      </Button>
    </div>
  );
};

export default QRDisplay;