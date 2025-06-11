
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Package, FileText, AlertTriangle, Plus, LogOut, Users, Settings } from 'lucide-react';
import DataEntry from './admin/DataEntry';
import ViewRequests from './admin/ViewRequests';
import Inventory from './admin/Inventory';
import IncidentReport from './admin/IncidentReport';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Pending Requests', value: '12', icon: FileText, color: 'text-orange-600' },
    { title: 'Active Items', value: '245', icon: Package, color: 'text-green-600' },
    { title: 'Open Incidents', value: '3', icon: AlertTriangle, color: 'text-red-600' },
    { title: 'Total Users', value: '89', icon: Users, color: 'text-blue-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Monitor className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">IT Support Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <Button onClick={onLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="data-entry">Data Entry</TabsTrigger>
            <TabsTrigger value="requests">View Requests</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="incidents">Incident Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Requests</CardTitle>
                  <CardDescription>Latest IT support requests from users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Request #{i}</p>
                          <p className="text-sm text-gray-600">Computer not working - Office {i}</p>
                        </div>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                          Pending
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab('data-entry')} 
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Equipment
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('requests')} 
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Review Pending Requests
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('incidents')} 
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Create Incident Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data-entry">
            <DataEntry />
          </TabsContent>

          <TabsContent value="requests">
            <ViewRequests />
          </TabsContent>

          <TabsContent value="inventory">
            <Inventory />
          </TabsContent>

          <TabsContent value="incidents">
            <IncidentReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
