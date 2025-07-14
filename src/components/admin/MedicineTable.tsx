import React, { useEffect, useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Medicine {
  _id: string;
  name: string;
  batchNumber: string;
  expiryDate: string;
  ipfsHash: string;
  createdAt: string;
}

const MedicineTable: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/medicines');
        const data = await res.json();
        setMedicines(data);
      } catch (err) {
        // Handle error (optional)
      }
      setLoading(false);
    };
    fetchMedicines();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-orbitron text-white">Medicine Records</h2>
        <div className="text-xs text-white/50">
          {loading ? "Loading..." : `Showing ${medicines.length} records`}
        </div>
      </div>
      
      <div className="border border-muted/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-mediqr-darker">
              <TableRow>
                <TableHead className="text-white/70">ID</TableHead>
                <TableHead className="text-white/70">Name</TableHead>
                <TableHead className="text-white/70">Batch No.</TableHead>
                <TableHead className="text-white/70">Expiry Date</TableHead>
                <TableHead className="text-white/70">Date Added</TableHead>
                <TableHead className="text-white/70">IPFS Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.map((medicine) => (
                <TableRow 
                  key={medicine._id}
                  className="border-b border-muted/10 hover:bg-mediqr-darker/50 transition-colors"
                >
                  <TableCell className="font-mono text-xs">{medicine._id}</TableCell>
                  <TableCell className="font-medium">{medicine.name}</TableCell>
                  <TableCell className="font-mono text-xs">{medicine.batchNumber}</TableCell>
                  <TableCell>{medicine.expiryDate}</TableCell>
                  <TableCell>{new Date(medicine.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="font-mono text-xs text-mediqr-accent">
                    <span className="inline-flex items-center">
                      {medicine.ipfsHash.slice(0, 5)}...{medicine.ipfsHash.slice(-5)}
                    </span>
                  </TableCell>
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