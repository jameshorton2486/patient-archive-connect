
export interface DenialRecord {
  id: string;
  originalRequestId: string;
  documentId: string;
  clientId: string;
  providerId: string;
  denialDate: string;
  category: DenialCategory;
  reason: string;
  details: DenialDetails;
  status: DenialStatus;
  assignedStaffId?: string;
  resolutionDate?: string;
  resolutionNotes?: string;
  responseDocuments: string[];
  createdAt: string;
  updatedAt: string;
}

// Add missing alias for compatibility
export type Denial = DenialRecord;

export type DenialCategory = 
  | 'fee-required'
  | 'additional-authorization'
  | 'records-not-available'
  | 'invalid-request'
  | 'patient-mismatch'
  | 'date-range-issue'
  | 'provider-relationship'
  | 'other';

export type DenialStatus = 
  | 'received'
  | 'reviewing'
  | 'processing'
  | 'resolved'
  | 'escalated'
  | 'closed';

export interface DenialDetails {
  feeAmount?: number;
  paymentMethod?: string;
  processingTimeframe?: string;
  authRequirements?: string[];
  missingDocuments?: string[];
  correctionRequired?: string[];
  alternativeProviders?: string[];
  transferLocation?: string;
  reasonCode?: string;
  notes?: string;
}

export interface DenialWorkflow {
  id: string;
  category: DenialCategory;
  name: string;
  description: string;
  steps: WorkflowStep[];
  automatedResponse: boolean;
  requiresApproval: boolean;
  estimatedResolutionTime: string;
  successRate: number;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'automated' | 'manual' | 'approval';
  action: WorkflowAction;
  description: string;
  estimatedTime: string;
  requiredFields: string[];
  nextStepConditions: StepCondition[];
}

export type WorkflowAction = 
  | 'generate-payment'
  | 'request-authorization'
  | 'verify-patient-info'
  | 'locate-records'
  | 'assign-staff'
  | 'send-response'
  | 'escalate'
  | 'close-denial';

export interface StepCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
  nextStepId: string;
}

export interface DenialResolution {
  id: string;
  denialId: string;
  resolutionType: ResolutionType;
  responseDocumentId?: string;
  paymentAmount?: number;
  paymentDate?: string;
  authDocuments?: string[];
  correctedInformation?: Record<string, string>;
  alternativeSource?: string;
  escalationReason?: string;
  staffNotes: string;
  timeToResolution: number; // in hours
  successfulResolution: boolean;
  clientSatisfaction?: number; // 1-5 rating
  createdAt: string;
}

export type ResolutionType = 
  | 'payment-sent'
  | 'authorization-provided'
  | 'information-corrected'
  | 'alternative-source-found'
  | 'escalated-to-management'
  | 'legal-action-required'
  | 'case-closed-unresolved';

export interface DenialStats {
  totalDenials: number;
  denialsByCategory: Record<DenialCategory, number>;
  resolutionRate: number;
  averageResolutionTime: number;
  mostCommonReasons: { reason: string; count: number }[];
  monthlyTrends: { month: string; count: number; resolutionRate: number }[];
  topPerformingWorkflows: { workflowId: string; successRate: number }[];
  costImpact: {
    feesRequired: number;
    delayedCases: number;
    additionalLabor: number;
  };
}

export const DENIAL_CATEGORIES: Record<DenialCategory, string> = {
  'fee-required': 'Processing Fee Required',
  'additional-authorization': 'Additional Authorization Needed',
  'records-not-available': 'Records Not Available',
  'invalid-request': 'Invalid Request',
  'patient-mismatch': 'Patient Information Mismatch',
  'date-range-issue': 'Date Range Issues',
  'provider-relationship': 'Provider Relationship Verification',
  'other': 'Other'
};

