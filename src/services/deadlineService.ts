
import { 
  FollowUpRequest, 
  ReminderSent, 
  CalendarEvent, 
  ProviderType, 
  PROVIDER_DEADLINE_RULES,
  ProviderDeadlineRule,
  DocumentType
} from '@/types/document';
import { documentService } from './documentService';

export class DeadlineService {
  private static instance: DeadlineService;
  
  static getInstance(): DeadlineService {
    if (!DeadlineService.instance) {
      DeadlineService.instance = new DeadlineService();
    }
    return DeadlineService.instance;
  }

  createFollowUpRequest(
    originalDocumentId: string,
    clientId: string,
    providerId: string,
    providerType: ProviderType
  ): FollowUpRequest {
    const rules = PROVIDER_DEADLINE_RULES[providerType];
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + rules.standardDeadlineDays);

    const followUpRequest: FollowUpRequest = {
      id: `followup_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      originalDocumentId,
      clientId,
      providerId,
      deadlineDate: deadlineDate.toISOString(),
      remindersSent: [],
      currentStatus: 'pending',
      manualIntervention: false,
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return followUpRequest;
  }

  calculateReminderDates(followUpRequest: FollowUpRequest, providerType: ProviderType): Date[] {
    const rules = PROVIDER_DEADLINE_RULES[providerType];
    const startDate = new Date(followUpRequest.createdAt);
    
    return rules.reminderSchedule.map(reminder => {
      const reminderDate = new Date(startDate);
      reminderDate.setDate(reminderDate.getDate() + reminder.dayOffset);
      return reminderDate;
    });
  }

  getDueReminders(followUpRequests: FollowUpRequest[], providerType: ProviderType): FollowUpRequest[] {
    const rules = PROVIDER_DEADLINE_RULES[providerType];
    const today = new Date();
    
    return followUpRequests.filter(request => {
      if (request.currentStatus !== 'pending') return false;
      
      const startDate = new Date(request.createdAt);
      
      return rules.reminderSchedule.some(reminder => {
        const reminderDate = new Date(startDate);
        reminderDate.setDate(reminderDate.getDate() + reminder.dayOffset);
        
        // Check if reminder is due today or overdue
        return reminderDate <= today && 
               !request.remindersSent.some(sent => sent.reminderType === reminder.type);
      });
    });
  }

  generateReminderDocument(
    followUpRequest: FollowUpRequest,
    reminderType: 'courtesy' | 'formal' | 'escalation' | 'final',
    clientData: any,
    providerData: any,
    firmBranding: any
  ): string {
    const templateMap: Record<string, DocumentType> = {
      'courtesy': 'follow-up-reminder',
      'formal': 'formal-follow-up',
      'escalation': 'formal-follow-up',
      'final': 'final-demand'
    };

    const templateType = templateMap[reminderType];
    const additionalData = {
      originalRequestDate: new Date(followUpRequest.createdAt).toLocaleDateString(),
      followUpDate: new Date().toLocaleDateString()
    };

    const document = documentService.generateDocument(
      templateType,
      clientData,
      providerData,
      firmBranding,
      additionalData
    );

    return document.id;
  }

  createCalendarEvent(
    followUpRequest: FollowUpRequest,
    eventType: 'deadline' | 'reminder' | 'escalation',
    date: Date,
    description: string
  ): CalendarEvent {
    return {
      id: `cal_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      title: `${eventType.toUpperCase()}: Medical Records Follow-up`,
      description,
      startDate: date.toISOString(),
      type: eventType,
      relatedRequestId: followUpRequest.id,
      attendees: [], // Would be populated with staff emails
      calendarProvider: 'internal',
      synced: false
    };
  }

  processScheduledReminders(
    followUpRequests: FollowUpRequest[],
    providerTypes: Record<string, ProviderType>
  ): { reminders: ReminderSent[], events: CalendarEvent[] } {
    const reminders: ReminderSent[] = [];
    const events: CalendarEvent[] = [];

    followUpRequests.forEach(request => {
      const providerType = providerTypes[request.providerId] || 'other';
      const rules = PROVIDER_DEADLINE_RULES[providerType];
      const startDate = new Date(request.createdAt);
      const today = new Date();

      rules.reminderSchedule.forEach(reminder => {
        const reminderDate = new Date(startDate);
        reminderDate.setDate(reminderDate.getDate() + reminder.dayOffset);

        if (reminderDate <= today && 
            !request.remindersSent.some(sent => sent.reminderType === reminder.type)) {
          
          // Create reminder
          const reminderSent: ReminderSent = {
            id: `reminder_${Date.now()}_${Math.random().toString(36).substring(2)}`,
            followUpRequestId: request.id,
            reminderType: reminder.type,
            sentDate: new Date().toISOString(),
            documentId: '', // Would be populated after document generation
            deliveryMethod: 'email', // Default method
            delivered: false,
            responseReceived: false
          };

          reminders.push(reminderSent);

          // Create calendar event
          const event = this.createCalendarEvent(
            request,
            'reminder',
            reminderDate,
            `${reminder.description} for ${request.clientId}`
          );

          events.push(event);
        }
      });

      // Check for escalation events
      rules.escalationRules.forEach(escalation => {
        const escalationDate = new Date(startDate);
        escalationDate.setDate(escalationDate.getDate() + escalation.dayOffset);

        if (escalationDate <= today && request.currentStatus === 'pending') {
          const event = this.createCalendarEvent(
            request,
            'escalation',
            escalationDate,
            `${escalation.description} - ${escalation.requiresApproval ? 'Requires Approval' : 'Auto Process'}`
          );

          events.push(event);
        }
      });
    });

    return { reminders, events };
  }

  getOverdueRequests(followUpRequests: FollowUpRequest[]): FollowUpRequest[] {
    const today = new Date();
    
    return followUpRequests.filter(request => {
      const deadline = new Date(request.deadlineDate);
      return deadline < today && request.currentStatus === 'pending';
    });
  }

  calculateSuccessMetrics(followUpRequests: FollowUpRequest[]): {
    totalRequests: number;
    responded: number;
    overdue: number;
    averageResponseTime: number;
    successRate: number;
  } {
    const total = followUpRequests.length;
    const responded = followUpRequests.filter(r => r.currentStatus === 'responded').length;
    const overdue = this.getOverdueRequests(followUpRequests).length;
    
    const responseTimes = followUpRequests
      .filter(r => r.currentStatus === 'responded')
      .map(r => {
        const created = new Date(r.createdAt);
        const updated = new Date(r.updatedAt);
        return Math.floor((updated.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
      });

    const averageResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
      : 0;

    const successRate = total > 0 ? (responded / total) * 100 : 0;

    return {
      totalRequests: total,
      responded,
      overdue,
      averageResponseTime,
      successRate
    };
  }
}

export const deadlineService = DeadlineService.getInstance();
