export interface Client {
  id: string;
  caseNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn?: string; // Optional and should be encrypted
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insuranceInfo: {
    primaryCarrier: string;
    policyNumber: string;
    groupNumber?: string;
    memberId: string;
  };
  injuryDetails: {
    dateOfInjury: string;
    typeOfIncident: 'auto_accident' | 'slip_fall' | 'medical_malpractice' | 'workplace' | 'other';
    description: string;
    bodyPartsAffected: string[];
    policeReportNumber?: string;
  };
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'closed' | 'archived';
}

export interface Provider {
  id: string;
  npiNumber?: string;
  name: string;
  specialty: string;
  licenseNumber?: string;
  facilityName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    phone: string;
    fax?: string;
    email?: string;
    recordsContactPerson?: string;
  };
  treatmentInfo: {
    firstTreatmentDate: string;
    lastTreatmentDate?: string;
    typeOfTreatment: string;
    estimatedVisits?: number;
    estimatedRecordsCost?: number;
  };
  performanceMetrics: {
    averageResponseTime?: number;
    responseRate?: number;
    denialRate?: number;
    lastResponseDate?: string;
  };
  isValidated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecordRequest {
  id: string;
  clientId: string;
  providerId: string;
  requestDate: string;
  expectedResponseDate: string;
  deliveryMethod: 'certified_mail' | 'fax' | 'email' | 'portal';
  trackingNumber?: string;
  status: 'pending' | 'sent' | 'received' | 'denied' | 'partial' | 'expired';
  denialReason?: string;
  qrCode: string;
  documents: Document[];
  followUpHistory: FollowUpAction[];
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  requestId: string;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  documentType: DocumentType;
  aiClassification?: {
    type: string;
    confidence: number;
    extractedData: ExtractedMedicalData;
  };
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  uploadedAt: string;
  processedAt?: string;
  uploadedBy: string;
}

export type DocumentType = 
  | 'records-request' 
  | 'hipaa-authorization' 
  | 'affidavit-notarization' 
  | 'follow-up-reminder' 
  | 'formal-follow-up' 
  | 'fee-payment' 
  | 'final-demand' 
  | 'emergency_record'
  | 'specialist_notes'
  | 'lab_results'
  | 'imaging_report'
  | 'therapy_notes'
  | 'billing_statement'
  | 'insurance_correspondence'
  | 'prescription_record'
  | 'other';

export interface ExtractedMedicalData {
  patientInfo: {
    name?: string;
    dateOfBirth?: string;
    patientId?: string;
    insuranceId?: string;
  };
  providerInfo: {
    name?: string;
    facility?: string;
    npi?: string;
    address?: string;
  };
  serviceDetails: {
    dateOfService?: string;
    diagnosisCodes?: string[];
    procedureCodes?: string[];
    medications?: string[];
    treatmentPlan?: string;
  };
  billingInfo: {
    totalCharges?: number;
    insurancePaid?: number;
    patientResponsibility?: number;
    paymentAmount?: number;
    balanceDue?: number;
    claimNumber?: string;
  };
  clinicalFindings: {
    symptoms?: string[];
    physicalExam?: string;
    diagnosticResults?: string;
    treatmentNotes?: string;
    functionalLimitations?: string[];
    workRestrictions?: string[];
    futureRecommendations?: string[];
  };
}

export interface FollowUpAction {
  id: string;
  requestId: string;
  actionType: 'reminder' | 'escalation' | 'phone_call' | 'email' | 'letter';
  actionDate: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'skipped';
  notes?: string;
  performedBy?: string;
  response?: string;
  createdAt: string;
}

// Enhanced interfaces to fix build errors
export interface GeneratedDocument {
  id: string;
  templateType?: DocumentType;
  type: DocumentType;
  content: string;
  variables?: Record<string, string>;
  createdAt: string;
  createdBy?: string;
  firmBranding?: FirmBranding;
  trackingId: string;
  status: 'draft' | 'generated' | 'sent' | 'delivered';
  signatureRequired: boolean;
  clientId?: string;
  providerId?: string;
  qrCode?: string;
  expiresAt?: string;
}

