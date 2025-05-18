
import React, { useState } from 'react';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const MedicineForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    batchNumber: '',
    expiryDate: ''
  });
  const [qrGenerated, setQrGenerated] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Medicine data uploaded successfully");
      setQrGenerated(true);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleDownloadQR = () => {
    toast.success("QR code downloaded successfully");
  };
  
  const handleUploadIPFS = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Medicine data uploaded to IPFS successfully");
      setIsLoading(false);
      // Reset form after successful submission
      setFormData({
        name: '',
        batchNumber: '',
        expiryDate: ''
      });
      setQrGenerated(false);
    }, 2000);
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
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input 
              id="expiryDate"
              name="expiryDate"
              type="date"
              className="bg-black/20 border-muted/30 focus:border-mediqr-primary"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
          
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
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MedicineForm;
