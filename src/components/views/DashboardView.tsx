
import React from 'react';
import { Dashboard } from '@/components/dashboards/Dashboard';
import { PageHeader } from '@/components/ui/page-header';
import { ROUTE_META, ROUTES } from '@/routes';

export function DashboardView() {
  const meta = ROUTE_META[ROUTES.dashboard];
  
  return (
    <>
      <PageHeader 
        title={meta.title}
        description={meta.description}
        breadcrumb={meta.breadcrumb}
      />
      <Dashboard />
    </>
  );
}
