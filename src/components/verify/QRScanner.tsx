import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

const QRScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScan = (data: any) => {
    if (data) {
      setScanResult(data.text || data);
    }
  };

  const handleError = (err: any) => {
    // Optionally handle errors
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-xl font-orbitron text-white mb-4">Scan Medicine QR Code</h2>
      <div className="w-full max-w-xs rounded-lg overflow-hidden border border-muted/20 bg-black/20">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </div>
      <div className="mt-6 text-white text-sm">
        {scanResult ? (
          <>
            <div className="mb-2 font-semibold text-mediqr-accent">QR Data:</div>
            <div className="break-all">{scanResult}</div>
          </>
        ) : (
          <span className="text-white/50">Point your camera at a QR code to verify.</span>
        )}
      </div>
    </div>
  );
};

export default QRScanner;