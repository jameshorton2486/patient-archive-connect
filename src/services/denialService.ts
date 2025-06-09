
import { 
  DenialRecord, 
  DenialCategory, 
  DenialWorkflow, 
  DenialResolution, 
  DenialStats,
  DEFAULT_WORKFLOWS 
} from '@/types/denial';

export class DenialService {
  private static instance: DenialService;
  
  static getInstance(): DenialService {
    if (!DenialService.instance) {
      DenialService.instance = new DenialService();
    }
    return DenialService.instance;
  }

  async createDenial(
    originalRequestId: string,
    documentId: string,
    clientId: string,
    providerId: string,
    category: DenialCategory,
    reason: string,
    details: any
  ): Promise<DenialRecord> {
    const denial: DenialRecord = {
      id: `denial_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      originalRequestId,
      documentId,
      clientId,
      providerId,
      denialDate: new Date().toISOString(),
      category,
      reason,
      details,
      status: 'received',
      responseDocuments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('Created denial record:', denial);
    
    // Auto-assign to workflow if applicable
    const workflow = DEFAULT_WORKFLOWS[category];
    if (workflow.automatedResponse) {
      await this.initiateWorkflow(denial.id, workflow.id);
    }

    return denial;
  }

  async categorizeDenial(reason: string, details: string): Promise<DenialCategory> {
    // Simple rule-based categorization - in real implementation, this could use AI
    const lowerReason = reason.toLowerCase();
    const lowerDetails = details.toLowerCase();

    if (lowerReason.includes('fee') || lowerReason.includes('payment') || lowerReason.includes('cost')) {
      return 'fee-required';
    }
    
    if (lowerReason.includes('authorization') || lowerReason.includes('consent') || lowerReason.includes('permission')) {
      return 'additional-authorization';
    }
    
    if (lowerReason.includes('not available') || lowerReason.includes('destroyed') || lowerReason.includes('transferred')) {
      return 'records-not-available';
    }
    
    if (lowerReason.includes('patient') && (lowerDetails.includes('mismatch') || lowerDetails.includes('incorrect'))) {
      return 'patient-mismatch';
    }
    
    if (lowerReason.includes('date') || lowerReason.includes('timeframe')) {
      return 'date-range-issue';
    }
    
    if (lowerReason.includes('provider') || lowerReason.includes('relationship')) {
      return 'provider-relationship';
    }
    
    if (lowerReason.includes('invalid') || lowerReason.includes('incorrect')) {
      return 'invalid-request';
    }

    return 'other';
  }

  async getDenials(filters?: {
    status?: string;
    category?: DenialCategory;
    dateRange?: { start: string; end: string };
  }): Promise<DenialRecord[]> {
    // Mock data - in real implementation, this would query database
    const mockDenials: DenialRecord[] = [
      {
        id: 'denial_001',
        originalRequestId: 'req_001',
        documentId: 'doc_001',
        clientId: 'client_001',
        providerId: 'provider_001',
        denialDate: '2025-01-08T10:00:00Z',
        category: 'fee-required',
        reason: 'Processing fee required for medical records',
        details: {
          feeAmount: 25.00,
          paymentMethod: 'Check or Money Order',
          processingTimeframe: '5-7 business days'
        },
        status: 'processing',
        assignedStaffId: 'staff_001',
        responseDocuments: ['response_001'],
        createdAt: '2025-01-08T10:00:00Z',
        updatedAt: '2025-01-08T15:30:00Z'
      },
      {
        id: 'denial_002',
        originalRequestId: 'req_002',
        documentId: 'doc_002',
        clientId: 'client_002',
        providerId: 'provider_002',
        denialDate: '2025-01-07T14:30:00Z',
        category: 'additional-authorization',
        reason: 'Additional patient authorization required',
        details: {
          authRequirements: ['Signed authorization for specific date range', 'Notarized consent form'],
          missingDocuments: ['Form 1024-B', 'Patient signature verification']
        },
        status: 'reviewing',
        assignedStaffId: 'staff_002',
        responseDocuments: [],
        createdAt: '2025-01-07T14:30:00Z',
        updatedAt: '2025-01-08T09:15:00Z'
      }
    ];

    return mockDenials.filter(denial => {
      if (filters?.status && denial.status !== filters.status) return false;
      if (filters?.category && denial.category !== filters.category) return false;
      if (filters?.dateRange) {
        const denialDate = new Date(denial.denialDate);
        const start = new Date(filters.dateRange.start);
        const end = new Date(filters.dateRange.end);
        if (denialDate < start || denialDate > end) return false;
      }
      return true;
    });
  }

  async initiateWorkflow(denialId: string, workflowId: string): Promise<void> {
    console.log(`Initiating workflow ${workflowId} for denial ${denialId}`);
    
    const workflow = Object.values(DEFAULT_WORKFLOWS).find(w => w.id === workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    // In real implementation, this would:
    // 1. Update denial status
    // 2. Create workflow instance
    // 3. Execute first automated steps
    // 4. Assign manual tasks to staff
    // 5. Set up notifications and deadlines
  }

  async resolvedenial(
    denialId: string,
    resolutionType: string,
    details: any,
    staffNotes: string
  ): Promise<DenialResolution> {
    const resolution: DenialResolution = {
      id: `resolution_${Date.now()}`,
      denialId,
      resolutionType: resolutionType as any,
      staffNotes,
      timeToResolution: Math.floor(Math.random() * 72) + 24, // Mock: 24-96 hours
      successfulResolution: true,
      createdAt: new Date().toISOString(),
      ...details
    };

    console.log('Created denial resolution:', resolution);
    return resolution;
  }

  async getDenialStatistics(dateRange?: { start: string; end: string }): Promise<DenialStats> {
    // Mock statistics - in real implementation, this would aggregate from database
    return {
      totalDenials: 45,
      denialsByCategory: {
        'fee-required': 18,
        'additional-authorization': 12,
        'records-not-available': 8,
        'invalid-request': 4,
        'patient-mismatch': 2,
        'date-range-issue': 1,
        'provider-relationship': 0,
        'other': 0
      },
      resolutionRate: 0.87,
      averageResolutionTime: 48.5,
      mostCommonReasons: [
        { reason: 'Processing fee required', count: 18 },
        { reason: 'Additional authorization needed', count: 12 },
        { reason: 'Records transferred to another facility', count: 6 }
      ],
      monthlyTrends: [
        { month: '2024-11', count: 32, resolutionRate: 0.84 },
        { month: '2024-12', count: 28, resolutionRate: 0.89 },
        { month: '2025-01', count: 45, resolutionRate: 0.87 }
      ],
      topPerformingWorkflows: [
        { workflowId: 'workflow_fee', successRate: 0.95 },
        { workflowId: 'workflow_invalid', successRate: 0.92 },
        { workflowId: 'workflow_auth', successRate: 0.88 }
      ],
      costImpact: {
        feesRequired: 1250.00,
        delayedCases: 8,
        additionalLabor: 24.5
      }
    };
  }

  async getWorkflows(): Promise<DenialWorkflow[]> {
    return Object.values(DEFAULT_WORKFLOWS);
  }

  async assignStaff(denialId: string, staffId: string): Promise<void> {
    console.log(`Assigning denial ${denialId} to staff ${staffId}`);
    // In real implementation, this would update the database and send notifications
  }
}

export const denialService = DenialService.getInstance();
