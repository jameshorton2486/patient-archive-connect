
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  FileText, 
  UserCheck, 
  LogOut,
  Users, 
  Calendar, 
  UserPlus, 
  Stethoscope,
  FolderPlus,
  Send,
  Clock,
  Brain,
  AlertTriangle,
  Zap,
  LayoutDashboard,
  Shield
} from "lucide-react";
import { NavigationDropdown } from "./NavigationDropdown";
import { UserProfileDropdown } from "./UserProfileDropdown";

interface ResponsiveNavigationProps {
  activeView: string;
  onViewChange: (view: any) => void;
  user: string;
  onLogout: () => void;
}

export function ResponsiveNavigation({ activeView, onViewChange, user, onLogout }: ResponsiveNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigationGroups = [
    {
      title: "Overview",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null }
      ]
    },
    {
      title: "Clients",
      items: [
        { id: 'client-intake', label: 'Client Intake', icon: UserPlus, badge: null },
        { id: 'intelligent-intake', label: 'Smart Intake', icon: Brain, badge: 'AI' },
        { id: 'secure-intake', label: 'Secure Form', icon: Shield, badge: null },
        { id: 'patient-list', label: 'Patients', icon: Users, badge: null }
      ]
    },
    {
      title: "Docs",
      items: [
        { id: 'medical-records', label: 'Records', icon: FileText, badge: null },
        { id: 'document-generation', label: 'Documents', icon: FolderPlus, badge: null },
        { id: 'automated-generator', label: 'Auto Generate', icon: Zap, badge: 'AI' },
        { id: 'ai-processing', label: 'AI Processing', icon: Brain, badge: 'NEW' }
      ]
    },
    {
      title: "Operations",
      items: [
        { id: 'provider-list', label: 'Providers', icon: Stethoscope, badge: null },
        { id: 'appointments', label: 'Appointments', icon: Calendar, badge: null },
        { id: 'document-distribution', label: 'Distribution', icon: Send, badge: null },
        { id: 'deadline-management', label: 'Deadlines', icon: Clock, badge: null }
      ]
    },
    {
      title: "Analytics",
      items: [
        { id: 'denial-management', label: 'Denials', icon: AlertTriangle, badge: null },
        { id: 'predictive-analytics', label: 'Analytics', icon: Brain, badge: 'PRO' },
        { id: 'integration-ecosystem', label: 'Integrations', icon: Zap, badge: null }
      ]
    }
  ];

  const handleMenuClick = (viewId: string) => {
    onViewChange(viewId);
    setIsOpen(false);
  };

  const getBadgeVariant = (badge: string | null) => {
    if (!badge) return null;
    
    const badgeConfig = {
      'AI': { className: 'bg-green-100 text-green-800 border-green-200' },
      'NEW': { className: 'bg-blue-100 text-blue-800 border-blue-200' },
      'PRO': { className: 'bg-amber-100 text-amber-800 border-amber-200' }
    }[badge];

    return badgeConfig || { className: 'bg-gray-100 text-gray-800' };
  };

  return (
    <>
      {/* Desktop Navigation Bar */}
      <nav className="hidden lg:block bg-white border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-sm">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Legal Records</h1>
                <p className="text-xs text-muted-foreground">Management System</p>
              </div>
            </div>

            {/* Desktop Navigation Groups */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationGroups.map((group) => (
                <NavigationDropdown
                  key={group.title}
                  title={group.title}
                  items={group.items}
                  activeView={activeView}
                  onViewChange={handleMenuClick}
                />
              ))}
            </div>

            {/* User Profile Dropdown */}
            <UserProfileDropdown user={user} onLogout={onLogout} />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Legal Records</h1>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center space-x-2">
              <UserProfileDropdown user={user} onLogout={onLogout} />
              
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <SheetHeader className="px-6 py-4 border-b border-border bg-accent/30">
                    <SheetTitle className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                        <UserCheck className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-foreground">{user}</p>
                        <p className="text-xs text-muted-foreground">Legal Professional</p>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Mobile Navigation Menu */}
                  <div className="flex-1 overflow-y-auto py-4">
                    {navigationGroups.map((group) => (
                      <div key={group.title} className="mb-6">
                        <h3 className="mb-2 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {group.title}
                        </h3>
                        <div className="space-y-1 px-3">
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeView === item.id;
                            const badgeConfig = getBadgeVariant(item.badge);
                            
                            return (
                              <Button
                                key={item.id}
                                variant={isActive ? "default" : "ghost"}
                                className={cn(
                                  "w-full justify-start h-12 px-3 text-sm font-medium",
                                  isActive ? 
                                    "bg-primary text-primary-foreground shadow-sm" : 
                                    "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                )}
                                onClick={() => handleMenuClick(item.id)}
                              >
                                <Icon className="mr-3 h-5 w-5" />
                                <span className="flex-1 text-left">{item.label}</span>
                                {item.badge && badgeConfig && (
                                  <Badge className={cn("ml-2 text-xs h-5", badgeConfig.className)}>
                                    {item.badge}
                                  </Badge>
                                )}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
