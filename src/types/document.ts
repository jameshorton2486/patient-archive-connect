export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: DocumentType;
  content: string;
  variables: string[];
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
  status: 'generated' | 'pending-signature' | 'completed' | 'archived';
  signatureRequired: boolean;
  signedBy?: string;
  signedDate?: string;
  createdAt: string;
  expiresAt?: string;
}

export type DocumentType = 
  'records-request' | 
  'hipaa-authorization' | 
  'affidavit-notarization' |
  'follow-up-reminder' |
  'formal-follow-up' |
  'fee-payment' |
  'final-demand';

export interface QRCodeData {
  trackingId: string;
  clientId: string;
  providerId?: string;
  documentType: DocumentType;
  generatedDate: string;
  caseId?: string;
}

export interface FirmBranding {
  firmName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  fax?: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  letterheadImageUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  letterheadTemplate?: string;
}

// Follow-up and deadline management types
export interface FollowUpRequest {
  id: string;
  originalDocumentId: string;
  clientId: string;
  providerId: string;
  deadlineDate: string;
  remindersSent: ReminderSent[];
  currentStatus: 'pending' | 'responded' | 'overdue' | 'resolved';
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
  deliveryMethod: 'email' | 'fax' | 'usps' | 'portal';
  delivered: boolean;
  responseReceived: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  type: 'deadline' | 'reminder' | 'escalation';
  relatedRequestId: string;
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
  | 'other';

export interface ProviderDeadlineRule {
  providerType: ProviderType;
  standardDeadlineDays: number;
  reminderSchedule: {
    dayOffset: number;
    type: 'courtesy' | 'formal' | 'escalation' | 'final';
    description: string;
  }[];
  escalationRules: {
    dayOffset: number;
    description: string;
    requiresApproval: boolean;
  }[];
}

export const PROVIDER_DEADLINE_RULES: Record<ProviderType, ProviderDeadlineRule> = {
  'hospital': {
    providerType: 'hospital',
    standardDeadlineDays: 30,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', description: 'First formal follow-up' },
      { dayOffset: 30, type: 'escalation', description: 'Escalation notice' },
      { dayOffset: 45, type: 'final', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 45, description: 'Manual intervention required', requiresApproval: true },
      { dayOffset: 60, description: 'Consider legal action', requiresApproval: true }
    ]
  },
  'private-practice': {
    providerType: 'private-practice',
    standardDeadlineDays: 14,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', description: 'Escalation notice' },
      { dayOffset: 30, type: 'final', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 30, description: 'Manual intervention required', requiresApproval: true },
      { dayOffset: 45, description: 'Consider legal action', requiresApproval: true }
    ]
  },
  'imaging-center': {
    providerType: 'imaging-center',
    standardDeadlineDays: 21,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', description: 'Escalation notice' },
      { dayOffset: 35, type: 'final', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 35, description: 'Manual intervention required', requiresApproval: true },
      { dayOffset: 50, description: 'Consider legal action', requiresApproval: true }
    ]
  },
  'physical-therapy': {
    providerType: 'physical-therapy',
    standardDeadlineDays: 14,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', description: 'Escalation notice' },
      { dayOffset: 30, type: 'final', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 30, description: 'Manual intervention required', requiresApproval: true },
      { dayOffset: 45, description: 'Consider legal action', requiresApproval: true }
    ]
  },
  'emergency-room': {
    providerType: 'emergency-room',
    standardDeadlineDays: 45,
    reminderSchedule: [
      { dayOffset: 14, type: 'courtesy', description: 'Courtesy reminder' },
      { dayOffset: 30, type: 'formal', description: 'First formal follow-up' },
      { dayOffset: 45, type: 'escalation', description: 'Escalation notice' },
      { dayOffset: 60, type: 'final', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 60, description: 'Manual intervention required', requiresApproval: true },
      { dayOffset: 75, description: 'Consider legal action', requiresApproval: true }
    ]
  },
  'specialist': {
    providerType: 'specialist',
    standardDeadlineDays: 21,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', description: 'Escalation notice' },
      { dayOffset: 35, type: 'final', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 35, description: 'Manual intervention required', requiresApproval: true },
      { dayOffset: 50, description: 'Consider legal action', requiresApproval: true }
    ]
  },
  'other': {
    providerType: 'other',
    standardDeadlineDays: 21,
    reminderSchedule: [
      { dayOffset: 7, type: 'courtesy', description: 'Courtesy reminder' },
      { dayOffset: 14, type: 'formal', description: 'First formal follow-up' },
      { dayOffset: 21, type: 'escalation', description: 'Escalation notice' },
      { dayOffset: 35, type: 'final', description: 'Final demand' }
    ],
    escalationRules: [
      { dayOffset: 35, description: 'Manual intervention required', requiresApproval: true },
      { dayOffset: 50, description: 'Consider legal action', requiresApproval: true }
    ]
  }
};

// Delivery and distribution types
export interface DeliveryMethod {
  id: string;
  name: string;
  type: 'email' | 'fax' | 'usps' | 'portal';
  enabled: boolean;
  cost: number;
  estimatedDeliveryTime: string;
  reliabilityScore: number;
  configuration: Record<string, any>;
  hipaaCompliant?: boolean;
}

