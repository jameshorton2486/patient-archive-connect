
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
    <Card className={cn('hover:shadow-healthcare-hover transition-all duration-200', className)} style={style}>
      <CardContent className="responsive-padding">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-small-body font-medium text-text-secondary mb-2">{title}</p>
            <p className="text-3xl font-bold text-medical-charcoal mb-2">{value}</p>
            {trendValue && (
              <div className="flex items-center gap-2 mt-3">
                {trend === 'up' && <TrendingUp className="h-4 w-4 text-sage-green" aria-hidden="true" />}
                {trend === 'down' && <TrendingDown className="h-4 w-4 text-error-red" aria-hidden="true" />}
                <span className={cn(
                  "text-small-body font-medium",
                  trend === 'up' && 'text-sage-green',
                  trend === 'down' && 'text-error-red',
                  trend === 'neutral' && 'text-text-secondary'
                )}>
                  {trendValue}
                </span>
                {description && (
                  <span className="text-small-body text-text-secondary ml-1">{description}</span>
                )}
              </div>
            )}
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-light-background border border-clinical-gray">
            <Icon className="h-8 w-8 text-healthcare-blue" aria-hidden="true" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
