
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Eye, Check, X, Clock, User, MapPin, Calendar } from 'lucide-react';

const ViewRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      ticketNumber: 'TK-2024-001',
      title: 'Computer Not Starting',
      description: 'The desktop computer in my office is not turning on. I tried pressing the power button multiple times but nothing happens.',
      requester: 'John Smith',
      office: 'Principal Office',
      priority: 'high',
      status: 'pending',
      dateCreated: '2024-01-15',
      category: 'Hardware'
    },
    {
      id: 2,
      ticketNumber: 'TK-2024-002',
      title: 'Printer Paper Jam',
      description: 'The office printer keeps getting paper jams every time we try to print documents.',
      requester: 'Mary Johnson',
      office: 'Teacher Lounge',
      priority: 'medium',
      status: 'pending',
      dateCreated: '2024-01-14',
      category: 'Hardware'
    },
    {
      id: 3,
      ticketNumber: 'TK-2024-003',
      title: 'WiFi Connection Issues',
      description: 'Students are unable to connect to the school WiFi network in classroom 205.',
      requester: 'David Brown',
      office: 'Room 205',
      priority: 'high',
      status: 'approved',
      dateCreated: '2024-01-13',
      category: 'Network'
    }
  ]);

  const handleApprove = (requestId: number) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'approved' } : req
    ));
    toast({
      title: "Request Approved",
      description: "The request has been approved and assigned to a technician.",
    });
  };

  const handleReject = (requestId: number) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
    toast({
      title: "Request Rejected",
      description: "The request has been rejected.",
      variant: "destructive"
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            IT Support Requests
          </CardTitle>
          <CardDescription>
            Review and manage incoming support requests from users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{request.ticketNumber}</h3>
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-gray-900">{request.title}</h4>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{request.ticketNumber} - {request.title}</DialogTitle>
                        <DialogDescription>Request details and actions</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              <strong>Requester:</strong> {request.requester}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              <strong>Office:</strong> {request.office}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              <strong>Date:</strong> {request.dateCreated}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              <strong>Category:</strong> {request.category}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Description:</h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                            {request.description}
                          </p>
                        </div>

                        {request.status === 'pending' && (
                          <div className="flex gap-2 pt-4">
                            <Button 
                              onClick={() => handleApprove(request.id)}
                              className="flex-1"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approve Request
                            </Button>
                            <Button 
                              onClick={() => handleReject(request.id)}
                              variant="destructive"
                              className="flex-1"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reject Request
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {request.requester}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {request.office}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {request.dateCreated}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2">{request.description}</p>

                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleApprove(request.id)}
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" />
                      Approve
                    </Button>
                    <Button 
                      onClick={() => handleReject(request.id)}
                      size="sm"
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewRequests;
