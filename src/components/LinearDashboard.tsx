
import React from 'react';
import { MetricCard } from '@/components/ui/metric-card';
import { StatusOverview } from '@/components/ui/status-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedTable, EnhancedTableBody, EnhancedTableCell, EnhancedTableHead, EnhancedTableHeader, EnhancedTableRow } from '@/components/ui/enhanced-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Clock, 
  TrendingUp,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export function LinearDashboard() {
  const recentActivities = [
    { id: 1, patient: "Sarah Johnson", action: "Medical Record Updated", time: "2 minutes ago", status: "completed" },
    { id: 2, patient: "Mike Chen", action: "Appointment Scheduled", time: "15 minutes ago", status: "pending" },
    { id: 3, patient: "Emma Wilson", action: "Denial Review", time: "1 hour ago", status: "warning" },
    { id: 4, patient: "David Brown", action: "Document Generated", time: "2 hours ago", status: "completed" },
    { id: 5, patient: "Lisa Davis", action: "Record Access Failed", time: "3 hours ago", status: "failed" },
  ];

  const statusItems = [
    { status: 'completed' as const, label: 'Completed Records', count: 1247, percentage: 89 },
    { status: 'pending' as const, label: 'Pending Reviews', count: 112, percentage: 8 },
    { status: 'failed' as const, label: 'Requires Attention', count: 42, percentage: 3 },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: 'default' as const, className: 'bg-success-100 text-success-800 border-success-200' },
      pending: { variant: 'secondary' as const, className: 'bg-warning-100 text-warning-800 border-warning-200' },
      warning: { variant: 'secondary' as const, className: 'bg-warning-100 text-warning-800 border-warning-200' },
      failed: { variant: 'destructive' as const, className: '' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Dashboard</h1>
          <p className="text-primary-500 mt-1">Welcome back! Here's what's happening with your practice.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Patient
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Patients"
          value="1,247"
          trendValue="+12%"
          trend="up"
          description="from last month"
          icon={Users}
          color="blue"
          className="animate-slide-up"
          style={{ animationDelay: '100ms' }}
        />
        <MetricCard
          title="Records Processed"
          value="2,834"
          trendValue="+8%"
          trend="up"
          description="this week"
          icon={FileText}
          color="green"
          className="animate-slide-up"
          style={{ animationDelay: '200ms' }}
        />
        <MetricCard
          title="Pending Reviews"
          value="112"
          trendValue="-5%"
          trend="down"
          description="from yesterday"
          icon={Clock}
          color="amber"
          className="animate-slide-up"
          style={{ animationDelay: '300ms' }}
        />
        <MetricCard
          title="Success Rate"
          value="94.2%"
          trendValue="+2%"
          trend="up"
          description="accuracy"
          icon={TrendingUp}
          color="green"
          className="animate-slide-up"
          style={{ animationDelay: '400ms' }}
        />
      </div>

      {/* Status Overview and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatusOverview
          title="Record Status Overview"
          items={statusItems}
          className="animate-slide-up"
          style={{ animationDelay: '500ms' }}
        />
        
        <Card className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-primary-900">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <EnhancedTable>
              <EnhancedTableHeader sticky>
                <EnhancedTableRow>
                  <EnhancedTableHead>Patient</EnhancedTableHead>
                  <EnhancedTableHead>Action</EnhancedTableHead>
                  <EnhancedTableHead>Status</EnhancedTableHead>
                  <EnhancedTableHead>Time</EnhancedTableHead>
                  <EnhancedTableHead className="w-12"></EnhancedTableHead>
                </EnhancedTableRow>
              </EnhancedTableHeader>
              <EnhancedTableBody>
                {recentActivities.map((activity, index) => {
                  const statusConfig = getStatusBadge(activity.status);
                  return (
                    <EnhancedTableRow 
                      key={activity.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${700 + (index * 100)}ms` }}
                    >
                      <EnhancedTableCell className="font-medium">
                        {activity.patient}
                      </EnhancedTableCell>
                      <EnhancedTableCell>{activity.action}</EnhancedTableCell>
                      <EnhancedTableCell>
                        <Badge variant={statusConfig.variant} className={statusConfig.className}>
                          {activity.status}
                        </Badge>
                      </EnhancedTableCell>
                      <EnhancedTableCell className="text-primary-500">
                        {activity.time}
                      </EnhancedTableCell>
                      <EnhancedTableCell>
                        <Button variant="ghost" size="sm" className="p-1">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </EnhancedTableCell>
                    </EnhancedTableRow>
                  );
                })}
              </EnhancedTableBody>
            </EnhancedTable>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="animate-slide-up" style={{ animationDelay: '1200ms' }}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="secondary" className="h-16 flex-col gap-2 hover:scale-105 transition-transform duration-200">
              <Calendar className="h-5 w-5" />
              <span>Schedule Appointment</span>
            </Button>
            <Button variant="secondary" className="h-16 flex-col gap-2 hover:scale-105 transition-transform duration-200">
              <FileText className="h-5 w-5" />
              <span>Generate Report</span>
            </Button>
            <Button variant="secondary" className="h-16 flex-col gap-2 hover:scale-105 transition-transform duration-200">
              <AlertTriangle className="h-5 w-5" />
              <span>Review Denials</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
