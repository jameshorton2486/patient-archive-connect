
// Case Management Integration Types
export interface CaseManagementIntegration {
  id: string;
  provider: 'clio' | 'mycase' | 'smartadvocate';
  name: string;
  enabled: boolean;
  apiKey?: string;
  baseUrl?: string;
  lastSync?: string;
  syncStatus: 'connected' | 'disconnected' | 'syncing' | 'error';
}

export interface ClioIntegration extends CaseManagementIntegration {
  provider: 'clio';
  firmId?: string;
  syncSettings: {
    cases: boolean;
    documents: boolean;
    timeEntries: boolean;
    billing: boolean;
  };
}

export interface MyCaseIntegration extends CaseManagementIntegration {
  provider: 'mycase';
  syncSettings: {
    clientPortal: boolean;
    documents: boolean;
    tasks: boolean;
    calendar: boolean;
  };
}

export interface SmartAdvocateIntegration extends CaseManagementIntegration {
  provider: 'smartadvocate';
  syncSettings: {
    caseData: boolean;
    documents: boolean;
    workflows: boolean;
    reports: boolean;
  };
}

// E-Signature Integration Types
export interface ESignatureIntegration {
  id: string;
  provider: 'docusign' | 'adobe-sign';
  name: string;
  enabled: boolean;
  apiKey?: string;
  environment: 'sandbox' | 'production';
  lastUsed?: string;
  status: 'active' | 'inactive' | 'error';
}

export interface DocuSignIntegration extends ESignatureIntegration {
  provider: 'docusign';
  accountId?: string;
  integrationKey?: string;
  features: {
    hipaaForms: boolean;
    affidavitExecution: boolean;
    remoteNotarization: boolean;
    auditTrail: boolean;
  };
}

export interface AdobeSignIntegration extends ESignatureIntegration {
  provider: 'adobe-sign';
  features: {
    documentWorkflow: boolean;
    mobileSigning: boolean;
    apiIntegration: boolean;
    complianceTracking: boolean;
  };
}

// AI Analytics Types
export interface PredictiveAnalytics {
  id: string;
  type: 'provider-response' | 'case-value' | 'risk-assessment';
  enabled: boolean;
  lastUpdated: string;
  accuracy: number;
  trainingDataSize: number;
}

export interface ProviderResponsePrediction extends PredictiveAnalytics {
  type: 'provider-response';
  predictions: {
    providerId: string;
    probabilityOfResponse: number;
    estimatedResponseTime: number;
    bestContactDay: string;
    bestContactTime: string;
    seasonalFactors: {
      month: number;
      adjustmentFactor: number;
    }[];
  }[];
}

export interface CaseValueAssessment extends PredictiveAnalytics {
  type: 'case-value';
  assessments: {
    clientId: string;
    estimatedValue: number;
    confidence: number;
    factors: {
      medicalCosts: number;
      treatmentDuration: number;
      complexity: number;
      jurisdiction: string;
    };
    comparableCases: string[];
  }[];
}

export interface RiskAssessment extends PredictiveAnalytics {
  type: 'risk-assessment';
  assessments: {
    requestId: string;
    riskScore: number;
    riskFactors: {
      missingDocuments: string[];
      complianceIssues: string[];
      deadlineRisks: string[];
      qualityIssues: string[];
    };
    recommendations: string[];
  }[];
}

// Natural Language Processing Types
export interface NLPService {
  id: string;
  type: 'medical-summarization' | 'legal-analysis';
  enabled: boolean;
  model: string;
  lastUsed: string;
  processedDocuments: number;
}

export interface MedicalRecordSummary {
  id: string;
  documentId: string;
  keyFindings: string[];
  treatmentTimeline: {
    date: string;
    event: string;
    provider: string;
  }[];
  outcomesPrediction: {
    likelihood: number;
    prediction: string;
    confidence: number;
  }[];
  attorneyBriefing: string;
  generatedAt: string;
}

export interface LegalDocumentAnalysis {
  id: string;
  documentId: string;
  complianceCheck: {
    passed: boolean;
    issues: string[];
    recommendations: string[];
  };
  riskIdentification: {
    riskLevel: 'low' | 'medium' | 'high';
    risks: string[];
    mitigationSuggestions: string[];
  };
  qualityScore: number;
  improvementSuggestions: string[];
  analysisDate: string;
}

export interface IntegrationStats {
  totalIntegrations: number;
  activeIntegrations: number;
  lastSyncDate: string;
  syncSuccessRate: number;
  documentsProcessed: number;
  timesSaved: number; // in hours
}
