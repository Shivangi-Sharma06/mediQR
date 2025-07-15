import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Sidebar from '@/components/admin/Sidebar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', medicines: 20 },
  { name: 'Feb', medicines: 45 },
  { name: 'Mar', medicines: 32 },
  { name: 'Apr', medicines: 67 },
  { name: 'May', medicines: 53 },
];

type BannerProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
};

const Banner: React.FC<BannerProps> = ({ title, description, children }) => (
  <Card className="bg-mediqr-darker border-mediqr-accent">
    <CardHeader className="pb-2">
      <CardTitle className="text-mediqr-accent text-lg">{title}</CardTitle>
      <CardDescription className="text-white/80">{description}</CardDescription>
      {children}
    </CardHeader>
  </Card>
);

const Admin: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-orbitron text-white mb-6">Admin Dashboard</h1>

        {/* Horizontal grid for banners and verification card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Banner
            title="Prefilled Manufacturer Address"
            description="The manufacturer address will be prefilled from the wallet you connect to the site. You can also download the QR code generated for each medicine."
          />
          <Banner
            title="IPFS Hash Reference"
            description="The hash generated after uploading to IPFS will be displayed for your reference. It should also be printed along with the QR code on the medicine box."
          />
          <Banner
            title="Batch Size Limit"
            description="You cannot create more than 5000 medicines in a single lot. Please split larger batches accordingly."
          />
          <Banner
            title="Verification Rate"
            description={
              <>
                <span className="text-3xl font-orbitron text-mediqr-accent block">98.3%</span>
                <span className="text-xs text-mediqr-success block mt-1">+2.1% from last month</span>
                <span className="text-white/70 block mt-2">Success percentage</span>
              </>
            }
          />
        </div>

        {/* Chart and expanded tips section below */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start h-[220px]">
          <div className="lg:col-span-2 h-full">
            <Card className="bg-mediqr-darker border-muted/20 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-white text-lg">Medicine Registration Trend</CardTitle>
                <CardDescription>New registrations over time</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="h-full min-h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient id="colorMedicines" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A1F2C', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: 'white' 
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="medicines" 
                        stroke="#8B5CF6" 
                        fillOpacity={1} 
                        fill="url(#colorMedicines)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Expanded Tips section */}
          <div className="h-full flex flex-col">
            <Card className="bg-mediqr-darker border-mediqr-accent h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-mediqr-accent text-base">Tips</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center">
                <ul className="list-disc ml-4 text-white/70 text-sm space-y-2">
                  <li>Keep your wallet connected for seamless registration.</li>
                  <li>Always verify the IPFS hash before printing.</li>
                  <li>Split large batches for better tracking.</li>
                  <li>Download and securely store QR codes for each batch.</li>
                  <li>Double-check manufacturer address before submission.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;