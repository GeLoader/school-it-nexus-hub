
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Plus, Save } from 'lucide-react';

const DataEntry = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemType: '',
    serialNumber: '',
    manufacturer: '',
    model: '',
    purchaseDate: '',
    warranty: '',
    location: '',
    condition: 'new',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving to database
    console.log('Saving item:', formData);
    toast({
      title: "Item Added Successfully",
      description: `${formData.itemName} has been added to the inventory.`,
    });
    
    // Reset form
    setFormData({
      itemName: '',
      itemType: '',
      serialNumber: '',
      manufacturer: '',
      model: '',
      purchaseDate: '',
      warranty: '',
      location: '',
      condition: 'new',
      description: ''
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Equipment Data Entry
        </CardTitle>
        <CardDescription>
          Add new equipment and devices to the inventory system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                value={formData.itemName}
                onChange={(e) => handleInputChange('itemName', e.target.value)}
                placeholder="e.g., Dell OptiPlex Desktop"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="itemType">Item Type *</Label>
              <Select value={formData.itemType} onValueChange={(value) => handleInputChange('itemType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desktop">Desktop Computer</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="printer">Printer</SelectItem>
                  <SelectItem value="monitor">Monitor</SelectItem>
                  <SelectItem value="router">Router/Network Equipment</SelectItem>
                  <SelectItem value="projector">Projector</SelectItem>
                  <SelectItem value="server">Server</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                value={formData.serialNumber}
                onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                placeholder="Enter serial number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                value={formData.manufacturer}
                onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                placeholder="e.g., Dell, HP, Lenovo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                placeholder="Enter model number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warranty">Warranty Period</Label>
              <Input
                id="warranty"
                value={formData.warranty}
                onChange={(e) => handleInputChange('warranty', e.target.value)}
                placeholder="e.g., 3 years, Until 2025"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location/Office</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Principal's Office, Room 101"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="condition">Condition</Label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                  <SelectItem value="needs_repair">Needs Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Additional notes or specifications"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Item
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DataEntry;
