
import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import MedicineTable from '@/components/admin/MedicineTable';

const ViewRecords: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-6">
        <MedicineTable />
      </div>
    </div>
  );
};

export default ViewRecords;
