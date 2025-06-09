
export interface ProcessedDocument {
  id: string;
  originalFileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  processedAt?: string;
  status: ProcessingStatus;
  classification: DocumentClassification;
  extractedData: ExtractedData;
  qualityValidation: QualityValidation;
  ocrText?: string;
  confidence: number;
  processingTime: number;
}

export type ProcessingStatus = 
  | 'uploaded'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'needs_review';

export type DocumentClassification = 
  | 'emergency-room-records'
  | 'specialist-consultation'
  | 'laboratory-results'
  | 'imaging-reports'
  | 'physical-therapy-notes'
  | 'billing-statements'
  | 'insurance-correspondence'
  | 'prescription-records'
  | 'unknown';

export interface ExtractedData {
  patientDemographics?: PatientDemographics;
  providerInformation?: ProviderInformation;
  serviceDates?: ServiceDate[];
  diagnosisCodes?: DiagnosisCode[];
  procedureCodes?: ProcedureCode[];
  billingAmounts?: BillingAmount[];
  insuranceInfo?: InsuranceInformation;
  keyFindings?: string[];
  medications?: Medication[];
  workRestrictions?: WorkRestriction[];
  treatmentRecommendations?: string[];
}

export interface PatientDemographics {
  name: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  ssn?: string;
  mrn?: string;
  confidence: number;
}

export interface ProviderInformation {
  name: string;
  specialty: string;
  npi?: string;
  address: string;
  phone: string;
  confidence: number;
}

export interface ServiceDate {
  date: string;
  serviceType: string;
  confidence: number;
}

export interface DiagnosisCode {
  code: string;
  description: string;
  type: 'primary' | 'secondary';
  confidence: number;
}

export interface ProcedureCode {
  code: string;
  description: string;
  date: string;
  confidence: number;
}

export interface BillingAmount {
  chargeDescription: string;
  amount: number;
  dateOfService: string;
  insurancePaid?: number;
  patientResponsibility?: number;
  confidence: number;
}

export interface InsuranceInformation {
  carrier: string;
  policyNumber: string;
  groupNumber?: string;
  effectiveDate?: string;
  confidence: number;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  prescribedDate: string;
  prescriber: string;
  confidence: number;
}

export interface WorkRestriction {
  type: 'no_work' | 'light_duty' | 'modified_duty' | 'full_duty';
  startDate: string;
  endDate?: string;
  description: string;
  confidence: number;
}

export interface QualityValidation {
  completenessScore: number;
  legibilityScore: number;
  accuracyScore: number;
  overallScore: number;
  issues: ValidationIssue[];
  missingDocuments: string[];
}

export interface ValidationIssue {
  type: 'legibility' | 'incomplete_data' | 'inconsistent_data' | 'missing_signature';
  description: string;
  severity: 'low' | 'medium' | 'high';
  page?: number;
  confidence: number;
}

export interface ProcessingSettings {
  enableOCR: boolean;
  enableClassification: boolean;
  enableDataExtraction: boolean;
  enableQualityValidation: boolean;
  confidenceThreshold: number;
  language: 'en' | 'es';
  customExtractionRules: ExtractionRule[];
}

export interface ExtractionRule {
  id: string;
  name: string;
  pattern: string;
  dataType: string;
  enabled: boolean;
}

export interface ProcessingStats {
  totalDocuments: number;
  successfullyProcessed: number;
  averageProcessingTime: number;
  averageConfidence: number;
  classificationAccuracy: number;
  topDocumentTypes: { type: DocumentClassification; count: number }[];
}

export const DOCUMENT_CLASSIFICATION_LABELS: Record<DocumentClassification, string> = {
  'emergency-room-records': 'Emergency Room Records',
  'specialist-consultation': 'Specialist Consultation Notes',
  'laboratory-results': 'Laboratory Results',
  'imaging-reports': 'Imaging Reports (X-ray, MRI, CT)',
  'physical-therapy-notes': 'Physical Therapy Notes',
  'billing-statements': 'Billing Statements',
  'insurance-correspondence': 'Insurance Correspondence',
  'prescription-records': 'Prescription Records',
  'unknown': 'Unknown/Other'
};
