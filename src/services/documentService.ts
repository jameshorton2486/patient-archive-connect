
import { DocumentTemplate, GeneratedDocument, DocumentType, QRCodeData, FirmBranding, DOCUMENT_TEMPLATES } from '@/types/document';

export class DocumentService {
  private static instance: DocumentService;
  
  static getInstance(): DocumentService {
    if (!DocumentService.instance) {
      DocumentService.instance = new DocumentService();
    }
    return DocumentService.instance;
  }

  generateTrackingId(clientId: string, providerId?: string, documentType?: DocumentType): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    const prefix = documentType ? documentType.substring(0, 3).toUpperCase() : 'DOC';
    return `${prefix}-${timestamp}-${random}`;
  }

  generateQRCode(data: QRCodeData): string {
    // In a real implementation, this would generate an actual QR code
    // For now, we'll create a base64 data URL placeholder
    const qrData = JSON.stringify(data);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    
    canvas.width = 100;
    canvas.height = 100;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 100, 100);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '8px Arial';
    ctx.fillText(data.trackingId.substring(0, 12), 5, 50);
    
    return canvas.toDataURL();
  }

  replaceTemplateVariables(template: string, variables: Record<string, string>): string {
    let content = template;
    
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(regex, value || '[NOT PROVIDED]');
    });
    
    return content;
  }

  generateDocument(
    documentType: DocumentType,
    clientData: any,
    providerData?: any,
    firmBranding?: FirmBranding,
    additionalData?: Record<string, string>
  ): GeneratedDocument {
    const trackingId = this.generateTrackingId(clientData.id, providerData?.id, documentType);
    
    const qrCodeData: QRCodeData = {
      trackingId,
      clientId: clientData.id,
      providerId: providerData?.id,
      documentType,
      generatedDate: new Date().toISOString(),
      caseId: clientData.caseId || ''
    };

    const variables = {
      // Client information
      clientName: `${clientData.firstName} ${clientData.lastName}`,
      clientDOB: clientData.dateOfBirth,
      clientAddress: `${clientData.address?.street}, ${clientData.address?.city}, ${clientData.address?.state} ${clientData.address?.zipCode}`,
      
      // Provider information
      providerName: providerData?.name || '',
      providerAddress: providerData ? `${providerData.physicalAddress?.street}, ${providerData.physicalAddress?.city}, ${providerData.physicalAddress?.state} ${providerData.physicalAddress?.zipCode}` : '',
      
      // Firm information
      firmName: firmBranding?.firmName || 'Your Law Firm',
      firmAddress: firmBranding ? `${firmBranding.address.street}, ${firmBranding.address.city}, ${firmBranding.address.state} ${firmBranding.address.zipCode}` : '',
      firmPhone: firmBranding?.phone || '',
      firmLetterhead: this.generateLetterhead(firmBranding),
      attorneyName: firmBranding?.firmName || 'Attorney Name',
      
      // Case information
      incidentDate: clientData.injuryDetails?.dateOfIncident || '',
      incidentType: clientData.injuryDetails?.typeOfIncident || '',
      startDate: clientData.injuryDetails?.dateOfIncident || '',
      endDate: new Date().toLocaleDateString(),
      
      // System information
      trackingId,
      date: new Date().toLocaleDateString(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 1 year from now
      
      // State-specific information
      state: clientData.address?.state || '',
      county: 'County Name', // This would come from address lookup
      responseTimeFrame: '30', // State-specific requirement
      
      // Fee and payment information
      feeAmount: providerData?.treatmentInfo?.estimatedRecordsCost?.toString() || '25.00',
      
      // Follow-up dates
      followUpDate: new Date().toLocaleDateString(),
      originalRequestDate: new Date().toLocaleDateString(),
      
      // Additional variables
      ...additionalData
    };

    const template = DOCUMENT_TEMPLATES[documentType];
    const content = this.replaceTemplateVariables(template, variables);
    const qrCode = this.generateQRCode(qrCodeData);

    const document: GeneratedDocument = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      templateId: documentType,
      type: documentType,
      clientId: clientData.id,
      providerId: providerData?.id,
      content,
      qrCode,
      trackingId,
      status: 'generated',
      signatureRequired: ['hipaa-authorization', 'affidavit-notarization'].includes(documentType),
      createdAt: new Date().toISOString(),
      expiresAt: documentType === 'hipaa-authorization' ? 
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : undefined
    };

    return document;
  }

  private generateLetterhead(firmBranding?: FirmBranding): string {
    if (!firmBranding) {
      return `
YOUR LAW FIRM
123 Legal Street
Legal City, ST 12345
Phone: (555) 123-4567
`;
    }

    return `
${firmBranding.firmName}
${firmBranding.address.street}
${firmBranding.address.city}, ${firmBranding.address.state} ${firmBranding.address.zipCode}
Phone: ${firmBranding.phone}${firmBranding.fax ? '\nFax: ' + firmBranding.fax : ''}
${firmBranding.email ? 'Email: ' + firmBranding.email : ''}
${firmBranding.website ? 'Website: ' + firmBranding.website : ''}
`;
  }

  batchGenerateDocuments(
    documentTypes: DocumentType[],
    clientData: any,
    providers: any[],
    firmBranding?: FirmBranding
  ): GeneratedDocument[] {
    const documents: GeneratedDocument[] = [];

    documentTypes.forEach(docType => {
      if (docType === 'records-request' || docType === 'hipaa-authorization') {
        // Generate one document per provider
        providers.forEach(provider => {
          const doc = this.generateDocument(docType, clientData, provider, firmBranding);
          documents.push(doc);
        });
      } else {
        // Generate one document for the case
        const doc = this.generateDocument(docType, clientData, undefined, firmBranding);
        documents.push(doc);
      }
    });

    return documents;
  }

  exportToPDF(document: GeneratedDocument): Blob {
    // In a real implementation, this would use a PDF library like jsPDF or Puppeteer
    // For now, we'll create a simple text file
    const content = `${document.content}\n\nQR Code: ${document.trackingId}`;
    return new Blob([content], { type: 'text/plain' });
  }

  downloadDocument(document: GeneratedDocument): void {
    const blob = this.exportToPDF(document);
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.type}_${document.trackingId}.txt`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const documentService = DocumentService.getInstance();
