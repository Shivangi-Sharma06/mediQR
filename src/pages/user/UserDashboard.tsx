
import React, { useState } from 'react';
import { useAppStore } from '@/store';
import { QRScanner } from '@/components/ui/qr-scanner';
import { MedicineResult } from '@/components/ui/medicine-result';
import { Card } from '@/components/ui/card';
import { Medicine } from '@/types';
import { useToast } from '@/hooks/use-toast';

const UserDashboard: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedMedicine, setScannedMedicine] = useState<Medicine | null>(null);
  const scanQR = useAppStore(state => state.scanQR);
  
  const handleScan = async (qrData: string) => {
    try {
      const medicine = await scanQR(qrData);
      
      if (medicine) {
        setScannedMedicine(medicine);
        toast({
          title: "QR Code Scanned",
          description: "Medicine information retrieved successfully.",
        });
      } else {
        toast({
          title: "Invalid QR Code",
          description: "This QR code is not recognized in our system.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error scanning QR code:", error);
      toast({
        title: "Scan Failed",
        description: "Failed to process QR code. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleRescan = () => {
    setScannedMedicine(null);
    setIsScanning(true);
  };

  return (
    <div className="container mx-auto max-w-lg py-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gradient">Medicine Authenticator</h1>
        <p className="text-muted-foreground">
          Scan medicine QR codes to verify authenticity
        </p>
      </div>
      
      <Card className="glass-morphism p-6 sm:p-8 rounded-xl">
        {scannedMedicine ? (
          <MedicineResult 
            medicine={scannedMedicine} 
            onRescan={handleRescan} 
          />
        ) : (
          <QRScanner 
            onScan={handleScan}
            isScanning={isScanning}
            setIsScanning={setIsScanning}
          />
        )}
      </Card>
      
      <div className="mt-8 glass-morphism p-4 rounded-lg animate-float">
        <h2 className="font-semibold mb-3">How It Works</h2>
        <ol className="space-y-2 list-decimal list-inside text-sm text-muted-foreground">
          <li>Scan the QR code on medicine packaging</li>
          <li>System verifies the authenticity against blockchain records</li>
          <li>View detailed medicine information and status</li>
          <li>Green badge means authentic, Yellow means expired, Red means invalid</li>
        </ol>
      </div>
    </div>
  );
};

export default UserDashboard;
