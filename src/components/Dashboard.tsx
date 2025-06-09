
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, FileText, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Patients",
    value: "1,234",
    description: "+12% from last month",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Appointments Today",
    value: "23",
    description: "5 pending confirmations",
    icon: Calendar,
    color: "text-green-600"
  },
  {
    title: "Medical Records",
    value: "5,678",
    description: "+8% from last month",
    icon: FileText,
    color: "text-purple-600"
  },
  {
    title: "Monthly Growth",
    value: "15.2%",
    description: "+2.1% from last month",
    icon: TrendingUp,
    color: "text-orange-600"
  }
];

const recentActivity = [
  { patient: "John Doe", action: "Appointment scheduled", time: "2 hours ago" },
  { patient: "Jane Smith", action: "Medical record updated", time: "4 hours ago" },
  { patient: "Mike Johnson", action: "Lab results uploaded", time: "6 hours ago" },
  { patient: "Sarah Wilson", action: "Prescription updated", time: "8 hours ago" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your medical records management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates in your system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{activity.patient}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-accent transition-colors">
                <p className="font-medium">Schedule New Appointment</p>
                <p className="text-sm text-muted-foreground">Book a patient appointment</p>
              </button>
              <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-accent transition-colors">
                <p className="font-medium">Add Medical Record</p>
                <p className="text-sm text-muted-foreground">Create new patient record</p>
              </button>
              <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-accent transition-colors">
                <p className="font-medium">View Reports</p>
                <p className="text-sm text-muted-foreground">Generate system reports</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
