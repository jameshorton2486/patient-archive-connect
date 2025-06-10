
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CheckCircle, AlertCircle } from "lucide-react";
import { MEDICAL_SPECIALTIES, NPIValidationResult } from "@/types/provider";

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
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DoctorFormData>();

  const validateNPI = async (npiNumber: string) => {
    if (npiNumber.length !== 10) return;
    
    setIsValidatingNPI(true);
    
    // Simulate NPI validation API call
    setTimeout(() => {
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
      }
      
      setIsValidatingNPI(false);
    }, 1500);
  };

  const handleFormSubmit = (data: DoctorFormData) => {
    console.log("Doctor form data:", data);
    onSubmit(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Doctor Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            
            {/* Provider Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Provider Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {errors.npiNumber && <p className="text-sm text-destructive">{errors.npiNumber.message}</p>}
                  {npiValidation && (
                    <div className={`flex items-center gap-2 text-sm ${npiValidation.isValid ? 'text-green-600' : 'text-destructive'}`}>
                      {npiValidation.isValid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      {npiValidation.isValid ? 'Provider found and verified' : 'Provider validation failed'}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="providerName">Provider Name *</Label>
                  <Input
                    id="providerName"
                    {...register("providerName", { required: "Provider name is required" })}
                    placeholder="Dr. John Smith"
                  />
                  {errors.providerName && <p className="text-sm text-destructive">{errors.providerName.message}</p>}
                </div>

                <div className="md:col-span-2 space-y-2">
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
                  {errors.specialty && <p className="text-sm text-destructive">Specialty is required</p>}
                </div>
              </div>
            </div>

            {/* Facility Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Facility Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="facilityName">Facility Name *</Label>
                  <Input
                    id="facilityName"
                    {...register("facilityName", { required: "Facility name is required" })}
                    placeholder="City General Hospital"
                  />
                  {errors.facilityName && <p className="text-sm text-destructive">{errors.facilityName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...register("phone", { required: "Phone number is required" })}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fax">Fax Number</Label>
                  <Input
                    id="fax"
                    {...register("fax")}
                    placeholder="(555) 123-4568"
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    {...register("address.street", { required: "Street address is required" })}
                    placeholder="123 Medical Center Dr"
                  />
                  {errors.address?.street && <p className="text-sm text-destructive">{errors.address.street.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    {...register("address.city", { required: "City is required" })}
                    placeholder="Springfield"
                  />
                  {errors.address?.city && <p className="text-sm text-destructive">{errors.address.city.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    {...register("address.state", { required: "State is required" })}
                    placeholder="IL"
                    maxLength={2}
                  />
                  {errors.address?.state && <p className="text-sm text-destructive">{errors.address.state.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    {...register("address.zipCode", { required: "ZIP code is required" })}
                    placeholder="62701"
                  />
                  {errors.address?.zipCode && <p className="text-sm text-destructive">{errors.address.zipCode.message}</p>}
                </div>
              </div>
            </div>

            {/* Treatment Dates Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Treatment Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="treatmentStartDate">Treatment Start Date *</Label>
                  <Input
                    id="treatmentStartDate"
                    type="date"
                    {...register("treatmentStartDate", { required: "Treatment start date is required" })}
                  />
                  {errors.treatmentStartDate && <p className="text-sm text-destructive">{errors.treatmentStartDate.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatmentEndDate">Treatment End Date</Label>
                  <Input
                    id="treatmentEndDate"
                    type="date"
                    {...register("treatmentEndDate")}
                  />
                  <p className="text-xs text-muted-foreground">Leave blank if treatment is ongoing</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit">
                Add Doctor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
