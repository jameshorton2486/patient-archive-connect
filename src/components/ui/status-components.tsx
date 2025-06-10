
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
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    green: 'text-green-600 bg-green-50 border-green-200',
    amber: 'text-amber-600 bg-amber-50 border-amber-200',
    red: 'text-red-600 bg-red-50 border-red-200'
  };

  return (
    <Card className="card-enhanced hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={cn(
                "text-xs font-medium",
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              )}>
                {trendValue}
              </span>
              <span className="text-xs text-muted-foreground ml-1">{description}</span>
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
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <StatusBadge status={status} />
        <span className="text-xs text-muted-foreground">{timestamp}</span>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
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
    success: { variant: 'default' as const, className: 'bg-green-100 text-green-800 border-green-200' },
    info: { variant: 'default' as const, className: 'bg-blue-100 text-blue-800 border-blue-200' },
    warning: { variant: 'default' as const, className: 'bg-amber-100 text-amber-800 border-amber-200' },
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
