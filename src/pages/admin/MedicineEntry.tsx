import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import QRCode from 'qrcode';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { create } from 'ipfs-http-client'; // Import IPFS client

const formSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  batchNumber: z.string().min(1, "Batch number is required"),
  expiryDate: z.date({ required_error: "Expiry date is required" }),
  manufacturerAddress: z.string().min(1, "Manufacturer address is required"),
});

type FormData = z.infer<typeof formSchema>;

const MedicineEntry: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null); // State to store IPFS hash
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const ipfsClient = create({ url: 'https://ipfs.infura.io:5001/api/v0' }); // Initialize IPFS client

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      batchNumber: '',
      manufacturerAddress: '',
    },
  });

  const selectedDate = watch('expiryDate');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check for duplicate batch number
      const q = query(collection(db, 'medicines'), where('batchNumber', '==', data.batchNumber));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setError("Batch number already exists. Please use a unique batch number.");
        setIsLoading(false);
        return;
      }

      const qrData = `Manufacturer: ${data.manufacturerAddress}\nMedicine: ${data.name}\nBatch: ${data.batchNumber}`;

      // Generate QR Code on canvas
      if (qrCanvasRef.current) {
        QRCode.toCanvas(qrCanvasRef.current, qrData, (error) => {
          if (error) console.error("Error generating QR code:", error);
        });
      }

      // Generate QR Code as URL
      const qrCodeUrl = await QRCode.toDataURL(qrData);
      setQrCodeUrl(qrCodeUrl);

      // Save data to Firestore
      await addDoc(collection(db, 'medicines'), {
        ...data,
        expiryDate: data.expiryDate.toISOString(),
        qrData,
        createdAt: new Date().toISOString(),
      });

      setSubmittedData(data);
      reset();
    } catch (err) {
      console.error("Submission error:", err);
      setError("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadToIPFS = async () => {
    if (!qrCodeUrl) {
      setError("QR Code is not generated yet.");
      return;
    }

    try {
      const response = await fetch(qrCodeUrl); // Fetch the QR code as a blob
      const blob = await response.blob();
      const file = new File([blob], `QR_${submittedData?.name}_${submittedData?.batchNumber}.png`, {
        type: 'image/png',
      });

      const result = await ipfsClient.add(file); // Upload to IPFS
      setIpfsHash(result.path); // Store the IPFS hash
      setError(null);

      console.log("Uploaded to IPFS:", result.path);
    } catch (err) {
      console.error("Error uploading to IPFS:", err);
      setError("Failed to upload QR Code to IPFS.");
    }
  };

  return (
    <div className="container mx-auto max-w-2xl animate-fade-in">
      <Card className="glass-morphism p-6 sm:p-8 rounded-xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Add New Medicine</h1>
          <p className="text-muted-foreground">Fill in the form to generate a QR code.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Medicine Name</label>
              <Input
                id="name"
                placeholder="Enter medicine name"
                {...register("name")}
                className={cn("bg-white/5 border-white/10 focus:border-primary", errors.name && "border-red-500")}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="batchNumber" className="text-sm font-medium">Batch Number</label>
              <Input
                id="batchNumber"
                placeholder="Enter batch number"
                {...register("batchNumber")}
                className={cn("bg-white/5 border-white/10 focus:border-primary", errors.batchNumber && "border-red-500")}
              />
              {errors.batchNumber && <p className="text-red-500 text-xs">{errors.batchNumber.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="expiryDate" className="text-sm font-medium">Expiry Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/5 border-white/10 hover:bg-white/10",
                      errors.expiryDate && "border-red-500",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Select expiry date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-background border-white/10">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => setValue("expiryDate", date as Date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.expiryDate && <p className="text-red-500 text-xs">{errors.expiryDate.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="manufacturerAddress" className="text-sm font-medium">Manufacturer Address</label>
              <Input
                id="manufacturerAddress"
                placeholder="Enter manufacturer address"
                {...register("manufacturerAddress")}
                className={cn("bg-white/5 border-white/10 focus:border-primary", errors.manufacturerAddress && "border-red-500")}
              />
              {errors.manufacturerAddress && (
                <p className="text-red-500 text-xs">{errors.manufacturerAddress.message}</p>
              )}
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate QR Code'}
            </Button>
          </div>
        </form>

        {qrCodeUrl && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-medium mb-4">Generated QR Code</h2>
            <canvas ref={qrCanvasRef} className="mx-auto mb-4" />
            <img src={qrCodeUrl} alt="Generated QR Code" className="mx-auto mb-4" />
            <div className="flex justify-center gap-4">
              <a href={qrCodeUrl} download={`QR_${submittedData?.name}_${submittedData?.batchNumber}.png`}>
                <Button variant="outline" className="mb-4">Download QR Code</Button>
              </a>
              <Button variant="outline" className="mb-4" onClick={uploadToIPFS}>
                Upload QR to IPFS
              </Button>
            </div>
            {ipfsHash && (
              <div className="mt-4">
                <p className="text-sm">
                  <strong>IPFS Hash:</strong> {ipfsHash}
                </p>
                <p className="text-sm">
                  <a
                    href={`https://ipfs.io/ipfs/${ipfsHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View on IPFS
                  </a>
                </p>
              </div>
            )}
            {submittedData && (
              <div className="mt-4">
                <p className="text-sm"><strong>Medicine Name:</strong> {submittedData.name}</p>
                <p className="text-sm"><strong>Batch Number:</strong> {submittedData.batchNumber}</p>
                <p className="text-sm"><strong>Manufacturer:</strong> {submittedData.manufacturerAddress}</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default MedicineEntry;