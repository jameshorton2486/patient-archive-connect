
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Save, User, FileText, Shield, Briefcase, Clock, CheckCircle, AlertTriangle, Camera, Search, Brain, Star, Accessibility } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IntelligentClientIntakeProps {
  onBack: () => void;
}

interface SmartFormData {
  // Personal Information with validation
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  currentAddress: string;
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  
  // Injury Details with AI classification
  incidentDate: string;
  incidentType: string;
  bodyPartsAffected: string[];
  incidentDescription: string;
  policeReportNumber: string;
  severityScore?: number;
  riskAssessment?: 'low' | 'medium' | 'high' | 'critical';
  
  // Insurance with real-time validation
  healthInsuranceCarrier: string;
  healthPolicyNumber: string;
  healthGroupNumber: string;
  insuranceValidated?: boolean;
  
  // Provider suggestions
  suggestedProviders: Provider[];
  selectedProviders: string[];
  
  // Employment
  currentEmployer: string;
  position: string;
  hourlyWage: string;
  timeLostFromWork: string;
  disabilityStatus: string;
}

interface Provider {
  id: string;
  name: string;
  specialty: string;
  npiNumber: string;
  distance: number;
  rating: number;
  acceptsInsurance: boolean;
}

interface ValidationResult {
  isValid: boolean;
  message: string;
  confidence?: number;
}

const initialFormData: SmartFormData = {
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
  suggestedProviders: [],
  selectedProviders: [],
  currentEmployer: "",
  position: "",
  hourlyWage: "",
  timeLostFromWork: "",
  disabilityStatus: ""
};

const incidentTypes = [
  { value: "auto_accident", label: "Auto Accident", severity: "high" },
  { value: "slip_fall", label: "Slip and Fall", severity: "medium" },
  { value: "medical_malpractice", label: "Medical Malpractice", severity: "critical" },
  { value: "workplace", label: "Workplace Injury", severity: "medium" },
  { value: "product_liability", label: "Product Liability", severity: "high" },
  { value: "dog_bite", label: "Dog Bite", severity: "low" },
  { value: "other", label: "Other", severity: "medium" }
];

const bodyParts = [
  "Head/Brain", "Neck", "Shoulders", "Arms", "Hands",
  "Back", "Chest", "Abdomen", "Hips", "Legs", "Feet", "Other"
];

const insuranceProviders = [
  "Blue Cross Blue Shield", "Aetna", "UnitedHealthcare", "Cigna", 
  "Humana", "Kaiser Permanente", "Anthem", "Molina Healthcare"
];

