
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  FileText, 
  UserPlus, 
  Stethoscope,
  UserCheck,
  FolderPlus,
  Send,
  Clock
} from "lucide-react";

type ActiveView = 'dashboard' | 'patients' | 'records' | 'appointments' | 'add-patient' | 'client-intake' | 'clients' | 'providers' | 'add-provider' | 'document-generation' | 'deadline-management';

interface SidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: FileText },
    { id: 'clients' as const, label: 'Clients', icon: Users },
    { id: 'providers' as const, label: 'Providers', icon: Stethoscope },
    { id: 'document-generation' as const, label: 'Documents', icon: FolderPlus },
    { id: 'deadline-management' as const, label: 'Deadlines', icon: Clock },
    { id: 'records' as const, label: 'Medical Records', icon: FileText },
    { id: 'appointments' as const, label: 'Appointments', icon: Calendar },
  ];

  return (
    <div className="w-64 bg-card border-r border-border p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Legal Records</h1>
        <p className="text-sm text-muted-foreground">Management System</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                activeView === item.id && "bg-primary text-primary-foreground"
              )}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
