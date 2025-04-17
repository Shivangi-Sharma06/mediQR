
import React, { useState } from 'react';
import { useAppStore } from '@/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Copy, Eye, AlertTriangle } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const SearchMedicines: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const searchMedicines = useAppStore(state => state.searchMedicines);
  const tagAsExpired = useAppStore(state => state.tagAsExpired);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchMedicines>>([]);
  
  const handleSearch = () => {
    const searchResults = searchMedicines(searchQuery);
    setResults(searchResults);
  };
  
  const handleCopyIPFS = (ipfsHash: string) => {
    navigator.clipboard.writeText(ipfsHash);
    toast({
      title: 'IPFS Hash Copied',
      description: 'IPFS hash has been copied to clipboard.',
    });
  };
  
  const handleViewQR = (medicineId: string) => {
    navigate(`/admin/qr-generation?id=${medicineId}`);
  };
  
  const handleTagExpired = (medicineId: string) => {
    tagAsExpired(medicineId);
    toast({
      title: 'Medicine Tagged',
      description: 'Medicine has been tagged as expired.',
    });
    
    // Update the results
    const updatedResults = results.map(medicine => {
      if (medicine.id === medicineId) {
        return { ...medicine, expired: true };
      }
      return medicine;
    });
    
    setResults(updatedResults);
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Medicine Name',
    },
    {
      accessorKey: 'batchNumber',
      header: 'Batch Number',
    },
    {
      accessorKey: 'expiryDate',
      header: 'Expiry Date',
      cell: ({ row }: any) => {
        const date = new Date(row.original.expiryDate);
        const isExpired = date < new Date();
        
        return (
          <div className="flex items-center">
            <span>{format(date, 'MMM d, yyyy')}</span>
            {isExpired && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded bg-red-500/20 text-red-400">
                Expired
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'ipfsHash',
      header: 'IPFS Hash',
      cell: ({ row }: any) => {
        const ipfsHash = row.original.ipfsHash;
        
        return ipfsHash ? (
          <div className="flex items-center">
            <span className="truncate max-w-[140px]">{ipfsHash}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopyIPFS(ipfsHash)}
              className="ml-1 h-6 w-6"
            >
              <Copy size={12} />
            </Button>
          </div>
        ) : (
          <span className="text-muted-foreground">Not uploaded</span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => {
        const medicine = row.original;
        const isExpired = new Date(medicine.expiryDate) < new Date();
        
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewQR(medicine.id)}
              className="h-8"
            >
              <Eye size={14} className="mr-1" />
              QR
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              disabled={medicine.expired}
              onClick={() => handleTagExpired(medicine.id)}
              className={`h-8 ${
                medicine.expired ? 'opacity-50 cursor-not-allowed' : 'text-yellow-400 hover:text-yellow-300'
              }`}
            >
              <AlertTriangle size={14} className="mr-1" />
              {medicine.expired ? 'Tagged' : 'Tag'}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Search Medicines</h1>
        <p className="text-muted-foreground">
          Search for medicines by name, batch number, or manufacturer
        </p>
      </div>
      
      <div className="glass-morphism p-4 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search by name, batch number, or manufacturer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border-white/10 focus:border-primary"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} className="whitespace-nowrap">
            <Search size={16} className="mr-2" />
            Search
          </Button>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={results}
      />
    </div>
  );
};

export default SearchMedicines;
