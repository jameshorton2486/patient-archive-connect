
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";

interface TopNavProps {
  activeView: string;
  onViewChange: (view: any) => void;
  user: string;
  onLogout: () => void;
}

export function TopNav({ activeView, onViewChange, user, onLogout }: TopNavProps) {
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
    <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Legal Records</h1>
        </div>
      </div>

      {/* User Info and Menu */}
      <div className="flex items-center space-x-4">
        {/* User Info */}
        <div className="hidden sm:flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
            <UserCheck className="h-4 w-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-900">{user}</span>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center px-6 py-4 border-b border-gray-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user}</p>
                  <p className="text-xs text-gray-500">Legal Professional</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4">
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
                              "w-full justify-start h-10 px-3 text-sm font-medium",
                              isActive ? 
                                "bg-blue-600 text-white shadow-sm" : 
                                "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            )}
                            onClick={() => handleMenuClick(item.id)}
                          >
                            <Icon className="mr-3 h-4 w-4" />
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
              </nav>

              {/* Logout */}
              <div className="border-t border-gray-200 p-3">
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="w-full justify-start h-10 px-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
