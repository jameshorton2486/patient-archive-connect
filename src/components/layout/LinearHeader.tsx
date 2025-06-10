
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, FileText, Bell, Search, Settings } from "lucide-react";

interface LinearHeaderProps {
  activeView: string;
  onToggleSidebar: () => void;
}

const viewTitles: Record<string, string> = {
  'dashboard': 'Dashboard',
  'client-intake': 'Client Intake',
  'intelligent-intake': 'Smart Intake',
  'secure-intake': 'Secure Form',
  'patient-list': 'Patients',
  'provider-list': 'Providers',
  'medical-records': 'Medical Records',
  'appointments': 'Appointments',
  'document-generation': 'Documents',
  'automated-generator': 'Auto Generate',
  'ai-processing': 'AI Processing',
  'document-distribution': 'Distribution',
  'deadline-management': 'Deadlines',
  'denial-management': 'Denials',
  'predictive-analytics': 'Analytics',
  'integration-ecosystem': 'Integrations'
};

export function LinearHeader({ activeView, onToggleSidebar }: LinearHeaderProps) {
  const currentTitle = viewTitles[activeView] || 'Legal Records';

  return (
    <header className="h-14 bg-[var(--bg-primary)] border-b border-[var(--border-primary)] shadow-sm flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Side - Mobile Menu & Breadcrumbs */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-accent transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-2 text-sm text-[var(--text-secondary)]">
            <FileText className="h-4 w-4" />
            <span>/</span>
            <span className="font-medium text-[var(--text-primary)]">{currentTitle}</span>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-semibold text-[var(--text-primary)]">{currentTitle}</h1>
          </div>
        </div>
      </div>

      {/* Right Side - Linear Actions */}
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2 hover:bg-accent transition-all duration-200" 
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2 hover:bg-accent transition-all duration-200" 
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <Badge 
            variant="secondary" 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white border-none"
          >
            3
          </Badge>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2 hover:bg-accent transition-all duration-200" 
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
