
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
    <div className="min-h-screen flex w-full bg-background" data-theme="light">
      {/* Linear Sidebar - Fixed 256px width */}
      <LinearSidebar
        activeView={activeView}
        onViewChange={onViewChange}
        user={user}
        onLogout={onLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area - Inverted L Layout */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Linear Header - Fixed 56px height */}
        <LinearHeader
          activeView={activeView}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content with Linear constraints */}
        <main className="flex-1 bg-background overflow-auto">
          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
