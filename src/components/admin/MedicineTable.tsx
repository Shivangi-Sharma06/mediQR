
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Medicine {
  id: string;
  name: string;
  batchNumber: string;
  expiryDate: string;
  ipfsHash: string;
  dateAdded: string;
  status: 'verified' | 'pending' | 'failed';
}

const MedicineTable: React.FC = () => {
  // Sample data - in real app, this would come from an API
  const medicines: Medicine[] = [
    {
      id: '1',
      name: 'Amoxicillin',
      batchNumber: 'AMX-2024-001',
      expiryDate: '2025-06-15',
      ipfsHash: 'QmT8XYZ...123abc',
      dateAdded: '2025-02-15',
      status: 'verified'
    },
    {
      id: '2',
      name: 'Paracetamol',
      batchNumber: 'PCM-2024-042',
      expiryDate: '2026-01-10',
      ipfsHash: 'QmA1B2C...456def',
      dateAdded: '2025-03-24',
      status: 'verified'
    },
    {
      id: '3',
      name: 'Cetirizine',
      batchNumber: 'CTZ-2024-018',
      expiryDate: '2025-11-30',
      ipfsHash: 'QmD4E5F...789ghi',
      dateAdded: '2025-04-02',
      status: 'pending'
    },
    {
      id: '4',
      name: 'Metformin',
      batchNumber: 'MTF-2024-075',
      expiryDate: '2025-08-22',
      ipfsHash: 'QmG7H8I...101jkl',
      dateAdded: '2025-05-10',
      status: 'failed'
    }
  ];

  const getStatusBadge = (status: Medicine['status']) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-mediqr-success/20 text-mediqr-success hover:bg-mediqr-success/30">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-mediqr-error/20 text-mediqr-error hover:bg-mediqr-error/30">Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-orbitron text-white">Medicine Records</h2>
        <div className="text-xs text-white/50">
          Showing {medicines.length} records
        </div>
      </div>
      
      <div className="border border-muted/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-mediqr-darker">
              <TableRow>
                <TableHead className="text-white/70">Name</TableHead>
                <TableHead className="text-white/70">Batch No.</TableHead>
                <TableHead className="text-white/70">Expiry</TableHead>
                <TableHead className="text-white/70">IPFS Hash</TableHead>
                <TableHead className="text-white/70">Date Added</TableHead>
                <TableHead className="text-white/70">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.map((medicine) => (
                <TableRow 
                  key={medicine.id}
                  className="border-b border-muted/10 hover:bg-mediqr-darker/50 transition-colors"
                >
                  <TableCell className="font-medium">{medicine.name}</TableCell>
                  <TableCell className="font-mono text-xs">{medicine.batchNumber}</TableCell>
                  <TableCell>{medicine.expiryDate}</TableCell>
                  <TableCell className="font-mono text-xs text-mediqr-accent">
                    <span className="inline-flex items-center">
                      {medicine.ipfsHash.slice(0, 5)}...{medicine.ipfsHash.slice(-5)}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 cursor-pointer hover:text-white"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </span>
                  </TableCell>
                  <TableCell>{medicine.dateAdded}</TableCell>
                  <TableCell>{getStatusBadge(medicine.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MedicineTable;
