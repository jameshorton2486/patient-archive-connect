
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner, LoadingState, EmptyState } from '@/components/ui/loading';
import { 
  FileText, 
  Download, 
  QrCode, 
  Send, 
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus
} from 'lucide-react';
import { DocumentType, GeneratedDocument, FirmBranding, DOCUMENT_TEMPLATES } from '@/types/document';
import { documentService } from '@/services/documentService';
import { toast } from '@/components/ui/sonner';

interface DocumentGenerationProps {
  onBack?: () => void;
}

// Mock data for demonstration
const mockClient = {
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

const mockProviders = [
  {
    id: 'provider_001',
    name: 'Dr. Sarah Johnson',
    specialty: 'Orthopedic Surgery',
    physicalAddress: {
      street: '456 Medical Plaza',
      city: 'Healthcare City',
      state: 'CA',
      zipCode: '90211'
    }
  },
  {
    id: 'provider_002',
    name: 'Regional Medical Center',
    specialty: 'Emergency Medicine',
    physicalAddress: {
      street: '789 Hospital Drive',
      city: 'Medical Town',
      state: 'CA',
      zipCode: '90212'
    }
  }
];

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
  secondaryColor: '#2d3748',
  letterheadTemplate: 'standard'
};

const documentTypeOptions: { value: DocumentType; label: string; description: string }[] = [
  { 
    value: 'hipaa-authorization', 
    label: 'HIPAA Authorization', 
    description: 'Patient authorization for medical record release' 
  },
  { 
    value: 'affidavit-notarization', 
    label: 'Affidavit for Notarization', 
    description: 'Sworn statement document for legal proceedings' 
  },
  { 
    value: 'records-request', 
    label: 'Medical Records Request', 
    description: 'Formal request letter to healthcare providers' 
  },
  { 
    value: 'follow-up-reminder', 
    label: 'Follow-up Reminder', 
    description: 'Courtesy reminder for pending requests' 
  },
  { 
    value: 'formal-follow-up', 
    label: 'Formal Follow-up', 
    description: 'Formal follow-up letter with legal implications' 
  },
  { 
    value: 'fee-payment', 
    label: 'Fee Payment Notice', 
    description: 'Payment notification for record processing fees' 
  },
  { 
    value: 'final-demand', 
    label: 'Final Demand Letter', 
    description: 'Final legal demand before formal action' 
  }
];

