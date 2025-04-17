
import React, { useState, useRef } from 'react';
import { Camera, X, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface QRScannerProps {
  onScan: (result: string) => void;
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ 
  onScan,
  isScanning,
  setIsScanning,
}) => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Simulated QR scan since we can't actually scan in this environment
  const simulateScan = () => {
    // In a real implementation, you would scan the QR code from the video stream
    toast({
      title: "QR Code Detected",
      description: "Processing the detected QR code...",
    });
    
    setTimeout(() => {
      const simulatedQRData = `MED_${Math.random().toString(36).substring(2, 8)}`;
      onScan(simulatedQRData);
      setIsScanning(false);
    }, 1500);
  };

  // In a real implementation, this would start the camera and begin scanning
  const startScanning = async () => {
    setCameraError(null);
    
    try {
      // Simulate camera permission request
      setHasPermission(true);
      
      // In a real app, you'd do something like this:
      // const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      // if (videoRef.current) {
      //   videoRef.current.srcObject = stream;
      //   videoRef.current.play();
      // }
      
      // After a delay, simulate a successful scan
      setTimeout(simulateScan, 3000);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Could not access the camera. Please check permissions.');
      setHasPermission(false);
      toast({
        title: "Camera Access Failed",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopScanning = () => {
    // In a real app, you'd do something like this:
    // if (videoRef.current && videoRef.current.srcObject) {
    //   const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
    //   tracks.forEach(track => track.stop());
    //   videoRef.current.srcObject = null;
    // }
    setIsScanning(false);
  };

  React.useEffect(() => {
    if (isScanning) {
      startScanning();
    } else {
      stopScanning();
    }
    
    return () => {
      stopScanning();
    };
  }, [isScanning]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className={`
        aspect-square rounded-lg overflow-hidden relative 
        ${isScanning ? 'border-2 border-primary' : 'bg-black/20'}
      `}>
        {isScanning ? (
          <>
            {/* Video would go here in a real implementation */}
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
              <div className="relative w-3/4 h-3/4 border-2 border-primary/50 rounded-lg">
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
                
                {/* Scan line animation */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="h-0.5 w-full bg-primary/70 animate-[scan_2s_ease-in-out_infinite]"></div>
                </div>
                
                {/* Invisible video element */}
                <video 
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover opacity-0"
                  playsInline
                  muted
                />
              </div>
              <ScanLine className="absolute inset-0 w-full h-full text-primary animate-pulse opacity-50" />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-primary animate-pulse">
              Scanning for QR code...
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <Camera size={48} className="mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Scan Medicine QR Code</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Position the QR code within the scanner to verify the medicine authenticity
            </p>
            <Button
              onClick={() => setIsScanning(true)}
              className="bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent"
            >
              Start Scanning
            </Button>
            {cameraError && (
              <p className="mt-4 text-sm text-red-400">{cameraError}</p>
            )}
          </div>
        )}
      </div>
      
      {isScanning && (
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-black/50"
          onClick={() => setIsScanning(false)}
        >
          <X size={16} />
        </Button>
      )}
    </div>
  );
};
