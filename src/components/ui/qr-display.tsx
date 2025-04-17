
import React from 'react';
import { Medicine } from '../../types';
import { Button } from '@/components/ui/button';
import { Download, Upload, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRDisplayProps {
  medicine: Medicine;
  onUpload?: () => Promise<void>;
  isUploading?: boolean;
}

export const QRDisplay: React.FC<QRDisplayProps> = ({ 
  medicine,
  onUpload,
  isUploading = false,
}) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = async () => {
    if (!medicine.qrCode) return;
    
    setIsDownloading(true);
    
    try {
      // Create a temporary link to download the QR code
      const link = document.createElement('a');
      link.href = medicine.qrCode;
      link.download = `${medicine.name}-${medicine.batchNumber}-QR.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "QR Code Downloaded",
        description: "The QR code has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the QR code.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

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
      <h3 className="text-xl font-medium mb-4 text-center">QR Code for {medicine.name}</h3>
      
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
      
      <div className="w-full flex flex-wrap gap-3 justify-center">
        <Button
          onClick={handleDownload}
          disabled={!medicine.qrCode || isDownloading}
          className="flex-1 min-w-[140px]"
        >
          <Download size={16} className={`mr-2 ${isDownloading ? 'animate-pulse' : ''}`} />
          {isDownloading ? 'Downloading...' : 'Download QR'}
        </Button>
        
        {onUpload && (
          <Button
            onClick={onUpload}
            disabled={!medicine.qrCode || isUploading || !!medicine.ipfsHash}
            variant={medicine.ipfsHash ? "outline" : "default"}
            className={`flex-1 min-w-[140px] ${medicine.ipfsHash ? 'bg-green-600/20 text-green-400 border-green-600/30' : ''}`}
          >
            <Upload size={16} className={`mr-2 ${isUploading ? 'animate-pulse' : ''}`} />
            {medicine.ipfsHash 
              ? 'Uploaded to IPFS' 
              : isUploading 
                ? 'Uploading...' 
                : 'Upload to IPFS'
            }
          </Button>
        )}
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
