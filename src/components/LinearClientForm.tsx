
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  Plus,
  Save,
  ArrowLeft
} from 'lucide-react';

interface LinearClientFormProps {
  onBack?: () => void;
}

export function LinearClientForm({ onBack }: LinearClientFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    medicalCondition: '',
    notes: '',
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header with Linear-style breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2 hover:bg-primary-100 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-primary-900 tracking-tight">New Client</h1>
            <p className="text-sm text-primary-500 mt-1">Add a new client to your records</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-primary-100 text-primary-700 border-primary-200">
          Draft
        </Badge>
      </div>

      {/* Main Form Card - True Linear Styling */}
      <Card className="bg-primary border border-primary-200 rounded-linear shadow-linear">
        <CardHeader className="border-b border-primary-200 bg-primary-50/50">
          <CardTitle className="text-lg font-semibold text-primary-900 flex items-center gap-2">
            <User className="h-5 w-5 text-primary-600" />
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-primary-700">
                  First Name <span className="text-error-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full h-9 px-3 py-2 bg-primary border border-primary-200 rounded-linear text-sm text-primary-900 placeholder-primary-400 focus:ring-2 focus:ring-accent-medical/40 focus:border-accent-medical transition-all duration-200"
                  placeholder="Jane"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-primary-700">
                  Last Name <span className="text-error-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full h-9 px-3 py-2 bg-primary border border-primary-200 rounded-linear text-sm text-primary-900 placeholder-primary-400 focus:ring-2 focus:ring-accent-medical/40 focus:border-accent-medical transition-all duration-200"
                  placeholder="Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-primary-700 flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full h-9 px-3 py-2 bg-primary border border-primary-200 rounded-linear text-sm text-primary-900 placeholder-primary-400 focus:ring-2 focus:ring-accent-medical/40 focus:border-accent-medical transition-all duration-200"
                  placeholder="jane.doe@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-primary-700 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full h-9 px-3 py-2 bg-primary border border-primary-200 rounded-linear text-sm text-primary-900 placeholder-primary-400 focus:ring-2 focus:ring-accent-medical/40 focus:border-accent-medical transition-all duration-200"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm font-medium text-primary-700 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full h-9 px-3 py-2 bg-primary border border-primary-200 rounded-linear text-sm text-primary-900 focus:ring-2 focus:ring-accent-medical/40 focus:border-accent-medical transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium text-primary-700">
                  Priority Level
                </Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger className="w-full h-9 px-3 py-2 bg-primary border border-primary-200 rounded-linear text-sm text-primary-900 focus:ring-2 focus:ring-accent-medical/40 focus:border-accent-medical transition-all duration-200">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-primary-700 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full h-9 px-3 py-2 bg-primary border border-primary-200 rounded-linear text-sm text-primary-900 placeholder-primary-400 focus:ring-2 focus:ring-accent-medical/40 focus:border-accent-medical transition-all duration-200"
                placeholder="123 Main St, City, State 12345"
              />
            </div>

            {/* Medical Condition */}
            <div className="space-y-2">
              <Label htmlFor="medicalCondition" className="text-sm font-medium text-primary-700">
                Medical Condition/Case Type
              </Label>
              <Input
                id="medicalCondition"
                value={formData.medicalCondition}
                onChange={(e) => handleInputChange('medicalCondition', e.target.value)}
                className="w-full h-9 px-3 py-2 bg-primary border border-primary-200 rounded-linear text-sm text-primary-900 placeholder-primary-400 focus:ring-2 focus:ring-accent-medical/40 focus:border-accent-medical transition-all duration-200"
                placeholder="e.g., Personal injury, Medical malpractice"
              />
            </div>

            {/* Notes Section */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium text-primary-700 flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full min-h-[100px] px-3 py-2 bg-primary border border-primary-200 rounded-linear text-sm text-primary-900 placeholder-primary-400 focus:ring-2 focus:ring-accent-medical/40 focus:border-accent-medical transition-all duration-200 resize-none"
                placeholder="Add any relevant notes about the client or case..."
              />
            </div>

            {/* Linear-style Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-primary-200">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-primary-500 hover:text-primary-700 hover:bg-primary-100 px-4 py-2 h-9 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-primary-100 hover:bg-primary-200 text-primary-700 border-primary-200 px-4 py-2 h-9 transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  className="bg-accent-medical hover:bg-accent-medical/90 text-white px-6 py-2 h-9 shadow-linear hover:shadow-linear-lg transition-all duration-200"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Client
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
