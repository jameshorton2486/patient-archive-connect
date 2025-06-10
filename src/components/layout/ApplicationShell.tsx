
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinearSidebar } from './LinearSidebar';
import { LinearHeader } from './LinearHeader';

interface ApplicationShellProps {
  children: React.ReactNode;
  user: string;
  onLogout: () => void;
}

export function ApplicationShell({ children, user, onLogout }: ApplicationShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the active view from the current route
  const activeView = location.pathname.replace('/', '') || 'dashboard';

  const handleViewChange = (view: string) => {
    navigate(`/${view}`);
  };

  return (
    <div className="min-h-screen flex w-full bg-light-canvas transition-colors duration-200">
      {/* Linear Sidebar - Fixed width with responsive behavior */}
      <LinearSidebar
        activeView={activeView}
        onViewChange={handleViewChange}
        user={user}
        onLogout={onLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area - Responsive layout */}
      <div className="flex flex-col flex-1 min-h-screen overflow-hidden bg-light-canvas">
        {/* Linear Header - Fixed height with responsive padding */}
        <LinearHeader
          activeView={activeView}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content with responsive container */}
        <main className="flex-1 bg-light-canvas overflow-auto">
          <div className="container-linear responsive-padding min-h-full">
            <div className="animate-linear-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
