
import { GeneratedDocument, DocumentType, QRCodeData, FirmBranding, DOCUMENT_TEMPLATES } from '@/types/document';

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
    // Simple QR code placeholder - in production would use proper QR library
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
      providerId: providerData?.id || '',
      trackingUrl: `https://app.example.com/track/${trackingId}`,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      securityHash: 'secure_hash_placeholder',
      requestId: trackingId,
      documentType,
      generatedDate: new Date().toISOString(),
      caseId: clientData.caseId || ''
    };

    const variables = {
      clientName: `${clientData.firstName} ${clientData.lastName}`,
      clientDOB: clientData.dateOfBirth,
      clientAddress: clientData.address ? `${clientData.address.street}, ${clientData.address.city}, ${clientData.address.state} ${clientData.address.zipCode}` : '',
      providerName: providerData?.name || '',
      providerAddress: providerData?.physicalAddress ? `${providerData.physicalAddress.street}, ${providerData.physicalAddress.city}, ${providerData.physicalAddress.state} ${providerData.physicalAddress.zipCode}` : '',
      firmName: firmBranding?.firmName || 'Your Law Firm',
      firmAddress: firmBranding ? `${firmBranding.address.street}, ${firmBranding.address.city}, ${firmBranding.address.state} ${firmBranding.address.zipCode}` : '',
      attorneyName: firmBranding?.firmName || 'Attorney Name',
      incidentDate: clientData.injuryDetails?.dateOfInjury || '',
      startDate: clientData.injuryDetails?.dateOfInjury || '',
      endDate: new Date().toLocaleDateString(),
      trackingId,
      date: new Date().toLocaleDateString(),
      followUpDate: new Date().toLocaleDateString(),
      originalRequestDate: new Date().toLocaleDateString(),
      ...additionalData
    };

    const template = DOCUMENT_TEMPLATES[documentType];
    const content = this.replaceTemplateVariables(template, variables);
    const qrCode = this.generateQRCode(qrCodeData);

    const document: GeneratedDocument = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substring(2)}`,
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

  // Add the missing batchGenerateDocuments method
  batchGenerateDocuments(
    documentTypes: DocumentType[],
    clientData: any,
    providerData?: any,
    firmBranding?: FirmBranding
  ): GeneratedDocument[] {
    return documentTypes.map(type => 
      this.generateDocument(type, clientData, providerData, firmBranding)
    );
  }

  exportToPDF(document: GeneratedDocument): Blob {
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
