import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (result: string) => void;
  isScanning: boolean;
  setIsScanning: (value: boolean) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({
  onScan,
  isScanning,
  setIsScanning,
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!isScanning) return;

    const qrRegionId = "qr-scanner";
    const qrCode = new Html5Qrcode(qrRegionId);
    html5QrCodeRef.current = qrCode;

    qrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          onScan(decodedText);
          setIsScanning(false);
          qrCode.stop().then(() => qrCode.clear());
        },
        (error) => console.warn("QR scan error", error)
      )
      .catch((err) => {
        console.error("Camera error", err);
        setIsScanning(false);
      });

    return () => {
      qrCode
        .stop()
        .then(() => qrCode.clear())
        .catch((err) => console.warn("Stop failed", err));
    };
  }, [isScanning]);

  const handleStopScanning = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current
        .stop()
        .then(() => {
          html5QrCodeRef.current?.clear();
          setIsScanning(false);
        })
        .catch((err) => console.warn("Stop failed", err));
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {isScanning ? (
        <>
          <div id="qr-scanner" ref={qrRef} className="w-full max-w-xs aspect-square mb-4" />
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={handleStopScanning}
          >
            Stop Scanning
          </button>
        </>
      ) : (
        <button
          className="px-4 py-2 bg-primary text-white rounded-md"
          onClick={() => setIsScanning(true)}
        >
          Start QR Scan
        </button>
      )}
    </div>
  );
};