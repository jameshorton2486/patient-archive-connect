
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Eye, Edit, Scale } from "lucide-react";

interface Client {
  id: string;
  caseId: string;
  name: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  incidentType: string;
  incidentDate: string;
  status: 'Active' | 'Pending' | 'Closed';
  createdAt: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    caseId: "CASE-2024-001",
    name: "John Smith",
    dateOfBirth: "1985-03-15",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    incidentType: "Auto Accident",
    incidentDate: "2024-01-10",
    status: "Active",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    caseId: "CASE-2024-002",
    name: "Maria Garcia",
    dateOfBirth: "1978-08-22",
    phone: "(555) 987-6543",
    email: "maria.garcia@email.com",
    incidentType: "Slip and Fall",
    incidentDate: "2024-01-05",
    status: "Pending",
    createdAt: "2024-01-12"
  }
];

interface ClientListProps {
  onAddClient: () => void;
}

export function ClientList({ onAddClient }: ClientListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients] = useState<Client[]>(mockClients);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.incidentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'Closed':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Client Cases</h2>
          <p className="text-muted-foreground">Manage personal injury client cases</p>
        </div>
        <Button onClick={onAddClient} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          New Client Intake
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search clients by name, case ID, or incident type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="h-4 w-4 text-primary" />
                      <span className="font-mono text-sm text-muted-foreground">{client.caseId}</span>
                    </div>
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <p className="text-sm text-muted-foreground">DOB: {client.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">{client.phone}</p>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Incident</p>
                    <p className="text-sm text-muted-foreground">{client.incidentType}</p>
                    <p className="text-sm text-muted-foreground">{client.incidentDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">Created: {client.createdAt}</p>
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

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No clients found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