export interface FirmBranding {
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  letterheadTemplate?: string;
  firmName: string;
  firmAddress?: string;
  firmPhone?: string;
  firmEmail?: string;
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
}

export interface FollowUpRequest {
  id: string;
  requestId: string;
  type: 'reminder' | 'escalation' | 'final_demand';
  scheduledDate: string;
  sent: boolean;
  sentAt?: string;
  response?: string;
  nextFollowUpDate?: string;
  originalDocumentId?: string;
  clientId?: string;
  providerId?: string;
  deadlineDate?: string;
  currentStatus?: 'pending' | 'overdue' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
  remindersSent?: number;
}

export interface ProviderType {
  id: string;
  name: string;
  specialty: string;
  standardDeadlineDays: number;
  reminderSchedule: number[];
  escalationRules: EscalationRule[];
}

export interface EscalationRule {
  daysTrigger: number;
  actionType: 'email' | 'phone' | 'letter' | 'legal';
  template: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'deadline' | 'follow_up' | 'appointment';
  requestId?: string;
  providerId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completed: boolean;
  description?: string;
}

export interface ReminderSent {
  id: string;
  requestId: string;
  reminderType: 'initial' | 'follow_up' | 'final';
  sentAt: string;
  method: 'email' | 'fax' | 'mail' | 'phone';
  response?: string;
  responseDate?: string;
  followUpRequestId?: string;
}

export interface DeliveryMethod {
  id?: string;
  type: 'certified_mail' | 'fax' | 'email' | 'portal';
  name?: string;
  address?: string;
  trackingEnabled: boolean;
  confirmationRequired: boolean;
  estimatedDeliveryDays: number;
  estimatedDeliveryTime?: number;
  cost?: number;
  enabled?: boolean;
  reliabilityScore?: number;
  hipaaCompliant?: boolean;
}

export interface DeliveryAttempt {
  id: string;
  requestId: string;
  documentId?: string;
  attemptNumber: number;
  method: DeliveryMethod;
  methodId?: string;
  attemptedAt: string;
  sentAt?: string;
  status: 'pending' | 'delivered' | 'failed' | 'returned' | 'sending';
  trackingNumber?: string;
  failureReason?: string;
  nextAttemptDate?: string;
  retryCount?: number;
}

export interface DeliveryTracking {
  id: string;
  requestId: string;
  trackingNumber: string;
  carrier: string;
  status: 'in_transit' | 'delivered' | 'failed' | 'returned';
  updates: TrackingUpdate[];
  deliveredAt?: string;
  signedBy?: string;
}

export interface TrackingUpdate {
  timestamp: string;
  location: string;
  status: string;
  description: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  type: DocumentType;
  content: string;
  variables: string[];
  firmSpecific: boolean;
  lastModified: string;
}

export interface QRCodeData {
  requestId: string;
  clientId: string;
  providerId: string;
  trackingId: string;
  trackingUrl: string;
  expiresAt: string;
  securityHash: string;
  documentType?: DocumentType;
  generatedDate?: string;
  caseId?: string;
}

export interface ProviderDeadlineRule {
  providerType: string;
  standardDays: number;
  standardDeadlineDays?: number;
  urgentDays: number;
  reminderDays: number[];
  reminderSchedule?: number[];
  escalationDays: number[];
}

