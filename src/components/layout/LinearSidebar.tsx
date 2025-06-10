
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  FileText, 
  UserPlus, 
  Stethoscope,
  UserCheck,
  FolderPlus,
  Send,
  Clock,
  Brain,
  AlertTriangle,
  Zap,
  LayoutDashboard,
  LogOut,
  Shield,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LinearSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  user: string;
  onLogout: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function LinearSidebar({ 
  activeView, 
  onViewChange, 
  user, 
  onLogout, 
  collapsed, 
  onToggleCollapse 
}: LinearSidebarProps) {
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

  return (
    <div className={cn(
      "flex flex-col bg-sidebar border-r border-sidebar-border shadow-lg transition-all duration-300 animate-fade-in",
      collapsed ? "w-16" : "w-sidebar"
    )}>
      {/* Logo/Header */}
      <div className="flex h-header items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary transition-transform duration-200 hover:scale-110">
              <FileText className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-sidebar-foreground">Legal Records</h1>
              <p className="text-xs text-sidebar-foreground/60">Management System</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="text-sidebar-foreground hover:bg-sidebar-accent p-1.5 transition-all duration-200 hover:scale-105"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="flex items-center px-4 py-4 border-b border-sidebar-border bg-sidebar-accent/50 animate-slide-up">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary/20 transition-transform duration-200 hover:scale-110">
            <UserCheck className="h-4 w-4 text-sidebar-primary" />
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user}</p>
            <p className="text-xs text-sidebar-foreground/60">Legal Professional</p>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4" role="navigation" aria-label="Main navigation">
        {menuSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-6">
            {!collapsed && (
              <h3 className="mb-2 px-4 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <div className="space-y-1 px-2">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-10 text-sm font-medium transition-all duration-200 animate-fade-in",
                      collapsed ? "px-2" : "px-3",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary/90 scale-in"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground hover:scale-105"
                    )}
                    onClick={() => onViewChange(item.id)}
                    title={collapsed ? item.label : undefined}
                    aria-current={isActive ? "page" : undefined}
                    style={{ animationDelay: `${(sectionIndex * 100) + (itemIndex * 50)}ms` }}
                  >
                    <Icon className={cn("h-4 w-4 flex-shrink-0", !collapsed && "mr-3")} aria-hidden="true" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "ml-2 text-xs h-5 px-1.5 transition-all duration-200",
                              item.badge === 'AI' && "bg-success-100 text-success-800 border-success-200",
                              item.badge === 'NEW' && "bg-info-100 text-info-800 border-info-200",
                              item.badge === 'PRO' && "bg-warning-100 text-warning-800 border-warning-200"
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          onClick={onLogout}
          className={cn(
            "w-full justify-start h-10 text-sm font-medium text-sidebar-foreground/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 hover:scale-105",
            collapsed ? "px-2" : "px-3"
          )}
          title={collapsed ? "Sign Out" : undefined}
          aria-label="Sign out of application"
        >
          <LogOut className={cn("h-4 w-4 flex-shrink-0", !collapsed && "mr-3")} aria-hidden="true" />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </div>
  );
}
