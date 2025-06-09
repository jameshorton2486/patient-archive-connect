
import { 
  ProcessedDocument, 
  ProcessingStatus, 
  DocumentClassification, 
  ExtractedData,
  QualityValidation,
  ProcessingSettings,
  ProcessingStats,
  ValidationIssue,
  DOCUMENT_CLASSIFICATION_LABELS
} from '@/types/ai-processing';

export class AIProcessingService {
  private static instance: AIProcessingService;
  
  static getInstance(): AIProcessingService {
    if (!AIProcessingService.instance) {
      AIProcessingService.instance = new AIProcessingService();
    }
    return AIProcessingService.instance;
  }

  async processDocument(file: File, settings: ProcessingSettings): Promise<ProcessedDocument> {
    const startTime = Date.now();
    
    try {
      console.log(`Starting AI processing for: ${file.name}`);
      
      // Initialize document record
      const document: ProcessedDocument = {
        id: `doc_${Date.now()}_${Math.random().toString(36).substring(2)}`,
        originalFileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'processing',
        classification: 'unknown',
        extractedData: {},
        qualityValidation: {
          completenessScore: 0,
          legibilityScore: 0,
          accuracyScore: 0,
          overallScore: 0,
          issues: [],
          missingDocuments: []
        },
        confidence: 0,
        processingTime: 0
      };

      // Step 1: OCR Processing
      let ocrText = '';
      if (settings.enableOCR) {
        ocrText = await this.performOCR(file, settings.language);
        document.ocrText = ocrText;
      }

      // Step 2: Document Classification
      if (settings.enableClassification) {
        const classification = await this.classifyDocument(ocrText, file.name);
        document.classification = classification.type;
        document.confidence = classification.confidence;
      }

      // Step 3: Data Extraction
      if (settings.enableDataExtraction) {
        const extractedData = await this.extractData(ocrText, document.classification);
        document.extractedData = extractedData;
      }

      // Step 4: Quality Validation
      if (settings.enableQualityValidation) {
        const qualityValidation = await this.validateQuality(ocrText, document.extractedData);
        document.qualityValidation = qualityValidation;
      }

      // Finalize processing
      document.processedAt = new Date().toISOString();
      document.processingTime = Date.now() - startTime;
      document.status = document.confidence >= settings.confidenceThreshold ? 'completed' : 'needs_review';

      console.log(`AI processing completed for: ${file.name} in ${document.processingTime}ms`);
      return document;

    } catch (error) {
      console.error('AI processing failed:', error);
      throw new Error(`Processing failed: ${error}`);
    }
  }

  private async performOCR(file: File, language: string): Promise<string> {
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock OCR text based on file type
    const mockTexts = {
      'emergency-room': `
EMERGENCY DEPARTMENT REPORT
Patient: John Smith
DOB: 03/15/1985
Date of Service: 12/01/2024
Chief Complaint: Motor vehicle accident
Diagnosis: ICD-10 S72.001A - Fracture of unspecified part of neck of right femur
Treatment: Pain management, X-ray, discharge home
Provider: Dr. Sarah Johnson, MD
      `,
      'lab-results': `
LABORATORY REPORT
Patient: John Smith
Date Collected: 12/01/2024
CBC with Differential:
- WBC: 8.5 K/uL (Normal: 4.0-11.0)
- RBC: 4.2 M/uL (Normal: 4.2-5.4)
- Hemoglobin: 14.2 g/dL (Normal: 13.5-17.5)
Ordering Physician: Dr. Michael Brown, MD
      `,
      'imaging': `
RADIOLOGY REPORT
Patient: John Smith
Study Date: 12/01/2024
Exam: X-RAY RIGHT FEMUR
Clinical History: MVA with right leg pain
Findings: Fracture of the right femoral neck
Impression: Acute fracture right femoral neck
Radiologist: Dr. Lisa Chen, MD
      `
    };

    // Return mock text based on filename or random selection
    const texts = Object.values(mockTexts);
    return texts[Math.floor(Math.random() * texts.length)];
  }

  private async classifyDocument(text: string, filename: string): Promise<{ type: DocumentClassification; confidence: number }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple keyword-based classification for demo
    const keywords: Record<DocumentClassification, string[]> = {
      'emergency-room-records': ['emergency', 'trauma', 'er', 'emergency department'],
      'specialist-consultation': ['consultation', 'specialist', 'referral'],
      'laboratory-results': ['lab', 'laboratory', 'blood', 'urine', 'culture'],
      'imaging-reports': ['x-ray', 'mri', 'ct', 'ultrasound', 'radiology'],
      'physical-therapy-notes': ['physical therapy', 'pt', 'rehabilitation'],
      'billing-statements': ['bill', 'invoice', 'charges', 'payment'],
      'insurance-correspondence': ['insurance', 'claim', 'coverage', 'authorization'],
      'prescription-records': ['prescription', 'medication', 'pharmacy', 'rx'],
      'unknown': []
    };

    const lowerText = text.toLowerCase();
    const lowerFilename = filename.toLowerCase();
    
    for (const [type, typeKeywords] of Object.entries(keywords)) {
      if (type === 'unknown') continue;
      
      const matchCount = typeKeywords.filter(keyword => 
        lowerText.includes(keyword) || lowerFilename.includes(keyword)
      ).length;
      
      if (matchCount > 0) {
        return {
          type: type as DocumentClassification,
          confidence: Math.min(0.7 + (matchCount * 0.1), 0.95)
        };
      }
    }