export const PROVIDER_DEADLINE_RULES: Record<string, ProviderDeadlineRule> = {
  hospital: {
    providerType: 'hospital',
    standardDays: 30,
    standardDeadlineDays: 30,
    urgentDays: 15,
    reminderDays: [7, 14, 21],
    reminderSchedule: [7, 14, 21],
    escalationDays: [28, 35, 42]
  },
  physician: {
    providerType: 'physician',
    standardDays: 21,
    standardDeadlineDays: 21,
    urgentDays: 10,
    reminderDays: [7, 14],
    reminderSchedule: [7, 14],
    escalationDays: [19, 26, 33]
  },
  specialist: {
    providerType: 'specialist',
    standardDays: 21,
    standardDeadlineDays: 21,
    urgentDays: 10,
    reminderDays: [7, 14],
    reminderSchedule: [7, 14],
    escalationDays: [19, 26, 33]
  },
  therapy: {
    providerType: 'therapy',
    standardDays: 14,
    standardDeadlineDays: 14,
    urgentDays: 7,
    reminderDays: [5, 10],
    reminderSchedule: [5, 10],
    escalationDays: [12, 19, 26]
  },
  imaging: {
    providerType: 'imaging',
    standardDays: 14,
    standardDeadlineDays: 14,
    urgentDays: 7,
    reminderDays: [5, 10],
    reminderSchedule: [5, 10],
    escalationDays: [12, 19, 26]
  }
};

export interface CaseSummary {
  clientId: string;
  caseNumber: string;
  totalProviders: number;
  requestsCompleted: number;
  requestsPending: number;
  requestsDenied: number;
  totalDocuments: number;
  estimatedMedicalCosts: number;
  actualMedicalCosts?: number;
  medicalTimeline: TimelineEvent[];
  keyFindings: string[];
  treatmentSummary: string;
  caseValueIndicators: {
    objectiveFindings: boolean;
    ongoingTreatment: boolean;
    functionalLimitations: boolean;
    workImpact: boolean;
    futureCareBeed: boolean;
  };
  generatedAt: string;
}

export interface TimelineEvent {
  date: string;
  provider: string;
  eventType: 'treatment' | 'diagnosis' | 'procedure' | 'medication' | 'referral';
  description: string;
  significance: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'client' | 'staff' | 'attorney' | 'admin';
  firmId?: string;
  permissions: Permission[];
  lastLogin?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface Firm {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    phone: string;
    fax?: string;
    email: string;
    website?: string;
  };
  branding: {
    logoUrl?: string;
    primaryColor: string;
    secondaryColor: string;
    letterheadTemplate?: string;
  };
  settings: {
    defaultFollowUpDays: number;
    enableAutoReminders: boolean;
    enableAIProcessing: boolean;
    hipaaComplianceLevel: 'basic' | 'enhanced';
  };
  subscription: {
    plan: 'starter' | 'professional' | 'enterprise';
    maxUsers: number;
    maxCases: number;
    features: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProviderPerformance {
  providerId: string;
  providerName: string;
  totalRequests: number;
  completedRequests: number;
  deniedRequests: number;
  averageResponseTime: number;
  responseRate: number;
  denialRate: number;
  lastActivityDate: string;
  trend: 'improving' | 'declining' | 'stable';
}

export interface CaseMetrics {
  totalCases: number;
  activeCases: number;
  completedCases: number;
  averageCompletionTime: number;
  totalDocumentsProcessed: number;
  aiAccuracyRate: number;
  costSavings: number;
  timeframeMetrics: {
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
    lastYear: number;
  };
}

export interface DashboardData {
  user: User;
  firm?: Firm;
  caseMetrics: CaseMetrics;
  recentActivity: ActivityEvent[];
  upcomingDeadlines: DeadlineAlert[];
  providerPerformance: ProviderPerformance[];
  pendingTasks: Task[];
}

export interface ActivityEvent {
  id: string;
  type: 'document_received' | 'request_sent' | 'case_created' | 'follow_up_due' | 'ai_processing_complete';
  description: string;
  timestamp: string;
  relatedCaseId?: string;
  relatedUserId?: string;
}

export interface DeadlineAlert {
  id: string;
  type: 'follow_up_due' | 'response_overdue' | 'case_deadline' | 'document_expiry';
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  caseId?: string;
  requestId?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'follow_up' | 'document_review' | 'client_contact' | 'provider_call' | 'admin';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assignedTo: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  relatedCaseId?: string;
  relatedRequestId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
    totalPages: number;
  };
}

export interface ClientIntakeFormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    ssn: string;
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insuranceInfo: {
    primaryCarrier: string;
    policyNumber: string;
    groupNumber: string;
    memberId: string;
  };
  injuryDetails: {
    dateOfInjury: string;
    typeOfIncident: string;
    description: string;
    bodyPartsAffected: string[];
    policeReportNumber: string;
  };
  employmentInfo: {
    employer: string;
    position: string;
    annualWage: number;
    timeOffWork: string;
    workRestrictions: string[];
  };
}

