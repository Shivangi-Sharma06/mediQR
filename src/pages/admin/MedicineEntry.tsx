
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useAppStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  batchNumber: z.string().min(1, "Batch number is required"),
  expiryDate: z.date({
    required_error: "Expiry date is required",
  }),
  manufacturerAddress: z.string().min(1, "Manufacturer address is required"),
});

type FormData = z.infer<typeof formSchema>;

const MedicineEntry: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const addMedicine = useAppStore(state => state.addMedicine);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      batchNumber: '',
      manufacturerAddress: '',
    }
  });
  
  const selectedDate = watch('expiryDate');

  const onSubmit = async (data: FormData) => {
    // Don't submit if wallet not connected
    const isConnected = useAppStore.getState().wallet.isConnected;
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to submit medicine data.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add the new medicine to the store
      const newMedicine = await addMedicine({
        name: data.name,
        batchNumber: data.batchNumber,
        expiryDate: data.expiryDate,
        manufacturer: data.manufacturerAddress,

      });
      
      toast({
        title: "Medicine Added",
        description: "The medicine has been successfully added to the system.",
      });
      
      // Redirect to the QR generation page with the new medicine ID
      navigate(`/admin/qr-generation?id=${newMedicine.id}`);
    } catch (error) {
      console.error("Error adding medicine:", error);
      toast({
        title: "Error",
        description: "Failed to add medicine. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl animate-fade-in">
      <Card className="glass-morphism p-6 sm:p-8 rounded-xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Add New Medicine</h1>
          <p className="text-muted-foreground">
            Enter medicine information to register it on the blockchain
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Medicine Name
              </label>
              <Input
                id="name"
                className={cn(
                  "bg-white/5 border-white/10 focus:border-primary",
                  errors.name && "border-red-500 focus:border-red-500"
                )}
                placeholder="Enter medicine name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="batchNumber" className="text-sm font-medium">
                Batch Number
              </label>
              <Input
                id="batchNumber"
                className={cn(
                  "bg-white/5 border-white/10 focus:border-primary",
                  errors.batchNumber && "border-red-500 focus:border-red-500"
                )}
                placeholder="Enter batch number"
                {...register("batchNumber")}
              />
              {errors.batchNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.batchNumber.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="expiryDate" className="text-sm font-medium">
                Expiry Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/5 border-white/10 hover:bg-white/10",
                      errors.expiryDate && "border-red-500 focus:border-red-500",
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
                    onSelect={date => setValue("expiryDate", date as Date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.expiryDate && (
                <p className="text-red-500 text-xs mt-1">{errors.expiryDate.message}</p>
              )}
            </div>
            
            <div className="space-y-2"> 
  <label htmlFor="manufacturerAddress" className="text-sm font-medium">
    Manufacturer Address
  </label>
  <Input
    id="manufacturerAddress"
    className={cn(
      "bg-white/5 border-white/10 focus:border-primary",
      errors.manufacturerAddress && "border-red-500 focus:border-red-500"
    )}
    placeholder="Enter manufacturer address"
    {...register("manufacturerAddress")}
  />
  {errors.manufacturerAddress && (
    <p className="text-red-500 text-xs mt-1">{errors.manufacturerAddress.message}</p>
  )}
</div>

            
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
      </Card>
    </div>
  );
};

export default MedicineEntry;
