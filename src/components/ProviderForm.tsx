
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Search, CheckCircle, AlertCircle } from "lucide-react";
import { Provider, MEDICAL_SPECIALTIES, NPIValidationResult } from "@/types/provider";

interface ProviderFormProps {
  onBack: () => void;
}

export function ProviderForm({ onBack }: ProviderFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [npiValidation, setNpiValidation] = useState<NPIValidationResult | null>(null);
  const [isValidatingNPI, setIsValidatingNPI] = useState(false);
  const [usePhysicalForMailing, setUsePhysicalForMailing] = useState(true);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Provider>();

  const steps = [
    { number: 1, title: "Basic Information", description: "Provider details and credentials" },
    { number: 2, title: "Facility Information", description: "Hospital or clinic details" },
    { number: 3, title: "Contact Details", description: "Phone, email, and records contact" },
    { number: 4, title: "Treatment Information", description: "Care details and billing" }
  ];

  const validateNPI = async (npiNumber: string) => {
    if (npiNumber.length !== 10) return;
    
    setIsValidatingNPI(true);
    // Simulate NPI validation API call
    setTimeout(() => {
      const mockValidation: NPIValidationResult = {
        isValid: true,
        provider: {
          name: "Dr. John Smith",
          specialty: "Orthopedic Surgery",
          licenseStatus: "active",
          address: "123 Medical Center Dr, Springfield, IL 62701"
        }
      };
      setNpiValidation(mockValidation);
      if (mockValidation.provider) {
        setValue("name", mockValidation.provider.name);
        setValue("specialty", mockValidation.provider.specialty);
      }
      setIsValidatingNPI(false);
    }, 1500);
  };

  const onSubmit = (data: Provider) => {
    console.log("Provider data:", data);
    // Handle form submission
    onBack();
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Providers
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Add Healthcare Provider</h2>
          <p className="text-muted-foreground">Enter provider information for medical records requests</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.number 
                ? 'bg-primary border-primary text-primary-foreground' 
                : 'border-muted-foreground text-muted-foreground'
            }`}>
              {currentStep > step.number ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                step.number
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`mx-6 h-px w-16 ${
                currentStep > step.number ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Provider/Doctor Name *</Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Provider name is required" })}
                    placeholder="Dr. John Smith"
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty">Medical Specialty *</Label>
                  <Select onValueChange={(value) => setValue("specialty", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {MEDICAL_SPECIALTIES.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="npiNumber">NPI Number *</Label>
                  <div className="relative">
                    <Input
                      id="npiNumber"
                      {...register("npiNumber", { 
                        required: "NPI number is required",
                        pattern: { value: /^\d{10}$/, message: "NPI must be 10 digits" }
                      })}
                      placeholder="1234567890"
                      maxLength={10}
                      onChange={(e) => {
                        const value = e.target.value;
                        setValue("npiNumber", value);
                        if (value.length === 10) {
                          validateNPI(value);
                        }
                      }}
                    />
                    {isValidatingNPI && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                      </div>
                    )}
                  </div>
                  {errors.npiNumber && <p className="text-sm text-red-500">{errors.npiNumber.message}</p>}
                  {npiValidation && (
                    <div className={`flex items-center gap-2 text-sm ${npiValidation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                      {npiValidation.isValid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      {npiValidation.isValid ? 'NPI validated successfully' : 'NPI validation failed'}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    {...register("licenseNumber")}
                    placeholder="MD123456"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Facility Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="facilityName">Clinic/Hospital Name *</Label>
                    <Input
                      id="facilityName"
                      {...register("facilityName", { required: "Facility name is required" })}
                      placeholder="City General Hospital"
                    />
                    {errors.facilityName && <p className="text-sm text-red-500">{errors.facilityName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      {...register("department")}
                      placeholder="Orthopedics"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Physical Address *</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="physicalStreet">Street Address</Label>
                      <Input
                        id="physicalStreet"
                        {...register("physicalAddress.street", { required: "Street address is required" })}
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="physicalCity">City</Label>
                      <Input
                        id="physicalCity"
                        {...register("physicalAddress.city", { required: "City is required" })}
                        placeholder="Springfield"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="physicalState">State</Label>
                      <Input
                        id="physicalState"
                        {...register("physicalAddress.state", { required: "State is required" })}
                        placeholder="IL"
                        maxLength={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="physicalZip">ZIP Code</Label>
                      <Input
                        id="physicalZip"
                        {...register("physicalAddress.zipCode", { required: "ZIP code is required" })}
                        placeholder="62701"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usePhysicalForMailing"
                    checked={usePhysicalForMailing}
                    onCheckedChange={(checked) => setUsePhysicalForMailing(checked as boolean)}
                  />
                  <Label htmlFor="usePhysicalForMailing">Mailing address same as physical address</Label>
                </div>

                {!usePhysicalForMailing && (
                  <div>
                    <h4 className="font-medium mb-4">Mailing Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="mailingStreet">Street Address</Label>
                        <Input
                          id="mailingStreet"
                          {...register("mailingAddress.street")}
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mailingCity">City</Label>
                        <Input
                          id="mailingCity"
                          {...register("mailingAddress.city")}
                          placeholder="Springfield"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mailingState">State</Label>
                        <Input
                          id="mailingState"
                          {...register("mailingAddress.state")}
                          placeholder="IL"
                          maxLength={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mailingZip">ZIP Code</Label>
                        <Input
                          id="mailingZip"
                          {...register("mailingAddress.zipCode")}
                          placeholder="62701"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Contact Details */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phoneMain">Main Phone Number *</Label>
                  <Input
                    id="phoneMain"
                    {...register("phoneMain", { required: "Main phone number is required" })}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phoneMain && <p className="text-sm text-red-500">{errors.phoneMain.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneRecords">Records Department Phone</Label>
                  <Input
                    id="phoneRecords"
                    {...register("phoneRecords")}
                    placeholder="(555) 123-4568"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faxNumber">Fax Number</Label>
                  <Input
                    id="faxNumber"
                    {...register("faxNumber")}
                    placeholder="(555) 123-4569"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="records@facility.com"
                  />
                  <p className="text-xs text-muted-foreground">Only if HIPAA-compliant</p>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="recordsContactPerson">Medical Records Contact Person</Label>
                  <Input
                    id="recordsContactPerson"
                    {...register("recordsContactPerson")}
                    placeholder="Mary Smith, Records Coordinator"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Treatment Information */}
            {currentStep === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstTreatmentDate">First Treatment Date *</Label>
                  <Input
                    id="firstTreatmentDate"
                    type="date"
                    {...register("firstTreatmentDate", { required: "First treatment date is required" })}
                  />
                  {errors.firstTreatmentDate && <p className="text-sm text-red-500">{errors.firstTreatmentDate.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastTreatmentDate">Last Treatment Date</Label>
                  <Input
                    id="lastTreatmentDate"
                    type="date"
                    {...register("lastTreatmentDate")}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="treatmentType">Type of Treatment Received *</Label>
                  <Textarea
                    id="treatmentType"
                    {...register("treatmentType", { required: "Treatment type is required" })}
                    placeholder="Post-surgical follow-up for knee replacement..."
                    rows={3}
                  />
                  {errors.treatmentType && <p className="text-sm text-red-500">{errors.treatmentType.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedVisits">Estimated Number of Visits</Label>
                  <Input
                    id="estimatedVisits"
                    type="number"
                    {...register("estimatedVisits", { valueAsNumber: true })}
                    placeholder="6"
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outstandingBills">Outstanding Bills Amount</Label>
                  <Input
                    id="outstandingBills"
                    type="number"
                    step="0.01"
                    {...register("outstandingBills", { valueAsNumber: true })}
                    placeholder="2500.00"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit">
                  Add Provider
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