export interface ProviderFormData {
  basicInfo: {
    name: string;
    specialty: string;
    npiNumber: string;
    licenseNumber: string;
  };
  facilityInfo: {
    facilityName: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  contactInfo: {
    phone: string;
    fax: string;
    email: string;
    recordsContactPerson: string;
  };
  treatmentInfo: {
    firstTreatmentDate: string;
    lastTreatmentDate: string;
    typeOfTreatment: string;
    estimatedVisits: number;
    estimatedRecordsCost: number;
  };
}

const feeAmount = "{{feeAmount}}";

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

Please find enclosed payment of $${feeAmount} for the medical records request dated {{originalRequestDate}}.

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
  `,
  'emergency_record': `
EMERGENCY MEDICAL RECORDS REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

URGENT: Medical Records Required for {{clientName}} (DOB: {{clientDOB}})

This is an urgent request for emergency medical records related to treatment on {{incidentDate}}.

Please provide these records within 7 business days.

Tracking ID: {{trackingId}}

Thank you,
{{firmName}}
  `,
  'specialist_notes': `
SPECIALIST CONSULTATION RECORDS REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

Re: Specialist Records for {{clientName}} (DOB: {{clientDOB}})

We request all specialist consultation notes and treatment records for the above patient.

Please include:
- Initial consultation notes
- Treatment plans
- Progress notes
- Discharge summaries

Tracking ID: {{trackingId}}

Sincerely,
{{firmName}}
  `,
  'lab_results': `
LABORATORY RESULTS REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

Re: Laboratory Results for {{clientName}} (DOB: {{clientDOB}})

Please provide all laboratory test results and reports for the referenced patient.

Date Range: {{startDate}} to {{endDate}}

Tracking ID: {{trackingId}}

Thank you,
{{firmName}}
  `,
  'imaging_report': `
IMAGING REPORTS REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

Re: Imaging Reports for {{clientName}} (DOB: {{clientDOB}})

Please provide all imaging reports including:
- X-rays
- MRI scans
- CT scans
- Ultrasounds

Date Range: {{startDate}} to {{endDate}}

Tracking ID: {{trackingId}}

Sincerely,
{{firmName}}
  `,
  'therapy_notes': `
THERAPY RECORDS REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

Re: Therapy Records for {{clientName}} (DOB: {{clientDOB}})

Please provide all therapy records including:
- Initial evaluations
- Treatment notes
- Progress reports
- Discharge summaries

Tracking ID: {{trackingId}}

Thank you,
{{firmName}}
  `,
  'billing_statement': `
BILLING RECORDS REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

Re: Billing Statements for {{clientName}} (DOB: {{clientDOB}})

Please provide all billing statements and financial records for the referenced patient.

Date Range: {{startDate}} to {{endDate}}

Tracking ID: {{trackingId}}

Sincerely,
{{firmName}}
  `,
  'insurance_correspondence': `
INSURANCE CORRESPONDENCE REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

Re: Insurance Communications for {{clientName}} (DOB: {{clientDOB}})

Please provide all correspondence with insurance companies regarding the referenced patient.

Tracking ID: {{trackingId}}

Thank you,
{{firmName}}
  `,
  'prescription_record': `
PRESCRIPTION RECORDS REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

Re: Prescription History for {{clientName}} (DOB: {{clientDOB}})

Please provide all prescription records and medication history for the referenced patient.

Date Range: {{startDate}} to {{endDate}}

Tracking ID: {{trackingId}}

Sincerely,
{{firmName}}
  `,
  'other': `
MEDICAL RECORDS REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

Re: Medical Records for {{clientName}} (DOB: {{clientDOB}})

Please provide the requested medical records for the referenced patient.

Tracking ID: {{trackingId}}

Thank you,
{{firmName}}
  `
};
