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
    diagnosisCodes?: string[]; // ICD-10 codes
    procedureCodes?: string[]; // CPT codes
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
  'emergency_record': '',
  'specialist_notes': '',
  'lab_results': '',
  'imaging_report': '',
  'therapy_notes': '',
  'billing_statement': '',
  'insurance_correspondence': '',
  'prescription_record': '',
  'other': ''
};
