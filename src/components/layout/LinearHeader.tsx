
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
  // Try to get title from route meta first, then fallback to viewTitles
  const routeTitle = ROUTE_META[`/${activeView}` as keyof typeof ROUTE_META]?.breadcrumb;
  const currentTitle = routeTitle || viewTitles[activeView] || 'Legal Records';

  return (
    <header className="h-14 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Side - Mobile Menu & Breadcrumbs */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-accent transition-colors duration-200 text-muted-foreground h-8 w-8"
          aria-label="Toggle menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>/</span>
            <span className="font-medium text-foreground">{currentTitle}</span>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-semibold text-foreground">{currentTitle}</h1>
          </div>
        </div>
      </div>

      {/* Right Side - Linear Actions */}
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2 hover:bg-accent transition-all duration-200 text-muted-foreground hover:text-foreground h-8 w-8" 
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2 hover:bg-accent transition-all duration-200 text-muted-foreground hover:text-foreground h-8 w-8" 
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <Badge 
            variant="secondary" 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-primary text-primary-foreground border-0"
          >
            3
          </Badge>
        </Button>
        
        <DarkModeToggle />
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2 hover:bg-accent transition-all duration-200 text-muted-foreground hover:text-foreground h-8 w-8" 
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
