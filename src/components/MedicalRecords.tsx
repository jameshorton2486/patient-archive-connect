
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Plus, Eye } from "lucide-react";

interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  type: string;
  diagnosis: string;
  treatment: string;
  doctor: string;
  status: "active" | "completed" | "follow-up";
}

const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    patientName: "John Doe",
    patientId: "P001",
    date: "2024-01-15",
    type: "Consultation",
    diagnosis: "Hypertension",
    treatment: "Medication prescribed",
    doctor: "Dr. Smith",
    status: "active"
  },
  {
    id: "2",
    patientName: "Jane Smith",
    patientId: "P002",
    date: "2024-01-10",
    type: "Lab Results",
    diagnosis: "Diabetes Type 2",
    treatment: "Diet modification",
    doctor: "Dr. Johnson",
    status: "follow-up"
  },
  {
    id: "3",
    patientName: "Mike Johnson",
    patientId: "P003",
    date: "2024-01-12",
    type: "Emergency",
    diagnosis: "Asthma Attack",
    treatment: "Inhaler treatment",
    doctor: "Dr. Brown",
    status: "completed"
  }
];

export function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [records] = useState<MedicalRecord[]>(mockRecords);

  const filteredRecords = records.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "variant='info'";
      case "completed":
        return "variant='success'";
      case "follow-up":
        return "variant='warning'";
      default:
        return "variant='secondary'";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Medical Records</h2>
          <p className="text-muted-foreground">Patient medical history and documentation</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Record
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search records by patient, diagnosis, or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{record.patientName}</h3>
                    <p className="text-sm text-muted-foreground">ID: {record.patientId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Date</p>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                    <p className="text-sm text-muted-foreground">{record.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Diagnosis</p>
                    <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Treatment</p>
                    <p className="text-sm text-muted-foreground">{record.treatment}</p>
                    <p className="text-sm text-muted-foreground">by {record.doctor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Status</p>
                    <Badge variant={record.status === "active" ? "info" : record.status === "completed" ? "success" : "warning"}>
                      {record.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No medical records found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
