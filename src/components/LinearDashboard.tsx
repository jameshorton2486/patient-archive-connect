
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
      completed: { variant: 'default' as const, className: 'bg-success text-white border-success' },
      pending: { variant: 'secondary' as const, className: 'bg-warning text-warning-foreground border-warning' },
      warning: { variant: 'secondary' as const, className: 'bg-warning text-warning-foreground border-warning' },
      failed: { variant: 'destructive' as const, className: 'bg-error text-white border-error' },
      urgent: { variant: 'destructive' as const, className: 'bg-error text-white border-error' },
      scheduled: { variant: 'default' as const, className: 'bg-info text-white border-info' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  try {
    return (
      <div className="min-h-screen bg-light-canvas font-sans">
        <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-h1 text-medical-charcoal tracking-tight mb-2">
                Patient Archive Connect
              </h1>
              <p className="text-body-large text-neutral-600 font-medium">
                Welcome back! Here's what's happening with your practice.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" className="bg-neutral-100 text-medical-charcoal border-neutral-200 hover:bg-neutral-200 transition-all duration-200">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-healthcare-blue text-white hover:bg-healthcare-blue/90 shadow-md transition-all duration-200">
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
              className="bg-pure-white border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
            />
            <MetricCard
              title="Records Processed"
              value="2,834"
              trendValue="+8%"
              trend="up"
              description="this week"
              icon={FileText}
              color="green"
              className="bg-pure-white border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
            />
            <MetricCard
              title="Pending Reviews"
              value="112"
              trendValue="-5%"
              trend="down"
              description="from yesterday"
              icon={Clock}
              color="amber"
              className="bg-pure-white border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
            />
            <MetricCard
              title="Success Rate"
              value="94.2%"
              trendValue="+2%"
              trend="up"
              description="accuracy"
              icon={TrendingUp}
              color="green"
              className="bg-pure-white border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Status Overview */}
            <div className="xl:col-span-1">
              <StatusOverview
                title="Record Status Overview"
                items={statusItems}
                className="bg-pure-white border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
              />
            </div>
            
            {/* Recent Activity */}
            <div className="xl:col-span-2">
              <Card className="bg-pure-white border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="border-b border-neutral-200 pb-4">
                  <div className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-h4 text-medical-charcoal">Recent Activity</CardTitle>
                      <p className="text-body-small text-neutral-500 mt-1">Latest updates and actions</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-medical-charcoal hover:bg-neutral-100">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <EnhancedTable>
                    <EnhancedTableHeader>
                      <EnhancedTableRow className="border-b border-neutral-200">
                        <EnhancedTableHead className="pl-6 text-neutral-700 font-medium">Patient</EnhancedTableHead>
                        <EnhancedTableHead className="text-neutral-700 font-medium">Action</EnhancedTableHead>
                        <EnhancedTableHead className="text-neutral-700 font-medium">Status</EnhancedTableHead>
                        <EnhancedTableHead className="text-neutral-700 font-medium">Time</EnhancedTableHead>
                        <EnhancedTableHead className="w-12 pr-6"></EnhancedTableHead>
                      </EnhancedTableRow>
                    </EnhancedTableHeader>
                    <EnhancedTableBody>
                      {recentActivities.map((activity) => {
                        const statusConfig = getStatusBadge(activity.status);
                        return (
                          <EnhancedTableRow 
                            key={activity.id}
                            className="border-b border-neutral-100 hover:bg-light-canvas transition-colors duration-200"
                          >
                            <EnhancedTableCell className="font-medium pl-6 text-medical-charcoal">
                              {activity.patient}
                            </EnhancedTableCell>
                            <EnhancedTableCell className="text-neutral-700">{activity.action}</EnhancedTableCell>
                            <EnhancedTableCell>
                              <Badge variant={statusConfig.variant} className={statusConfig.className}>
                                {activity.status}
                              </Badge>
                            </EnhancedTableCell>
                            <EnhancedTableCell className="text-neutral-500 text-body-small">
                              {activity.time}
                            </EnhancedTableCell>
                            <EnhancedTableCell className="pr-6">
                              <Button variant="ghost" size="sm" className="p-1 text-neutral-400 hover:text-medical-charcoal">
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
          <Card className="bg-pure-white border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="border-b border-neutral-200 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-h4 text-medical-charcoal">Upcoming Deadlines</CardTitle>
                  <p className="text-body-small text-neutral-500 mt-1">Important dates and milestones</p>
                </div>
                <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-medical-charcoal hover:bg-neutral-100">
                  <Clock className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingDeadlines.map((deadline) => {
                  const statusConfig = getStatusBadge(deadline.status);
                  return (
                    <div 
                      key={deadline.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-light-canvas border border-neutral-200 hover:border-neutral-300 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-healthcare-blue" />
                        <div>
                          <p className="font-medium text-medical-charcoal">{deadline.task}</p>
                          <p className="text-body-small text-neutral-600">{deadline.client}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={statusConfig.variant} className={statusConfig.className}>
                          {deadline.status}
                        </Badge>
                        <p className="text-body-small text-neutral-500 mt-1">{deadline.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-pure-white border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="border-b border-neutral-200 pb-4">
              <CardTitle className="text-h4 text-medical-charcoal">Quick Actions</CardTitle>
              <p className="text-body-small text-neutral-500">Common tasks and shortcuts</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="secondary" className="h-20 flex-col gap-3 bg-neutral-100 text-medical-charcoal border-neutral-200 hover:bg-neutral-200 transition-all duration-200">
                  <Calendar className="h-6 w-6" />
                  <span className="font-medium">Schedule Appointment</span>
                </Button>
                <Button variant="secondary" className="h-20 flex-col gap-3 bg-neutral-100 text-medical-charcoal border-neutral-200 hover:bg-neutral-200 transition-all duration-200">
                  <FileText className="h-6 w-6" />
                  <span className="font-medium">Generate Report</span>
                </Button>
                <Button variant="secondary" className="h-20 flex-col gap-3 bg-neutral-100 text-medical-charcoal border-neutral-200 hover:bg-neutral-200 transition-all duration-200">
                  <AlertTriangle className="h-6 w-6" />
                  <span className="font-medium">Review Denials</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LinearDashboard.tsx: Error rendering component:', error);
    return (
      <div className="min-h-screen bg-light-canvas flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h3 text-medical-charcoal mb-2">Error Loading Dashboard</h1>
          <p className="text-body-default text-neutral-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }
}

console.log('LinearDashboard.tsx: Component defined successfully');
