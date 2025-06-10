
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, Calendar, AlertCircle, TrendingUp, Clock, Plus, Eye, RefreshCw } from 'lucide-react';
import { MetricCard, ActivityItem, StatusBadge } from '@/components/ui/status-components';

export function Dashboard() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

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
    { icon: Users, label: "Add Client", description: "Create new client record", action: () => console.log('Add client') },
    { icon: FileText, label: "Request Records", description: "Send provider request", action: () => console.log('Request records') },
    { icon: Calendar, label: "Schedule Meeting", description: "Book appointment", action: () => console.log('Schedule meeting') },
    { icon: TrendingUp, label: "View Reports", description: "Analytics dashboard", action: () => console.log('View reports') }
  ];

  const filteredActivity = statusFilter 
    ? recentActivity.filter(item => item.status === statusFilter)
    : recentActivity;

  const handleStatusClick = (status: string) => {
    setStatusFilter(statusFilter === status ? null : status);
  };

  const clearFilter = () => setStatusFilter(null);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-6 lg:py-8">
      {/* Header Section */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">💼 Legal Dashboard</h1>
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

      {/* Metrics Grid - Responsive */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Main Content Grid - Responsive Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity with Status Filtering */}
        <Card className="card-enhanced border border-border">
          <CardHeader className="pb-4 border-b border-border">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  💬 Recent Case Actions
                </CardTitle>
                <CardDescription>Latest case updates and actions</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            {statusFilter && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-sm text-muted-foreground">Filtered by:</span>
                <Badge variant="outline" className="cursor-pointer" onClick={clearFilter}>
                  {statusFilter} ✕
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-1">
              {filteredActivity.map((activity, index) => (
                <div key={index} className="group">
                  <ActivityItem
                    title={activity.title}
                    subtitle={activity.subtitle}
                    status={activity.status}
                    timestamp={activity.timestamp}
                  />
                  <div className="flex gap-1 mt-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleStatusClick(activity.status)}
                      className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-accent"
                      aria-label={`Filter by ${activity.status} status`}
                    >
                      Filter by {activity.status}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="card-enhanced border border-border">
          <CardHeader className="pb-4 border-b border-border">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  📅 Upcoming Legal Deadlines
                </CardTitle>
                <CardDescription>Important dates and milestones</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                <Clock className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
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

      {/* Quick Actions - Enhanced Card Structure */}
      <section>
        <Card className="card-enhanced border border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg font-semibold">⚡ Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts to streamline your workflow</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={action.action}
                    className="h-auto flex-col py-6 px-4 space-y-3 min-h-[120px] hover:bg-accent/50 hover:shadow-lg transition-all duration-200 border border-border"
                    aria-label={action.description}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-sm">{action.label}</span>
                      <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                    </div>
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
