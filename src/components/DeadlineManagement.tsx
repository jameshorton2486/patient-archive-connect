
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, AlertTriangle, CheckCircle, Send, Eye } from 'lucide-react';
import { deadlineService } from '@/services/deadlineService';
import { FollowUpRequest, CalendarEvent, ReminderSent } from '@/types/document';

interface DeadlineManagementProps {
  onBack?: () => void;
}

export function DeadlineManagement({ onBack }: DeadlineManagementProps) {
  const [overdueRequests, setOverdueRequests] = useState<FollowUpRequest[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<CalendarEvent[]>([]);
  const [reminders, setReminders] = useState<ReminderSent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [overdue, upcoming] = await Promise.all([
        deadlineService.getOverdueRequests(),
        deadlineService.getUpcomingDeadlines(14)
      ]);

      setOverdueRequests(overdue);
      setUpcomingDeadlines(upcoming);

      // Mock reminders data
      setReminders([
        {
          id: 'reminder_001',
          requestId: 'req_001',
          reminderType: 'initial',
          sentAt: new Date(Date.now() - 86400000).toISOString(),
          method: 'email',
          followUpRequestId: 'follow_001'
        }
      ]);
    } catch (error) {
      console.error('Error loading deadline data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReminder = async (followUpId: string) => {
    try {
      await deadlineService.sendReminder(followUpId, 'email');
      await loadData();
    } catch (error) {
      console.error('Error sending reminder:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {onBack && (
        <Button onClick={onBack} variant="outline" className="mb-4">
          ← Back to Dashboard
        </Button>
      )}

      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Deadline Management</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{overdueRequests.length}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{upcomingDeadlines.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{reminders.length}</p>
                <p className="text-sm text-muted-foreground">Reminders Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">Response Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Overdue Requests
          </CardTitle>
          <CardDescription>
            Requests that have passed their expected response date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overdueRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">Request #{request.requestId}</p>
                    <p className="text-sm text-muted-foreground">
                      Scheduled: {new Date(request.scheduledDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Reminders sent: {request.remindersSent || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">{request.currentStatus}</Badge>
                  <Button size="sm" onClick={() => handleSendReminder(request.id)}>
                    <Send className="h-4 w-4 mr-1" />
                    Send Reminder
                  </Button>
                </div>
              </div>
            ))}
            {overdueRequests.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No overdue requests
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Upcoming Deadlines
          </CardTitle>
          <CardDescription>
            Important dates and follow-ups scheduled for the next 14 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(deadline.completed ? 'completed' : 'pending')}
                  <div>
                    <p className="font-medium">{deadline.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Due: {new Date(deadline.date).toLocaleDateString()}
                    </p>
                    {deadline.description && (
                      <p className="text-sm text-muted-foreground">
                        {deadline.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(deadline.priority)}>
                    {deadline.priority}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {upcomingDeadlines.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No upcoming deadlines
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-green-500" />
            Recent Reminders
          </CardTitle>
          <CardDescription>
            Recently sent reminders and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Send className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">
                      {reminder.reminderType.charAt(0).toUpperCase() + reminder.reminderType.slice(1)} Reminder
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sent: {new Date(reminder.sentAt).toLocaleDateString()} via {reminder.method}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Request: #{reminder.requestId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={reminder.response ? 'default' : 'secondary'}>
                    {reminder.response ? 'Responded' : 'No Response'}
                  </Badge>
                </div>
              </div>
            ))}
            {reminders.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No recent reminders
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
