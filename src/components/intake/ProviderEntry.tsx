
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Building2, UserCheck, Phone, MapPin, Calendar } from 'lucide-react';

interface ProviderEntryProps {
  onProviderAdded?: (provider: any) => void;
  onBack?: () => void;
}

interface NPIResult {
  npiNumber: string;
  name: string;
  specialty: string;
  facility: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone?: string;
  verified: boolean;
}

export function ProviderEntry({ onProviderAdded, onBack }: ProviderEntryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [npiResults, setNpiResults] = useState<NPIResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<NPIResult | null>(null);
  const [treatmentDetails, setTreatmentDetails] = useState({
    firstTreatmentDate: '',
    lastTreatmentDate: '',
    typeOfTreatment: '',
    estimatedVisits: '',
    recordsContactPerson: '',
    recordsPhone: '',
    recordsEmail: ''
  });

  const { toast } = useToast();

  // Mock NPI search results
  const mockNPIResults: NPIResult[] = [
    {
      npiNumber: '1234567890',
      name: 'Dr. Sarah Johnson',
      specialty: 'Orthopedic Surgery',
      facility: 'Regional Medical Center',
      address: {
        street: '123 Medical Dr',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701'
      },
      phone: '(555) 123-4567',
      verified: true
    },
    {
      npiNumber: '0987654321',
      name: 'Springfield Imaging Center',
      specialty: 'Diagnostic Radiology',
      facility: 'Springfield Imaging Center',
      address: {
        street: '456 Health Ave',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62702'
      },
      phone: '(555) 987-6543',
      verified: true
    }
  ];

  const handleNPISearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredResults = mockNPIResults.filter(provider =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.npiNumber.includes(searchQuery) ||
        provider.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setNpiResults(filteredResults);
      setIsSearching(false);
      
      toast({
        title: "Search Complete",
        description: `Found ${filteredResults.length} provider(s)`,
      });
    }, 1000);
  };

  const handleProviderSelect = (provider: NPIResult) => {
    setSelectedProvider(provider);
    toast({
      title: "Provider Selected",
      description: `${provider.name} has been selected`,
    });
  };

  const handleAddProvider = () => {
    if (!selectedProvider) return;

    const providerData = {
      ...selectedProvider,
      treatmentDetails,
      addedAt: new Date().toISOString()
    };

    toast({
      title: "Provider Added",
      description: "Provider has been successfully added to the case",
    });

    onProviderAdded?.(providerData);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {onBack && (
          <Button onClick={onBack} variant="outline">
            ← Back
          </Button>
        )}

        <div>
          <h1 className="text-2xl font-bold mb-2">Add Healthcare Provider</h1>
          <p className="text-muted-foreground">
            Search for healthcare providers using NPI database
          </p>
        </div>

        {/* NPI Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Provider Search
            </CardTitle>
            <CardDescription>
              Search by provider name, NPI number, facility, or specialty
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Enter provider name, NPI, facility, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNPISearch()}
                />
              </div>
              <Button 
                onClick={handleNPISearch} 
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Search NPI
                  </div>
                )}
              </Button>
            </div>

            {/* Search Results */}
            {npiResults.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Search Results</h3>
                {npiResults.map((provider) => (
                  <div 
                    key={provider.npiNumber}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedProvider?.npiNumber === provider.npiNumber 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleProviderSelect(provider)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-primary" />
                          <span className="font-medium">{provider.name}</span>
                          {provider.verified && (
                            <Badge variant="default" className="text-xs">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p className="font-medium">{provider.facility}</p>
                          <p>{provider.specialty}</p>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>
                              {provider.address.street}, {provider.address.city}, {provider.address.state} {provider.address.zipCode}
                            </span>
                          </div>
                          {provider.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{provider.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-mono text-muted-foreground">
                          NPI: {provider.npiNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Treatment Details */}
        {selectedProvider && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Treatment Details
              </CardTitle>
              <CardDescription>
                Provide details about the treatment received from {selectedProvider.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstTreatmentDate">First Treatment Date *</Label>
                  <Input
                    id="firstTreatmentDate"
                    type="date"
                    value={treatmentDetails.firstTreatmentDate}
                    onChange={(e) => setTreatmentDetails(prev => ({ 
                      ...prev, 
                      firstTreatmentDate: e.target.value 
                    }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastTreatmentDate">Last Treatment Date</Label>
                  <Input
                    id="lastTreatmentDate"
                    type="date"
                    value={treatmentDetails.lastTreatmentDate}
                    onChange={(e) => setTreatmentDetails(prev => ({ 
                      ...prev, 
                      lastTreatmentDate: e.target.value 
                    }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="typeOfTreatment">Type of Treatment *</Label>
                  <Input
                    id="typeOfTreatment"
                    value={treatmentDetails.typeOfTreatment}
                    onChange={(e) => setTreatmentDetails(prev => ({ 
                      ...prev, 
                      typeOfTreatment: e.target.value 
                    }))}
                    placeholder="e.g., Physical therapy, Surgery, Consultation"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedVisits">Estimated Number of Visits</Label>
                  <Input
                    id="estimatedVisits"
                    type="number"
                    value={treatmentDetails.estimatedVisits}
                    onChange={(e) => setTreatmentDetails(prev => ({ 
                      ...prev, 
                      estimatedVisits: e.target.value 
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Records Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recordsContactPerson">Records Contact Person</Label>
                    <Input
                      id="recordsContactPerson"
                      value={treatmentDetails.recordsContactPerson}
                      onChange={(e) => setTreatmentDetails(prev => ({ 
                        ...prev, 
                        recordsContactPerson: e.target.value 
                      }))}
                      placeholder="Contact name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recordsPhone">Records Phone</Label>
                    <Input
                      id="recordsPhone"
                      value={treatmentDetails.recordsPhone}
                      onChange={(e) => setTreatmentDetails(prev => ({ 
                        ...prev, 
                        recordsPhone: e.target.value 
                      }))}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recordsEmail">Records Email</Label>
                    <Input
                      id="recordsEmail"
                      type="email"
                      value={treatmentDetails.recordsEmail}
                      onChange={(e) => setTreatmentDetails(prev => ({ 
                        ...prev, 
                        recordsEmail: e.target.value 
                      }))}
                      placeholder="records@provider.com"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleAddProvider}
                  className="flex items-center gap-2"
                  disabled={!treatmentDetails.firstTreatmentDate || !treatmentDetails.typeOfTreatment}
                >
                  <Building2 className="h-4 w-4" />
                  Add Provider to Case
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
