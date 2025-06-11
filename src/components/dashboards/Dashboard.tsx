
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
      title: 'Active Records',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Appointments Today',
      value: '89',
      change: '-4%',
      trend: 'down',
      icon: Calendar,
      color: 'amber'
    },
    {
      title: 'Pending Reviews',
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
      title: 'New patient record created',
      subtitle: 'John Doe - Medical ID: #PAT-12847',
      time: '2 minutes ago',
      status: 'success',
      icon: CheckCircle
    },
    {
      id: '2',
      title: 'Record review required',
      subtitle: 'Medical records for Case #MED-4892',
      time: '15 minutes ago',
      status: 'warning',
      icon: AlertTriangle
    },
    {
      id: '3',
      title: 'Provider information updated',
      subtitle: 'Dr. Sarah Johnson - City General Hospital',
      time: '1 hour ago',
      status: 'info',
      icon: Activity
    }
  ];

  return (
    <div className="space-y-8">
      {/* Professional Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mb-3">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`h-4 w-4 ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`} />
                      <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-muted-foreground">from last month</span>
                    </div>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted border">
                    <Icon className="h-8 w-8 text-accent" aria-hidden="true" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Professional Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription>Essential management tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 justify-start text-left">
                <Users className="h-6 w-6 mr-4 text-accent" />
                <div>
                  <div className="font-semibold text-foreground">Add Patient</div>
                  <div className="text-xs text-muted-foreground">Create new patient record</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start text-left">
                <FileText className="h-6 w-6 mr-4 text-accent" />
                <div>
                  <div className="font-semibold text-foreground">Medical Records</div>
                  <div className="text-xs text-muted-foreground">Access patient files</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start text-left">
                <Calendar className="h-6 w-6 mr-4 text-accent" />
                <div>
                  <div className="font-semibold text-foreground">Appointments</div>
                  <div className="text-xs text-muted-foreground">Schedule & manage</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start text-left">
                <Clock className="h-6 w-6 mr-4 text-accent" />
                <div>
                  <div className="font-semibold text-foreground">Urgent Reviews</div>
                  <div className="text-xs text-muted-foreground">Priority items</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Professional Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <CardDescription>Latest system updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === 'success' ? 'bg-success-light' :
                      activity.status === 'warning' ? 'bg-warning-light' :
                      'bg-muted'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        activity.status === 'success' ? 'text-success' :
                        activity.status === 'warning' ? 'text-warning' :
                        'text-accent'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground mb-1">{activity.title}</p>
                      <p className="text-sm text-muted-foreground mb-2">{activity.subtitle}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      activity.status === 'success' ? 'border-success text-success' :
                      activity.status === 'warning' ? 'border-warning text-warning' :
                      'border-accent text-accent'
                    }`}>
                      {activity.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional System Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="font-medium text-foreground">System Status: All services operational</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Last backup: 2 hours ago</span>
              <span className="hidden sm:inline">•</span>
              <span>Uptime: 99.9%</span>
              <span className="hidden sm:inline">•</span>
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
