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

console.log('LinearDashboard.tsx: Component file loaded');

export function LinearDashboard() {
  console.log('LinearDashboard.tsx: Rendering LinearDashboard component');

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

  const upcomingDeadlines = [
    { id: 1, task: "Medical records deadline", client: "Springfield Hospital - Case #2024-003", time: "Due in 1 day", status: "urgent" },
    { id: 2, task: "Client appointment", client: "Sarah Wilson - Follow-up consultation", time: "Tomorrow 2:00 PM", status: "scheduled" },
    { id: 3, task: "Case review meeting", client: "Team review - Case #2024-001", time: "Friday 10:00 AM", status: "pending" },
    { id: 4, task: "Insurance follow-up", client: "Aetna - Authorization required", time: "Next Monday", status: "pending" },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: 'default' as const, className: 'bg-success-100 text-success-800 border-success-200' },
      pending: { variant: 'secondary' as const, className: 'bg-warning-100 text-warning-800 border-warning-200' },
      warning: { variant: 'secondary' as const, className: 'bg-warning-100 text-warning-800 border-warning-200' },
      failed: { variant: 'destructive' as const, className: 'bg-error-100 text-error-800 border-error-200' },
      urgent: { variant: 'destructive' as const, className: 'bg-error-100 text-error-800 border-error-200' },
      scheduled: { variant: 'default' as const, className: 'bg-info-100 text-info-800 border-info-200' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  try {
    return (
      <div className="max-w-7xl mx-auto p-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary-900 tracking-tight">Dashboard</h1>
            <p className="text-primary-500 mt-2 text-lg">Welcome back! Here's what's happening with your practice.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="hover:scale-105 transition-transform duration-200">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="hover:scale-105 transition-transform duration-200 shadow-md">
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
            className="animate-slide-up shadow-lg hover:shadow-xl transition-shadow duration-300"
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
            className="animate-slide-up shadow-lg hover:shadow-xl transition-shadow duration-300"
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
            className="animate-slide-up shadow-lg hover:shadow-xl transition-shadow duration-300"
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
            className="animate-slide-up shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{ animationDelay: '400ms' }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Status Overview */}
          <div className="xl:col-span-1">
            <StatusOverview
              title="Record Status Overview"
              items={statusItems}
              className="animate-slide-up shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: '500ms' }}
            />
          </div>
          
          {/* Recent Activity */}
          <div className="xl:col-span-2">
            <Card className="animate-slide-up shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '600ms' }}>
              <CardHeader className="flex flex-row items-center justify-between border-b border-primary-200">
                <div>
                  <CardTitle className="text-xl font-semibold text-primary-900">Recent Activity</CardTitle>
                  <p className="text-sm text-primary-500 mt-1">Latest updates and actions</p>
                </div>
                <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
                  <Search className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <EnhancedTable>
                  <EnhancedTableHeader sticky>
                    <EnhancedTableRow>
                      <EnhancedTableHead className="pl-6">Patient</EnhancedTableHead>
                      <EnhancedTableHead>Action</EnhancedTableHead>
                      <EnhancedTableHead>Status</EnhancedTableHead>
                      <EnhancedTableHead>Time</EnhancedTableHead>
                      <EnhancedTableHead className="w-12 pr-6"></EnhancedTableHead>
                    </EnhancedTableRow>
                  </EnhancedTableHeader>
                  <EnhancedTableBody>
                    {recentActivities.map((activity, index) => {
                      const statusConfig = getStatusBadge(activity.status);
                      return (
                        <EnhancedTableRow 
                          key={activity.id}
                          className="animate-fade-in hover:bg-primary-50 transition-colors duration-200"
                          style={{ animationDelay: `${700 + (index * 100)}ms` }}
                        >
                          <EnhancedTableCell className="font-medium pl-6">
                            {activity.patient}
                          </EnhancedTableCell>
                          <EnhancedTableCell className="text-primary-700">{activity.action}</EnhancedTableCell>
                          <EnhancedTableCell>
                            <Badge variant={statusConfig.variant} className={statusConfig.className}>
                              {activity.status}
                            </Badge>
                          </EnhancedTableCell>
                          <EnhancedTableCell className="text-primary-500 text-sm">
                            {activity.time}
                          </EnhancedTableCell>
                          <EnhancedTableCell className="pr-6">
                            <Button variant="ghost" size="sm" className="p-1 hover:scale-110 transition-transform duration-200">
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
        </div>

        {/* Upcoming Deadlines */}
        <Card className="animate-slide-up shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '1000ms' }}>
          <CardHeader className="border-b border-primary-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-primary-900">Upcoming Deadlines</CardTitle>
                <p className="text-sm text-primary-500 mt-1">Important dates and milestones</p>
              </div>
              <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
                <Clock className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingDeadlines.map((deadline, index) => {
                const statusConfig = getStatusBadge(deadline.status);
                return (
                  <div 
                    key={deadline.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-primary-50 border border-primary-100 hover:bg-primary-100 transition-colors duration-200 animate-fade-in"
                    style={{ animationDelay: `${1100 + (index * 100)}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary-500" />
                      <div>
                        <p className="font-medium text-primary-900">{deadline.task}</p>
                        <p className="text-sm text-primary-600">{deadline.client}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={statusConfig.variant} className={statusConfig.className}>
                        {deadline.status}
                      </Badge>
                      <p className="text-sm text-primary-500 mt-1">{deadline.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="animate-slide-up shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '1200ms' }}>
          <CardHeader className="border-b border-primary-200">
            <CardTitle className="text-xl font-semibold text-primary-900">Quick Actions</CardTitle>
            <p className="text-sm text-primary-500">Common tasks and shortcuts</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="secondary" className="h-20 flex-col gap-3 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md">
                <Calendar className="h-6 w-6" />
                <span className="font-medium">Schedule Appointment</span>
              </Button>
              <Button variant="secondary" className="h-20 flex-col gap-3 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md">
                <FileText className="h-6 w-6" />
                <span className="font-medium">Generate Report</span>
              </Button>
              <Button variant="secondary" className="h-20 flex-col gap-3 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md">
                <AlertTriangle className="h-6 w-6" />
                <span className="font-medium">Review Denials</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('LinearDashboard.tsx: Error rendering component:', error);
    return <div>Error loading dashboard</div>;
  }
}

console.log('LinearDashboard.tsx: Component defined successfully');
