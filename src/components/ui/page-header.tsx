
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from './breadcrumbs';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, breadcrumb, children }: PageHeaderProps) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      
      <div className="space-y-4 mb-8">
        <Breadcrumbs current={breadcrumb} />
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">
              {breadcrumb || title}
            </h1>
            {description && (
              <p className="text-[var(--text-secondary)] mt-1">{description}</p>
            )}
          </div>
          {children && (
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              {children}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
