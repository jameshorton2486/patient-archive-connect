
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Download, Send, Eye, Stamp } from 'lucide-react';
import { documentService } from '@/services/documentService';
import { DocumentType, GeneratedDocument, FirmBranding } from '@/types/document';

interface AutomatedDocumentGeneratorProps {
  clientData?: any;
  providerData?: any;
  onDocumentsGenerated?: (documents: GeneratedDocument[]) => void;
}

// Mock firm branding data
const mockFirmBranding: FirmBranding = {
  firmName: 'Smith & Associates Law Firm',
  address: {
    street: '100 Legal Boulevard',
    city: 'Law City',
    state: 'CA',
    zipCode: '90213'
  },
  phone: '(555) 123-LEGAL',
  fax: '(555) 123-4568',
  email: 'info@smithlaw.com',
  website: 'www.smithlaw.com',
  primaryColor: '#1a365d',
  secondaryColor: '#2d3748'
};

// Mock client data if not provided
const defaultClientData = {
  id: 'client_001',
  caseId: '2025-SMITH-001',
  firstName: 'John',
  lastName: 'Smith',
  dateOfBirth: '1985-03-15',
  address: {
    street: '123 Main Street',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90210'
  },
  injuryDetails: {
    dateOfIncident: '2024-12-01',
    typeOfIncident: 'Motor Vehicle Accident'
  }
};

// Mock provider data if not provided
const defaultProviderData = {
  id: 'provider_001',
  name: 'Dr. Sarah Johnson',
  specialty: 'Orthopedic Surgery',
  npiNumber: '1234567890',
  facilityName: 'Regional Medical Center',
  phone: '(555) 456-7890',
  physicalAddress: {
    street: '456 Medical Plaza',
    city: 'Healthcare City',
    state: 'CA',
    zipCode: '90211'
  }
};

const documentTypes = [
  { 
    value: 'hipaa-authorization' as DocumentType, 
    label: 'HIPAA Authorization Form',
    description: 'Patient authorization for medical record release',
    requiresSignature: true
  },
  { 
    value: 'records-request' as DocumentType, 
    label: 'Medical Records Request Letter',
    description: 'Formal request letter to healthcare providers',
    requiresSignature: false
  },
  { 
    value: 'affidavit-notarization' as DocumentType, 
    label: 'Affidavit for Notarization',
    description: 'Sworn statement document for legal proceedings',
    requiresSignature: true
  }
];

export function AutomatedDocumentGenerator({ 
  clientData = defaultClientData, 
  providerData = defaultProviderData,
  onDocumentsGenerated 
}: AutomatedDocumentGeneratorProps) {
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentType[]>([]);
  const [generatedDocuments, setGeneratedDocuments] = useState<GeneratedDocument[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [firmBranding, setFirmBranding] = useState(mockFirmBranding);
  const [previewDocument, setPreviewDocument] = useState<GeneratedDocument | null>(null);

  const handleDocumentSelection = (docType: DocumentType, checked: boolean) => {
    setSelectedDocuments(prev => 
      checked 
        ? [...prev, docType]
        : prev.filter(d => d !== docType)
    );
  };

  const handleGenerateDocuments = async () => {
    setIsGenerating(true);
    
    try {
      const documents: GeneratedDocument[] = [];
      
      for (const docType of selectedDocuments) {
        const document = documentService.generateDocument(
          docType,
          clientData,
          providerData,
          firmBranding
        );
        documents.push(document);
      }
      
      setGeneratedDocuments(documents);
      onDocumentsGenerated?.(documents);
    } catch (error) {
      console.error('Error generating documents:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (document: GeneratedDocument) => {
    documentService.downloadDocument(document);
  };

  const handlePreview = (document: GeneratedDocument) => {
    setPreviewDocument(document);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Automated Document Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Generate professional legal documents with firm branding and client information automatically populated.
          </p>
        </CardContent>
      </Card>

      {/* Document Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Documents to Generate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {documentTypes.map((docType) => (
            <div key={docType.value} className="flex items-start space-x-3">
              <Checkbox
                id={docType.value}
                checked={selectedDocuments.includes(docType.value)}
                onCheckedChange={(checked) => 
                  handleDocumentSelection(docType.value, checked as boolean)
                }
              />
              <div className="flex-1 space-y-1">
                <Label htmlFor={docType.value} className="font-medium cursor-pointer flex items-center gap-2">
                  {docType.label}
                  {docType.requiresSignature && <Stamp className="h-4 w-4 text-orange-500" />}
                </Label>
                <p className="text-sm text-muted-foreground">{docType.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Firm Branding Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Firm Branding</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firmName">Firm Name</Label>
            <Input
              id="firmName"
              value={firmBranding.firmName}
              onChange={(e) => setFirmBranding(prev => ({ ...prev, firmName: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="firmPhone">Phone</Label>
            <Input
              id="firmPhone"
              value={firmBranding.phone}
              onChange={(e) => setFirmBranding(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="firmEmail">Email</Label>
            <Input
              id="firmEmail"
              value={firmBranding.email || ''}
              onChange={(e) => setFirmBranding(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="firmWebsite">Website</Label>
            <Input
              id="firmWebsite"
              value={firmBranding.website || ''}
              onChange={(e) => setFirmBranding(prev => ({ ...prev, website: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleGenerateDocuments}
          disabled={selectedDocuments.length === 0 || isGenerating}
          size="lg"
          className="w-full md:w-auto"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
              Generating Documents...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Generate {selectedDocuments.length} Document{selectedDocuments.length !== 1 ? 's' : ''}
            </>
          )}
        </Button>
      </div>

      {/* Generated Documents */}
      {generatedDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">
                        {documentTypes.find(dt => dt.value === doc.type)?.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tracking ID: {doc.trackingId}
                      </p>
                      {doc.signatureRequired && (
                        <div className="flex items-center gap-1 text-orange-600 text-xs">
                          <Stamp className="h-3 w-3" />
                          Signature Required
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(doc)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Preview Modal */}
      {previewDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Document Preview</h2>
                <Button variant="outline" onClick={() => setPreviewDocument(null)}>
                  Close
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <pre className="whitespace-pre-wrap text-sm font-mono bg-muted p-4 rounded">
                {previewDocument.content}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
