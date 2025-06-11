
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Plus, HelpCircle, MessageSquare, LogOut, FileText, CheckCircle, Clock } from 'lucide-react';
import CreateRequest from './user/CreateRequest';
import Troubleshooting from './user/Troubleshooting';
import SendMessage from './user/SendMessage';

interface UserDashboardProps {
  user: any;
  onLogout: () => void;
}

const UserDashboard = ({ user, onLogout }: UserDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const myRequests = [
    { id: 1, title: 'Computer Screen Issue', status: 'pending', date: '2024-01-15' },
    { id: 2, title: 'Printer Not Working', status: 'approved', date: '2024-01-14' },
    { id: 3, title: 'Internet Connection Problem', status: 'completed', date: '2024-01-13' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'approved': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Monitor className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">IT Support Portal</h1>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="create-request">Create Request</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>My Requests</CardTitle>
                  <CardDescription>Track your IT support requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(request.status)}
                          <div>
                            <p className="font-medium">Request #{request.id}</p>
                            <p className="text-sm text-gray-600">{request.title}</p>
                            <p className="text-xs text-gray-500">{request.date}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common support actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab('create-request')} 
                    className="w-full justify-start"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('troubleshooting')} 
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Get Help
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('messages')} 
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Support Statistics</CardTitle>
                <CardDescription>Your support activity overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-gray-600">Total Requests</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">1</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">2</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create-request">
            <CreateRequest />
          </TabsContent>

          <TabsContent value="troubleshooting">
            <Troubleshooting />
          </TabsContent>

          <TabsContent value="messages">
            <SendMessage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