    return { type: 'unknown', confidence: 0.3 };
  }

  private async extractData(text: string, classification: DocumentClassification): Promise<ExtractedData> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const extractedData: ExtractedData = {};

    // Extract patient demographics
    const nameMatch = text.match(/Patient:?\s*([A-Za-z\s]+)/i);
    const dobMatch = text.match(/DOB:?\s*(\d{2}\/\d{2}\/\d{4})/i);
    
    if (nameMatch || dobMatch) {
      extractedData.patientDemographics = {
        name: nameMatch?.[1]?.trim() || '',
        dateOfBirth: dobMatch?.[1] || '',
        address: '',
        phone: '',
        confidence: 0.85
      };
    }

    // Extract provider information
    const providerMatch = text.match(/(?:Provider|Physician|Doctor):?\s*([A-Za-z\s,]+(?:MD|DO|NP))/i);
    if (providerMatch) {
      extractedData.providerInformation = {
        name: providerMatch[1].trim(),
        specialty: '',
        address: '',
        phone: '',
        confidence: 0.8
      };
    }

    // Extract service dates
    const dateMatches = text.match(/(?:Date of Service|Study Date|Date Collected):?\s*(\d{2}\/\d{2}\/\d{4})/gi);
    if (dateMatches) {
      extractedData.serviceDates = dateMatches.map(match => ({
        date: match.split(':')[1]?.trim() || match,
        serviceType: classification,
        confidence: 0.9
      }));
    }

    // Extract diagnosis codes for medical documents
    if (['emergency-room-records', 'specialist-consultation'].includes(classification)) {
      const icdMatches = text.match(/ICD-10?:?\s*([A-Z]\d{2}\.?\d*[A-Z]?)/gi);
      if (icdMatches) {
        extractedData.diagnosisCodes = icdMatches.map(match => ({
          code: match.split(':')[1]?.trim() || match,
          description: 'Auto-extracted diagnosis code',
          type: 'primary' as const,
          confidence: 0.75
        }));
      }
    }

    // Extract billing amounts for financial documents
    if (classification === 'billing-statements') {
      const amountMatches = text.match(/\$\d+\.?\d*/g);
      if (amountMatches) {
        extractedData.billingAmounts = amountMatches.map(amount => ({
          chargeDescription: 'Medical services',
          amount: parseFloat(amount.replace('$', '')),
          dateOfService: new Date().toISOString().split('T')[0],
          confidence: 0.7
        }));
      }
    }

    return extractedData;
  }

  private async validateQuality(text: string, extractedData: ExtractedData): Promise<QualityValidation> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const issues: ValidationIssue[] = [];
    let completenessScore = 100;
    let legibilityScore = 90; // Mock OCR quality
    let accuracyScore = 85;

    // Check for completeness
    if (!extractedData.patientDemographics?.name) {
      issues.push({
        type: 'incomplete_data',
        description: 'Patient name not found',
        severity: 'high',
        confidence: 0.9
      });
      completenessScore -= 20;
    }

    if (!extractedData.serviceDates?.length) {
      issues.push({
        type: 'incomplete_data',
        description: 'Service date not found',
        severity: 'medium',
        confidence: 0.8
      });
      completenessScore -= 15;
    }

    // Check for legibility issues
    if (text.length < 100) {
      issues.push({
        type: 'legibility',
        description: 'Document appears to have poor text quality',
        severity: 'medium',
        confidence: 0.7
      });
      legibilityScore -= 20;
    }

    const overallScore = (completenessScore + legibilityScore + accuracyScore) / 3;

    return {
      completenessScore,
      legibilityScore,
      accuracyScore,
      overallScore,
      issues,
      missingDocuments: overallScore < 70 ? ['Additional documentation may be required'] : []
    };
  }

  async getProcessingStats(): Promise<ProcessingStats> {
    // Mock stats for demo
    return {
      totalDocuments: 156,
      successfullyProcessed: 142,
      averageProcessingTime: 2.3,
      averageConfidence: 0.87,
      classificationAccuracy: 0.94,
      topDocumentTypes: [
        { type: 'emergency-room-records', count: 45 },
        { type: 'laboratory-results', count: 38 },
        { type: 'imaging-reports', count: 32 },
        { type: 'specialist-consultation', count: 27 }
      ]
    };
  }

  async batchProcess(files: File[], settings: ProcessingSettings): Promise<ProcessedDocument[]> {
    const results: ProcessedDocument[] = [];
    
    for (const file of files) {
      try {
        const result = await this.processDocument(file, settings);
        results.push(result);
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
        // Create error document
        results.push({
          id: `error_${Date.now()}_${Math.random().toString(36).substring(2)}`,
          originalFileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          uploadedAt: new Date().toISOString(),
          status: 'failed',
          classification: 'unknown',
          extractedData: {},
          qualityValidation: {
            completenessScore: 0,
            legibilityScore: 0,
            accuracyScore: 0,
            overallScore: 0,
            issues: [{
              type: 'incomplete_data',
              description: `Processing failed: ${error}`,
              severity: 'high',
              confidence: 1.0
            }],
            missingDocuments: []
          },
          confidence: 0,
          processingTime: 0
        });
      }
    }
    
    return results;
  }
}

export const aiProcessingService = AIProcessingService.getInstance();
