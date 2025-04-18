import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { QRDisplay } from '@/components/ui/qr-display';

type Medicine = {
  id: string; // Unique identifier
  createdAt: string; // ISO format string
  name: string;
  batchNumber: string;
  expiryDate: string; // ISO format string
  manufacturer: string;
  qrCode: string; // Base64 or URL for the QR code
};

const formSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  batchNumber: z.string().min(1, "Batch number is required"),
  expiryDate: z.date({ required_error: "Expiry date is required" }),
  manufacturerAddress: z.string().min(1, "Manufacturer address is required"),
});

type FormData = z.infer<typeof formSchema>;

const MedicineEntry: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMedicine, setSubmittedMedicine] = useState<Medicine | null>(null);

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
    setIsSubmitting(true);

    const qrCodeData = `Name: ${data.name}\nBatch: ${data.batchNumber}`;
    const qrCodeUrl = await generateQRCode(qrCodeData); // Generate QR code URL
    const medicineData: Medicine = {
      id: crypto.randomUUID(), // Generate a unique ID
      createdAt: new Date().toISOString(), // Current timestamp
      name: data.name,
      batchNumber: data.batchNumber,
      expiryDate: data.expiryDate.toISOString(),
      manufacturer: data.manufacturerAddress,
      qrCode: qrCodeUrl,
    };

    setSubmittedMedicine(medicineData);

    toast({
      title: "Medicine Submitted",
      description: "QR Code generated below.",
    });

    reset();
    setIsSubmitting(false);
  };

  const generateQRCode = async (data: string): Promise<string> => {
    const QRCode = await import('qrcode');
    return QRCode.toDataURL(data);
  };

  return (
    <div className="container mx-auto max-w-2xl animate-fade-in">
      <Card className="glass-morphism p-6 sm:p-8 rounded-xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Add New Medicine</h1>
          <p className="text-muted-foreground">Fill in the form to submit medicine information.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {/* Name */}
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

            {/* Batch Number */}
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

            {/* Expiry Date */}
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

            {/* Manufacturer Address */}
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

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Medicine Data"
              )}
            </Button>
          </div>
        </form>

        {/* QR Code Section */}
        {submittedMedicine && (
          <div className="mt-10">
            <QRDisplay medicine={{ ...submittedMedicine, expiryDate: new Date(submittedMedicine.expiryDate), createdAt: new Date(submittedMedicine.createdAt) }} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default MedicineEntry;