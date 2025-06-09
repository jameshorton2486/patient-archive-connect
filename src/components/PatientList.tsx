
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Patients</h2>
          <p className="text-muted-foreground">Manage your patient database</p>
        </div>
        <Button onClick={onAddPatient} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search patients by name, email, or condition..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                  <div>
                    <h3 className="font-semibold text-lg">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">{patient.age} years old, {patient.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">{patient.phone}</p>
                    <p className="text-sm text-muted-foreground">{patient.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Visit</p>
                    <p className="text-sm text-muted-foreground">{patient.lastVisit}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Condition</p>
                    <p className="text-sm text-muted-foreground">{patient.condition}</p>
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

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No patients found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
