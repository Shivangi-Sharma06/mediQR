import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { useAppStore } from '@/store';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';
import { Database, Shield, Fingerprint, Camera } from 'lucide-react';

const Landing: React.FC = () => {
  const { auth, login } = useAppStore();
  const navigate = useNavigate();

  const webcamRef = useRef<Webcam>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(auth.role === 'admin' ? '/admin' : '/user');
    }
  }, [auth, navigate]);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const handleLogin = (role: 'admin' | 'user') => {
    login(role);
    navigate(role === 'admin' ? '/admin' : '/user');
  };

  const startScanning = () => {
    setIsScanning(true);
    const id = setInterval(captureAndScan, 500);
    setIntervalId(id);
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const captureAndScan = () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

          if (qrCode) {
            setScanResult(qrCode.data);
            stopScanning();
          }
        }
      };
    }
  };

  // ------------------- SCANNER UI -------------------
  if (showScanner) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 text-center">
        <h1 className="text-3xl font-semibold mb-4">QR Code Scanner</h1>

        {isScanning && (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/png"
            width="100%"
            className="rounded-lg border border-white/10 max-w-md"
            videoConstraints={{ facingMode: 'environment' }}
          />
        )}

        <div className="mt-4 text-sm text-muted-foreground">
          {scanResult ? (
            <p><strong>Scanned QR:</strong> {scanResult}</p>
          ) : (
            <p>Point your camera at a QR code to scan it.</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4">
          {!isScanning ? (
            <Button onClick={startScanning} className="bg-green-600 hover:bg-green-700">
              Start Scanning
            </Button>
          ) : (
            <Button onClick={stopScanning} className="bg-red-600 hover:bg-red-700">
              Stop Scanning
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => {
              stopScanning();
              setScanResult(null);
              setShowScanner(false);
            }}
            className="border-white/20 hover:bg-white/10"
          >
            Back to Landing Page
          </Button>
        </div>
      </div>
    );
  }

  // ------------------- LANDING UI -------------------
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ParticleBackground />

      <div className="flex-1 container mx-auto flex flex-col items-center justify-center px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gradient animate-fade-in">
            mediQR
          </h1>
          <p className="text-xl mb-10 text-muted-foreground animate-fade-in delay-200">
            Blockchain-based medicine authentication system to verify medicine authenticity and combat counterfeiting
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in delay-300">
            <Button
              onClick={() => handleLogin('admin')}
              className="px-8 py-6 text-lg bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent"
            >
              Admin Dashboard
            </Button>
            <Button
              onClick={() => handleLogin('user')}
              variant="outline"
              className="px-8 py-6 text-lg border-white/20 hover:bg-white/10"
            >
              User Dashboard
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in delay-500">
          <div className="glass-morphism p-6 rounded-xl">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Database size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-World Usage</h3>
            <p className="text-sm text-muted-foreground">
              MediQR helps verify the authenticity of medicines using blockchain and QR codes.
            </p>
          </div>

          <div className="glass-morphism p-6 rounded-xl">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Shield size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">QR Verification</h3>
            <p className="text-sm text-muted-foreground">
              Instant authentication with QR codes linked to secure blockchain records.
            </p>
          </div>

          <div className="glass-morphism p-6 rounded-xl">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Fingerprint size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">IPFS Storage</h3>
            <p className="text-sm text-muted-foreground">
              Decentralized storage of medicine data using InterPlanetary File System.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button
            onClick={() => setShowScanner(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent"
          >
            <Camera className="mr-2" size={18} />
            Scan QR Code
          </Button>
        </div>
      </div>

      <footer className="py-6 glass-morphism relative z-10">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MediChain - Blockchain Medicine Authentication
        </div>
      </footer>
    </div>
  );
};

export default Landing;
