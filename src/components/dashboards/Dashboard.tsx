
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Users, Calendar, AlertCircle, TrendingUp, Clock, CheckCircle, Plus } from 'lucide-react';

export function Dashboard() {
  const metrics = [
    {
      title: "Active Cases",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Clients", 
      value: "156",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Pending Requests",
      value: "12",
      change: "-3%",
      trend: "down",
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Overdue Items",
      value: "3",
      change: "+1",
      trend: "up",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  const recentActivity = [
    {
      title: "Medical records received",
      subtitle: "Case #2024-001",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
      time: "2 hours ago"
    },
    {
      title: "New client intake",
      subtitle: "John Doe",
      status: "Processing",
      statusColor: "bg-blue-100 text-blue-800",
      time: "4 hours ago"
    },
    {
      title: "Provider follow-up sent",
      subtitle: "Dr. Smith's Office",
      status: "Sent",
      statusColor: "bg-gray-100 text-gray-800",
      time: "6 hours ago"
    }
  ];

  const upcomingDeadlines = [
    {
      title: "Medical records deadline",
      subtitle: "Due in 3 days",
      status: "Urgent",
      statusColor: "bg-red-100 text-red-800",
      date: "Mar 15"
    },
    {
      title: "Client appointment",
      subtitle: "Tomorrow 2:00 PM",
      status: "Scheduled",
      statusColor: "bg-blue-100 text-blue-800",
      date: "Mar 12"
    },
    {
      title: "Case review meeting",
      subtitle: "Friday 10:00 AM",
      status: "Meeting",
      statusColor: "bg-purple-100 text-purple-800",
      date: "Mar 14"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your cases today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                      <span className={`text-xs font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <CardDescription>Latest case updates and actions</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                      <CheckCircle className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={activity.statusColor} variant="secondary">
                      {activity.status}
                    </Badge>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Upcoming Deadlines</CardTitle>
                <CardDescription>Important dates and milestones</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                      <p className="text-xs text-gray-500">{deadline.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={deadline.statusColor} variant="secondary">
                      {deadline.status}
                    </Badge>
                    <span className="text-xs font-medium text-gray-900">{deadline.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col py-6 space-y-2">
              <Users className="h-6 w-6" />
              <span>Add Client</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-6 space-y-2">
              <FileText className="h-6 w-6" />
              <span>Request Records</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-6 space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Meeting</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-6 space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
