
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppStore } from '@/store';
import { useToast } from '@/hooks/use-toast';
import { QRDisplay } from '@/components/ui/qr-display';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const QRGeneration: React.FC = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isUploading, setIsUploading] = useState(false);
  const medicines = useAppStore(state => state.medicines);
  const uploadToIPFS = useAppStore(state => state.uploadToIPFS);
  const medicineId = searchParams.get('id');
  
  const medicine = medicineId 
    ? medicines.find(m => m.id === medicineId) 
    : medicines.length > 0 
      ? medicines[medicines.length - 1] // Get the latest medicine if no ID specified
      : null;
  
  useEffect(() => {
    if (!medicine) {
      toast({
        title: "No Medicine Found",
        description: "Please add a medicine first before generating a QR code.",
        variant: "destructive",
      });
    }
  }, [medicine]);

  const handleUpload = async () => {
    if (!medicine || !medicine.qrCode) return;
    
    setIsUploading(true);
    
    try {
      // Upload QR code to IPFS
      const ipfsHash = await uploadToIPFS(medicine.qrCode, medicine);
      
      toast({
        title: "Upload Successful",
        description: "QR code has been uploaded to IPFS successfully.",
      });
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload QR code to IPFS. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl animate-fade-in">
      <div className="mb-6">
        <Link to="/admin/medicine-entry" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
          <ArrowLeft size={16} className="mr-1" />
          Back to Medicine Entry
        </Link>
        <h1 className="text-2xl font-bold">QR Code Generation</h1>
        <p className="text-muted-foreground">
          Generate and manage QR codes for medicine authentication
        </p>
      </div>
      
      {medicine ? (
        <QRDisplay 
          medicine={medicine} 
          onUpload={handleUpload}
          isUploading={isUploading}
        />
      ) : (
        <div className="glass-morphism p-6 rounded-xl text-center">
          <p className="mb-4">No medicine found. Please add a medicine first.</p>
          <Button asChild>
            <Link to="/admin/medicine-entry">Add Medicine</Link>
          </Button>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Instructions</h2>
        <div className="glass-morphism p-4 rounded-lg">
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Download the QR code image to your device</li>
            <li>Upload the QR code to IPFS for blockchain storage</li>
            <li>Copy the IPFS hash for future reference</li>
            <li>The QR code can now be printed and attached to the medicine packaging</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default QRGeneration;