export interface DeliveryAttempt {
  id: string;
  documentId: string;
  methodId: string;
  providerId: string;
  sentAt: string;
  deliveredAt?: string;
  status: 'pending' | 'sending' | 'delivered' | 'failed';
  trackingNumber?: string;
  errorMessage?: string;
  retryCount: number;
  cost?: number;
}

export interface DeliveryTracking {
  id: string;
  deliveryAttemptId: string;
  status: string;
  timestamp: string;
  location?: string;
  notes?: string;
}

// Fixed BillingAmount interface
export interface BillingAmount {
  chargeDescription: string;
  amount: number;
  dateOfService: string;
  insurancePaid?: number;
  patientResponsibility?: number;
  confidence: number;
}

// Add the missing DOCUMENT_TEMPLATES export
export const DOCUMENT_TEMPLATES: Record<DocumentType, string> = {
  'records-request': `
MEDICAL RECORDS REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

{{firmLetterhead}}

Dear Medical Records Department,

We represent {{clientName}} (DOB: {{clientDOB}}) in connection with injuries sustained on {{incidentDate}}.

We hereby request copies of all medical records for the above-named patient for treatment received from {{startDate}} to {{endDate}}.

This request includes but is not limited to:
- Office visit notes
- Emergency department records
- Laboratory results
- Radiology reports and images
- Physical therapy notes
- Billing statements

Please provide these records within {{responseTimeFrame}} days as required by law.

Tracking ID: {{trackingId}}

Sincerely,
{{attorneyName}}
  `,
  'hipaa-authorization': `
AUTHORIZATION FOR RELEASE OF MEDICAL INFORMATION

Patient Name: {{clientName}}
Date of Birth: {{clientDOB}}
Address: {{clientAddress}}

I authorize {{providerName}} to release my medical records to:
{{firmName}}
{{firmAddress}}

Date Range: {{startDate}} to {{endDate}}
Reason: Legal representation related to incident on {{incidentDate}}

This authorization expires on: {{expirationDate}}

Patient Signature: _________________ Date: ________

Tracking ID: {{trackingId}}
  `,
  'affidavit-notarization': `
AFFIDAVIT OF RECORDS CUSTODIAN

State of {{state}}
County of {{county}}

I, the undersigned, being first duly sworn, depose and state:

1. I am the custodian of records for {{providerName}}
2. The attached records are true and accurate copies
3. These records were made in the regular course of business
4. It is the regular practice to make such records

_________________
Records Custodian

Subscribed and sworn before me this _____ day of _______, 20__

_________________
Notary Public

Tracking ID: {{trackingId}}
  `,
  'follow-up-reminder': `
MEDICAL RECORDS FOLLOW-UP REMINDER

Date: {{followUpDate}}
From: {{firmName}}
To: {{providerName}}

Re: Medical Records Request - {{clientName}} (DOB: {{clientDOB}})
Original Request Date: {{originalRequestDate}}
Tracking ID: {{trackingId}}

Dear Medical Records Department,

This is a courtesy reminder regarding our medical records request dated {{originalRequestDate}} for the above-referenced patient.

We would appreciate your prompt attention to this matter. If you have any questions or need additional information, please contact our office.

Thank you for your cooperation.

Sincerely,
{{firmName}}
  `,
  'formal-follow-up': `
FORMAL FOLLOW-UP - MEDICAL RECORDS REQUEST

Date: {{followUpDate}}
From: {{firmName}}
To: {{providerName}}

Re: SECOND REQUEST - Medical Records for {{clientName}} (DOB: {{clientDOB}})
Original Request Date: {{originalRequestDate}}
Tracking ID: {{trackingId}}

Dear Medical Records Department,

Our office previously requested medical records on {{originalRequestDate}} for the above-referenced patient. As we have not received a response, this serves as a formal follow-up request.

Please provide the requested medical records within 10 business days. If there are any issues with this request, please contact our office immediately.

Your prompt attention to this matter is appreciated.

Sincerely,
{{firmName}}
  `,
  'fee-payment': `
MEDICAL RECORDS FEE PAYMENT NOTICE

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

Re: Payment for Medical Records - {{clientName}} (DOB: {{clientDOB}})
Tracking ID: {{trackingId}}

Dear Medical Records Department,

Please find enclosed payment of ${{paymentAmount}} for the medical records request dated {{originalRequestDate}}.

Please process our request promptly upon receipt of this payment.

If you have any questions, please contact our office.

Thank you,
{{firmName}}
  `,
  'final-demand': `
FINAL DEMAND FOR MEDICAL RECORDS

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

Re: FINAL DEMAND - Medical Records for {{clientName}} (DOB: {{clientDOB}})
Original Request Date: {{originalRequestDate}}
Tracking ID: {{trackingId}}

NOTICE TO PRODUCE MEDICAL RECORDS

TO THE CUSTODIAN OF RECORDS:

YOU ARE HEREBY REQUIRED to produce the medical records requested on {{originalRequestDate}} within TEN (10) days of receipt of this notice.

Failure to comply may result in legal action to compel production of these records.

This is our final request before pursuing other legal remedies.

{{firmName}}
{{attorneyName}}, Attorney
  `
};
