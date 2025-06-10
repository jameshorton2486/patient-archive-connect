
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, Calendar, AlertCircle, TrendingUp, Clock, Plus, Eye, RefreshCw } from 'lucide-react';
import { MetricCard, ActivityItem, StatusBadge } from '@/components/ui/status-components';

export function Dashboard() {
  const metrics = [
    {
      title: "Active Cases",
      value: "24",
      trendValue: "+12%",
      trend: "up" as const,
      description: "2 new this week",
      icon: FileText,
      color: "blue" as const
    },
    {
      title: "Total Clients", 
      value: "156",
      trendValue: "+8%",
      trend: "up" as const,
      description: "5 new this month",
      icon: Users,
      color: "green" as const
    },
    {
      title: "Pending Requests",
      value: "12",
      trendValue: "-3%",
      trend: "down" as const,
      description: "3 due today",
      icon: Calendar,
      color: "amber" as const
    },
    {
      title: "Overdue Items",
      value: "3",
      trendValue: "+1",
      trend: "up" as const,
      description: "Requires attention",
      icon: AlertCircle,
      color: "red" as const
    }
  ];

  const recentActivity = [
    {
      title: "Medical records received",
      subtitle: "Case #2024-001 - John Smith",
      status: "success" as const,
      timestamp: "2 hours ago"
    },
    {
      title: "New client intake completed",
      subtitle: "Jane Doe - Initial consultation",
      status: "info" as const,
      timestamp: "4 hours ago"
    },
    {
      title: "Provider follow-up required",
      subtitle: "Dr. Smith's Office - Missing records",
      status: "warning" as const,
      timestamp: "6 hours ago"
    },
    {
      title: "Document generation failed",
      subtitle: "HIPAA Authorization - Template error",
      status: "error" as const,
      timestamp: "8 hours ago"
    }
  ];

  const upcomingDeadlines = [
    {
      title: "Medical records deadline",
      subtitle: "Springfield Hospital - Case #2024-003",
      status: "error" as const,
      timestamp: "Due in 1 day"
    },
    {
      title: "Client appointment",
      subtitle: "Sarah Wilson - Follow-up consultation",
      status: "info" as const,
      timestamp: "Tomorrow 2:00 PM"
    },
    {
      title: "Case review meeting",
      subtitle: "Team review - Case #2024-001",
      status: "pending" as const,
      timestamp: "Friday 10:00 AM"
    }
  ];

  const quickActions = [
    { icon: Users, label: "Add Client", action: () => console.log('Add client') },
    { icon: FileText, label: "Request Records", action: () => console.log('Request records') },
    { icon: Calendar, label: "Schedule Meeting", action: () => console.log('Schedule meeting') },
    { icon: TrendingUp, label: "View Reports", action: () => console.log('View reports') }
  ];

  return (
    <div className="container-app space-y-8">
      {/* Header Section */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your cases today.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Button variant="outline" size="sm" className="min-h-[44px] w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="min-h-[44px] w-full sm:w-auto">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
          <Button size="sm" className="btn-primary min-h-[44px] w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
        </div>
      </section>

      {/* Metrics Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              trendValue={metric.trendValue}
              trend={metric.trend}
              description={metric.description}
              icon={metric.icon}
              color={metric.color}
            />
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="card-enhanced">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <CardDescription>Latest case updates and actions</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentActivity.map((activity, index) => (
                <ActivityItem
                  key={index}
                  title={activity.title}
                  subtitle={activity.subtitle}
                  status={activity.status}
                  timestamp={activity.timestamp}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="card-enhanced">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <div>
                <CardTitle className="text-lg font-semibold">Upcoming Deadlines</CardTitle>
                <CardDescription>Important dates and milestones</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                <Clock className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {upcomingDeadlines.map((deadline, index) => (
                <ActivityItem
                  key={index}
                  title={deadline.title}
                  subtitle={deadline.subtitle}
                  status={deadline.status}
                  timestamp={deadline.timestamp}
                  icon={Calendar}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section>
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={action.action}
                    className="h-auto flex-col py-6 space-y-2 min-h-[100px] hover:bg-accent/50 transition-colors duration-200"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="font-medium">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
