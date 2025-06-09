
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar,
  UserPlus,
  Stethoscope,
  Scale,
  UserCheck,
  Building2
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: 'dashboard' | 'patients' | 'records' | 'appointments' | 'add-patient' | 'client-intake' | 'clients' | 'providers' | 'add-provider') => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'clients', label: 'Clients', icon: Scale },
  { id: 'client-intake', label: 'Client Intake', icon: UserCheck },
  { id: 'providers', label: 'Healthcare Providers', icon: Building2 },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'records', label: 'Medical Records', icon: FileText },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'add-patient', label: 'Add Patient', icon: UserPlus },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <Scale className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold text-foreground">LegalMed System</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                activeView === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
