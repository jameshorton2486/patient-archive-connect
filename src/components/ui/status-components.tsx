
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  AlertTriangle,
  Info,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'pending' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'success':
        return 'badge-success';
      case 'warning':
        return 'badge-warning';
      case 'error':
        return 'badge-error';
      case 'info':
        return 'badge-info';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-3 w-3" />;
      case 'warning':
        return <AlertTriangle className="h-3 w-3" />;
      case 'error':
        return <XCircle className="h-3 w-3" />;
      case 'info':
        return <Info className="h-3 w-3" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Badge className={cn(getStatusClasses(status), 'flex items-center gap-1 font-medium', className)}>
      {getStatusIcon(status)}
      {children}
    </Badge>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  description, 
  trend, 
  trendValue,
  icon: Icon, 
  color = 'blue',
  className 
}: MetricCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          iconBg: 'bg-green-50',
          iconColor: 'text-green-600',
          accent: 'border-green-200'
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-50',
          iconColor: 'text-amber-600',
          accent: 'border-amber-200'
        };
      case 'red':
        return {
          iconBg: 'bg-red-50',
          iconColor: 'text-red-600',
          accent: 'border-red-200'
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-50',
          iconColor: 'text-purple-600',
          accent: 'border-purple-200'
        };
      default:
        return {
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-600',
          accent: 'border-blue-200'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-muted-foreground';
  };

  return (
    <Card className={cn('card-enhanced hover:shadow-lg transition-all duration-200', colorClasses.accent, className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">{value}</p>
              {trendValue && (
                <span className={cn('text-sm font-medium flex items-center gap-1', getTrendColor())}>
                  {getTrendIcon()}
                  {trendValue}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', colorClasses.iconBg)}>
            <Icon className={cn('h-6 w-6', colorClasses.iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ActivityItemProps {
  title: string;
  subtitle?: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info' | 'pending';
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function ActivityItem({ 
  title, 
  subtitle, 
  timestamp, 
  status, 
  icon: Icon = CheckCircle,
  className 
}: ActivityItemProps) {
  return (
    <div className={cn('flex items-center gap-3 py-3 border-b border-border last:border-0', className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted flex-shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <StatusBadge status={status} className="text-xs">
          {status === 'success' ? 'Completed' : 
           status === 'pending' ? 'Pending' : 
           status === 'error' ? 'Failed' : 
           status === 'warning' ? 'Warning' : 'Info'}
        </StatusBadge>
        <span className="text-xs text-muted-foreground whitespace-nowrap">{timestamp}</span>
      </div>
    </div>
  );
}
