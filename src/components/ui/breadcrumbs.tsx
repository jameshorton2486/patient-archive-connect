
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES, ROUTE_META } from '@/routes';

interface BreadcrumbsProps {
  current?: string;
  className?: string;
}

export function Breadcrumbs({ current, className = '' }: BreadcrumbsProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const routeMeta = ROUTE_META[currentPath as keyof typeof ROUTE_META];
  
  const currentTitle = current || routeMeta?.breadcrumb || 'Page';

  return (
    <nav className={`flex items-center space-x-2 text-sm text-[var(--text-secondary)] ${className}`} aria-label="Breadcrumb">
      <Link 
        to={ROUTES.dashboard} 
        className="flex items-center hover:text-[var(--text-primary)] transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {currentPath !== ROUTES.dashboard && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-[var(--text-primary)]">
            {currentTitle}
          </span>
        </>
      )}
    </nav>
  );
}
