
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Plus, Clock, User } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  type: string;
  doctor: string;
  status: "scheduled" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "John Doe",
    patientId: "P001",
    date: "2024-06-10",
    time: "09:00",
    type: "Follow-up",
    doctor: "Dr. Smith",
    status: "confirmed",
    notes: "Blood pressure check"
  },
  {
    id: "2",
    patientName: "Jane Smith",
    patientId: "P002",
    date: "2024-06-10",
    time: "10:30",
    type: "Consultation",
    doctor: "Dr. Johnson",
    status: "scheduled",
    notes: "Diabetes management"
  },
  {
    id: "3",
    patientName: "Mike Johnson",
    patientId: "P003",
    date: "2024-06-11",
    time: "14:00",
    type: "Check-up",
    doctor: "Dr. Brown",
    status: "confirmed",
    notes: "Routine examination"
  },
  {
    id: "4",
    patientName: "Sarah Wilson",
    patientId: "P004",
    date: "2024-06-11",
    time: "16:30",
    type: "Physical Therapy",
    doctor: "Dr. Davis",
    status: "scheduled",
    notes: "Knee rehabilitation"
  }
];

export function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments] = useState<Appointment[]>(mockAppointments);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeStatus = (date: string, time: string) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    
    if (appointmentDateTime < now) {
      return "past";
    } else if (appointmentDateTime.toDateString() === now.toDateString()) {
      return "today";
    } else {
      return "future";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Appointments</h2>
          <p className="text-muted-foreground">Manage patient appointments and schedules</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Schedule Appointment
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search appointments by patient, doctor, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => {
          const timeStatus = getTimeStatus(appointment.date, appointment.time);
          return (
            <Card key={appointment.id} className={`hover:shadow-md transition-shadow ${
              timeStatus === "today" ? "border-blue-200 bg-blue-50" : ""
            }`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {appointment.patientName}
                      </h3>
                      <p className="text-sm text-muted-foreground">ID: {appointment.patientId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Date & Time
                      </p>
                      <p className="text-sm text-muted-foreground">{appointment.date}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {appointment.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Type</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Doctor</p>
                      <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      {timeStatus === "today" && (
                        <Badge className="mt-1 bg-orange-100 text-orange-800">
                          Today
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                {appointment.notes && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium">Notes:</p>
                    <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No appointments found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
