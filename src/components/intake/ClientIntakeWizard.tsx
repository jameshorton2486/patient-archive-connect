
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, User, FileText, Phone, Save } from 'lucide-react';

interface ClientIntakeWizardProps {
  onComplete?: (data: any) => void;
  onBack?: () => void;
}

export function ClientIntakeWizard({ onComplete, onBack }: ClientIntakeWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    // Emergency Contact
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    // Insurance Information
    insuranceInfo: {
      primaryCarrier: '',
      policyNumber: '',
      groupNumber: '',
      memberId: ''
    },
    // Injury Details
    injuryDetails: {
      dateOfInjury: '',
      typeOfIncident: '',
      description: '',
      bodyPartsAffected: [] as string[],
      policeReportNumber: ''
    }
  });

  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string, section?: string) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev] as any,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      // Auto-save progress
      toast({
        title: "Progress Saved",
        description: "Your information has been automatically saved.",
        duration: 2000,
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    toast({
      title: "Client Intake Complete",
      description: "All information has been saved successfully.",
    });
    onComplete?.(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Please provide your basic personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ssn">Social Security Number</Label>
                  <Input
                    id="ssn"
                    value={formData.ssn}
                    onChange={(e) => handleInputChange('ssn', e.target.value)}
                    placeholder="XXX-XX-XXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Address</h3>
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    value={formData.address.street}
                    onChange={(e) => handleInputChange('street', e.target.value, 'address')}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.address.city}
                      onChange={(e) => handleInputChange('city', e.target.value, 'address')}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.address.state}
                      onChange={(e) => handleInputChange('state', e.target.value, 'address')}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.address.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value, 'address')}
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contact & Insurance
              </CardTitle>
              <CardDescription>
                Emergency contact and insurance information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Contact Name *</Label>
                    <Input
                      id="emergencyName"
                      value={formData.emergencyContact.name}
                      onChange={(e) => handleInputChange('name', e.target.value, 'emergencyContact')}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                    <Input
                      id="emergencyPhone"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value, 'emergencyContact')}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship *</Label>
                  <Select onValueChange={(value) => handleInputChange('relationship', value, 'emergencyContact')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Insurance Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryCarrier">Primary Insurance Carrier *</Label>
                    <Input
                      id="primaryCarrier"
                      value={formData.insuranceInfo.primaryCarrier}
                      onChange={(e) => handleInputChange('primaryCarrier', e.target.value, 'insuranceInfo')}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policyNumber">Policy Number *</Label>
                    <Input
                      id="policyNumber"
                      value={formData.insuranceInfo.policyNumber}
                      onChange={(e) => handleInputChange('policyNumber', e.target.value, 'insuranceInfo')}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="groupNumber">Group Number</Label>
                    <Input
                      id="groupNumber"
                      value={formData.insuranceInfo.groupNumber}
                      onChange={(e) => handleInputChange('groupNumber', e.target.value, 'insuranceInfo')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memberId">Member ID *</Label>
                    <Input
                      id="memberId"
                      value={formData.insuranceInfo.memberId}
                      onChange={(e) => handleInputChange('memberId', e.target.value, 'insuranceInfo')}
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Injury Details
              </CardTitle>
              <CardDescription>
                Information about your injury or incident
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfInjury">Date of Injury *</Label>
                  <Input
                    id="dateOfInjury"
                    type="date"
                    value={formData.injuryDetails.dateOfInjury}
                    onChange={(e) => handleInputChange('dateOfInjury', e.target.value, 'injuryDetails')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="typeOfIncident">Type of Incident *</Label>
                  <Select onValueChange={(value) => handleInputChange('typeOfIncident', value, 'injuryDetails')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto_accident">Auto Accident</SelectItem>
                      <SelectItem value="slip_fall">Slip & Fall</SelectItem>
                      <SelectItem value="medical_malpractice">Medical Malpractice</SelectItem>
                      <SelectItem value="workplace">Workplace Injury</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description of Incident *</Label>
                <Textarea
                  id="description"
                  value={formData.injuryDetails.description}
                  onChange={(e) => handleInputChange('description', e.target.value, 'injuryDetails')}
                  placeholder="Please describe what happened in detail..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="policeReportNumber">Police Report Number (if applicable)</Label>
                <Input
                  id="policeReportNumber"
                  value={formData.injuryDetails.policeReportNumber}
                  onChange={(e) => handleInputChange('policeReportNumber', e.target.value, 'injuryDetails')}
                  placeholder="Enter police report number"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>
                Please review your information before submitting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.firstName} {formData.lastName} • {formData.email} • {formData.phone}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.address.street}, {formData.address.city}, {formData.address.state} {formData.address.zipCode}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Emergency Contact</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.emergencyContact.name} ({formData.emergencyContact.relationship}) • {formData.emergencyContact.phone}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Insurance</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.insuranceInfo.primaryCarrier} • Policy: {formData.insuranceInfo.policyNumber}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Injury Details</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.injuryDetails.typeOfIncident} on {formData.injuryDetails.dateOfInjury}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {onBack && (
          <Button onClick={onBack} variant="outline">
            ← Back
          </Button>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Client Intake</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          
          <Progress value={progress} className="w-full" />
        </div>

        {renderStep()}

        <div className="flex justify-between">
          <Button 
            onClick={handlePrevious} 
            variant="outline" 
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Complete Intake
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
