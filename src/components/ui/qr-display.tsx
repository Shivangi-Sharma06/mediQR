import React from 'react';
import { Medicine } from '../../types';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRDisplayProps {
  medicine: Medicine;
}

export const QRDisplay: React.FC<QRDisplayProps> = ({ medicine }) => {
  const { toast } = useToast();

  const copyIPFSHash = () => {
    if (!medicine.ipfsHash) return;

    navigator.clipboard.writeText(medicine.ipfsHash);
    toast({
      title: "IPFS Hash Copied",
      description: "The IPFS hash has been copied to your clipboard.",
    });
  };

  return (
    <div className="glass-morphism p-6 rounded-xl flex flex-col items-center">
      <h3 className="text-xl font-medium mb-4 text-center">
        QR Code for {medicine.name}
      </h3>

      <div className="relative mb-6 bg-white p-4 rounded-lg">
        {medicine.qrCode ? (
          <img
            src={medicine.qrCode}
            alt={`QR Code for ${medicine.name}`}
            className="h-64 w-64 object-contain"
          />
        ) : (
          <div className="h-64 w-64 flex items-center justify-center bg-gray-100 text-gray-400">
            No QR Code
          </div>
        )}
      </div>

      <div className="text-center mb-4">
        <p className="text-sm">
          <strong>Batch Number:</strong> {medicine.batchNumber}
        </p>
        <p className="text-sm">
          <strong>Medicine Name:</strong> {medicine.name}
        </p>
      </div>

      {medicine.ipfsHash && (
        <div className="mt-4 w-full">
          <div className="flex items-center justify-between bg-black/30 p-2 rounded text-sm">
            <span className="text-muted-foreground mr-2">IPFS Hash:</span>
            <code className="text-xs sm:text-sm truncate max-w-[180px] sm:max-w-[300px]">
              {medicine.ipfsHash}
            </code>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2"
              onClick={copyIPFSHash}
            >
              <Copy size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};