import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Copy, Eye, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

const SearchMedicines: React.FC = () => {
  // Hardcoded data
  const hardcodedData = [
    {
      id: '1',
      name: 'Paracetamol',
      batchNumber: '12345',
      expiryDate: '2025-12-31',
      ipfsHash: 'Qm123abc456def',
      expired: false,
    },
    {
      id: '2',
      name: 'Ibuprofen',
      batchNumber: '67890',
      expiryDate: '2023-10-15',
      ipfsHash: 'Qm789ghi012jkl',
      expired: true,
    },
    {
      id: '3',
      name: 'Amoxicillin',
      batchNumber: '54321',
      expiryDate: '2024-05-20',
      ipfsHash: '',
      expired: false,
    },
  ];

  const [results, setResults] = useState(hardcodedData); // Use hardcoded data as the initial state
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search operation
  const handleSearch = () => {
    const filteredResults = hardcodedData.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.batchNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div className="container mx-auto">
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

      {/* Table to display medicines */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Medicine Name</th>
              <th className="border border-gray-300 px-4 py-2">Batch Number</th>
              <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
              <th className="border border-gray-300 px-4 py-2">IPFS Hash</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((medicine) => {
              const isExpired = new Date(medicine.expiryDate) < new Date();
              return (
                <tr key={medicine.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{medicine.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{medicine.batchNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {format(new Date(medicine.expiryDate), 'MMM d, yyyy')}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {medicine.ipfsHash || 'Not uploaded'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {isExpired ? (
                      <span className="text-red-500">Expired</span>
                    ) : (
                      <span className="text-green-500">Valid</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchMedicines;