
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
      completed: { variant: 'success' as const },
      pending: { variant: 'secondary' as const },
      warning: { variant: 'warning' as const },
      failed: { variant: 'destructive' as const },
      urgent: { variant: 'destructive' as const },
      scheduled: { variant: 'info' as const }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  try {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
                Patient Archive Connect
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                Welcome back! Here's what's happening with your practice.
              </p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Patients"
              value="1,247"
              trendValue="+12%"
              trend="up"
              description="from last month"
              icon={Users}
              color="blue"
            />
            <MetricCard
              title="Records Processed"
              value="2,834"
              trendValue="+8%"
              trend="up"
              description="this week"
              icon={FileText}
              color="green"
            />
            <MetricCard
              title="Pending Reviews"
              value="112"
              trendValue="-5%"
              trend="down"
              description="from yesterday"
              icon={Clock}
              color="amber"
            />
            <MetricCard
              title="Success Rate"
              value="94.2%"
              trendValue="+2%"
              trend="up"
              description="accuracy"
              icon={TrendingUp}
              color="green"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1">
              <StatusOverview
                title="Record Status Overview"
                items={statusItems}
              />
            </div>
            
            <div className="xl:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-foreground">Recent Activity</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Latest updates and actions</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <EnhancedTable>
                    <EnhancedTableHeader>
                      <EnhancedTableRow>
                        <EnhancedTableHead className="pl-6">Patient</EnhancedTableHead>
                        <EnhancedTableHead>Action</EnhancedTableHead>
                        <EnhancedTableHead>Status</EnhancedTableHead>
                        <EnhancedTableHead>Time</EnhancedTableHead>
                        <EnhancedTableHead className="w-12 pr-6"></EnhancedTableHead>
                      </EnhancedTableRow>
                    </EnhancedTableHeader>
                    <EnhancedTableBody>
                      {recentActivities.map((activity) => {
                        const statusConfig = getStatusBadge(activity.status);
                        return (
                          <EnhancedTableRow key={activity.id}>
                            <EnhancedTableCell className="font-medium pl-6 text-foreground">
                              {activity.patient}
                            </EnhancedTableCell>
                            <EnhancedTableCell className="text-muted-foreground">{activity.action}</EnhancedTableCell>
                            <EnhancedTableCell>
                              <Badge variant={statusConfig.variant}>
                                {activity.status}
                              </Badge>
                            </EnhancedTableCell>
                            <EnhancedTableCell className="text-muted-foreground text-sm">
                              {activity.time}
                            </EnhancedTableCell>
                            <EnhancedTableCell className="pr-6">
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
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-foreground">Upcoming Deadlines</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Important dates and milestones</p>
                </div>
                <Button variant="ghost" size="sm">
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
                      className="flex items-center justify-between p-4 rounded-lg bg-muted border"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-accent" />
                        <div>
                          <p className="font-medium text-foreground">{deadline.task}</p>
                          <p className="text-sm text-muted-foreground">{deadline.client}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={statusConfig.variant}>
                          {deadline.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{deadline.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Quick Actions</CardTitle>
              <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="secondary" className="h-20 flex-col gap-3">
                  <Calendar className="h-6 w-6" />
                  <span className="font-medium">Schedule Appointment</span>
                </Button>
                <Button variant="secondary" className="h-20 flex-col gap-3">
                  <FileText className="h-6 w-6" />
                  <span className="font-medium">Generate Report</span>
                </Button>
                <Button variant="secondary" className="h-20 flex-col gap-3">
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-foreground mb-2">Error Loading Dashboard</h1>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    );
  }
}

console.log('LinearDashboard.tsx: Component defined successfully');
