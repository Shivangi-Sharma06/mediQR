import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ethers } from 'ethers'; // Import ethers.js
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader2 } from 'lucide-react';

// ABI and Contract Address
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_medname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_batchNo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expiryDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_qrCID",
				"type": "string"
			}
		],
		"name": "addMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "batchNo",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "uploader",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "qrCID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "MedicineAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchNo",
				"type": "string"
			}
		],
		"name": "getMedicine",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "expiryDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "qrCID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "uploader",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchNo",
				"type": "string"
			}
		],
		"name": "getQRLink",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const CONTRACT_ADDRESS = "0xDA0bab807633f07f013f94DD0E6A4F96F8742B53"; // Replace with your deployed contract address

const formSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  batchNumber: z.string().min(1, "Batch number is required"),
  expiryDate: z.date({
    required_error: "Expiry date is required",
  }),
  manufacturerAddress: z.string().min(1, "Manufacturer address is required"),
  qrCID: z.string().min(1, "QR CID is required"), // Add QR CID field
});

type FormData = z.infer<typeof formSchema>;

const MedicineEntry: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      batchNumber: '',
      manufacturerAddress: '',
      qrCID: '',
    }
  });

  const selectedDate = watch('expiryDate');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Interact with the smart contract
      const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"); // Replace with your RPC URL
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Call the addMedicine function on the smart contract
      const tx = await contract.addMedicine(
        data.name,
        data.batchNumber,
        format(data.expiryDate, "dd-MM-yyyy"),
        data.qrCID
      );

      toast({
        title: "Transaction Submitted",
        description: "Waiting for confirmation...",
      });

      // Wait for the transaction to be mined
      await tx.wait();

      toast({
        title: "Medicine Added",
        description: "The medicine has been successfully added to the blockchain.",
      });

      // Reset the form
      setValue("name", "");
      setValue("batchNumber", "");
      setValue("expiryDate", undefined);
      setValue("manufacturerAddress", "");
      setValue("qrCID", "");
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

            <div className="space-y-2">
              <label htmlFor="qrCID" className="text-sm font-medium">
                QR CID (IPFS Hash)
              </label>
              <Input
                id="qrCID"
                className={cn(
                  "bg-white/5 border-white/10 focus:border-primary",
                  errors.qrCID && "border-red-500 focus:border-red-500"
                )}
                placeholder="Enter QR CID"
                {...register("qrCID")}
              />
              {errors.qrCID && (
                <p className="text-red-500 text-xs mt-1">{errors.qrCID.message}</p>
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