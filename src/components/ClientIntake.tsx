
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, User, FileText, Shield, Briefcase, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClientIntakeProps {
  onBack: () => void;
}

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  currentAddress: string;
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  
  // Injury Details
  incidentDate: string;
  incidentType: string;
  bodyPartsAffected: string[];
  incidentDescription: string;
  policeReportNumber: string;
  
  // Insurance Information
  healthInsuranceCarrier: string;
  healthPolicyNumber: string;
  healthGroupNumber: string;
  autoInsuranceCarrier: string;
  autoPolicyNumber: string;
  workersCompCarrier: string;
  workersCompNumber: string;
  medicareNumber: string;
  medicaidNumber: string;
  
  // Employment Information
  currentEmployer: string;
  position: string;
  hourlyWage: string;
  timeLostFromWork: string;
  disabilityStatus: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  ssn: "",
  currentAddress: "",
  phone: "",
  email: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  incidentDate: "",
  incidentType: "",
  bodyPartsAffected: [],
  incidentDescription: "",
  policeReportNumber: "",
  healthInsuranceCarrier: "",
  healthPolicyNumber: "",
  healthGroupNumber: "",
  autoInsuranceCarrier: "",
  autoPolicyNumber: "",
  workersCompCarrier: "",
  workersCompNumber: "",
  medicareNumber: "",
  medicaidNumber: "",
  currentEmployer: "",
  position: "",
  hourlyWage: "",
  timeLostFromWork: "",
  disabilityStatus: ""
};

const incidentTypes = [
  "Auto Accident",
  "Slip and Fall",
  "Medical Malpractice",
  "Workplace Injury",
  "Product Liability",
  "Dog Bite",
  "Other"
];

const bodyParts = [
  "Head/Brain",
  "Neck",
  "Shoulders",
  "Arms",
  "Hands",
  "Back",
  "Chest",
  "Abdomen",
  "Hips",
  "Legs",
  "Feet",
  "Other"
];