export function IntelligentClientIntake({ onBack }: IntelligentClientIntakeProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SmartFormData>(initialFormData);
  const [caseId, setCaseId] = useState("");
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({});
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const { toast } = useToast();

  const totalSteps = 5;

  // Generate unique case ID
  useEffect(() => {
    const generateCaseId = () => {
      const year = new Date().getFullYear();
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `CASE-${year}-${random}`;
    };
    setCaseId(generateCaseId());
  }, []);

  // Auto-save with encryption simulation
  useEffect(() => {
    const autoSave = async () => {
      if (caseId && Object.keys(formData).some(key => formData[key as keyof SmartFormData])) {
        setIsAutoSaving(true);
        
        // Simulate encryption and secure storage
        const encryptedData = btoa(JSON.stringify(formData)); // Base64 encoding as simulation
        localStorage.setItem(`encrypted-intake-${caseId}`, encryptedData);
        
        setTimeout(() => {
          setIsAutoSaving(false);
          console.log("Auto-saved encrypted form data");
        }, 1000);
      }
    };

    const interval = setInterval(autoSave, 30000);
    return () => clearInterval(interval);
  }, [formData, caseId]);

  // Calculate completion percentage
  useEffect(() => {
    const totalFields = Object.keys(initialFormData).length;
    const completedFields = Object.values(formData).filter(value => 
      Array.isArray(value) ? value.length > 0 : value !== ""
    ).length;
    setCompletionPercentage(Math.round((completedFields / totalFields) * 100));
  }, [formData]);

  // Real-time validation
  const validateField = async (field: string, value: string): Promise<ValidationResult> => {
    switch (field) {
      case 'phone':
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return {
          isValid: phoneRegex.test(value),
          message: phoneRegex.test(value) ? "Valid phone number" : "Please enter a valid 10-digit phone number"
        };
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
          isValid: emailRegex.test(value),
          message: emailRegex.test(value) ? "Valid email address" : "Please enter a valid email address"
        };
      
      case 'ssn':
        const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
        return {
          isValid: ssnRegex.test(value),
          message: ssnRegex.test(value) ? "Valid SSN format" : "Please enter SSN in format XXX-XX-XXXX"
        };
      
      case 'healthPolicyNumber':
        // Simulate insurance validation
        if (value.length > 5) {
          return {
            isValid: true,
            message: "Insurance policy validated",
            confidence: 95
          };
        }
        return {
          isValid: false,
          message: "Policy number too short"
        };
      
      default:
        return { isValid: true, message: "" };
    }
  };

  const handleInputChange = async (field: keyof SmartFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation for text fields
    if (typeof value === 'string' && value.length > 0) {
      const validation = await validateField(field, value);
      setValidationResults(prev => ({ ...prev, [field]: validation }));
    }
  };

  // AI-powered injury assessment
  const assessInjurySeverity = (incidentType: string, bodyParts: string[], description: string) => {
    let score = 0;
    const incident = incidentTypes.find(t => t.value === incidentType);
    
    // Base score from incident type
    switch (incident?.severity) {
      case 'critical': score += 40; break;
      case 'high': score += 30; break;
      case 'medium': score += 20; break;
      case 'low': score += 10; break;
    }
    
    // Body parts affected
    score += bodyParts.length * 5;
    if (bodyParts.includes('Head/Brain')) score += 20;
    if (bodyParts.includes('Back')) score += 15;
    if (bodyParts.includes('Neck')) score += 15;
    
    // Description analysis (simplified)
    const keywords = ['severe', 'fracture', 'surgery', 'hospital', 'emergency'];
    keywords.forEach(keyword => {
      if (description.toLowerCase().includes(keyword)) score += 10;
    });
    
    return Math.min(score, 100);
  };

  // Provider suggestions based on injury
  const suggestProviders = (incidentType: string, bodyParts: string[]) => {
    const mockProviders: Provider[] = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson, MD',
        specialty: 'Orthopedic Surgery',
        npiNumber: '1234567890',
        distance: 2.3,
        rating: 4.8,
        acceptsInsurance: true
      },
      {
        id: '2',
        name: 'Central Physical Therapy',
        specialty: 'Physical Therapy',
        npiNumber: '0987654321',
        distance: 1.8,
        rating: 4.6,
        acceptsInsurance: true
      },
      {
        id: '3',
        name: 'Dr. Michael Chen, MD',
        specialty: 'Pain Management',
        npiNumber: '1122334455',
        distance: 3.1,
        rating: 4.7,
        acceptsInsurance: false
      }
    ];
    
    return mockProviders.filter(provider => {
      if (bodyParts.includes('Back') || bodyParts.includes('Neck')) {
        return provider.specialty.includes('Orthopedic') || provider.specialty.includes('Pain');
      }
      return true;
    });
  };

  const nextStep = () => {
    // AI assessment when leaving injury details step
    if (currentStep === 2) {
      const severity = assessInjurySeverity(formData.incidentType, formData.bodyPartsAffected, formData.incidentDescription);
      const providers = suggestProviders(formData.incidentType, formData.bodyPartsAffected);
      
      setFormData(prev => ({
        ...prev,
        severityScore: severity,
        riskAssessment: severity > 70 ? 'critical' : severity > 50 ? 'high' : severity > 30 ? 'medium' : 'low',
        suggestedProviders: providers
      }));
      
      toast({
        title: "AI Analysis Complete",
        description: `Injury severity assessed: ${severity}/100. ${providers.length} providers recommended.`,
      });
    }
    
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
    toast({
      title: "Intelligent Intake Completed",
      description: `Case ${caseId} created with AI enhancements. Risk level: ${formData.riskAssessment?.toUpperCase()}.`,
    });
    localStorage.removeItem(`encrypted-intake-${caseId}`);
    onBack();
  };

  const getValidationIcon = (field: string) => {
    const result = validationResults[field];
    if (!result) return null;
    
    return result.isValid ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-red-500" />
    );
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return User;
      case 2: return FileText;
      case 3: return Shield;
      case 4: return Search;
      case 5: return Briefcase;
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
                {language === 'en' ? 'Personal Information' : 'Información Personal'}
                <Badge variant={completionPercentage > 30 ? "default" : "secondary"}>
                  Smart Validation
                </Badge>
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'AI-powered validation with real-time feedback' 
                  : 'Validación con IA y retroalimentación en tiempo real'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    {language === 'en' ? 'First Name' : 'Nombre'} *
                  </Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                      className="pr-8"
                    />
                    <div className="absolute right-2 top-2">
                      {getValidationIcon('firstName')}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    {language === 'en' ? 'Last Name' : 'Apellido'} *
                  </Label>
                  <div className="relative">
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      className="pr-8"
                    />
                    <div className="absolute right-2 top-2">
                      {getValidationIcon('lastName')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {language === 'en' ? 'Phone Number' : 'Teléfono'} *
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                      required
                      className="pr-8"
                    />
                    <div className="absolute right-2 top-2">
                      {getValidationIcon('phone')}
                    </div>
                  </div>
                  {validationResults.phone && (
                    <p className={`text-sm ${validationResults.phone.isValid ? 'text-green-600' : 'text-red-600'}`}>
                      {validationResults.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'en' ? 'Email Address' : 'Correo Electrónico'} *
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="pr-8"
                    />
                    <div className="absolute right-2 top-2">
                      {getValidationIcon('email')}
                    </div>
                  </div>
                  {validationResults.email && (
                    <p className={`text-sm ${validationResults.email.isValid ? 'text-green-600' : 'text-red-600'}`}>
                      {validationResults.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ssn">
                  {language === 'en' ? 'Social Security Number' : 'Número de Seguro Social'} *
                </Label>
                <div className="relative">
                  <Input
                    id="ssn"
                    type="password"
                    placeholder="XXX-XX-XXXX"
                    value={formData.ssn}
                    onChange={(e) => handleInputChange("ssn", e.target.value)}
                    required
                    className="pr-8"
                  />
                  <div className="absolute right-2 top-2">
                    {getValidationIcon('ssn')}
                  </div>
                </div>
                {validationResults.ssn && (
                  <p className={`text-sm ${validationResults.ssn.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validationResults.ssn.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {language === 'en' ? 'Injury Assessment' : 'Evaluación de Lesión'}
                <Badge variant="secondary">AI Analysis</Badge>
              </CardTitle>
              <CardDescription>
                AI-powered injury classification and severity assessment
              </CardDescription>
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
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            {type.label}
                            <Badge variant={
                              type.severity === 'critical' ? 'destructive' :
                              type.severity === 'high' ? 'default' :
                              'secondary'
                            }>
                              {type.severity}
                            </Badge>
                          </div>
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
                        onCheckedChange={(checked) => {
                          const newParts = checked
                            ? [...formData.bodyPartsAffected, bodyPart]
                            : formData.bodyPartsAffected.filter(part => part !== bodyPart);
                          handleInputChange("bodyPartsAffected", newParts);
                        }}
                      />
                      <Label htmlFor={bodyPart} className="text-sm">
                        {bodyPart}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidentDescription">
                  Detailed Description *
                  <Badge variant="outline" className="ml-2">AI Enhanced</Badge>
                </Label>
                <Textarea
                  id="incidentDescription"
                  value={formData.incidentDescription}
                  onChange={(e) => handleInputChange("incidentDescription", e.target.value)}
                  placeholder="Describe the incident in detail. AI will analyze severity and suggest specialists..."
                  rows={4}
                  required
                />
              </div>

              {formData.severityScore && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Risk Assessment
                  </h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <span>Severity Score:</span>
                      <Badge variant={
                        formData.riskAssessment === 'critical' ? 'destructive' :
                        formData.riskAssessment === 'high' ? 'default' :
                        'secondary'
                      }>
                        {formData.severityScore}/100 - {formData.riskAssessment?.toUpperCase()}
                      </Badge>
                    </div>
                    <Progress value={formData.severityScore} className="w-full" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Insurance Verification
                <Badge variant="secondary">Real-time Validation</Badge>
              </CardTitle>
              <CardDescription>
                Instant insurance verification and validation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="healthInsuranceCarrier">Insurance Carrier *</Label>
                <Select onValueChange={(value) => handleInputChange("healthInsuranceCarrier", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your insurance carrier" />
                  </SelectTrigger>
                  <SelectContent>
                    {insuranceProviders.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="healthPolicyNumber">Policy Number *</Label>
                  <div className="relative">
                    <Input
                      id="healthPolicyNumber"
                      value={formData.healthPolicyNumber}
                      onChange={(e) => handleInputChange("healthPolicyNumber", e.target.value)}
                      required
                      className="pr-8"
                    />
                    <div className="absolute right-2 top-2">
                      {getValidationIcon('healthPolicyNumber')}
                    </div>
                  </div>
                  {validationResults.healthPolicyNumber && (
                    <p className={`text-sm flex items-center gap-2 ${
                      validationResults.healthPolicyNumber.isValid ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {validationResults.healthPolicyNumber.message}
                      {validationResults.healthPolicyNumber.confidence && (
                        <Badge variant="outline">
                          {validationResults.healthPolicyNumber.confidence}% confidence
                        </Badge>
                      )}
                    </p>
                  )}
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

              {formData.insuranceValidated && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Insurance Validated
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your insurance information has been verified and is active.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Provider Recommendations
                <Badge variant="secondary">AI Matched</Badge>
              </CardTitle>
              <CardDescription>
                Specialists recommended based on your injury assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.suggestedProviders.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="font-medium">Recommended Specialists</h4>
                  {formData.suggestedProviders.map((provider) => (
                    <div key={provider.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium">{provider.name}</h5>
                          <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">{provider.rating}</span>
                            </div>
                            <span className="text-sm">{provider.distance} miles away</span>
                            <Badge variant={provider.acceptsInsurance ? "default" : "secondary"}>
                              {provider.acceptsInsurance ? "Accepts Insurance" : "Cash Only"}
                            </Badge>
                          </div>
                        </div>
                        <Checkbox
                          checked={formData.selectedProviders.includes(provider.id)}
                          onCheckedChange={(checked) => {
                            const newSelected = checked
                              ? [...formData.selectedProviders, provider.id]
                              : formData.selectedProviders.filter(id => id !== provider.id);
                            handleInputChange("selectedProviders", newSelected);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Complete injury assessment to see provider recommendations
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Employment Information
              </CardTitle>
              <CardDescription>Employment and disability details</CardDescription>
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
                <Label htmlFor="hourlyWage">Wage Information</Label>
                <Input
                  id="hourlyWage"
                  value={formData.hourlyWage}
                  onChange={(e) => handleInputChange("hourlyWage", e.target.value)}
                  placeholder="e.g., $25.00/hour or $50,000/year"
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
            <h2 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'Intelligent Client Intake' : 'Registro Inteligente de Cliente'}
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              >
                {language === 'en' ? '🇪🇸 Español' : '🇺🇸 English'}
              </Button>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Accessibility className="h-3 w-3" />
                WCAG 2.1 AA
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">Case ID: {caseId}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {isAutoSaving ? 'Auto-saving...' : 'Auto-saves every 30 seconds'}
            </div>
            <Badge variant="outline">
              {completionPercentage}% Complete
            </Badge>
          </div>
        </div>
      </div>

      {/* Enhanced Progress indicator with completion percentage */}
      <div className="space-y-4">
        <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
        <div className="flex items-center justify-between">
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
                Complete Intelligent Intake
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
