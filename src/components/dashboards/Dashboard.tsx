
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Calendar, 
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Patients',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Documents',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Pending Appointments',
      value: '89',
      change: '-4%',
      trend: 'down',
      icon: Calendar,
      color: 'amber'
    },
    {
      title: 'Overdue Items',
      value: '23',
      change: '+2%',
      trend: 'up',
      icon: Clock,
      color: 'red'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      title: 'New patient record added',
      subtitle: 'John Doe - ID: #12847',
      time: '2 min ago',
      status: 'success',
      icon: CheckCircle
    },
    {
      id: '2',
      title: 'Document deadline approaching',
      subtitle: 'Medical records for Case #4892',
      time: '15 min ago',
      status: 'warning',
      icon: AlertTriangle
    },
    {
      id: '3',
      title: 'Provider information updated',
      subtitle: 'Dr. Sarah Johnson - Springfield Hospital',
      time: '1 hour ago',
      status: 'info',
      icon: Activity
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="card-linear animate-linear-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)] mb-2">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`h-3 w-3 ${stat.trend === 'up' ? 'text-[var(--success)]' : 'text-[var(--error)]'}`} />
                      <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">from last month</span>
                    </div>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg border transition-all duration-200 ${
                    stat.color === 'blue' ? 'text-[var(--accent-medical)] bg-[var(--bg-secondary)] border-[var(--border-primary)]' :
                    stat.color === 'green' ? 'text-[var(--success)] bg-[var(--bg-secondary)] border-[var(--border-primary)]' :
                    stat.color === 'amber' ? 'text-[var(--warning)] bg-[var(--bg-secondary)] border-[var(--border-primary)]' :
                    'text-[var(--error)] bg-[var(--bg-secondary)] border-[var(--border-primary)]'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="card-linear">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[var(--text-primary)]">Quick Actions</CardTitle>
            <CardDescription className="text-[var(--text-secondary)]">
              Frequently used features and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-auto p-4 justify-start transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Users className="h-5 w-5 mr-3 text-[var(--accent-medical)]" />
                <div className="text-left">
                  <div className="font-medium">Add Patient</div>
                  <div className="text-xs text-[var(--text-muted)]">Create new record</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 justify-start transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <FileText className="h-5 w-5 mr-3 text-[var(--success)]" />
                <div className="text-left">
                  <div className="font-medium">Generate Document</div>
                  <div className="text-xs text-[var(--text-muted)]">Create new document</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 justify-start transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Calendar className="h-5 w-5 mr-3 text-[var(--warning)]" />
                <div className="text-left">
                  <div className="font-medium">Schedule</div>
                  <div className="text-xs text-[var(--text-muted)]">Manage appointments</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 justify-start transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Clock className="h-5 w-5 mr-3 text-[var(--error)]" />
                <div className="text-left">
                  <div className="font-medium">View Deadlines</div>
                  <div className="text-xs text-[var(--text-muted)]">Check urgent items</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-linear">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[var(--text-primary)]">Recent Activity</CardTitle>
            <CardDescription className="text-[var(--text-secondary)]">
              Latest updates and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div 
                    key={activity.id} 
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-all duration-200 animate-linear-slide-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.status === 'success' ? 'bg-[var(--success)]/10 text-[var(--success)]' :
                      activity.status === 'warning' ? 'bg-[var(--warning)]/10 text-[var(--warning)]' :
                      'bg-[var(--accent-medical)]/10 text-[var(--accent-medical)]'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] mb-1">{activity.title}</p>
                      <p className="text-xs text-[var(--text-secondary)] mb-1">{activity.subtitle}</p>
                      <p className="text-xs text-[var(--text-muted)]">{activity.time}</p>
                    </div>
                    <Badge 
                      variant={activity.status === 'success' ? 'default' : activity.status === 'warning' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status Bar */}
      <Card className="card-linear">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[var(--text-primary)]">System Status: All services operational</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
              <span>Last backup: 2 hours ago</span>
              <span>•</span>
              <span>Uptime: 99.9%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
