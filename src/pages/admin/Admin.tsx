
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Sidebar from '@/components/admin/Sidebar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Check, X, Clock } from 'lucide-react';

const data = [
  { name: 'Jan', medicines: 20 },
  { name: 'Feb', medicines: 45 },
  { name: 'Mar', medicines: 32 },
  { name: 'Apr', medicines: 67 },
  { name: 'May', medicines: 53 },
];

const Admin: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-orbitron text-white mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-mediqr-darker border-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Total Medicines</CardTitle>
              <CardDescription>Registered on blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-orbitron text-white">217</div>
              <p className="text-xs text-mediqr-accent mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-mediqr-darker border-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Verification Rate</CardTitle>
              <CardDescription>Success percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-orbitron text-white">98.3%</div>
              <p className="text-xs text-mediqr-success mt-1">+2.1% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-mediqr-darker border-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Active Batches</CardTitle>
              <CardDescription>Non-expired medicines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-orbitron text-white">184</div>
              <p className="text-xs text-white/50 mt-1">5 batches expire this month</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-mediqr-darker border-muted/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white text-lg">Medicine Registration Trend</CardTitle>
              <CardDescription>New registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
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
          
          <Card className="bg-mediqr-darker border-muted/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Verification Status</CardTitle>
              <CardDescription>Current medicine status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-mediqr-success/20 flex items-center justify-center mr-3">
                      <Check className="h-4 w-4 text-mediqr-success" />
                    </div>
                    <span className="text-sm font-medium text-white">Verified</span>
                  </div>
                  <span className="text-white font-orbitron">195</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-yellow-500" />
                    </div>
                    <span className="text-sm font-medium text-white">Pending</span>
                  </div>
                  <span className="text-white font-orbitron">12</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-mediqr-error/20 flex items-center justify-center mr-3">
                      <X className="h-4 w-4 text-mediqr-error" />
                    </div>
                    <span className="text-sm font-medium text-white">Failed</span>
                  </div>
                  <span className="text-white font-orbitron">10</span>
                </div>
                
                <div className="pt-4 border-t border-muted/20 mt-4">
                  <div className="h-2 bg-white/10 rounded-full">
                    <div 
                      className="h-2 bg-gradient-to-r from-mediqr-primary to-mediqr-secondary rounded-full" 
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-white/50">
                    <span>Total verification rate</span>
                    <span>90%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