export function DocumentGeneration({ onBack }: DocumentGenerationProps) {
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentType[]>([]);
  const [generatedDocuments, setGeneratedDocuments] = useState<GeneratedDocument[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [additionalData, setAdditionalData] = useState<Record<string, string>>({});
  const [previewDocument, setPreviewDocument] = useState<GeneratedDocument | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

  const handleDocumentSelection = (docType: DocumentType) => {
    setSelectedDocuments(prev => 
      prev.includes(docType) 
        ? prev.filter(d => d !== docType)
        : [...prev, docType]
    );
  };

  const handleProviderSelection = (providerId: string) => {
    setSelectedProviders(prev => 
      prev.includes(providerId) 
        ? prev.filter(p => p !== providerId)
        : [...prev, providerId]
    );
  };

  const handleBatchGeneration = async () => {
    if (selectedDocuments.length === 0) {
      setError('Please select at least one document type to generate.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const providers = mockProviders.filter(p => selectedProviders.includes(p.id));
      const documents = documentService.batchGenerateDocuments(
        selectedDocuments,
        mockClient,
        providers,
        mockFirmBranding
      );
      
      setGeneratedDocuments(documents);
      toast.success(`Successfully generated ${documents.length} document(s)`);
    } catch (error) {
      console.error('Error generating documents:', error);
      setError('Failed to generate documents. Please try again.');
      toast.error('Document generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (document: GeneratedDocument) => {
    setDownloadingDoc(document.id);
    try {
      // Enhanced PDF download functionality
      await documentService.downloadDocument(document);
      toast.success('Document downloaded successfully');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download document');
    } finally {
      setDownloadingDoc(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'generated':
        return <CheckCircle className="h-4 w-4 text-green-500" aria-label="Generated" />;
      case 'sent':
        return <Send className="h-4 w-4 text-blue-500" aria-label="Sent" />;
      case 'signed':
        return <CheckCircle className="h-4 w-4 text-green-600" aria-label="Signed" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4 text-red-500" aria-label="Expired" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" aria-label="Pending" />;
    }
  };

  return (
    <div className="container-app space-y-6">
      {onBack && (
        <Button onClick={onBack} variant="outline" className="mb-4" aria-label="Return to dashboard">
          ← Back to Dashboard
        </Button>
      )}

      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-foreground">Document Generation Engine</h1>
      </div>

      {error && (
        <Alert variant="destructive" role="alert">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Selection */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle>Select Document Types</CardTitle>
            <CardDescription>Choose which documents to generate for this case</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {documentTypeOptions.map((option) => (
              <div key={option.value} className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id={option.value}
                  checked={selectedDocuments.includes(option.value)}
                  onChange={() => handleDocumentSelection(option.value)}
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  aria-describedby={`${option.value}-description`}
                />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  <p id={`${option.value}-description`} className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Provider Selection */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle>Select Healthcare Providers</CardTitle>
            <CardDescription>Choose providers for record requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockProviders.length > 0 ? (
              mockProviders.map((provider) => (
                <div key={provider.id} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id={provider.id}
                    checked={selectedProviders.includes(provider.id)}
                    onChange={() => handleProviderSelection(provider.id)}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    aria-describedby={`${provider.id}-description`}
                  />
                  <div className="flex-1">
                    <Label htmlFor={provider.id} className="font-medium cursor-pointer">
                      {provider.name}
                    </Label>
                    <p id={`${provider.id}-description`} className="text-sm text-muted-foreground">
                      {provider.specialty}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState 
                title="No providers available"
                description="Add healthcare providers to enable document generation"
                action={
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Provider
                  </Button>
                }
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Data */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Provide any additional details for document customization</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="feeAmount">Record Fee Amount</Label>
            <Input
              id="feeAmount"
              placeholder="$25.00"
              value={additionalData.feeAmount || ''}
              onChange={(e) => setAdditionalData(prev => ({ ...prev, feeAmount: e.target.value }))}
              aria-describedby="feeAmount-help"
            />
            <p id="feeAmount-help" className="text-xs text-muted-foreground mt-1">
              Standard processing fee for medical records
            </p>
          </div>
          <div>
            <Label htmlFor="originalRequestDate">Original Request Date</Label>
            <Input
              id="originalRequestDate"
              type="date"
              value={additionalData.originalRequestDate || ''}
              onChange={(e) => setAdditionalData(prev => ({ ...prev, originalRequestDate: e.target.value }))}
              aria-describedby="requestDate-help"
            />
            <p id="requestDate-help" className="text-xs text-muted-foreground mt-1">
              Date of initial record request
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleBatchGeneration}
          disabled={selectedDocuments.length === 0 || isGenerating}
          size="lg"
          className="btn-primary w-full md:w-auto min-h-[44px]"
          aria-busy={isGenerating}
          aria-describedby="generate-help"
        >
          {isGenerating ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Generating Documents...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Generate Documents ({selectedDocuments.length})
            </>
          )}
        </Button>
      </div>
      <p id="generate-help" className="text-center text-xs text-muted-foreground">
        Select document types and providers above to generate legal documents
      </p>

      {/* Generated Documents */}
      {generatedDocuments.length > 0 && (
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle>Generated Documents</CardTitle>
            <CardDescription>Download, preview, or manage your generated documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(doc.status)}
                    <div>
                      <p className="font-medium">{documentTypeOptions.find(opt => opt.value === doc.type)?.label}</p>
                      <p className="text-sm text-muted-foreground">
                        Tracking ID: {doc.trackingId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewDocument(doc)}
                      className="min-h-[44px] min-w-[44px]"
                      aria-label={`Preview ${documentTypeOptions.find(opt => opt.value === doc.type)?.label}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc)}
                      disabled={downloadingDoc === doc.id}
                      className="min-h-[44px] min-w-[44px]"
                      aria-label={`Download ${documentTypeOptions.find(opt => opt.value === doc.type)?.label}`}
                    >
                      {downloadingDoc === doc.id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center" aria-label="QR Code">
                      <QrCode className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Preview Modal */}
      {previewDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" role="dialog" aria-labelledby="preview-title">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 id="preview-title" className="text-xl font-semibold">Document Preview</h2>
                <Button variant="outline" onClick={() => setPreviewDocument(null)} aria-label="Close preview">
                  Close
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <pre className="whitespace-pre-wrap text-sm font-mono bg-muted p-4 rounded" aria-label="Document content">
                {previewDocument.content}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
