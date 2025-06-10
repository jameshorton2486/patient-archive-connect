
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Eye, Edit } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastVisit: string;
  condition: string;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    age: 45,
    gender: "Male",
    phone: "(555) 123-4567",
    email: "john.doe@email.com",
    lastVisit: "2024-01-15",
    condition: "Hypertension"
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    phone: "(555) 987-6543",
    email: "jane.smith@email.com",
    lastVisit: "2024-01-10",
    condition: "Diabetes"
  },
  {
    id: "3",
    name: "Mike Johnson",
    age: 28,
    gender: "Male",
    phone: "(555) 456-7890",
    email: "mike.johnson@email.com",
    lastVisit: "2024-01-12",
    condition: "Asthma"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    age: 55,
    gender: "Female",
    phone: "(555) 321-0987",
    email: "sarah.wilson@email.com",
    lastVisit: "2024-01-08",
    condition: "Arthritis"
  }
];

interface PatientListProps {
  onAddPatient: () => void;
}

export function PatientList({ onAddPatient }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients] = useState<Patient[]>(mockPatients);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Add Patient Header - Responsive */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] h-4 w-4" />
          <Input
            placeholder="Search patients by name, email, or condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-all duration-200 focus:ring-[var(--accent-medical)] focus:border-[var(--accent-medical)]"
          />
        </div>
        <Button 
          onClick={onAddPatient} 
          className="flex items-center gap-2 mobile-full-width sm:w-auto bg-[var(--accent-medical)] hover:bg-[var(--accent-medical)]/90 transition-all duration-200 active:scale-95"
        >
          <UserPlus className="h-4 w-4" />
          Add Patient
        </Button>
      </div>

      {/* Patient Cards Grid - Responsive */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="card-linear">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                {/* Patient Information Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                  <div>
                    <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-1">{patient.name}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{patient.age} years old, {patient.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Contact</p>
                    <p className="text-sm text-[var(--text-secondary)] break-all">{patient.phone}</p>
                    <p className="text-sm text-[var(--text-secondary)] break-all">{patient.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Last Visit</p>
                    <p className="text-sm text-[var(--text-secondary)]">{patient.lastVisit}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Condition</p>
                    <p className="text-sm text-[var(--text-secondary)]">{patient.condition}</p>
                  </div>
                </div>
                
                {/* Action Buttons - Responsive */}
                <div className="flex gap-2 lg:ml-4 justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View patient</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit patient</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <Card className="card-linear">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="animate-linear-fade-in">
              <p className="text-[var(--text-secondary)] text-responsive">
                No patients found matching your search criteria.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
