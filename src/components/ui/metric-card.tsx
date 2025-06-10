
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
  return (
    <Card className={cn('hover:shadow-md transition-shadow duration-200', className)} style={style}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {trendValue && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' && <TrendingUp className="h-3 w-3 text-green-600" aria-hidden="true" />}
                {trend === 'down' && <TrendingDown className="h-3 w-3 text-red-600" aria-hidden="true" />}
                <span className={cn(
                  "text-sm font-medium",
                  trend === 'up' && 'text-green-600',
                  trend === 'down' && 'text-red-600',
                  trend === 'neutral' && 'text-muted-foreground'
                )}>
                  {trendValue}
                </span>
                {description && (
                  <span className="text-sm text-muted-foreground ml-1">{description}</span>
                )}
              </div>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
