
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

interface ResponsiveNavigationProps {
  activeView: string;
  onViewChange: (view: any) => void;
  user: string;
  onLogout: () => void;
}

export function ResponsiveNavigation({ activeView, onViewChange, user, onLogout }: ResponsiveNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuSections = [
    {
      title: "Overview",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null }
      ]
    },
    {
      title: "Client Management",
      items: [
        { id: 'client-intake', label: 'Client Intake', icon: UserPlus, badge: null },
        { id: 'intelligent-intake', label: 'Smart Intake', icon: Brain, badge: 'AI' },
        { id: 'secure-intake', label: 'Secure Form', icon: Shield, badge: null },
        { id: 'patient-list', label: 'Patients', icon: Users, badge: null }
      ]
    },
    {
      title: "Medical Records",
      items: [
        { id: 'provider-list', label: 'Providers', icon: Stethoscope, badge: null },
        { id: 'medical-records', label: 'Records', icon: FileText, badge: null },
        { id: 'appointments', label: 'Appointments', icon: Calendar, badge: null }
      ]
    },
    {
      title: "Automation",
      items: [
        { id: 'document-generation', label: 'Documents', icon: FolderPlus, badge: null },
        { id: 'automated-generator', label: 'Auto Generate', icon: Zap, badge: 'AI' },
        { id: 'ai-processing', label: 'AI Processing', icon: Brain, badge: 'NEW' },
        { id: 'document-distribution', label: 'Distribution', icon: Send, badge: null }
      ]
    },
    {
      title: "Management",
      items: [
        { id: 'deadline-management', label: 'Deadlines', icon: Clock, badge: null },
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
      'AI': { variant: 'default', className: 'bg-green-100 text-green-800 border-green-200' },
      'NEW': { variant: 'default', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      'PRO': { variant: 'default', className: 'bg-amber-100 text-amber-800 border-amber-200' }
    }[badge];

    return badgeConfig || { variant: 'secondary', className: '' };
  };

  return (
    <>
      {/* Desktop Navigation Bar */}
      <nav className="hidden lg:block bg-white border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container-app">
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

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuSections.map((section) => (
                <div key={section.title} className="flex items-center space-x-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    const badgeConfig = getBadgeVariant(item.badge);
                    
                    return (
                      <Button
                        key={item.id}
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "h-10 px-3 text-sm font-medium min-w-[44px] relative",
                          isActive ? 
                            "btn-primary shadow-sm" : 
                            "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                        onClick={() => handleMenuClick(item.id)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        <span className="hidden xl:inline">{item.label}</span>
                        {item.badge && badgeConfig && (
                          <Badge 
                            className={cn("ml-2 text-xs h-5", badgeConfig.className)}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* User Info and Logout */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 px-3 py-2 rounded-lg bg-accent/30">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <UserCheck className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-foreground">{user}</span>
                  <p className="text-xs text-muted-foreground">Legal Professional</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 min-h-[44px] min-w-[44px]"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container-app">
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

            {/* User Info and Mobile Menu */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 mr-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                  <UserCheck className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-foreground hidden sm:inline">{user}</span>
              </div>

              {/* Mobile Menu Trigger */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="min-h-[44px] min-w-[44px]">
                    <Menu className="h-5 w-5" />
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
                    {menuSections.map((section) => (
                      <div key={section.title} className="mb-6">
                        <h3 className="mb-2 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {section.title}
                        </h3>
                        <div className="space-y-1 px-3">
                          {section.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeView === item.id;
                            const badgeConfig = getBadgeVariant(item.badge);
                            
                            return (
                              <Button
                                key={item.id}
                                variant={isActive ? "default" : "ghost"}
                                className={cn(
                                  "w-full justify-start h-12 px-3 text-sm font-medium min-h-[44px]",
                                  isActive ? 
                                    "btn-primary shadow-sm" : 
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

                  {/* Mobile Logout */}
                  <div className="border-t border-border p-3">
                    <Button
                      variant="ghost"
                      onClick={onLogout}
                      className="w-full justify-start h-12 px-3 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 min-h-[44px]"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Sign Out
                    </Button>
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
