
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle, Save, Plus } from 'lucide-react';

const IncidentReport = () => {
  const [reportData, setReportData] = useState({
    incidentId: '',
    technicianName: '',
    office: '',
    dateVisited: '',
    contactPerson: '',
    issueDescription: '',
    diagnosis: '',
    actionTaken: '',
    brokenItems: [],
    replacementNeeded: [],
    replacementSource: 'inventory',
    followUpRequired: false,
    followUpDate: '',
    notes: ''
  });

  const [brokenItem, setBrokenItem] = useState('');
  const [replacementItem, setReplacementItem] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const addBrokenItem = () => {
    if (brokenItem.trim()) {
      setReportData(prev => ({
        ...prev,
        brokenItems: [...prev.brokenItems, brokenItem.trim()]
      }));
      setBrokenItem('');
    }
  };

  const addReplacementItem = () => {
    if (replacementItem.trim()) {
      setReportData(prev => ({
        ...prev,
        replacementNeeded: [...prev.replacementNeeded, replacementItem.trim()]
      }));
      setReplacementItem('');
    }
  };

  const removeBrokenItem = (index: number) => {
    setReportData(prev => ({
      ...prev,
      brokenItems: prev.brokenItems.filter((_, i) => i !== index)
    }));
  };

  const removeReplacementItem = (index: number) => {
    setReportData(prev => ({
      ...prev,
      replacementNeeded: prev.replacementNeeded.filter((_, i) => i !== index)
    }));
  };

  const generateIncidentId = () => {
    const date = new Date();
    const id = `INC-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    setReportData(prev => ({ ...prev, incidentId: id }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving incident report:', reportData);
    toast({
      title: "Incident Report Created",
      description: `Report ${reportData.incidentId} has been saved successfully.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Incident Report
        </CardTitle>
        <CardDescription>
          Create detailed incident reports after on-site visits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="incidentId">Incident ID</Label>
              <div className="flex gap-2">
                <Input
                  id="incidentId"
                  value={reportData.incidentId}
                  onChange={(e) => handleInputChange('incidentId', e.target.value)}
                  placeholder="Auto-generate or enter manually"
                  readOnly
                />
                <Button type="button" onClick={generateIncidentId} variant="outline">
                  Generate
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technicianName">Technician Name *</Label>
              <Input
                id="technicianName"
                value={reportData.technicianName}
                onChange={(e) => handleInputChange('technicianName', e.target.value)}
                placeholder="Enter technician name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="office">Office/Location *</Label>
              <Input
                id="office"
                value={reportData.office}
                onChange={(e) => handleInputChange('office', e.target.value)}
                placeholder="e.g., Principal Office, Room 101"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateVisited">Date Visited *</Label>
              <Input
                id="dateVisited"
                type="date"
                value={reportData.dateVisited}
                onChange={(e) => handleInputChange('dateVisited', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                value={reportData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                placeholder="Person who reported the issue"
              />
            </div>
          </div>

          {/* Issue Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="issueDescription">Issue Description *</Label>
              <Textarea
                id="issueDescription"
                value={reportData.issueDescription}
                onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                placeholder="Describe the reported problem"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis/Root Cause</Label>
              <Textarea
                id="diagnosis"
                value={reportData.diagnosis}
                onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                placeholder="What was found to be the cause of the issue?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actionTaken">Action Taken</Label>
              <Textarea
                id="actionTaken"
                value={reportData.actionTaken}
                onChange={(e) => handleInputChange('actionTaken', e.target.value)}
                placeholder="What steps were taken to resolve the issue?"
                rows={3}
              />
            </div>
          </div>

          {/* Broken Items */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Broken/Faulty Items</Label>
              <p className="text-sm text-gray-600 mb-3">List items that are broken or need repair</p>
              
              <div className="flex gap-2 mb-3">
                <Input
                  value={brokenItem}
                  onChange={(e) => setBrokenItem(e.target.value)}
                  placeholder="Enter broken item (e.g., Dell Monitor - cracked screen)"
                />
                <Button type="button" onClick={addBrokenItem} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {reportData.brokenItems.length > 0 && (
                <div className="space-y-2">
                  {reportData.brokenItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-red-50 p-2 rounded">
                      <span className="text-sm">{item}</span>
                      <Button
                        type="button"
                        onClick={() => removeBrokenItem(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Replacement Items */}
            <div>
              <Label className="text-base font-semibold">Items Needed for Replacement</Label>
              <p className="text-sm text-gray-600 mb-3">List items that need to be replaced</p>
              
              <div className="flex gap-2 mb-3">
                <Input
                  value={replacementItem}
                  onChange={(e) => setReplacementItem(e.target.value)}
                  placeholder="Enter replacement item needed"
                />
                <Button type="button" onClick={addReplacementItem} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {reportData.replacementNeeded.length > 0 && (
                <div className="space-y-2">
                  {reportData.replacementNeeded.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                      <span className="text-sm">{item}</span>
                      <Button
                        type="button"
                        onClick={() => removeReplacementItem(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {reportData.replacementNeeded.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label>Replacement Source</Label>
                  <Select value={reportData.replacementSource} onValueChange={(value) => handleInputChange('replacementSource', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inventory">Get from inventory</SelectItem>
                      <SelectItem value="purchase">Need to purchase</SelectItem>
                      <SelectItem value="transfer">Transfer from another location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Follow-up */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="followUpRequired"
                checked={reportData.followUpRequired}
                onCheckedChange={(checked) => handleInputChange('followUpRequired', checked)}
              />
              <Label htmlFor="followUpRequired">Follow-up visit required</Label>
            </div>

            {reportData.followUpRequired && (
              <div className="space-y-2">
                <Label htmlFor="followUpDate">Follow-up Date</Label>
                <Input
                  id="followUpDate"
                  type="date"
                  value={reportData.followUpDate}
                  onChange={(e) => handleInputChange('followUpDate', e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={reportData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional comments or observations"
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
              Save Report
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default IncidentReport;
