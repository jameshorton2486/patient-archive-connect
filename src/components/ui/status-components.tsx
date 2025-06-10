import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  trendValue: string;
  trend: 'up' | 'down';
  description: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'amber' | 'red';
}

export function MetricCard({ 
  title, 
  value, 
  trendValue, 
  trend, 
  description, 
  icon: Icon, 
  color 
}: MetricCardProps) {
  const colorClasses = {
    blue: 'text-[var(--accent-medical)] bg-[var(--bg-secondary)] border-[var(--border-primary)]',
    green: 'text-[var(--success)] bg-[var(--bg-secondary)] border-[var(--border-primary)]',
    amber: 'text-[var(--warning)] bg-[var(--bg-secondary)] border-[var(--border-primary)]',
    red: 'text-[var(--error)] bg-[var(--bg-secondary)] border-[var(--border-primary)]'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--text-secondary)]">{title}</p>
            <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{value}</p>
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-[var(--success)]" />
              ) : (
                <TrendingDown className="h-3 w-3 text-[var(--error)]" />
              )}
              <span className={cn(
                "text-xs font-medium",
                trend === 'up' ? 'text-[var(--success)]' : 'text-[var(--error)]'
              )}>
                {trendValue}
              </span>
              <span className="text-xs text-[var(--text-muted)] ml-1">{description}</span>
            </div>
          </div>
          <div className={cn(
            'flex h-12 w-12 items-center justify-center rounded-lg border',
            colorClasses[color]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ActivityItemProps {
  title: string;
  subtitle: string;
  status: 'success' | 'info' | 'warning' | 'error' | 'pending';
  timestamp: string;
  icon?: LucideIcon;
}

export function ActivityItem({ 
  title, 
  subtitle, 
  status, 
  timestamp, 
  icon: Icon 
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors duration-200">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text-primary)] truncate">{title}</p>
        <p className="text-xs text-[var(--text-secondary)] truncate">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <StatusBadge status={status} />
        <span className="text-xs text-[var(--text-muted)]">{timestamp}</span>
        {Icon && <Icon className="h-4 w-4 text-[var(--text-muted)]" />}
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  status: 'success' | 'info' | 'warning' | 'error' | 'pending';
  children?: React.ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const statusConfig = {
    success: { variant: 'success' as const, className: '' },
    info: { variant: 'default' as const, className: '' },
    warning: { variant: 'warning' as const, className: '' },
    error: { variant: 'destructive' as const, className: '' },
    pending: { variant: 'secondary' as const, className: '' }
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={config.className}>
      {children || status}
    </Badge>
  );
}
