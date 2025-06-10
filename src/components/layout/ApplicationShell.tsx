
import React, { useState } from 'react';
import { LinearSidebar } from './LinearSidebar';
import { LinearHeader } from './LinearHeader';

interface ApplicationShellProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
  user: string;
  onLogout: () => void;
}

export function ApplicationShell({ 
  children, 
  activeView, 
  onViewChange, 
  user, 
  onLogout 
}: ApplicationShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-tertiary" data-theme="light">
      {/* Left Sidebar */}
      <LinearSidebar
        activeView={activeView}
        onViewChange={onViewChange}
        user={user}
        onLogout={onLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Top Header Bar */}
        <LinearHeader
          activeView={activeView}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-tertiary overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
