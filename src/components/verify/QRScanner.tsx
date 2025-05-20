
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Camera, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const QRScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'genuine' | 'fake' | null>(null);
  const [medicineData, setMedicineData] = useState<{
    name: string;
    batchNumber: string;
    manufacturerAddress: string;
    ipfsHash: string;
  } | null>(null);

  const handleScan = () => {
    setScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setScanning(false);
      setVerifying(true);
      
      // Simulate verification process
      setTimeout(() => {
        const isGenuine = Math.random() > 0.2; // 80% chance of being genuine
        
        setVerifying(false);
        setVerificationResult(isGenuine ? 'genuine' : 'fake');
        
        if (isGenuine) {
          setMedicineData({
            name: 'Amoxicillin 500mg',
            batchNumber: 'AMX-2024-001',
            manufacturerAddress: '2025-06-15',
            ipfsHash: 'QmT8XYZ...123abc'
          });
          toast.success("Medicine verification successful!");
        } else {
          setMedicineData(null);
          toast.error("Warning! Counterfeit medicine detected!");
        }
      }, 2000);
    }, 3000);
  };
  
  const resetScan = () => {
    setScanning(false);
    setVerifying(false);
    setVerificationResult(null);
    setMedicineData(null);
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl font-orbitron text-white">Medicine Verification</h1>
        <p className="text-white/60">Scan the QR code on the medicine package to verify its authenticity</p>
      </div>

      <div className="flex flex-col items-center">
        <div className={`w-72 h-72 border-2 ${verificationResult === 'genuine' ? 'border-mediqr-success' : verificationResult === 'fake' ? 'border-mediqr-error' : 'border-muted/30'} rounded-lg mb-8 relative overflow-hidden grid place-items-center`}>
          {(scanning || verifying) ? (
            <div className="absolute inset-0 bg-mediqr-darker/80 flex items-center justify-center flex-col">
              {scanning ? (
                <>
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-2 border-mediqr-primary/20 flex items-center justify-center">
                      <Camera className="h-10 w-10 text-mediqr-primary" />
                    </div>
                    <div className="absolute inset-0 border-t-2 border-mediqr-primary rounded-full animate-spin-slow"></div>
                  </div>
                  <p className="mt-4 text-sm text-white/70">Scanning QR Code...</p>
                </>
              ) : (
                <>
                  <Loader2 className="h-10 w-10 text-mediqr-accent animate-spin" />
                  <p className="mt-4 text-sm text-white/70">Verifying on Blockchain...</p>
                </>
              )}
            </div>
          ) : verificationResult ? (
            <div className={`absolute inset-0 ${verificationResult === 'genuine' ? 'bg-mediqr-success/10' : 'bg-mediqr-error/10'} flex items-center justify-center`}>
              {verificationResult === 'genuine' ? (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-mediqr-success mx-auto animate-fade-in" />
                  <p className="mt-4 text-mediqr-success font-semibold text-lg">Genuine Medicine</p>
                </div>
              ) : (
                <div className="text-center">
                  <XCircle className="h-16 w-16 text-mediqr-error mx-auto animate-fade-in" />
                  <p className="mt-4 text-mediqr-error font-semibold text-lg">Fake Medicine</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-white/40">
              <Camera className="h-10 w-10 mx-auto mb-2" />
              <p className="text-sm">QR Scanner Ready</p>
            </div>
          )}
        </div>

        <div className="w-full space-y-6">
          {medicineData ? (
            <div className="bg-mediqr-darker/80 border border-muted/20 rounded-lg p-5 grid-pattern animate-fade-in">
              <h2 className="text-lg font-medium mb-4 text-white">Medicine Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Name:</span>
                  <span className="font-medium text-white">{medicineData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Batch Number:</span>
                  <span className="font-medium text-white/90">{medicineData.batchNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Expiry Date:</span>
                  <span className="font-medium text-white/90">{medicineData.manufacturerAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">IPFS Hash:</span>
                  <a href="#" className="text-mediqr-accent hover:underline font-mono text-xs">
                    {medicineData.ipfsHash}
                  </a>
                </div>
              </div>
            </div>
          ) : verificationResult === 'fake' ? (
            <div className="bg-mediqr-error/20 border border-mediqr-error/30 rounded-lg p-5 animate-fade-in">
              <h2 className="text-lg font-medium mb-2 text-white">Warning: Counterfeit Detected</h2>
              <p className="text-white/70 text-sm">This medicine appears to be counterfeit and may be dangerous. Please report it to the authorities.</p>
            </div>
          ) : null}
          
          <div className="flex justify-center gap-4">
            {!scanning && !verifying && !verificationResult && (
              <Button 
                onClick={handleScan}
                className="bg-gradient-to-r from-mediqr-primary to-mediqr-secondary hover:opacity-90 transition-opacity"
              >
                <Camera className="mr-2 h-4 w-4" />
                Start Scanning
              </Button>
            )}
            {verificationResult && (
              <Button 
                onClick={resetScan}
                variant="outline"
                className="border-muted/30 text-white hover:bg-white/5"
              >
                Scan Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
