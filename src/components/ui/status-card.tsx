
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';

interface StatusItemProps {
  status: 'completed' | 'pending' | 'failed' | 'warning';
  label: string;
  count?: number;
  percentage?: number;
}

export function StatusItem({ status, label, count, percentage }: StatusItemProps) {
  const statusConfig = {
    completed: { 
      color: 'bg-success-500', 
      icon: CheckCircle, 
      textColor: 'text-success-700',
      bgColor: 'bg-success-50'
    },
    pending: { 
      color: 'bg-warning-500', 
      icon: Clock, 
      textColor: 'text-warning-700',
      bgColor: 'bg-warning-50'
    },
    failed: { 
      color: 'bg-error-500', 
      icon: XCircle, 
      textColor: 'text-error-700',
      bgColor: 'bg-error-50'
    },
    warning: { 
      color: 'bg-warning-500', 
      icon: AlertTriangle, 
      textColor: 'text-warning-700',
      bgColor: 'bg-warning-50'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-primary-50 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className={cn('w-2 h-2 rounded-full', config.color)} aria-hidden="true" />
          <Icon className={cn('h-4 w-4', config.textColor)} aria-hidden="true" />
        </div>
        <span className="text-sm font-medium text-primary-700">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {count !== undefined && (
          <Badge variant="secondary" className={cn('text-xs', config.bgColor, config.textColor)}>
            {count}
          </Badge>
        )}
        {percentage !== undefined && (
          <span className={cn('text-sm font-medium', config.textColor)}>
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
}

interface StatusOverviewProps {
  title: string;
  items: StatusItemProps[];
  className?: string;
}

export function StatusOverview({ title, items, className }: StatusOverviewProps) {
  return (
    <Card className={cn('bg-primary border-primary-200', className)}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">{title}</h3>
        <div className="space-y-2">
          {items.map((item, index) => (
            <StatusItem key={index} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
