import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import QRCode from 'qrcode';

interface MedicineFormProps {
  walletAddress: string | null;
}

const MedicineForm: React.FC<MedicineFormProps> = ({ walletAddress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    batchNumber: '',
    manufacturerAddress: walletAddress || '',
    expiryDate: ''
  });
  const [qrGenerated, setQrGenerated] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null); // NEW STATE

  // Update manufacturerAddress if walletAddress changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      manufacturerAddress: walletAddress || ''
    }));
  }, [walletAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Generate QR code data string
    const qrData = `Name: ${formData.name}\nBatch: ${formData.batchNumber}\nManufacturer: ${formData.manufacturerAddress}\nExpiry: ${formData.expiryDate}`;
    try {
      const url = await QRCode.toDataURL(qrData);
      setQrUrl(url); // Set QR code image URL
      setQrGenerated(true);
      toast.success("Medicine data uploaded successfully");
    } catch (err) {
      toast.error("Failed to generate QR code");
    }
    setIsLoading(false);
  };

  const handleDownloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `QR_${formData.name}_${formData.batchNumber}.png`;
    document.body.appendChild(link); // Ensure it's in the DOM
    link.click();
    document.body.removeChild(link); // Clean up
    toast.success("QR code downloaded successfully");
  };

    const handleUploadIPFS = async () => {
    if (!qrUrl) return;
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/upload-ipfs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: qrUrl,
          name: formData.name,
          batchNumber: formData.batchNumber,
          manufacturerAddress: formData.manufacturerAddress,
          expiryDate: formData.expiryDate
        }),
      });
      const data = await response.json();
      if (data.ipfsHash) {
        setIpfsHash(data.ipfsHash);
        toast.success(`Uploaded! IPFS Hash: ${data.ipfsHash}`);
      } else {
        toast.error('Failed to upload to IPFS');
      }
    } catch (err) {
      toast.error('Error uploading to IPFS');
    }
    setIsLoading(false);
  };




  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-orbitron text-white">Add New Medicine</h1>
        <p className="text-white/60 text-sm">Register a new medicine to the blockchain for verification</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-mediqr-darker/50 p-6 rounded-lg border border-muted/20 relative overflow-hidden">
        <div className="hex-pattern absolute inset-0"></div>
        <div className="relative z-10 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Medicine Name</Label>
            <Input 
              id="name"
              name="name"
              className="bg-black/20 border-muted/30 focus:border-mediqr-primary"
              placeholder="Enter medicine name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batchNumber">Batch Number</Label>
            <Input 
              id="batchNumber"
              name="batchNumber"
              className="bg-black/20 border-muted/30 focus:border-mediqr-primary"
              placeholder="Enter batch number"
              value={formData.batchNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manufacturerAddress">Manufacturer Address</Label>
            <Input 
              id="manufacturerAddress"
              name="manufacturerAddress"
              type="text"
              placeholder="Connect wallet to autofill"
              className="bg-black/20 border-muted/30 focus:border-mediqr-primary"
              value={formData.manufacturerAddress}
              readOnly // Make it read-only
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input 
              id="expiryDate"
              name="expiryDate"
              type="date"
              placeholder="Enter expiry date"
              className="bg-black/20 border-muted/30 focus:border-mediqr-primary"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* QR Code Display */}
          {qrGenerated && qrUrl && (
            <div className="flex flex-col items-center py-4">
              <img src={qrUrl} alt="Generated QR" className="w-40 h-40 mb-2" />
              <div className="text-white text-sm mt-2">
                <div><strong>Name:</strong> {formData.name}</div>
                <div><strong>Batch:</strong> {formData.batchNumber}</div>
                <div><strong>Manufacturer:</strong> {formData.manufacturerAddress}</div>
                <div><strong>Expiry:</strong> {formData.expiryDate}</div>
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-mediqr-primary to-mediqr-secondary hover:opacity-90 transition-opacity"
              disabled={isLoading || qrGenerated}
            >
              {isLoading && !qrGenerated ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : qrGenerated ? (
                "QR Generated"
              ) : (
                "Generate QR"
              )}
            </Button>
            
            {qrGenerated && (
              <Button 
                type="button"
                variant="outline" 
                onClick={handleDownloadQR}
                className="border-mediqr-accent text-mediqr-accent hover:bg-mediqr-accent/10"
              >
                Download QR
              </Button>
            )}
          </div>

          {/* Blockchain section remains unchanged */}
          {qrGenerated && (
            <div className="mt-4 pt-4 border-t border-muted/20">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium">Blockchain Storage</div>
                <div className="bg-mediqr-accent/20 text-mediqr-accent text-xs py-1 px-2 rounded">Ready</div>
              </div>
              <Button 
                type="button"
                className="w-full bg-gradient-to-r from-mediqr-accent to-mediqr-secondary hover:opacity-90 transition-opacity"
                onClick={handleUploadIPFS}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading to IPFS...
                  </>
                ) : (
                  "Upload to IPFS"
                )}
              </Button>
              {/* Show IPFS hash below the button if available */}
              {ipfsHash && (
                <div className="mt-4 text-white text-sm break-all">
                  <strong>IPFS Hash:</strong> {ipfsHash}
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MedicineForm;