
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
  Shield,
  X
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

  return (
    <>
      {/* Desktop Navigation Bar */}
      <nav className="hidden lg:block bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Legal Records</h1>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuSections.map((section) => (
                <div key={section.title} className="flex items-center space-x-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                      <Button
                        key={item.id}
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "h-10 px-3 text-sm font-medium min-w-[44px]",
                          isActive ? 
                            "bg-blue-600 text-white shadow-sm hover:bg-blue-700" : 
                            "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        )}
                        onClick={() => handleMenuClick(item.id)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        <span className="hidden xl:inline">{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "ml-2 text-xs",
                              item.badge === 'AI' && "bg-green-100 text-green-800",
                              item.badge === 'NEW' && "bg-blue-100 text-blue-800",
                              item.badge === 'PRO' && "bg-amber-100 text-amber-800"
                            )}
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
              <div className="hidden sm:flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">{user}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout}
                className="text-gray-700 hover:bg-red-50 hover:text-red-700 min-h-[44px] min-w-[44px]"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Legal Records</h1>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 mr-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900 hidden sm:inline">{user}</span>
              </div>

              {/* Mobile Menu Trigger */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="min-h-[44px] min-w-[44px]">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <SheetHeader className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <UserCheck className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user}</p>
                          <p className="text-xs text-gray-500">Legal Professional</p>
                        </div>
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  {/* Mobile Navigation Menu */}
                  <div className="flex-1 overflow-y-auto py-4">
                    {menuSections.map((section) => (
                      <div key={section.title} className="mb-6">
                        <h3 className="mb-2 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {section.title}
                        </h3>
                        <div className="space-y-1 px-3">
                          {section.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeView === item.id;
                            return (
                              <Button
                                key={item.id}
                                variant={isActive ? "default" : "ghost"}
                                className={cn(
                                  "w-full justify-start h-12 px-3 text-sm font-medium min-h-[44px]",
                                  isActive ? 
                                    "bg-blue-600 text-white shadow-sm" : 
                                    "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                )}
                                onClick={() => handleMenuClick(item.id)}
                              >
                                <Icon className="mr-3 h-5 w-5" />
                                <span className="flex-1 text-left">{item.label}</span>
                                {item.badge && (
                                  <Badge 
                                    variant="secondary" 
                                    className={cn(
                                      "ml-2 text-xs",
                                      item.badge === 'AI' && "bg-green-100 text-green-800",
                                      item.badge === 'NEW' && "bg-blue-100 text-blue-800",
                                      item.badge === 'PRO' && "bg-amber-100 text-amber-800"
                                    )}
                                  >
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
                  <div className="border-t border-gray-200 p-3">
                    <Button
                      variant="ghost"
                      onClick={onLogout}
                      className="w-full justify-start h-12 px-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 min-h-[44px]"
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
