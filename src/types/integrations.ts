
export interface CaseManagementIntegration {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'configured';
  provider: string;
  environment: 'production' | 'sandbox';
  lastSync?: string;
  enabled: boolean;
}

export interface ESignatureIntegration {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  environment: 'production' | 'sandbox';
  lastUsed?: string;
  enabled: boolean;
}

export interface PredictiveAnalytics {
  id: string;
  type: string;
  accuracy: number;
  trainingDataSize: number;
  lastUpdated: string;
  enabled: boolean;
}

export interface NLPService {
  id: string;
  type: string;
  model: string;
  processedDocuments: number;
  lastUsed: string;
  enabled: boolean;
}

export interface IntegrationStats {
  activeIntegrations: number;
  documentsProcessed: number;
  timesSaved: number;
  syncSuccessRate: number;
}

export interface ThirdPartyIntegration {
  id: string;
  name: string;
  category: 'case_management' | 'communication' | 'document' | 'medical' | 'financial';
  tier: 'tier_1' | 'tier_2';
  status: 'connected' | 'available' | 'configured' | 'error';
  description: string;
  features: string[];
  lastSync?: string;
}
