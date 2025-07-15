
import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import MedicineForm from '@/components/admin/MedicineForm';

interface AddMedicineProps {
  account: string | null;
}

const AddMedicine: React.FC<AddMedicineProps> = ({ account }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-6">
        <MedicineForm walletAddress={account} />
      </div>
    </div>
  );
};

export default AddMedicine;