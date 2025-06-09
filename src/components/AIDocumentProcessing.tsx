
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Upload, 
  Brain, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Eye,
  Download,
  Settings,
  BarChart3
} from 'lucide-react';
import { 
  ProcessedDocument, 
  ProcessingSettings, 
  ProcessingStats,
  DOCUMENT_CLASSIFICATION_LABELS 
} from '@/types/ai-processing';
import { aiProcessingService } from '@/services/aiProcessingService';
import { useToast } from '@/hooks/use-toast';

interface AIDocumentProcessingProps {
  onBack?: () => void;
}

export function AIDocumentProcessing({ onBack }: AIDocumentProcessingProps) {
  const [processedDocuments, setProcessedDocuments] = useState<ProcessedDocument[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [processingStats, setProcessingStats] = useState<ProcessingStats | null>(null);
  const [previewDocument, setPreviewDocument] = useState<ProcessedDocument | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const [processingSettings, setProcessingSettings] = useState<ProcessingSettings>({
    enableOCR: true,
    enableClassification: true,
    enableDataExtraction: true,
    enableQualityValidation: true,
    confidenceThreshold: 0.7,
    language: 'en',
    customExtractionRules: []
  });

  React.useEffect(() => {
    loadProcessingStats();
  }, []);

  const loadProcessingStats = async () => {
    try {
      const stats = await aiProcessingService.getProcessingStats();
      setProcessingStats(stats);
    } catch (error) {
      console.error('Error loading processing stats:', error);
    }
  };

  const handleFileSelection = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  }, []);

  const handleProcessDocuments = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to process",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const results = await aiProcessingService.batchProcess(selectedFiles, processingSettings);
      setProcessedDocuments(prev => [...prev, ...results]);
      setSelectedFiles([]);
      
      const successCount = results.filter(r => r.status === 'completed').length;
      toast({
        title: "Processing Complete",
        description: `Successfully processed ${successCount} of ${results.length} documents`,
      });
      
      loadProcessingStats();
    } catch (error) {
      console.error('Error processing documents:', error);
      toast({
        title: "Processing Failed",
        description: "An error occurred while processing documents",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'needs_review':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <Brain className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default' as const;
      case 'failed':
        return 'destructive' as const;
      case 'needs_review':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {onBack && (
        <Button onClick={onBack} variant="outline" className="mb-4">
          ← Back to Dashboard
        </Button>
      )}

      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">AI Document Processing Engine</h1>
      </div>

      {/* Processing Stats */}
      {processingStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Processed</p>
                  <p className="text-2xl font-bold">{processingStats.totalDocuments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">
                    {Math.round((processingStats.successfullyProcessed / processingStats.totalDocuments) * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Confidence</p>
                  <p className="text-2xl font-bold">{Math.round(processingStats.averageConfidence * 100)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Time</p>
                  <p className="text-2xl font-bold">{processingStats.averageProcessingTime}s</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload and Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>Select documents for AI processing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.tiff"
                onChange={handleFileSelection}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Choose Files</span>
                </Button>
              </Label>
              <p className="text-sm text-muted-foreground mt-2">
                PDF, JPG, PNG, TIFF files supported
              </p>
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium">Selected Files ({selectedFiles.length})</p>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={handleProcessDocuments}
              disabled={selectedFiles.length === 0 || isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Process Documents
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Processing Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Processing Settings</CardTitle>
                <CardDescription>Configure AI processing options</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-ocr">OCR Text Extraction</Label>
              <Switch
                id="enable-ocr"
                checked={processingSettings.enableOCR}
                onCheckedChange={(checked) => 
                  setProcessingSettings(prev => ({ ...prev, enableOCR: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-classification">Document Classification</Label>
              <Switch
                id="enable-classification"
                checked={processingSettings.enableClassification}
                onCheckedChange={(checked) => 
                  setProcessingSettings(prev => ({ ...prev, enableClassification: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-extraction">Data Extraction</Label>
              <Switch
                id="enable-extraction"
                checked={processingSettings.enableDataExtraction}
                onCheckedChange={(checked) => 
                  setProcessingSettings(prev => ({ ...prev, enableDataExtraction: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-validation">Quality Validation</Label>
              <Switch
                id="enable-validation"
                checked={processingSettings.enableQualityValidation}
                onCheckedChange={(checked) => 
                  setProcessingSettings(prev => ({ ...prev, enableQualityValidation: checked }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Confidence Threshold: {Math.round(processingSettings.confidenceThreshold * 100)}%</Label>
              <Slider
                value={[processingSettings.confidenceThreshold]}
                onValueChange={([value]) => 
                  setProcessingSettings(prev => ({ ...prev, confidenceThreshold: value }))
                }
                max={1}
                min={0.1}
                step={0.05}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processed Documents */}
      {processedDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processed Documents</CardTitle>
            <CardDescription>Review AI processing results and extracted data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processedDocuments.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(doc.status)}
                      <div>
                        <p className="font-medium">{doc.originalFileName}</p>
                        <p className="text-sm text-muted-foreground">
                          {DOCUMENT_CLASSIFICATION_LABELS[doc.classification]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(doc.status)}>
                        {doc.status}
                      </Badge>
                      <span className={`text-sm font-medium ${getConfidenceColor(doc.confidence)}`}>
                        {Math.round(doc.confidence * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Processing Time</p>
                      <p className="font-medium">{(doc.processingTime / 1000).toFixed(2)}s</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Quality Score</p>
                      <p className="font-medium">{Math.round(doc.qualityValidation.overallScore)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data Points</p>
                      <p className="font-medium">
                        {Object.keys(doc.extractedData).length} extracted
                      </p>
                    </div>
                  </div>

                  {doc.qualityValidation.issues.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="text-sm font-medium text-yellow-800 mb-2">Quality Issues:</p>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {doc.qualityValidation.issues.map((issue, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3" />
                            {issue.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewDocument(doc)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export
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
                <h2 className="text-xl font-semibold">AI Processing Results</h2>
                <Button variant="outline" onClick={() => setPreviewDocument(null)}>
                  Close
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Document Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Classification:</p>
                    <p>{DOCUMENT_CLASSIFICATION_LABELS[previewDocument.classification]}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Confidence:</p>
                    <p className={getConfidenceColor(previewDocument.confidence)}>
                      {Math.round(previewDocument.confidence * 100)}%
                    </p>
                  </div>
                </div>
              </div>

              {previewDocument.extractedData.patientDemographics && (
                <div>
                  <h3 className="font-semibold mb-2">Patient Information</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <p><strong>Name:</strong> {previewDocument.extractedData.patientDemographics.name}</p>
                    <p><strong>DOB:</strong> {previewDocument.extractedData.patientDemographics.dateOfBirth}</p>
                  </div>
                </div>
              )}

              {previewDocument.ocrText && (
                <div>
                  <h3 className="font-semibold mb-2">Extracted Text</h3>
                  <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded max-h-60 overflow-y-auto">
                    {previewDocument.ocrText}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
