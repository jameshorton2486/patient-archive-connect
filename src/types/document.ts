export interface DocumentTemplate {
  id: string;
  type: DocumentType;
  name: string;
  description: string;
  template: string;
  requiredFields: string[];
  stateSpecific?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedDocument {
  id: string;
  templateId: string;
  type: DocumentType;
  clientId: string;
  providerId?: string;
  content: string;
  qrCode: string;
  trackingId: string;
  status: DocumentStatus;
  signatureRequired: boolean;
  signedAt?: string;
  createdAt: string;
  expiresAt?: string;
}

export type DocumentType = 
  | 'hipaa-authorization'
  | 'affidavit-notarization'
  | 'records-request'
  | 'follow-up-reminder'
  | 'formal-follow-up'
  | 'fee-payment'
  | 'final-demand'
  | 'denial-response-fee'
  | 'denial-response-auth';

export type DocumentStatus = 
  | 'draft'
  | 'generated'
  | 'sent'
  | 'signed'
  | 'expired'
  | 'cancelled';

export interface FirmBranding {
  firmName: string;
  logo?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  fax?: string;
  email: string;
  website?: string;
  primaryColor: string;
  secondaryColor: string;
  letterheadTemplate: string;
}

export interface QRCodeData {
  trackingId: string;
  clientId: string;
  providerId?: string;
  documentType: DocumentType;
  generatedDate: string;
  caseId: string;
}

export interface DeliveryMethod {
  id: string;
  name: string;
  type: 'usps' | 'fax' | 'email' | 'portal';
  cost: number;
  estimatedDeliveryTime: string;
  reliabilityScore: number;
  hipaaCompliant: boolean;
  enabled: boolean;
}

export interface DeliveryAttempt {
  id: string;
  documentId: string;
  methodId: string;
  providerId: string;
  status: 'pending' | 'sending' | 'delivered' | 'failed' | 'bounced';
  trackingNumber?: string;
  sentAt: string;
  deliveredAt?: string;
  failureReason?: string;
  cost: number;
  confirmationReceived: boolean;
  retryCount: number;
  maxRetries: number;
}

export interface DeliveryTracking {
  documentId: string;
  attempts: DeliveryAttempt[];
  totalCost: number;
  successfulDelivery: boolean;
  bestMethod?: string;
  responseReceived: boolean;
  responseDate?: string;
}

// Deadline Management Types
export interface ProviderDeadlineRule {
  id: string;
  providerType: ProviderType;
  standardDeadlineDays: number;
  reminderSchedule: ReminderSchedule[];
  escalationRules: EscalationRule[];
  autoEscalation: boolean;
}

export interface ReminderSchedule {
  dayOffset: number;
  type: 'courtesy' | 'formal' | 'escalation' | 'final';
  templateType: DocumentType;
  description: string;
}

export interface EscalationRule {
  dayOffset: number;
  action: 'reminder' | 'escalation' | 'manual_intervention' | 'final_demand';
  requiresApproval: boolean;
  notifyStaff: boolean;
  description: string;
}

export interface FollowUpRequest {
  id: string;
  originalDocumentId: string;
  clientId: string;
  providerId: string;
  deadlineDate: string;
  remindersSent: ReminderSent[];
  currentStatus: 'pending' | 'responded' | 'overdue' | 'escalated' | 'closed';
  manualIntervention: boolean;
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ReminderSent {
  id: string;
  followUpRequestId: string;
  reminderType: 'courtesy' | 'formal' | 'escalation' | 'final';
  sentDate: string;
  documentId: string;
  deliveryMethod: string;
  delivered: boolean;
  responseReceived: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  type: 'deadline' | 'reminder' | 'escalation' | 'meeting';
  relatedRequestId?: string;
  attendees: string[];
  calendarProvider: 'google' | 'outlook' | 'internal';
  synced: boolean;
}

export type ProviderType = 
  | 'hospital'
  | 'private-practice'
  | 'imaging-center'
  | 'physical-therapy'
  | 'emergency-room'
  | 'specialist'
  | 'laboratory'
  | 'pharmacy'
  | 'other';

export const PROVIDER_DEADLINE_RULES: Record<ProviderType, ProviderDeadlineRule> = {
  'hospital': {
    id: 'hospital_rule',
    providerType: 'hospital',
    standardDeadlineDays: 30,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', templateType: 'follow-up-reminder', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', templateType: 'formal-follow-up', description: 'First formal follow-up' },
      { dayOffset: 30, type: 'escalation', templateType: 'formal-follow-up', description: 'Escalation notice' },
      { dayOffset: 45, type: 'final', templateType: 'final-demand', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 45, action: 'manual_intervention', requiresApproval: true, notifyStaff: true, description: 'Manual intervention required' },
      { dayOffset: 60, action: 'final_demand', requiresApproval: true, notifyStaff: true, description: 'Final demand processing' }
    ],
    autoEscalation: true
  },
  'private-practice': {
    id: 'private_rule',
    providerType: 'private-practice',
    standardDeadlineDays: 14,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', templateType: 'follow-up-reminder', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', templateType: 'formal-follow-up', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', templateType: 'formal-follow-up', description: 'Escalation notice' },
      { dayOffset: 30, type: 'final', templateType: 'final-demand', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 30, action: 'manual_intervention', requiresApproval: true, notifyStaff: true, description: 'Manual intervention required' },
      { dayOffset: 45, action: 'final_demand', requiresApproval: true, notifyStaff: true, description: 'Final demand processing' }
    ],
    autoEscalation: true
  },
  'imaging-center': {
    id: 'imaging_rule',
    providerType: 'imaging-center',
    standardDeadlineDays: 21,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', templateType: 'follow-up-reminder', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', templateType: 'formal-follow-up', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', templateType: 'formal-follow-up', description: 'Escalation notice' },
      { dayOffset: 35, type: 'final', templateType: 'final-demand', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 35, action: 'manual_intervention', requiresApproval: true, notifyStaff: true, description: 'Manual intervention required' },
      { dayOffset: 50, action: 'final_demand', requiresApproval: true, notifyStaff: true, description: 'Final demand processing' }
    ],
    autoEscalation: true
  },
  'physical-therapy': {
    id: 'pt_rule',
    providerType: 'physical-therapy',
    standardDeadlineDays: 14,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', templateType: 'follow-up-reminder', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', templateType: 'formal-follow-up', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', templateType: 'formal-follow-up', description: 'Escalation notice' },
      { dayOffset: 30, type: 'final', templateType: 'final-demand', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 30, action: 'manual_intervention', requiresApproval: true, notifyStaff: true, description: 'Manual intervention required' },
      { dayOffset: 45, action: 'final_demand', requiresApproval: true, notifyStaff: true, description: 'Final demand processing' }
    ],
    autoEscalation: true
  },
  'emergency-room': {
    id: 'er_rule',
    providerType: 'emergency-room',
    standardDeadlineDays: 45,
    reminderSchedule: [
      { dayOffset: 14, type: 'courtesy', templateType: 'follow-up-reminder', description: 'Courtesy reminder' },
      { dayOffset: 30, type: 'formal', templateType: 'formal-follow-up', description: 'First formal follow-up' },
      { dayOffset: 45, type: 'escalation', templateType: 'formal-follow-up', description: 'Escalation notice' },
      { dayOffset: 60, type: 'final', templateType: 'final-demand', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 60, action: 'manual_intervention', requiresApproval: true, notifyStaff: true, description: 'Manual intervention required' },
      { dayOffset: 75, action: 'final_demand', requiresApproval: true, notifyStaff: true, description: 'Final demand processing' }
    ],
    autoEscalation: true
  },
  'specialist': {
    id: 'specialist_rule',
    providerType: 'specialist',
    standardDeadlineDays: 21,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', templateType: 'follow-up-reminder', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', templateType: 'formal-follow-up', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', templateType: 'formal-follow-up', description: 'Escalation notice' },
      { dayOffset: 35, type: 'final', templateType: 'final-demand', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 35, action: 'manual_intervention', requiresApproval: true, notifyStaff: true, description: 'Manual intervention required' },
      { dayOffset: 50, action: 'final_demand', requiresApproval: true, notifyStaff: true, description: 'Final demand processing' }
    ],
    autoEscalation: true
  },
  'laboratory': {
    id: 'lab_rule',
    providerType: 'laboratory',
    standardDeadlineDays: 14,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', templateType: 'follow-up-reminder', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', templateType: 'formal-follow-up', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', templateType: 'formal-follow-up', description: 'Escalation notice' },
      { dayOffset: 30, type: 'final', templateType: 'final-demand', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 30, action: 'manual_intervention', requiresApproval: true, notifyStaff: true, description: 'Manual intervention required' },
      { dayOffset: 45, action: 'final_demand', requiresApproval: true, notifyStaff: true, description: 'Final demand processing' }
    ],
    autoEscalation: true
  },
  'pharmacy': {
    id: 'pharmacy_rule',
    providerType: 'pharmacy',
    standardDeadlineDays: 14,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', templateType: 'follow-up-reminder', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', templateType: 'formal-follow-up', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', templateType: 'formal-follow-up', description: 'Escalation notice' },
      { dayOffset: 30, type: 'final', templateType: 'final-demand', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 30, action: 'manual_intervention', requiresApproval: true, notifyStaff: true, description: 'Manual intervention required' },
      { dayOffset: 45, action: 'final_demand', requiresApproval: true, notifyStaff: true, description: 'Final demand processing' }
    ],
    autoEscalation: true
  },
  'other': {
    id: 'other_rule',
    providerType: 'other',
    standardDeadlineDays: 21,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', templateType: 'follow-up-reminder', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', templateType: 'formal-follow-up', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', templateType: 'formal-follow-up', description: 'Escalation notice' },
      { dayOffset: 35, type: 'final', templateType: 'final-demand', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 35, action: 'manual_intervention', requiresApproval: true, notifyStaff: true, description: 'Manual intervention required' },
      { dayOffset: 50, action: 'final_demand', requiresApproval: true, notifyStaff: true, description: 'Final demand processing' }
    ],
    autoEscalation: true
  }
};
