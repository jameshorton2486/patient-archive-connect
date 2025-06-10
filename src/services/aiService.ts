
export interface DocumentClassification {
  type: string;
  provider: string;
  serviceDate: string;
  confidence: number;
  extractedData?: any;
}

export interface MedicalDataExtraction {
  demographics: {
    patientName?: string;
    dateOfBirth?: string;
    patientId?: string;
  };
  serviceInfo: {
    dateOfService?: string;
    provider?: string;
    facility?: string;
  };
  codes: {
    icd10?: string[];
    cpt?: string[];
  };
  billing: {
    totalCharges?: number;
    insurancePaid?: number;
    patientBalance?: number;
  };
}

export interface CaseSummary {
  totalDocuments: number;
  treatmentTimeline: Array<{
    date: string;
    provider: string;
    treatment: string;
  }>;
  medicalCosts: {
    total: number;
    byProvider: Record<string, number>;
  };
  keyFindings: string[];
}

export class AIDocumentService {
  private static instance: AIDocumentService;
  
  static getInstance(): AIDocumentService {
    if (!AIDocumentService.instance) {
      AIDocumentService.instance = new AIDocumentService();
    }
    return AIDocumentService.instance;
  }

  async classifyDocument(file: File): Promise<DocumentClassification> {
    // Simulate AI classification
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockClassification: DocumentClassification = {
          type: this.detectDocumentType(file.name),
          provider: 'Regional Medical Center',
          serviceDate: '2024-01-15',
          confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
          extractedData: {
            documentTitle: file.name,
            pages: 1,
            fileSize: file.size
          }
        };
        resolve(mockClassification);
      }, 1500);
    });
  }

  async extractMedicalData(documentId: string): Promise<MedicalDataExtraction> {
    // Simulate OCR and data extraction
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockExtraction: MedicalDataExtraction = {
          demographics: {
            patientName: 'John Doe',
            dateOfBirth: '1985-06-15',
            patientId: 'PAT-12345'
          },
          serviceInfo: {
            dateOfService: '2024-01-15',
            provider: 'Dr. Sarah Johnson',
            facility: 'Regional Medical Center'
          },
          codes: {
            icd10: ['M25.511', 'S72.001A'],
            cpt: ['99213', '73060']
          },
          billing: {
            totalCharges: 1250.00,
            insurancePaid: 1000.00,
            patientBalance: 250.00
          }
        };
        resolve(mockExtraction);
      }, 2000);
    });
  }

  async generateSummary(caseId: string): Promise<CaseSummary> {
    // Simulate case summary generation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockSummary: CaseSummary = {
          totalDocuments: 25,
          treatmentTimeline: [
            {
              date: '2024-01-15',
              provider: 'Emergency Room',
              treatment: 'Initial evaluation and X-rays'
            },
            {
              date: '2024-01-20',
              provider: 'Dr. Sarah Johnson',
              treatment: 'Orthopedic consultation'
            },
            {
              date: '2024-02-01',
              provider: 'Physical Therapy Center',
              treatment: 'Physical therapy sessions'
            }
          ],
          medicalCosts: {
            total: 15750.00,
            byProvider: {
              'Emergency Room': 5500.00,
              'Dr. Sarah Johnson': 3250.00,
              'Physical Therapy Center': 4500.00,
              'Imaging Center': 2500.00
            }
          },
          keyFindings: [
            'Fracture of left femur requiring surgical intervention',
            'Ongoing physical therapy for mobility improvement',
            'Lost wages due to inability to work for 3 months',
            'Potential for future complications requiring additional treatment'
          ]
        };
        resolve(mockSummary);
      }, 3000);
    });
  }

  private detectDocumentType(filename: string): string {
    const name = filename.toLowerCase();
    
    if (name.includes('lab') || name.includes('blood') || name.includes('urine')) {
      return 'lab_results';
    }
    if (name.includes('xray') || name.includes('mri') || name.includes('ct') || name.includes('imaging')) {
      return 'imaging_report';
    }
    if (name.includes('therapy') || name.includes('pt') || name.includes('physical')) {
      return 'therapy_notes';
    }
    if (name.includes('bill') || name.includes('invoice') || name.includes('statement')) {
      return 'billing_statement';
    }
    if (name.includes('notes') || name.includes('visit') || name.includes('consultation')) {
      return 'specialist_notes';
    }
    
    return 'other';
  }

  async processBatch(files: File[]): Promise<DocumentClassification[]> {
    const results = await Promise.all(
      files.map(file => this.classifyDocument(file))
    );
    return results;
  }
}

export const aiDocumentService = AIDocumentService.getInstance();
