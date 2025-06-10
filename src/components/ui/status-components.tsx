
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
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
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border">
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
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors duration-200">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
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
    success: { variant: 'default' as const },
    info: { variant: 'secondary' as const },
    warning: { variant: 'secondary' as const },
    error: { variant: 'destructive' as const },
    pending: { variant: 'outline' as const }
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {children || status}
    </Badge>
  );
}
