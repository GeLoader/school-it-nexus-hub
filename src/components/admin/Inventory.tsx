
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Package, Search, Filter, Monitor, Printer, Router } from 'lucide-react';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const inventoryData = {
    active: [
      { id: 1, name: 'Dell OptiPlex 7090', type: 'Desktop', location: 'Principal Office', serialNumber: 'DL001', condition: 'Good', purchaseDate: '2023-01-15' },
      { id: 2, name: 'HP LaserJet Pro', type: 'Printer', location: 'Teacher Lounge', serialNumber: 'HP002', condition: 'Good', purchaseDate: '2023-03-10' },
      { id: 3, name: 'Lenovo ThinkPad T14', type: 'Laptop', location: 'Room 101', serialNumber: 'LN003', condition: 'Excellent', purchaseDate: '2023-05-20' },
      { id: 4, name: 'Cisco WS-C2960X', type: 'Network Switch', location: 'Server Room', serialNumber: 'CS004', condition: 'Good', purchaseDate: '2022-11-05' },
      { id: 5, name: 'ASUS VP249HE Monitor', type: 'Monitor', location: 'Room 205', serialNumber: 'AS005', condition: 'Good', purchaseDate: '2023-07-12' }
    ],
    inactive: [
      { id: 6, name: 'Old Dell Desktop', type: 'Desktop', location: 'Storage', serialNumber: 'DL006', condition: 'Fair', purchaseDate: '2020-01-10', reason: 'Replaced by newer model' },
      { id: 7, name: 'Canon Printer MG2570', type: 'Printer', location: 'Storage', serialNumber: 'CN007', condition: 'Poor', purchaseDate: '2019-08-15', reason: 'Frequent paper jams' }
    ],
    disposed: [
      { id: 8, name: 'IBM ThinkCentre', type: 'Desktop', location: 'Disposed', serialNumber: 'IB008', condition: 'Broken', purchaseDate: '2018-03-01', disposalDate: '2023-12-01', reason: 'Hardware failure' }
    ]
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'desktop':
      case 'laptop':
        return <Monitor className="h-4 w-4" />;
      case 'printer':
        return <Printer className="h-4 w-4" />;
      case 'network switch':
      case 'router':
        return <Router className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-orange-100 text-orange-800';
      case 'broken': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterItems = (items: any[]) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const InventoryTable = ({ items, showDisposalInfo = false }: { items: any[], showDisposalInfo?: boolean }) => (
    <div className="space-y-4">
      {filterItems(items).map((item) => (
        <div key={item.id} className="border rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                {getTypeIcon(item.type)}
              </div>
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.type} • {item.serialNumber}</p>
              </div>
            </div>
            <Badge className={getConditionColor(item.condition)}>
              {item.condition}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-500">Location:</span>
              <p>{item.location}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Purchase Date:</span>
              <p>{item.purchaseDate}</p>
            </div>
            {item.reason && (
              <div>
                <span className="font-medium text-gray-500">Reason:</span>
                <p>{item.reason}</p>
              </div>
            )}
            {showDisposalInfo && item.disposalDate && (
              <div>
                <span className="font-medium text-gray-500">Disposal Date:</span>
                <p>{item.disposalDate}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Equipment Inventory
          </CardTitle>
          <CardDescription>
            Manage and track all school IT equipment and devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, type, location, or serial number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Inventory Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{inventoryData.active.length}</div>
              <div className="text-sm text-green-700">Active Items</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{inventoryData.inactive.length}</div>
              <div className="text-sm text-orange-700">Inactive Items</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{inventoryData.disposed.length}</div>
              <div className="text-sm text-red-700">Disposed Items</div>
            </div>
          </div>

          {/* Inventory Tabs */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active ({inventoryData.active.length})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({inventoryData.inactive.length})</TabsTrigger>
              <TabsTrigger value="disposed">Disposed ({inventoryData.disposed.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-6">
              <InventoryTable items={inventoryData.active} />
            </TabsContent>
            
            <TabsContent value="inactive" className="mt-6">
              <InventoryTable items={inventoryData.inactive} />
            </TabsContent>
            
            <TabsContent value="disposed" className="mt-6">
              <InventoryTable items={inventoryData.disposed} showDisposalInfo />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