export const DEFAULT_WORKFLOWS: Record<DenialCategory, DenialWorkflow> = {
  'fee-required': {
    id: 'workflow_fee',
    category: 'fee-required',
    name: 'Fee Payment Workflow',
    description: 'Automated payment processing for record fees',
    steps: [
      {
        id: 'step_1',
        name: 'Generate Payment Document',
        type: 'automated',
        action: 'generate-payment',
        description: 'Create fee payment letter with amount and instructions',
        estimatedTime: '5 minutes',
        requiredFields: ['feeAmount', 'paymentMethod'],
        nextStepConditions: [
          { field: 'documentGenerated', operator: 'equals', value: true, nextStepId: 'step_2' }
        ]
      },
      {
        id: 'step_2',
        name: 'Send Payment',
        type: 'manual',
        action: 'send-response',
        description: 'Process payment and send to provider',
        estimatedTime: '1-2 business days',
        requiredFields: ['paymentMethod', 'trackingInfo'],
        nextStepConditions: [
          { field: 'paymentSent', operator: 'equals', value: true, nextStepId: 'step_3' }
        ]
      }
    ],
    automatedResponse: true,
    requiresApproval: false,
    estimatedResolutionTime: '2-3 business days',
    successRate: 0.95
  },
  'additional-authorization': {
    id: 'workflow_auth',
    category: 'additional-authorization',
    name: 'Additional Authorization Workflow',
    description: 'Handle requests for additional patient authorization',
    steps: [
      {
        id: 'step_1',
        name: 'Review Requirements',
        type: 'manual',
        action: 'verify-patient-info',
        description: 'Review what additional authorization is needed',
        estimatedTime: '15 minutes',
        requiredFields: ['authRequirements'],
        nextStepConditions: [
          { field: 'requirementsReviewed', operator: 'equals', value: true, nextStepId: 'step_2' }
        ]
      },
      {
        id: 'step_2',
        name: 'Generate Response',
        type: 'automated',
        action: 'request-authorization',
        description: 'Create response with additional authorization',
        estimatedTime: '10 minutes',
        requiredFields: ['authDocuments'],
        nextStepConditions: [
          { field: 'responseGenerated', operator: 'equals', value: true, nextStepId: 'step_3' }
        ]
      }
    ],
    automatedResponse: false,
    requiresApproval: true,
    estimatedResolutionTime: '1-2 business days',
    successRate: 0.88
  },
  'records-not-available': {
    id: 'workflow_unavailable',
    category: 'records-not-available',
    name: 'Records Unavailable Workflow',
    description: 'Handle cases where records are not available',
    steps: [
      {
        id: 'step_1',
        name: 'Investigate Alternatives',
        type: 'manual',
        action: 'locate-records',
        description: 'Research alternative sources for records',
        estimatedTime: '30 minutes',
        requiredFields: ['investigationNotes'],
        nextStepConditions: [
          { field: 'alternativeFound', operator: 'equals', value: true, nextStepId: 'step_2' },
          { field: 'alternativeFound', operator: 'equals', value: false, nextStepId: 'step_3' }
        ]
      },
      {
        id: 'step_2',
        name: 'Contact Alternative Source',
        type: 'manual',
        action: 'send-response',
        description: 'Request records from alternative provider',
        estimatedTime: '1 business day',
        requiredFields: ['alternativeProvider'],
        nextStepConditions: []
      },
      {
        id: 'step_3',
        name: 'Escalate to Management',
        type: 'manual',
        action: 'escalate',
        description: 'Escalate to management for legal review',
        estimatedTime: '2-3 business days',
        requiredFields: ['escalationReason'],
        nextStepConditions: []
      }
    ],
    automatedResponse: false,
    requiresApproval: true,
    estimatedResolutionTime: '3-5 business days',
    successRate: 0.72
  },
  'invalid-request': {
    id: 'workflow_invalid',
    category: 'invalid-request',
    name: 'Invalid Request Workflow',
    description: 'Handle invalid or incorrect requests',
    steps: [
      {
        id: 'step_1',
        name: 'Identify Issues',
        type: 'manual',
        action: 'verify-patient-info',
        description: 'Identify what information needs correction',
        estimatedTime: '20 minutes',
        requiredFields: ['correctionRequired'],
        nextStepConditions: [
          { field: 'issuesIdentified', operator: 'equals', value: true, nextStepId: 'step_2' }
        ]
      },
      {
        id: 'step_2',
        name: 'Generate Corrected Request',
        type: 'automated',
        action: 'send-response',
        description: 'Create new request with corrected information',
        estimatedTime: '15 minutes',
        requiredFields: ['correctedInformation'],
        nextStepConditions: []
      }
    ],
    automatedResponse: false,
    requiresApproval: false,
    estimatedResolutionTime: '1 business day',
    successRate: 0.92
  },
  'patient-mismatch': {
    id: 'workflow_mismatch',
    category: 'patient-mismatch',
    name: 'Patient Mismatch Workflow',
    description: 'Handle patient information discrepancies',
    steps: [],
    automatedResponse: false,
    requiresApproval: true,
    estimatedResolutionTime: '1-2 business days',
    successRate: 0.85
  },
  'date-range-issue': {
    id: 'workflow_dates',
    category: 'date-range-issue',
    name: 'Date Range Issue Workflow',
    description: 'Handle date range corrections',
    steps: [],
    automatedResponse: false,
    requiresApproval: false,
    estimatedResolutionTime: '1 business day',
    successRate: 0.90
  },
  'provider-relationship': {
    id: 'workflow_relationship',
    category: 'provider-relationship',
    name: 'Provider Relationship Workflow',
    description: 'Verify provider-patient relationship',
    steps: [],
    automatedResponse: false,
    requiresApproval: true,
    estimatedResolutionTime: '2-3 business days',
    successRate: 0.78
  },
  'other': {
    id: 'workflow_other',
    category: 'other',
    name: 'General Denial Workflow',
    description: 'Handle miscellaneous denial types',
    steps: [],
    automatedResponse: false,
    requiresApproval: true,
    estimatedResolutionTime: '3-5 business days',
    successRate: 0.65
  }
};
