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
  ChevronRight,
  Palette
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
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'design-system', label: 'Design System', icon: Palette, badge: 'PREVIEW' }
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
      "flex flex-col bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] shadow-sm transition-all duration-300 sticky top-0 h-screen",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo/Header - Linear Style */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
        {!collapsed && (
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-medical)] transition-transform duration-200 hover:scale-110">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-[var(--text-primary)]">Legal Records</h1>
              <p className="text-xs text-[var(--text-secondary)]">Management System</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] p-1.5 transition-all duration-200 hover:scale-105"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info - Linear Style */}
      {!collapsed && (
        <div className="flex items-center px-4 py-4 border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)] animate-slide-up">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-medical)]/20 transition-transform duration-200 hover:scale-110">
            <UserCheck className="h-4 w-4 text-[var(--accent-medical)]" />
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user}</p>
            <p className="text-xs text-[var(--text-secondary)]">Legal Professional</p>
          </div>
        </div>
      )}
      
      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto py-4" role="navigation" aria-label="Main navigation">
        {menuSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-6">
            {!collapsed && (
              <h3 className="mb-2 px-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
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
                      "w-full justify-start text-sm font-medium transition-all duration-200 animate-fade-in",
                      collapsed ? "px-2 py-2" : "px-4 py-2",
                      isActive
                        ? "bg-[var(--accent-medical)]/10 text-[var(--accent-medical)] rounded-md"
                        : "text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
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
                              item.badge === 'AI' && "bg-green-100 text-green-800 border-green-200",
                              item.badge === 'NEW' && "bg-blue-100 text-blue-800 border-blue-200",
                              item.badge === 'PRO' && "bg-amber-100 text-amber-800 border-amber-200",
                              item.badge === 'PREVIEW' && "bg-purple-100 text-purple-800 border-purple-200"
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
      <div className="border-t border-[var(--border-primary)] p-2">
        <Button
          variant="ghost"
          onClick={onLogout}
          className={cn(
            "w-full justify-start text-sm font-medium text-[var(--text-secondary)] hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 hover:scale-105",
            collapsed ? "px-2 py-2" : "px-4 py-2"
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
