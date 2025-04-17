
import React from 'react';
import { Medicine } from '../../types';
import { Check, AlertTriangle, XCircle, Calendar, Building, Hash, LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface MedicineResultProps {
  medicine: Medicine;
  onRescan: () => void;
}

export const MedicineResult: React.FC<MedicineResultProps> = ({ medicine, onRescan }) => {
  const isExpired = new Date(medicine.expiryDate) < new Date();
  
  let statusColor = 'bg-green-500';
  let statusIcon = <Check size={20} />;
  let statusText = 'Valid';
  
  if (isExpired) {
    statusColor = 'bg-yellow-500';
    statusIcon = <AlertTriangle size={20} />;
    statusText = 'Expired';
  } else if (!medicine.ipfsHash) {
    statusColor = 'bg-red-500';
    statusIcon = <XCircle size={20} />;
    statusText = 'Invalid';
  }
  
  return (
    <div className="glass-morphism rounded-xl p-6 animate-scale-in max-w-md w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">{medicine.name}</h3>
        <div className={`rounded-full ${statusColor} text-white flex items-center px-3 py-1`}>
          {statusIcon}
          <span className="ml-1 text-sm font-medium">{statusText}</span>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <Hash className="w-5 h-5 mt-0.5 text-muted-foreground mr-3 flex-shrink-0" />
          <div>
            <div className="text-sm text-muted-foreground">Batch Number</div>
            <div className="font-medium">{medicine.batchNumber}</div>
          </div>
        </div>
        
        <div className="flex items-start">
          <Calendar className="w-5 h-5 mt-0.5 text-muted-foreground mr-3 flex-shrink-0" />
          <div>
            <div className="text-sm text-muted-foreground">Expiry Date</div>
            <div className="font-medium">
              {format(new Date(medicine.expiryDate), 'MMMM d, yyyy')}
              {isExpired && (
                <span className="text-yellow-400 ml-2 text-sm">(Expired)</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-start">
          <Building className="w-5 h-5 mt-0.5 text-muted-foreground mr-3 flex-shrink-0" />
          <div>
            <div className="text-sm text-muted-foreground">Manufacturer</div>
            <div className="font-medium">{medicine.manufacturer}</div>
          </div>
        </div>
        
        {medicine.ipfsHash && (
          <div className="flex items-start">
            <LinkIcon className="w-5 h-5 mt-0.5 text-muted-foreground mr-3 flex-shrink-0" />
            <div>
              <div className="text-sm text-muted-foreground">IPFS Link</div>
              <div className="font-medium break-all text-xs sm:text-sm">
                {medicine.ipfsHash}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3 mt-6">
        <Button className="flex-1" onClick={onRescan}>
          Scan Another QR Code
        </Button>
      </div>
    </div>
  );
};
