
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { HelpCircle, Search, ChevronDown, ChevronRight, Monitor, Printer, Wifi, Globe, Video, Image } from 'lucide-react';

const Troubleshooting = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const troubleshootingGuides = [
    {
      id: 1,
      title: 'Computer Won\'t Start',
      category: 'Hardware',
      icon: Monitor,
      difficulty: 'Easy',
      steps: [
        'Check if the power cable is properly connected',
        'Press and hold the power button for 10 seconds',
        'Check if the power outlet is working by testing with another device',
        'Look for any lights on the computer - power LED or activity indicators',
        'If still not working, try a different power cable if available'
      ],
      video: 'https://example.com/video1',
      images: ['https://images.unsplash.com/photo-1588972506217-4c7b9c9c1e47?w=300&h=200&fit=crop']
    },
    {
      id: 2,
      title: 'Printer Not Printing',
      category: 'Hardware',
      icon: Printer,
      difficulty: 'Easy',
      steps: [
        'Check if the printer is turned on and connected to power',
        'Verify the USB or network cable connection',
        'Check if there\'s paper in the paper tray',
        'Look for any error lights or messages on the printer display',
        'Try printing a test page from the printer\'s menu',
        'Check ink or toner levels'
      ],
      video: 'https://example.com/video2',
      images: ['https://images.unsplash.com/photo-1586953159958-af931ad0d19c?w=300&h=200&fit=crop']
    },
    {
      id: 3,
      title: 'No Internet Connection',
      category: 'Network',
      icon: Wifi,
      difficulty: 'Medium',
      steps: [
        'Check if WiFi is enabled on your device',
        'Look for the WiFi icon in the system tray',
        'Try disconnecting and reconnecting to the WiFi network',
        'Restart your computer or device',
        'Check if other devices can connect to the internet',
        'Contact IT if the problem persists across multiple devices'
      ],
      video: 'https://example.com/video3',
      images: ['https://images.unsplash.com/photo-1551808525-51a94da548ce?w=300&h=200&fit=crop']
    },
    {
      id: 4,
      title: 'Screen Display Issues',
      category: 'Hardware',
      icon: Monitor,
      difficulty: 'Medium',
      steps: [
        'Check if the monitor cable is securely connected',
        'Try adjusting the brightness and contrast settings',
        'Check if the monitor is set to the correct input source',
        'Test with a different cable if available',
        'Try connecting to a different monitor to isolate the issue'
      ],
      video: 'https://example.com/video4',
      images: ['https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop']
    },
    {
      id: 5,
      title: 'Email Not Working',
      category: 'Software',
      icon: Globe,
      difficulty: 'Easy',
      steps: [
        'Check your internet connection',
        'Verify your email username and password',
        'Try logging into email through a web browser',
        'Check if the email server settings are correct',
        'Clear your email client cache and restart the application'
      ],
      video: 'https://example.com/video5',
      images: ['https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=300&h=200&fit=crop']
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredGuides = troubleshootingGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.steps.some(step => step.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hardware': return 'bg-blue-100 text-blue-800';
      case 'software': return 'bg-purple-100 text-purple-800';
      case 'network': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Self-Help Troubleshooting
          </CardTitle>
          <CardDescription>
            Find quick solutions to common IT problems before creating a support request
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search troubleshooting guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{troubleshootingGuides.length}</div>
              <div className="text-sm text-blue-700">Available Guides</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {troubleshootingGuides.filter(g => g.difficulty === 'Easy').length}
              </div>
              <div className="text-sm text-green-700">Easy Solutions</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {troubleshootingGuides.filter(g => g.video).length}
              </div>
              <div className="text-sm text-purple-700">Video Guides</div>
            </div>
          </div>

          {/* Troubleshooting Guides */}
          <div className="space-y-4">
            {filteredGuides.map((guide) => {
              const IconComponent = guide.icon;
              const isOpen = openItems.includes(guide.id);
              
              return (
                <Collapsible key={guide.id} open={isOpen} onOpenChange={() => toggleItem(guide.id)}>
                  <Card className="transition-all duration-200 hover:shadow-md">
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <IconComponent className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{guide.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getCategoryColor(guide.category)}>
                                  {guide.category}
                                </Badge>
                                <Badge className={getDifficultyColor(guide.difficulty)}>
                                  {guide.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          {isOpen ? (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {/* Steps */}
                          <div>
                            <h4 className="font-semibold mb-3">Step-by-step solution:</h4>
                            <ol className="space-y-2">
                              {guide.steps.map((step, index) => (
                                <li key={index} className="flex gap-3">
                                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold flex items-center justify-center">
                                    {index + 1}
                                  </span>
                                  <span className="text-gray-700">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Media */}
                          <div className="flex gap-4 pt-4">
                            {guide.video && (
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Video className="h-4 w-4" />
                                Watch Video Guide
                              </Button>
                            )}
                            {guide.images && guide.images.length > 0 && (
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Image className="h-4 w-4" />
                                View Images
                              </Button>
                            )}
                          </div>

                          {/* Still need help */}
                          <div className="bg-orange-50 p-4 rounded-lg">
                            <p className="text-sm text-orange-800">
                              <strong>Still having trouble?</strong> If these steps didn't resolve your issue, 
                              you can create a support request and our IT team will assist you directly.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>

          {filteredGuides.length === 0 && (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No troubleshooting guides found for your search.</p>
              <p className="text-sm text-gray-500 mt-2">Try searching with different keywords or create a support request.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Troubleshooting;
