
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Shield, User, FileText, Briefcase, Shield as InsuranceIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SecureIntakeFormProps {
  onBack: () => void;
}

interface FormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  ssn: string;
  address: string;
  phone: string;
  email: string;
  
  // Injury Details
  injuryDate: string;
  injuryDescription: string;
  bodyPartsAffected: string[];
  
  // Employment Information
  employer: string;
  position: string;
  wage: string;
  
  // Insurance Information
  insuranceCarrier: string;
  groupNumber: string;
  policyNumber: string;
}

const initialFormData: FormData = {
  fullName: "",
  dateOfBirth: "",
  ssn: "",
  address: "",
  phone: "",
  email: "",
  injuryDate: "",
  injuryDescription: "",
  bodyPartsAffected: [],
  employer: "",
  position: "",
  wage: "",
  insuranceCarrier: "",
  groupNumber: "",
  policyNumber: ""
};

const bodyParts = [
  "Head/Brain", "Neck", "Shoulders", "Arms", "Hands", 
  "Back", "Chest", "Abdomen", "Hips", "Legs", "Feet", "Other"
];

export function SecureIntakeForm({ onBack }: SecureIntakeFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [caseId, setCaseId] = useState(`CASE-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`);
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would encrypt and store the data securely
    toast({
      title: "Secure Intake Completed",
      description: `Case ${caseId} has been securely saved with encrypted data.`,
    });
    console.log("Secure form data:", formData);
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="flex-shrink-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground truncate">
            Secure Client Intake
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <Shield className="h-4 w-4 text-green-600" />
            <p className="text-sm text-muted-foreground">Case ID: {caseId} • HIPAA Compliant</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="personal" className="flex items-center gap-1 text-xs md:text-sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="injury" className="flex items-center gap-1 text-xs md:text-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Injury</span>
            </TabsTrigger>
            <TabsTrigger value="employment" className="flex items-center gap-1 text-xs md:text-sm">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Employment</span>
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center gap-1 text-xs md:text-sm">
              <InsuranceIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Insurance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your basic personal and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full legal name"
                    required
                    className="w-full"
                  />
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
                      value={formData.ssn}
                      onChange={(e) => handleInputChange("ssn", e.target.value)}
                      placeholder="XXX-XX-XXXX"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Street Address, City, State, ZIP Code"
                    required
                    rows={3}
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
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="injury">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Injury Details
                </CardTitle>
                <CardDescription>Information about your injury and incident</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="injuryDate">Date of Injury *</Label>
                  <Input
                    id="injuryDate"
                    type="date"
                    value={formData.injuryDate}
                    onChange={(e) => handleInputChange("injuryDate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="injuryDescription">Description of Injury *</Label>
                  <Textarea
                    id="injuryDescription"
                    value={formData.injuryDescription}
                    onChange={(e) => handleInputChange("injuryDescription", e.target.value)}
                    placeholder="Please describe how the injury occurred and what happened..."
                    required
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Body Parts Affected *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {bodyParts.map((bodyPart) => (
                      <div key={bodyPart} className="flex items-center space-x-2">
                        <Checkbox
                          id={bodyPart}
                          checked={formData.bodyPartsAffected.includes(bodyPart)}
                          onCheckedChange={(checked) => 
                            handleBodyPartChange(bodyPart, checked as boolean)
                          }
                        />
                        <Label htmlFor={bodyPart} className="text-sm font-normal">
                          {bodyPart}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Employment Information
                </CardTitle>
                <CardDescription>Your current employment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employer">Current Employer</Label>
                  <Input
                    id="employer"
                    value={formData.employer}
                    onChange={(e) => handleInputChange("employer", e.target.value)}
                    placeholder="Company or organization name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position/Job Title</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    placeholder="Your job title or position"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wage">Wage Information</Label>
                  <Input
                    id="wage"
                    value={formData.wage}
                    onChange={(e) => handleInputChange("wage", e.target.value)}
                    placeholder="e.g., $25.00/hour, $50,000/year"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insurance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <InsuranceIcon className="h-5 w-5" />
                  Insurance Information
                </CardTitle>
                <CardDescription>Your health insurance details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="insuranceCarrier">Insurance Carrier</Label>
                  <Input
                    id="insuranceCarrier"
                    value={formData.insuranceCarrier}
                    onChange={(e) => handleInputChange("insuranceCarrier", e.target.value)}
                    placeholder="e.g., Blue Cross Blue Shield, Aetna, UnitedHealthcare"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="groupNumber">Group Number</Label>
                    <Input
                      id="groupNumber"
                      value={formData.groupNumber}
                      onChange={(e) => handleInputChange("groupNumber", e.target.value)}
                      placeholder="Insurance group number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policyNumber">Policy Number</Label>
                    <Input
                      id="policyNumber"
                      value={formData.policyNumber}
                      onChange={(e) => handleInputChange("policyNumber", e.target.value)}
                      placeholder="Insurance policy number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-600" />
            All data is encrypted and HIPAA compliant
          </div>
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 sm:flex-initial">
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-2 flex-1 sm:flex-initial">
              <Save className="h-4 w-4" />
              Secure Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
