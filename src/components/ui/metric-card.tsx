
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  trendValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'amber' | 'red';
  className?: string;
  style?: React.CSSProperties;
}

export function MetricCard({ 
  title, 
  value, 
  trendValue, 
  trend = 'neutral', 
  description, 
  icon: Icon, 
  color = 'blue',
  className,
  style
}: MetricCardProps) {
  const colorClasses = {
    blue: 'text-accent-medical bg-blue-50 border-blue-200',
    green: 'text-success-600 bg-success-50 border-success-200',
    amber: 'text-warning-600 bg-warning-50 border-warning-200',
    red: 'text-error-600 bg-error-50 border-error-200'
  };

  return (
    <Card className={cn('hover:shadow-lg transition-shadow duration-200', className)} style={style}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-primary-500 mb-1">{title}</p>
            <p className="text-3xl font-bold text-primary-900">{value}</p>
            {trendValue && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' && <TrendingUp className="h-3 w-3 text-success-600" aria-hidden="true" />}
                {trend === 'down' && <TrendingDown className="h-3 w-3 text-error-600" aria-hidden="true" />}
                <span className={cn(
                  "text-sm font-medium",
                  trend === 'up' && 'text-success-600',
                  trend === 'down' && 'text-error-600',
                  trend === 'neutral' && 'text-primary-500'
                )}>
                  {trendValue}
                </span>
                {description && (
                  <span className="text-sm text-primary-400 ml-1">{description}</span>
                )}
              </div>
            )}
          </div>
          <div className={cn(
            'flex h-12 w-12 items-center justify-center rounded-lg border',
            colorClasses[color]
          )}>
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
