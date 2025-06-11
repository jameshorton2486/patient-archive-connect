
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

  const activeView = location.pathname.replace('/', '') || 'dashboard';

  const handleViewChange = (view: string) => {
    navigate(`/${view}`);
  };

  return (
    <div className="min-h-screen flex w-full bg-light-background transition-colors duration-200">
      <LinearSidebar
        activeView={activeView}
        onViewChange={handleViewChange}
        user={user}
        onLogout={onLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex flex-col flex-1 min-h-screen overflow-hidden bg-light-background">
        <LinearHeader
          activeView={activeView}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex-1 bg-light-background overflow-auto">
          <div className="container-healthcare responsive-padding min-h-full">
            <div className="animate-in fade-in-0 duration-300">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
