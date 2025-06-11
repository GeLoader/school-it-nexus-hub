
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Send, Ticket } from 'lucide-react';

const CreateRequest = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    office: '',
    description: '',
    additionalInfo: ''
  });

  useEffect(() => {
    // Generate ticket number when component mounts
    const generateTicketNumber = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `TK-${year}-${month}${random}`;
    };
    
    setTicketNumber(generateTicketNumber());
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating request:', { ticketNumber, ...formData });
    
    toast({
      title: "Request Submitted Successfully",
      description: `Your request ${ticketNumber} has been submitted and is pending review.`,
    });

    // Reset form
    setFormData({
      title: '',
      category: '',
      priority: 'medium',
      office: '',
      description: '',
      additionalInfo: ''
    });
    
    // Generate new ticket number
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    setTicketNumber(`TK-${year}-${month}${random}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Support Request
        </CardTitle>
        <CardDescription>
          Submit a new IT support request for technical assistance
        </CardDescription>
        {ticketNumber && (
          <div className="flex items-center gap-2 mt-2">
            <Ticket className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Ticket Number: </span>
            <Badge variant="outline" className="font-mono">
              {ticketNumber}
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Request Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hardware">Hardware Issue</SelectItem>
                  <SelectItem value="software">Software Issue</SelectItem>
                  <SelectItem value="network">Network/Internet</SelectItem>
                  <SelectItem value="printer">Printer/Scanner</SelectItem>
                  <SelectItem value="email">Email/Communication</SelectItem>
                  <SelectItem value="account">Account/Access</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Not urgent</SelectItem>
                  <SelectItem value="medium">Medium - Normal priority</SelectItem>
                  <SelectItem value="high">High - Urgent</SelectItem>
                </SelectContent>
              </Select>
              <Badge className={getPriorityColor(formData.priority)}>
                {formData.priority} priority
              </Badge>
            </div>

            <div className="space-y-2">
              <Label htmlFor="office">Office/Location *</Label>
              <Input
                id="office"
                value={formData.office}
                onChange={(e) => handleInputChange('office', e.target.value)}
                placeholder="e.g., Principal Office, Room 101, Teacher Lounge"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Problem Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Please describe the issue in detail. Include what you were doing when the problem occurred, any error messages, and what you've already tried."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              placeholder="Any additional details that might help us resolve your issue faster"
              rows={3}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your request will be reviewed by our IT team</li>
              <li>• You'll receive a notification when your request is approved or if more information is needed</li>
              <li>• A technician will be assigned to resolve your issue</li>
              <li>• You can track the progress of your request in the Overview tab</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Submit Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateRequest;