export function ClientIntake({ onBack }: ClientIntakeProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [caseId, setCaseId] = useState("");
  const { toast } = useToast();

  const totalSteps = 4;

  // Generate unique case ID on component mount
  useEffect(() => {
    const generateCaseId = () => {
      const year = new Date().getFullYear();
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `CASE-${year}-${random}`;
    };
    setCaseId(generateCaseId());
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      if (caseId) {
        localStorage.setItem(`intake-${caseId}`, JSON.stringify(formData));
        console.log("Auto-saved form data");
      }
    };

    const interval = setInterval(autoSave, 30000); // Auto-save every 30 seconds
    return () => clearInterval(interval);
  }, [formData, caseId]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBodyPartChange = (bodyPart: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      bodyPartsAffected: checked
        ? [...prev.bodyPartsAffected, bodyPart]
        : prev.bodyPartsAffected.filter(part => part !== bodyPart)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to a secure database
    toast({
      title: "Client Intake Completed",
      description: `Case ${caseId} has been successfully created and saved.`,
    });
    // Clear auto-save data
    localStorage.removeItem(`intake-${caseId}`);
    onBack();
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return User;
      case 2: return FileText;
      case 3: return Shield;
      case 4: return Briefcase;
      default: return User;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Basic client and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
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
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ssn">Social Security Number *</Label>
                  <Input
                    id="ssn"
                    type="password"
                    placeholder="XXX-XX-XXXX"
                    value={formData.ssn}
                    onChange={(e) => handleInputChange("ssn", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAddress">Current Address *</Label>
                <Textarea
                  id="currentAddress"
                  value={formData.currentAddress}
                  onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                  placeholder="Street, City, State, ZIP Code"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyContactPhone"
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                  />
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
                <FileText className="h-5 w-5" />
                Injury Details
              </CardTitle>
              <CardDescription>Information about the incident and injuries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="incidentDate">Date of Incident *</Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => handleInputChange("incidentDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incidentType">Type of Incident *</Label>
                  <Select onValueChange={(value) => handleInputChange("incidentType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      {incidentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Body Parts Affected *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {bodyParts.map((bodyPart) => (
                    <div key={bodyPart} className="flex items-center space-x-2">
                      <Checkbox
                        id={bodyPart}
                        checked={formData.bodyPartsAffected.includes(bodyPart)}
                        onCheckedChange={(checked) => 
                          handleBodyPartChange(bodyPart, checked as boolean)
                        }
                      />
                      <Label htmlFor={bodyPart} className="text-sm">
                        {bodyPart}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidentDescription">Brief Description of Incident *</Label>
                <Textarea
                  id="incidentDescription"
                  value={formData.incidentDescription}
                  onChange={(e) => handleInputChange("incidentDescription", e.target.value)}
                  placeholder="Describe what happened, how the injury occurred..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="policeReportNumber">Police Report Number (if applicable)</Label>
                <Input
                  id="policeReportNumber"
                  value={formData.policeReportNumber}
                  onChange={(e) => handleInputChange("policeReportNumber", e.target.value)}
                  placeholder="Enter police report number if available"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Insurance Information
              </CardTitle>
              <CardDescription>Health, auto, and other insurance details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Health Insurance</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="healthInsuranceCarrier">Insurance Carrier</Label>
                    <Input
                      id="healthInsuranceCarrier"
                      value={formData.healthInsuranceCarrier}
                      onChange={(e) => handleInputChange("healthInsuranceCarrier", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="healthPolicyNumber">Policy Number</Label>
                    <Input
                      id="healthPolicyNumber"
                      value={formData.healthPolicyNumber}
                      onChange={(e) => handleInputChange("healthPolicyNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="healthGroupNumber">Group Number</Label>
                    <Input
                      id="healthGroupNumber"
                      value={formData.healthGroupNumber}
                      onChange={(e) => handleInputChange("healthGroupNumber", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-lg">Auto Insurance (if applicable)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="autoInsuranceCarrier">Auto Insurance Carrier</Label>
                    <Input
                      id="autoInsuranceCarrier"
                      value={formData.autoInsuranceCarrier}
                      onChange={(e) => handleInputChange("autoInsuranceCarrier", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="autoPolicyNumber">Policy Number</Label>
                    <Input
                      id="autoPolicyNumber"
                      value={formData.autoPolicyNumber}
                      onChange={(e) => handleInputChange("autoPolicyNumber", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-lg">Workers' Compensation (if applicable)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workersCompCarrier">Workers' Comp Carrier</Label>
                    <Input
                      id="workersCompCarrier"
                      value={formData.workersCompCarrier}
                      onChange={(e) => handleInputChange("workersCompCarrier", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workersCompNumber">Claim Number</Label>
                    <Input
                      id="workersCompNumber"
                      value={formData.workersCompNumber}
                      onChange={(e) => handleInputChange("workersCompNumber", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-lg">Medicare/Medicaid</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="medicareNumber">Medicare Number</Label>
                    <Input
                      id="medicareNumber"
                      value={formData.medicareNumber}
                      onChange={(e) => handleInputChange("medicareNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicaidNumber">Medicaid Number</Label>
                    <Input
                      id="medicaidNumber"
                      value={formData.medicaidNumber}
                      onChange={(e) => handleInputChange("medicaidNumber", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Employment Information
              </CardTitle>
              <CardDescription>Current employment and wage information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentEmployer">Current Employer</Label>
                  <Input
                    id="currentEmployer"
                    value={formData.currentEmployer}
                    onChange={(e) => handleInputChange("currentEmployer", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position/Job Title</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyWage">Hourly Wage/Salary Information</Label>
                <Input
                  id="hourlyWage"
                  value={formData.hourlyWage}
                  onChange={(e) => handleInputChange("hourlyWage", e.target.value)}
                  placeholder="e.g., $25.00/hour or $50,000/year"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeLostFromWork">Time Lost from Work</Label>
                <Textarea
                  id="timeLostFromWork"
                  value={formData.timeLostFromWork}
                  onChange={(e) => handleInputChange("timeLostFromWork", e.target.value)}
                  placeholder="Describe any time missed from work due to the injury..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disabilityStatus">Disability Status</Label>
                <Select onValueChange={(value) => handleInputChange("disabilityStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select disability status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Disability</SelectItem>
                    <SelectItem value="temporary">Temporary Disability</SelectItem>
                    <SelectItem value="permanent-partial">Permanent Partial Disability</SelectItem>
                    <SelectItem value="permanent-total">Permanent Total Disability</SelectItem>
                    <SelectItem value="unknown">Unknown/To Be Determined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl font-bold text-foreground">Client Intake Form</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Auto-saves every 30 seconds
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">Case ID: {caseId}</p>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-6">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const Icon = getStepIcon(step);
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          
          return (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                isActive ? 'border-primary bg-primary text-primary-foreground' :
                isCompleted ? 'border-green-500 bg-green-500 text-white' :
                'border-muted bg-background text-muted-foreground'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              {step < totalSteps && (
                <div className={`w-20 h-0.5 mx-2 ${
                  isCompleted ? 'bg-green-500' : 'bg-muted'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStepContent()}

        <div className="flex justify-between gap-4">
          <div>
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
          </div>
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Save & Exit
            </Button>
            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Complete Intake
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
