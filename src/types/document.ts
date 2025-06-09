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

export const DOCUMENT_TEMPLATES: Record<DocumentType, string> = {
  'hipaa-authorization': `
HIPAA AUTHORIZATION FOR RELEASE OF MEDICAL INFORMATION

Patient Name: {{clientName}}
Date of Birth: {{clientDOB}}
Patient Address: {{clientAddress}}

To: {{providerName}}
{{providerAddress}}

I, {{clientName}}, hereby authorize {{firmName}} to obtain copies of my medical records from {{providerName}} for the period from {{startDate}} to {{endDate}}.

This authorization includes:
• All medical records, reports, and documentation
• X-rays, MRIs, CT scans, and other imaging
• Laboratory and pathology reports
• Treatment notes and discharge summaries

This authorization expires on {{expirationDate}}.

Patient Signature: ______________________ Date: __________

Tracking ID: {{trackingId}}
`,
  'affidavit-notarization': `
AFFIDAVIT OF {{clientName}}

State of {{state}}
County of {{county}}

I, {{clientName}}, being duly sworn, depose and say:

1. I am over the age of 18 and competent to make this affidavit.
2. On {{incidentDate}}, I sustained injuries in {{incidentType}}.
3. As a result of said incident, I have incurred medical expenses and suffered pain and suffering.
4. The facts stated herein are true and correct to the best of my knowledge.

{{clientName}}

Sworn to before me this _____ day of _______, 2025.

_____________________
Notary Public

Tracking ID: {{trackingId}}
`,
  'records-request': `
{{firmLetterhead}}

{{date}}

{{providerName}}
Medical Records Department
{{providerAddress}}

Re: Request for Medical Records
Patient: {{clientName}}
Date of Birth: {{clientDOB}}
Date of Loss: {{incidentDate}}

Dear Medical Records Administrator:

We represent {{clientName}} in connection with injuries sustained on {{incidentDate}}. Please provide us with copies of all medical records for the above-named patient from {{startDate}} to {{endDate}}.

An executed HIPAA authorization is enclosed. Please forward the records to our office at your earliest convenience.

If you have any questions, please contact our office at {{firmPhone}}.

Sincerely,

{{attorneyName}}
{{firmName}}

Tracking ID: {{trackingId}}
`,
  'follow-up-reminder': `
{{firmLetterhead}}

{{date}}

{{providerName}}
Medical Records Department
{{providerAddress}}

Re: Courtesy Reminder - Medical Records Request
Patient: {{clientName}}
Our Previous Request: {{originalRequestDate}}

Dear Records Department:

This is a courtesy reminder regarding our medical records request dated {{originalRequestDate}} for {{clientName}}.

We have not yet received the requested records. Please forward them at your earliest convenience to avoid any delays in our client's case.

Thank you for your prompt attention to this matter.

Sincerely,

{{firmName}}

Original Tracking ID: {{trackingId}}
`,
  'formal-follow-up': `
{{firmLetterhead}}

{{date}}

{{providerName}}
Medical Records Department
{{providerAddress}}

Re: FORMAL FOLLOW-UP - Medical Records Request
Patient: {{clientName}}
Original Request Date: {{originalRequestDate}}

Dear Medical Records Administrator:

We previously requested medical records for {{clientName}} on {{originalRequestDate}}. Despite our courtesy reminder, we have not received the requested documentation.

Please be advised that {{state}} law requires healthcare providers to respond to medical records requests within {{responseTimeFrame}} days. We respectfully request immediate compliance with our original request.

Failure to respond may result in formal legal action to compel production of these records.

We appreciate your immediate attention to this matter.

Sincerely,

{{attorneyName}}
{{firmName}}

Original Tracking ID: {{trackingId}}
`,
  'fee-payment': `
{{firmLetterhead}}

{{date}}

{{providerName}}
Medical Records Department
{{providerAddress}}

Re: Payment for Medical Records
Patient: {{clientName}}
Invoice Amount: ${{feeAmount}}

Dear Billing Department:

Please find enclosed payment in the amount of ${{feeAmount}} for medical records requested for {{clientName}}.

Please process our records request upon receipt of this payment and forward the documentation to our office.

If you have any questions regarding this payment, please contact our office immediately.

Thank you,

{{firmName}}

Payment Reference: {{trackingId}}
`,
  'final-demand': `
{{firmLetterhead}}

{{date}}

{{providerName}}
ATTN: Medical Records Department
{{providerAddress}}

Re: FINAL DEMAND - Medical Records Request
Patient: {{clientName}}
Original Request Date: {{originalRequestDate}}

Dear Provider:

This constitutes our FINAL DEMAND for medical records for {{clientName}} originally requested on {{originalRequestDate}}.

You have failed to respond to our previous requests dated {{originalRequestDate}} and {{followUpDate}}. This failure to comply with lawful requests may constitute a violation of {{state}} medical records laws.

You have FIVE (5) BUSINESS DAYS from receipt of this letter to provide the requested records. Failure to comply will result in formal legal proceedings against your facility.

We trust you will give this matter your immediate attention.

Very truly yours,

{{attorneyName}}
{{firmName}}

FINAL DEMAND - Tracking ID: {{trackingId}}
`,
  'denial-response-fee': `
{{firmLetterhead}}

{{date}}

{{providerName}}
Medical Records Department
{{providerAddress}}

Re: Payment for Medical Records Processing Fee
Patient: {{clientName}}
Fee Amount: ${{feeAmount}}

Dear Records Department:

We are in receipt of your notice requiring a processing fee of ${{feeAmount}} for medical records for {{clientName}}.

Please find enclosed payment in the specified amount. Upon receipt of this payment, please process our records request and forward the complete medical records to our office within {{processingTimeframe}} business days.

If you require any additional information, please contact our office immediately.

Sincerely,

{{firmName}}

Payment Reference: {{trackingId}}
`,
  'denial-response-auth': `
{{firmLetterhead}}

{{date}}

{{providerName}}
Medical Records Department
{{providerAddress}}

Re: Additional Authorization for Medical Records
Patient: {{clientName}}

Dear Records Administrator:

We are in receipt of your request for additional authorization regarding medical records for {{clientName}}.

Please find enclosed the requested documentation:
• {{authRequirements}}

This supplemental authorization should satisfy all requirements for releasing the requested medical records. Please process our request and forward the records to our office at your earliest convenience.

If you need any clarification, please contact our office immediately.

Sincerely,

{{firmName}}

Reference: {{trackingId}}
`
};
