
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  type: 'deadline' | 'follow_up' | 'escalation';
  caseId: string;
  assignedTo?: string;
}

export function DeadlineManagement() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'overdue' | 'completed'>('all');

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockDeadlines: Deadline[] = [
      {
        id: '1',
        title: 'HIPAA Authorization Follow-up',
        description: 'Follow up on pending HIPAA authorization from Regional Medical Center',
        dueDate: '2024-01-15',
        priority: 'high',
        status: 'pending',
        type: 'follow_up',
        caseId: 'case-123'
      },
      {
        id: '2',
        title: 'Medical Records Request Deadline',
        description: 'Submit medical records request to Springfield Hospital',
        dueDate: '2024-01-20',
        priority: 'urgent',
        status: 'in_progress',
        type: 'deadline',
        caseId: 'case-124'
      }
    ];
    setDeadlines(mockDeadlines);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const filteredDeadlines = deadlines.filter(deadline => {
    if (filter === 'all') return true;
    return deadline.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Deadline Management</h1>
        <div className="flex gap-2">
          {['all', 'pending', 'overdue', 'completed'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType as any)}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredDeadlines.map((deadline) => (
          <Card key={deadline.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getStatusIcon(deadline.status)}
                    {deadline.title}
                  </CardTitle>
                  <CardDescription>{deadline.description}</CardDescription>
                </div>
                <Badge className={getPriorityColor(deadline.priority)}>
                  {deadline.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Due: {new Date(deadline.dueDate).toLocaleDateString()}
                  </div>
                  <div>Case: {deadline.caseId}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm">
                    Mark Complete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDeadlines.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No deadlines found for the selected filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
