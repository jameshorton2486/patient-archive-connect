
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon,
  Clock,
  AlertTriangle,
  CheckCircle,
  Bell,
  TrendingUp,
  Users,
  FileText,
  Settings
} from 'lucide-react';
import { 
  FollowUpRequest, 
  ProviderType, 
  PROVIDER_DEADLINE_RULES,
  CalendarEvent,
  ReminderSent
} from '@/types/document';
import { deadlineService } from '@/services/deadlineService';

interface DeadlineManagementProps {
  onBack?: () => void;
}

// Mock data for demonstration
const mockFollowUpRequests: FollowUpRequest[] = [
  {
    id: 'req_001',
    originalDocumentId: 'doc_001',
    clientId: 'client_001',
    providerId: 'provider_001',
    deadlineDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    remindersSent: [],
    currentStatus: 'pending',
    manualIntervention: false,
    notes: [],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'req_002',
    originalDocumentId: 'doc_002',
    clientId: 'client_002',
    providerId: 'provider_002',
    deadlineDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days overdue
    remindersSent: [
      {
        id: 'rem_001',
        followUpRequestId: 'req_002',
        reminderType: 'courtesy',
        sentDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        documentId: 'doc_rem_001',
        deliveryMethod: 'email',
        delivered: true,
        responseReceived: false
      }
    ],
    currentStatus: 'overdue',
    manualIntervention: true,
    notes: ['Provider contacted by phone', 'Awaiting response'],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const mockProviderTypes: Record<string, ProviderType> = {
  'provider_001': 'hospital',
  'provider_002': 'private-practice',
  'provider_003': 'imaging-center'
};

const mockClients = {
  'client_001': { name: 'John Smith', caseId: '2025-SMITH-001' },
  'client_002': { name: 'Jane Doe', caseId: '2025-DOE-002' }
};

const mockProviders = {
  'provider_001': { name: 'Regional Medical Center', type: 'hospital' },
  'provider_002': { name: 'Dr. Sarah Johnson', type: 'private-practice' },
  'provider_003': { name: 'Advanced Imaging Center', type: 'imaging-center' }
};

export function DeadlineManagement({ onBack }: DeadlineManagementProps) {
  const [followUpRequests, setFollowUpRequests] = useState<FollowUpRequest[]>(mockFollowUpRequests);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calendar' | 'rules' | 'analytics'>('dashboard');

  useEffect(() => {
    // Process scheduled reminders and create calendar events
    const { reminders, events } = deadlineService.processScheduledReminders(
      followUpRequests,
      mockProviderTypes
    );
    setCalendarEvents(events);
  }, [followUpRequests]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'responded':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'escalated':
        return <Bell className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      'pending': 'secondary',
      'responded': 'default',
      'overdue': 'destructive',
      'escalated': 'destructive'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status.toUpperCase()}</Badge>;
  };

  const overdueRequests = deadlineService.getOverdueRequests(followUpRequests);
  const dueReminders = deadlineService.getDueReminders(followUpRequests, 'hospital');
  const metrics = deadlineService.calculateSuccessMetrics(followUpRequests);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{metrics.totalRequests}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-500">{overdueRequests.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-green-500">{metrics.successRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">{metrics.averageResponseTime.toFixed(0)} days</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Follow-ups */}
      <Card>
        <CardHeader>
          <CardTitle>Active Follow-up Requests</CardTitle>
          <CardDescription>Current status of medical records requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {followUpRequests.map((request) => {
              const client = mockClients[request.clientId as keyof typeof mockClients];
              const provider = mockProviders[request.providerId as keyof typeof mockProviders];
              const daysRemaining = Math.ceil(
                (new Date(request.deadlineDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(request.currentStatus)}
                    <div>
                      <p className="font-medium">{client?.name} - {client?.caseId}</p>
                      <p className="text-sm text-muted-foreground">
                        Provider: {provider?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {daysRemaining >= 0 ? `${daysRemaining} days remaining` : `${Math.abs(daysRemaining)} days overdue`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(request.currentStatus)}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCalendar = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Deadline Calendar</CardTitle>
          <CardDescription>View upcoming deadlines and reminders</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Events</CardTitle>
          <CardDescription>Scheduled reminders and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {calendarEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center gap-3 p-3 border rounded">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                </div>
                <Badge variant="outline">{event.type}</Badge>
              </div>
            ))}
            {calendarEvents.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No events scheduled for today
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRules = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Provider Deadline Rules</CardTitle>
          <CardDescription>Automated deadline and reminder schedules by provider type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(PROVIDER_DEADLINE_RULES).map(([type, rule]) => (
              <div key={type} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium capitalize">{type.replace('-', ' ')}</h3>
                  <Badge>{rule.standardDeadlineDays} days</Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Reminder Schedule:</h4>
                  {rule.reminderSchedule.map((reminder, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>Day {reminder.dayOffset}: {reminder.description}</span>
                      <Badge variant="outline">{reminder.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
          <CardDescription>Follow-up and response rate analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Response Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Requests:</span>
                  <span className="font-medium">{metrics.totalRequests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Responded:</span>
                  <span className="font-medium text-green-600">{metrics.responded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Overdue:</span>
                  <span className="font-medium text-red-600">{metrics.overdue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Success Rate:</span>
                  <span className="font-medium">{metrics.successRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg Response Time:</span>
                  <span className="font-medium">{metrics.averageResponseTime.toFixed(0)} days</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Provider Performance</h3>
              <div className="space-y-2">
                {Object.entries(mockProviders).map(([id, provider]) => (
                  <div key={id} className="flex justify-between items-center">
                    <span className="text-sm">{provider.name}</span>
                    <Badge variant="outline">{provider.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {onBack && (
        <Button onClick={onBack} variant="outline" className="mb-4">
          ← Back to Dashboard
        </Button>
      )}

      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Deadline Management</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: FileText },
          { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
          { id: 'rules', label: 'Rules', icon: Settings },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(id as any)}
            className="flex items-center gap-2"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'calendar' && renderCalendar()}
      {activeTab === 'rules' && renderRules()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
}
