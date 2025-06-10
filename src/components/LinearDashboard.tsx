
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle,
  Activity,
  ArrowRight
} from 'lucide-react';

export function LinearDashboard() {
  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Dr. Johnson. Here's what's happening with your practice today.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Patients</p>
                <p className="text-3xl font-bold text-foreground">1,247</p>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-success-600 mr-1" />
                  <span className="text-success-600 font-medium">+12%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Records Processed</p>
                <p className="text-3xl font-bold text-foreground">2,841</p>
                <div className="flex items-center mt-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success-600 mr-1" />
                  <span className="text-success-600 font-medium">89%</span>
                  <span className="text-muted-foreground ml-1">completion rate</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <p className="text-3xl font-bold text-foreground">47</p>
                <div className="flex items-center mt-2 text-sm">
                  <Clock className="h-4 w-4 text-warning-600 mr-1" />
                  <span className="text-warning-600 font-medium">-8%</span>
                  <span className="text-muted-foreground ml-1">from yesterday</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue Impact</p>
                <p className="text-3xl font-bold text-foreground">$127K</p>
                <div className="flex items-center mt-2 text-sm">
                  <DollarSign className="h-4 w-4 text-success-600 mr-1" />
                  <span className="text-success-600 font-medium">+24%</span>
                  <span className="text-muted-foreground ml-1">this quarter</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your practice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Record request completed</p>
                  <p className="text-xs text-muted-foreground">Patient: John Smith</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">2m ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">New denial received</p>
                  <p className="text-xs text-muted-foreground">Provider: Regional Medical</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">5m ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Document pending review</p>
                  <p className="text-xs text-muted-foreground">Case: CASE-2024-001</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">12m ago</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Action Required
            </CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-orange-200 bg-orange-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-orange-800">3 denials need response</p>
                <p className="text-xs text-orange-600">Due within 48 hours</p>
              </div>
              <Button size="sm" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-100">
                Review
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-800">Medical records pending</p>
                <p className="text-xs text-blue-600">5 requests awaiting completion</p>
              </div>
              <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
                Process
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">Weekly report ready</p>
                <p className="text-xs text-green-600">Performance analytics available</p>
              </div>
              <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-100">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current operational status of all systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 bg-success-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Record Processing</p>
                <p className="text-xs text-muted-foreground">Operational • 99.9% uptime</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 bg-success-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">AI Services</p>
                <p className="text-xs text-muted-foreground">Operational • Processing normally</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 bg-warning-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">External Integrations</p>
                <p className="text-xs text-muted-foreground">Degraded • Some delays expected</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
