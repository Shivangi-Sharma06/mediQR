
import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import MedicineForm from '@/components/admin/MedicineForm';

const AddMedicine: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-6">
        <MedicineForm />
      </div>
    </div>
  );
};

export default AddMedicine;
