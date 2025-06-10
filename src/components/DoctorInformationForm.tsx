
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading";
import { Search, CheckCircle, AlertCircle } from "lucide-react";
import { MEDICAL_SPECIALTIES, NPIValidationResult } from "@/types/provider";
import { toast } from "@/components/ui/sonner";

interface DoctorFormData {
  providerName: string;
  specialty: string;
  npiNumber: string;
  facilityName: string;
  phone: string;
  fax: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  treatmentStartDate: string;
  treatmentEndDate: string;
}

interface DoctorInformationFormProps {
  onSubmit: (data: DoctorFormData) => void;
  onCancel?: () => void;
}

export function DoctorInformationForm({ onSubmit, onCancel }: DoctorInformationFormProps) {
  const [npiValidation, setNpiValidation] = useState<NPIValidationResult | null>(null);
  const [isValidatingNPI, setIsValidatingNPI] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DoctorFormData>();

  const validateNPI = async (npiNumber: string) => {
    if (npiNumber.length !== 10) return;
    
    setIsValidatingNPI(true);
    
    try {
      // Simulate NPI validation API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockValidation: NPIValidationResult = {
        isValid: true,
        provider: {
          name: "Dr. Sarah Johnson",
          specialty: "Orthopedic Surgery",
          licenseStatus: "active",
          address: "456 Medical Plaza Dr, Springfield, IL 62701"
        }
      };
      
      setNpiValidation(mockValidation);
      
      if (mockValidation.provider) {
        setValue("providerName", mockValidation.provider.name);
        setValue("specialty", mockValidation.provider.specialty);
        
        // Parse address from NPI lookup
        const addressParts = mockValidation.provider.address.split(", ");
        if (addressParts.length >= 3) {
          setValue("address.street", addressParts[0]);
          setValue("address.city", addressParts[1]);
          const stateZip = addressParts[2].split(" ");
          if (stateZip.length >= 2) {
            setValue("address.state", stateZip[0]);
            setValue("address.zipCode", stateZip[1]);
          }
        }
        toast.success("Provider information retrieved successfully");
      }
    } catch (error) {
      console.error('NPI validation failed:', error);
      setNpiValidation({
        isValid: false,
        provider: null
      });
      toast.error("Failed to validate NPI number");
    } finally {
      setIsValidatingNPI(false);
    }
  };

  const handleFormSubmit = async (data: DoctorFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Doctor form data:", data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(data);
      toast.success("Doctor information saved successfully");
    } catch (error) {
      console.error('Form submission failed:', error);
      toast.error("Failed to save doctor information");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-app max-w-4xl space-y-6">
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" aria-hidden="true" />
            Doctor Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>
            
            {/* Provider Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Provider Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="npiNumber" className="form-label">
                    NPI Number <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="npiNumber"
                      className={`form-input ${errors.npiNumber ? 'border-destructive focus:border-destructive' : ''}`}
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
                      aria-describedby="npiNumber-error npiNumber-validation"
                      aria-invalid={!!errors.npiNumber}
                    />
                    {isValidatingNPI && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <LoadingSpinner size="sm" />
                      </div>
                    )}
                  </div>
                  {errors.npiNumber && (
                    <div id="npiNumber-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.npiNumber.message}</span>
                    </div>
                  )}
                  {npiValidation && (
                    <div id="npiNumber-validation" className={`flex items-center gap-2 text-sm ${npiValidation.isValid ? 'text-green-600' : 'text-destructive'}`} role="status">
                      {npiValidation.isValid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      {npiValidation.isValid ? 'Provider found and verified' : 'Provider validation failed'}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="providerName" className="form-label">
                    Provider Name <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <Input
                    id="providerName"
                    className={`form-input ${errors.providerName ? 'border-destructive focus:border-destructive' : ''}`}
                    {...register("providerName", { required: "Provider name is required" })}
                    placeholder="Dr. John Smith"
                    aria-describedby="providerName-error"
                    aria-invalid={!!errors.providerName}
                  />
                  {errors.providerName && (
                    <div id="providerName-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.providerName.message}</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="specialty" className="form-label">
                    Medical Specialty <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <Select onValueChange={(value) => setValue("specialty", value)} aria-describedby="specialty-error">
                    <SelectTrigger className={`form-input ${errors.specialty ? 'border-destructive focus:border-destructive' : ''}`}>
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
                  {errors.specialty && (
                    <div id="specialty-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      <span>Specialty is required</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Facility Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Facility Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="facilityName" className="form-label">
                    Facility Name <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <Input
                    id="facilityName"
                    className={`form-input ${errors.facilityName ? 'border-destructive focus:border-destructive' : ''}`}
                    {...register("facilityName", { required: "Facility name is required" })}
                    placeholder="City General Hospital"
                    aria-describedby="facilityName-error"
                    aria-invalid={!!errors.facilityName}
                  />
                  {errors.facilityName && (
                    <div id="facilityName-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.facilityName.message}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="form-label">
                    Phone Number <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <Input
                    id="phone"
                    className={`form-input ${errors.phone ? 'border-destructive focus:border-destructive' : ''}`}
                    {...register("phone", { required: "Phone number is required" })}
                    placeholder="(555) 123-4567"
                    aria-describedby="phone-error"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <div id="phone-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.phone.message}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fax" className="form-label">Fax Number</Label>
                  <Input
                    id="fax"
                    className="form-input"
                    {...register("fax")}
                    placeholder="(555) 123-4568"
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="street" className="form-label">
                    Street Address <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <Input
                    id="street"
                    className={`form-input ${errors.address?.street ? 'border-destructive focus:border-destructive' : ''}`}
                    {...register("address.street", { required: "Street address is required" })}
                    placeholder="123 Medical Center Dr"
                    aria-describedby="street-error"
                    aria-invalid={!!errors.address?.street}
                  />
                  {errors.address?.street && (
                    <div id="street-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.address.street.message}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="form-label">
                    City <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <Input
                    id="city"
                    className={`form-input ${errors.address?.city ? 'border-destructive focus:border-destructive' : ''}`}
                    {...register("address.city", { required: "City is required" })}
                    placeholder="Springfield"
                    aria-describedby="city-error"
                    aria-invalid={!!errors.address?.city}
                  />
                  {errors.address?.city && (
                    <div id="city-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.address.city.message}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="form-label">
                    State <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <Input
                    id="state"
                    className={`form-input ${errors.address?.state ? 'border-destructive focus:border-destructive' : ''}`}
                    {...register("address.state", { required: "State is required" })}
                    placeholder="IL"
                    maxLength={2}
                    aria-describedby="state-error"
                    aria-invalid={!!errors.address?.state}
                  />
                  {errors.address?.state && (
                    <div id="state-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.address.state.message}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="form-label">
                    ZIP Code <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <Input
                    id="zipCode"
                    className={`form-input ${errors.address?.zipCode ? 'border-destructive focus:border-destructive' : ''}`}
                    {...register("address.zipCode", { required: "ZIP code is required" })}
                    placeholder="62701"
                    aria-describedby="zipCode-error"
                    aria-invalid={!!errors.address?.zipCode}
                  />
                  {errors.address?.zipCode && (
                    <div id="zipCode-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.address.zipCode.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Treatment Dates Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Treatment Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="treatmentStartDate" className="form-label">
                    Treatment Start Date <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <Input
                    id="treatmentStartDate"
                    type="date"
                    className={`form-input ${errors.treatmentStartDate ? 'border-destructive focus:border-destructive' : ''}`}
                    {...register("treatmentStartDate", { required: "Treatment start date is required" })}
                    aria-describedby="treatmentStartDate-error"
                    aria-invalid={!!errors.treatmentStartDate}
                  />
                  {errors.treatmentStartDate && (
                    <div id="treatmentStartDate-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.treatmentStartDate.message}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatmentEndDate" className="form-label">Treatment End Date</Label>
                  <Input
                    id="treatmentEndDate"
                    type="date"
                    className="form-input"
                    {...register("treatmentEndDate")}
                    aria-describedby="treatmentEndDate-help"
                  />
                  <p id="treatmentEndDate-help" className="text-xs text-muted-foreground">
                    Leave blank if treatment is ongoing
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-border">
              {onCancel && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onCancel} 
                  className="min-h-[44px] min-w-[100px]"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              )}
              <Button 
                type="submit" 
                className="btn-primary min-h-[44px] min-w-[120px]"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Saving...
                  </>
                ) : (
                  'Add Doctor'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
