
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatusItem {
  status: 'completed' | 'pending' | 'failed';
  label: string;
  count: number;
  percentage: number;
}

interface StatusOverviewProps {
  title: string;
  items: StatusItem[];
  className?: string;
  style?: React.CSSProperties;
}

export function StatusOverview({ title, items, className, style }: StatusOverviewProps) {
  const getStatusStyles = (status: string) => {
    const statusConfig = {
      completed: { dot: 'bg-green-500', text: 'text-green-600' },
      pending: { dot: 'bg-yellow-500', text: 'text-yellow-600' },
      failed: { dot: 'bg-red-500', text: 'text-red-600' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  return (
    <Card className={cn('', className)} style={style}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => {
            const styles = getStatusStyles(item.status);
            return (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('w-3 h-3 rounded-full', styles.dot)} aria-hidden="true" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{item.count}</span>
                  <span className={cn('text-xs font-medium', styles.text)}>
                    {item.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
