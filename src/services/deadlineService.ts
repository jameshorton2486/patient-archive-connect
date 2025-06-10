
import { FollowUpRequest, ProviderDeadlineRule, PROVIDER_DEADLINE_RULES, CalendarEvent, ReminderSent } from '@/types/document';

class DeadlineService {
  async calculateDeadlines(providerId: string, providerType: string, requestDate: string): Promise<{
    expectedResponseDate: string;
    reminderDates: string[];
    escalationDates: string[];
  }> {
    const rules = PROVIDER_DEADLINE_RULES[providerType] || PROVIDER_DEADLINE_RULES.physician;
    const requestDateTime = new Date(requestDate);
    
    const expectedResponseDate = new Date(requestDateTime);
    expectedResponseDate.setDate(expectedResponseDate.getDate() + rules.standardDays);
    
    const reminderDates = rules.reminderSchedule.map(days => {
      const reminderDate = new Date(requestDateTime);
      reminderDate.setDate(reminderDate.getDate() + days);
      return reminderDate.toISOString();
    });
    
    const escalationDates = rules.escalationDays.map(days => {
      const escalationDate = new Date(requestDateTime);
      escalationDate.setDate(escalationDate.getDate() + days);
      return escalationDate.toISOString();
    });
    
    return {
      expectedResponseDate: expectedResponseDate.toISOString(),
      reminderDates,
      escalationDates
    };
  }

  async getOverdueRequests(): Promise<FollowUpRequest[]> {
    // Mock implementation - in real app, this would query the database
    const today = new Date().toISOString();
    
    return [
      {
        id: 'follow_001',
        requestId: 'req_001',
        type: 'reminder',
        scheduledDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        sent: false,
        currentStatus: 'overdue',
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        deadlineDate: today,
        remindersSent: 0
      }
    ];
  }

  async createFollowUpSchedule(requestId: string, providerType: string): Promise<FollowUpRequest[]> {
    const rules = PROVIDER_DEADLINE_RULES[providerType] || PROVIDER_DEADLINE_RULES.physician;
    const now = new Date();
    
    return rules.reminderSchedule.map((days, index) => {
      const scheduledDate = new Date(now);
      scheduledDate.setDate(scheduledDate.getDate() + days);
      
      return {
        id: `follow_${requestId}_${index}`,
        requestId,
        type: 'reminder' as const,
        scheduledDate: scheduledDate.toISOString(),
        sent: false,
        currentStatus: 'pending' as const,
        createdAt: now.toISOString(),
        remindersSent: 0
      };
    });
  }

  async updateDeadlineStatus(requestId: string, status: string): Promise<void> {
    console.log(`Updating deadline status for request ${requestId} to ${status}`);
    // Implementation would update database
  }

  async getUpcomingDeadlines(days: number = 7): Promise<CalendarEvent[]> {
    const now = new Date();
    const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
    
    // Mock data - in real app, this would query the database
    return [
      {
        id: 'event_001',
        title: 'Follow-up reminder due',
        date: new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000)).toISOString(),
        type: 'follow_up',
        requestId: 'req_001',
        priority: 'medium',
        completed: false,
        description: 'Send follow-up reminder to provider'
      },
      {
        id: 'event_002',
        title: 'Response deadline',
        date: new Date(now.getTime() + (5 * 24 * 60 * 60 * 1000)).toISOString(),
        type: 'deadline',
        requestId: 'req_002',
        priority: 'high',
        completed: false,
        description: 'Expected response date from provider'
      }
    ];
  }

  async sendReminder(followUpId: string, method: 'email' | 'fax' | 'mail' | 'phone'): Promise<ReminderSent> {
    const rules = PROVIDER_DEADLINE_RULES.physician;
    
    if (rules.reminderSchedule.some) {
      console.log(`Sending reminder via ${method}`);
    }
    
    return {
      id: `reminder_${followUpId}`,
      requestId: followUpId,
      reminderType: 'follow_up',
      sentAt: new Date().toISOString(),
      method,
      followUpRequestId: followUpId
    };
  }
}

export const deadlineService = new DeadlineService();
