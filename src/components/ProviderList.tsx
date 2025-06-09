
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Eye, Edit, Building2, Phone, Calendar } from "lucide-react";
import { Provider } from "@/types/provider";

const mockProviders: Provider[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Orthopedic Surgery",
    npiNumber: "1234567890",
    licenseNumber: "MD123456",
    facilityName: "City General Hospital",
    department: "Orthopedics",
    physicalAddress: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      zipCode: "62701"
    },
    phoneMain: "(555) 123-4567",
    phoneRecords: "(555) 123-4568",
    faxNumber: "(555) 123-4569",
    email: "records@citygeneral.com",
    recordsContactPerson: "Mary Smith",
    firstTreatmentDate: "2024-01-15",
    lastTreatmentDate: "2024-03-20",
    treatmentType: "Post-surgical follow-up",
    estimatedVisits: 6,
    outstandingBills: 2500.00,
    isVerified: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-03-20"
  }
];

interface ProviderListProps {
  onAddProvider: () => void;
}

export function ProviderList({ onAddProvider }: ProviderListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [providers] = useState<Provider[]>(mockProviders);

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.npiNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Healthcare Providers</h2>
          <p className="text-muted-foreground">Manage treatment providers and medical facilities</p>
        </div>
        <Button onClick={onAddProvider} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Provider
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search providers by name, facility, specialty, or NPI..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredProviders.map((provider) => (
          <Card key={provider.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span className="font-mono text-sm text-muted-foreground">NPI: {provider.npiNumber}</span>
                      {provider.isVerified && (
                        <Badge variant="default" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                    <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                    <p className="text-sm font-medium mt-1">{provider.facilityName}</p>
                    {provider.department && (
                      <p className="text-sm text-muted-foreground">{provider.department}</p>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">Contact</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{provider.phoneMain}</p>
                    {provider.phoneRecords && (
                      <p className="text-sm text-muted-foreground">Records: {provider.phoneRecords}</p>
                    )}
                    {provider.recordsContactPerson && (
                      <p className="text-sm text-muted-foreground">Contact: {provider.recordsContactPerson}</p>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">Treatment</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{provider.treatmentType}</p>
                    <p className="text-sm text-muted-foreground">
                      {provider.firstTreatmentDate} - {provider.lastTreatmentDate}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Est. visits: {provider.estimatedVisits}
                    </p>
                    {provider.outstandingBills && (
                      <p className="text-sm font-medium text-orange-600">
                        Outstanding: ${provider.outstandingBills.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No providers found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
