
export interface Client {
  id: string;
  caseNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn?: string;
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
  physicalAddress?: {
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
  deliveredAt?: string;
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

// Simplified template system to avoid complex dependency issues
export const DOCUMENT_TEMPLATES: Record<DocumentType, string> = {
  'records-request': `
MEDICAL RECORDS REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

Dear Medical Records Department,

We represent {{clientName}} (DOB: {{clientDOB}}) in connection with injuries sustained on {{incidentDate}}.

We hereby request copies of all medical records for the above-named patient for treatment received from {{startDate}} to {{endDate}}.

Tracking ID: {{trackingId}}

Sincerely,
{{attorneyName}}
  `,
  'hipaa-authorization': `
AUTHORIZATION FOR RELEASE OF MEDICAL INFORMATION

Patient Name: {{clientName}}
Date of Birth: {{clientDOB}}

I authorize {{providerName}} to release my medical records to {{firmName}}.

Tracking ID: {{trackingId}}
  `,
  'affidavit-notarization': `
AFFIDAVIT OF RECORDS CUSTODIAN

I am the custodian of records for {{providerName}}.
The attached records are true and accurate copies.

Tracking ID: {{trackingId}}
  `,
  'follow-up-reminder': `
MEDICAL RECORDS FOLLOW-UP REMINDER

Date: {{followUpDate}}
Re: Medical Records Request - {{clientName}}
Original Request Date: {{originalRequestDate}}
Tracking ID: {{trackingId}}

This is a courtesy reminder regarding our medical records request.
  `,
  'formal-follow-up': `
FORMAL FOLLOW-UP - MEDICAL RECORDS REQUEST

Date: {{followUpDate}}
Re: SECOND REQUEST - Medical Records for {{clientName}}
Tracking ID: {{trackingId}}

Our office previously requested medical records. This serves as a formal follow-up request.
  `,
  'fee-payment': `
MEDICAL RECORDS FEE PAYMENT NOTICE

Date: {{date}}
Re: Payment for Medical Records - {{clientName}}
Tracking ID: {{trackingId}}

Please find enclosed payment for the medical records request.
  `,
  'final-demand': `
FINAL DEMAND FOR MEDICAL RECORDS

Date: {{date}}
Re: FINAL DEMAND - Medical Records for {{clientName}}
Tracking ID: {{trackingId}}

YOU ARE HEREBY REQUIRED to produce the medical records within TEN (10) days.
  `,
  'emergency_record': `EMERGENCY MEDICAL RECORDS REQUEST\n\nDate: {{date}}\nUrgent request for {{clientName}}\nTracking ID: {{trackingId}}`,
  'specialist_notes': `SPECIALIST CONSULTATION RECORDS REQUEST\n\nDate: {{date}}\nRe: {{clientName}}\nTracking ID: {{trackingId}}`,
  'lab_results': `LABORATORY RESULTS REQUEST\n\nDate: {{date}}\nRe: {{clientName}}\nTracking ID: {{trackingId}}`,
  'imaging_report': `IMAGING REPORTS REQUEST\n\nDate: {{date}}\nRe: {{clientName}}\nTracking ID: {{trackingId}}`,
  'therapy_notes': `THERAPY RECORDS REQUEST\n\nDate: {{date}}\nRe: {{clientName}}\nTracking ID: {{trackingId}}`,
  'billing_statement': `BILLING RECORDS REQUEST\n\nDate: {{date}}\nRe: {{clientName}}\nTracking ID: {{trackingId}}`,
  'insurance_correspondence': `INSURANCE CORRESPONDENCE REQUEST\n\nDate: {{date}}\nRe: {{clientName}}\nTracking ID: {{trackingId}}`,
  'prescription_record': `PRESCRIPTION RECORDS REQUEST\n\nDate: {{date}}\nRe: {{clientName}}\nTracking ID: {{trackingId}}`,
  'other': `MEDICAL RECORDS REQUEST\n\nDate: {{date}}\nRe: {{clientName}}\nTracking ID: {{trackingId}}`
};
