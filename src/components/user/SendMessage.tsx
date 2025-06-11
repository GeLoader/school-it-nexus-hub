
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { MessageSquare, Send, User, Users } from 'lucide-react';

const SendMessage = () => {
  const [newMessage, setNewMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'IT Support Team',
      message: 'Hello! How can we help you today?',
      timestamp: '2024-01-15 09:00 AM',
      isFromSupport: true
    },
    {
      id: 2,
      sender: 'You',
      message: 'Hi, I have a question about my computer setup.',
      timestamp: '2024-01-15 09:05 AM',
      isFromSupport: false
    },
    {
      id: 3,
      sender: 'John Smith (IT Support)',
      message: 'I\'d be happy to help you with your computer setup. What specific issue are you experiencing?',
      timestamp: '2024-01-15 09:07 AM',
      isFromSupport: true
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleString(),
      isFromSupport: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    toast({
      title: "Message Sent",
      description: "Your message has been sent to the IT support team.",
    });

    // Simulate a response from support (in a real app, this would come from the server)
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: 'IT Support Team',
        message: 'Thank you for your message. We\'ll get back to you shortly with assistance.',
        timestamp: new Date().toLocaleString(),
        isFromSupport: true
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const quickMessages = [
    'I need help with my computer',
    'Printer is not working',
    'Internet connection issues',
    'Software installation request',
    'Password reset needed'
  ];

  const handleQuickMessage = (message: string) => {
    setNewMessage(message);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Direct Messages with IT Support
          </CardTitle>
          <CardDescription>
            Send messages directly to the IT support team for quick assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Message Thread */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.isFromSupport ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.isFromSupport && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      <Users className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[70%] ${
                    message.isFromSupport
                      ? 'bg-white border'
                      : 'bg-blue-600 text-white'
                  } rounded-lg p-3`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium">
                      {message.sender}
                    </span>
                    {message.isFromSupport && (
                      <Badge variant="secondary" className="text-xs">
                        Support
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-2 ${
                    message.isFromSupport ? 'text-gray-500' : 'text-blue-100'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>

                {!message.isFromSupport && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-100">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>

          {/* Quick Message Options */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Quick messages:</p>
            <div className="flex flex-wrap gap-2">
              {quickMessages.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickMessage(message)}
                  className="text-xs"
                >
                  {message}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Form */}
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="space-y-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Messages are monitored during business hours (8 AM - 5 PM)
              </p>
              <Button type="submit" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </div>
          </form>

          {/* Support Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Support Information</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Response Time:</strong> Usually within 2-4 hours during business hours</p>
              <p><strong>Emergency Contact:</strong> For urgent issues, call ext. 1234</p>
              <p><strong>Business Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendMessage;
