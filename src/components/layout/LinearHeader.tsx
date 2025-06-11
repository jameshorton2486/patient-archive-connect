
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, FileText, Bell, Search, Settings } from "lucide-react";
import { DarkModeToggle } from "../DarkModeToggle";
import { ROUTE_META } from '@/routes';

interface LinearHeaderProps {
  activeView: string;
  onToggleSidebar: () => void;
}

const viewTitles: Record<string, string> = {
  'dashboard': 'Dashboard',
  'design-system-preview': 'Design System Preview',
  'client-intake': 'Client Intake',
  'smart-intake': 'Smart Intake',
  'secure-form': 'Secure Form',
  'patients': 'Patients',
  'providers': 'Providers',
  'records': 'Medical Records',
  'appointments': 'Appointments',
  'documents': 'Documents',
  'auto-generate': 'Auto Generate',
  'ai-processing': 'AI Processing',
  'distribution': 'Distribution',
  'deadlines': 'Deadlines',
  'denials': 'Denials',
  'analytics': 'Analytics',
  'integrations': 'Integrations'
};

export function LinearHeader({ activeView, onToggleSidebar }: LinearHeaderProps) {
  const routeTitle = ROUTE_META[`/${activeView}` as keyof typeof ROUTE_META]?.breadcrumb;
  const currentTitle = routeTitle || viewTitles[activeView] || 'Patient Archive Connect';

  return (
    <header className="header-healthcare flex items-center justify-between px-6 sticky top-0 z-40 bg-clean-white">
      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 h-10 w-10"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-3">
            <FileText className="h-5 w-5 text-healthcare-blue" />
            <span className="text-caption text-text-secondary">/</span>
            <span className="font-semibold text-medical-charcoal">{currentTitle}</span>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-semibold text-medical-charcoal">{currentTitle}</h1>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2 h-10 w-10" 
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2 h-10 w-10" 
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <Badge 
            variant="secondary" 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-error-red text-clean-white border-0"
          >
            3
          </Badge>
        </Button>
        
        <DarkModeToggle />
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2 h-10 w-10" 
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
