
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  Brain, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  BarChart3,
  Download,
  Scan,
  Bot
} from 'lucide-react';
import { ProcessedDocument, DocumentClassification, DOCUMENT_CLASSIFICATION_LABELS } from '@/types/ai-processing';
import { aiProcessingService } from '@/services/aiProcessingService';

interface AIDocumentEngineProps {
  onBack?: () => void;
}

const DOCUMENT_TYPES = [
  'emergency_records', 'specialist_consultations', 'diagnostic_imaging',
  'laboratory_results', 'therapy_notes', 'surgical_reports',
  'billing_statements', 'insurance_correspondence', 'pharmacy_records'
];

export function AIDocumentEngine({ onBack }: AIDocumentEngineProps) {
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processedDocuments, setProcessedDocuments] = useState<ProcessedDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<ProcessedDocument | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    await processFiles(files);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await processFiles(files);
  };

  const processFiles = async (files: File[]) => {
    setProcessing(true);
    setProcessingProgress(0);

    const settings = {
      enableOCR: true,
      enableClassification: true,
      enableDataExtraction: true,
      enableQualityValidation: true,
      confidenceThreshold: 0.85,
      language: 'en' as const,
      customExtractionRules: []
    };

    try {
      const results = await aiProcessingService.batchProcess(files, settings);
      
      // Simulate processing progress
      for (let i = 0; i <= 100; i += 10) {
        setProcessingProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setProcessedDocuments(prev => [...prev, ...results]);
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      setProcessing(false);
      setProcessingProgress(0);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'needs_review':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <Zap className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {onBack && (
        <Button onClick={onBack} variant="outline" className="mb-4">
          ← Back to Dashboard
        </Button>
      )}

      <div className="flex items-center gap-2 mb-6">
        <Bot className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">AI Document Processing Engine</h1>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Document Upload & Processing
          </CardTitle>
          <CardDescription>
            AI-powered classification and data extraction for medical records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">
              Drop medical documents here or click to upload
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Supports PDF, TIFF, JPEG, PNG. Automatically processes with 95%+ accuracy
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.tiff,.tif,.jpeg,.jpg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button asChild className="cursor-pointer">
              <label htmlFor="file-upload">
                <Upload className="h-4 w-4 mr-2" />
                Select Files
              </label>
            </Button>
          </div>

          {processing && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Scan className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Processing documents...</span>
              </div>
              <Progress value={processingProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Results */}
      {processedDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Processing Results
            </CardTitle>
            <CardDescription>
              AI analysis and extracted data from uploaded documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processedDocuments.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(doc.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{doc.originalFileName}</h3>
                          <Badge variant={doc.status === 'completed' ? 'default' : 'secondary'}>
                            {DOCUMENT_CLASSIFICATION_LABELS[doc.classification as DocumentClassification]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Confidence: <span className={getConfidenceColor(doc.confidence)}>{(doc.confidence * 100).toFixed(1)}%</span></span>
                          <span>Quality: {doc.qualityValidation.overallScore.toFixed(1)}/100</span>
                          <span>Processing: {doc.processingTime}ms</span>
                        </div>
                        
                        {/* Extracted Data Preview */}
                        {doc.extractedData.patientDemographics && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Patient:</span> {doc.extractedData.patientDemographics.name}
                            {doc.extractedData.patientDemographics.dateOfBirth && (
                              <span className="ml-2">DOB: {doc.extractedData.patientDemographics.dateOfBirth}</span>
                            )}
                          </div>
                        )}

                        {/* Quality Issues */}
                        {doc.qualityValidation.issues.length > 0 && (
                          <div className="mt-2">
                            <div className="flex items-center gap-1 text-sm text-yellow-600">
                              <AlertTriangle className="h-3 w-3" />
                              <span>{doc.qualityValidation.issues.length} quality issues detected</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDocument(doc)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Download extracted data as JSON
                          const blob = new Blob([JSON.stringify(doc.extractedData, null, 2)], {
                            type: 'application/json'
                          });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `extracted_data_${doc.originalFileName}.json`;
                          a.click();
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Document Analysis Results</h2>
                <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                  Close
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Document Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">File:</span> {selectedDocument.originalFileName}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {DOCUMENT_CLASSIFICATION_LABELS[selectedDocument.classification as DocumentClassification]}
                  </div>
                  <div>
                    <span className="font-medium">Confidence:</span> {(selectedDocument.confidence * 100).toFixed(1)}%
                  </div>
                  <div>
                    <span className="font-medium">Processing Time:</span> {selectedDocument.processingTime}ms
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Extracted Data</h3>
                <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                  {JSON.stringify(selectedDocument.extractedData, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Quality Assessment</h3>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{selectedDocument.qualityValidation.completenessScore}</div>
                    <div className="text-sm text-muted-foreground">Completeness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{selectedDocument.qualityValidation.legibilityScore}</div>
                    <div className="text-sm text-muted-foreground">Legibility</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{selectedDocument.qualityValidation.accuracyScore}</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{selectedDocument.qualityValidation.overallScore.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">Overall</div>
                  </div>
                </div>

                {selectedDocument.qualityValidation.issues.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Quality Issues</h4>
                    <div className="space-y-2">
                      {selectedDocument.qualityValidation.issues.map((issue, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                          <div>
                            <div className="font-medium">{issue.type}</div>
                            <div className="text-muted-foreground">{issue.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedDocument.ocrText && (
                <div>
                  <h3 className="text-lg font-medium mb-2">OCR Text</h3>
                  <div className="bg-muted p-4 rounded text-sm max-h-40 overflow-y-auto">
                    {selectedDocument.ocrText}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
