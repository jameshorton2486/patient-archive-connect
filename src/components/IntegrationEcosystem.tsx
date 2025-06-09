
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Zap, 
  FileText, 
  Users, 
  Calendar,
  Signature,
  Brain,
  TrendingUp,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import { 
  CaseManagementIntegration, 
  ESignatureIntegration, 
  PredictiveAnalytics,
  NLPService,
  IntegrationStats 
} from '@/types/integrations';
import { integrationService } from '@/services/integrationService';

interface IntegrationEcosystemProps {
  onBack?: () => void;
}

export function IntegrationEcosystem({ onBack }: IntegrationEcosystemProps) {
  const [caseManagementIntegrations, setCaseManagementIntegrations] = useState<CaseManagementIntegration[]>([]);
  const [eSignatureIntegrations, setESignatureIntegrations] = useState<ESignatureIntegration[]>([]);
  const [predictiveAnalytics, setPredictiveAnalytics] = useState<PredictiveAnalytics[]>([]);
  const [nlpServices, setNLPServices] = useState<NLPService[]>([]);
  const [statistics, setStatistics] = useState<IntegrationStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [caseIntegrations, signatureIntegrations, analytics, nlp, stats] = await Promise.all([
        integrationService.getCaseManagementIntegrations(),
        integrationService.getESignatureIntegrations(),
        integrationService.getPredictiveAnalytics(),
        integrationService.getNLPServices(),
        integrationService.getIntegrationStatistics()
      ]);

      setCaseManagementIntegrations(caseIntegrations);
      setESignatureIntegrations(signatureIntegrations);
      setPredictiveAnalytics(analytics);
      setNLPServices(nlp);
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading integration data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async (integrationId: string) => {
    try {
      await integrationService.syncCaseManagement(integrationId);
      await loadData();
    } catch (error) {
      console.error('Error syncing integration:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'syncing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
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
        <Zap className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Integration Ecosystem</h1>
      </div>

      {/* Statistics Overview */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{statistics.activeIntegrations}</p>
                  <p className="text-sm text-muted-foreground">Active Integrations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{statistics.documentsProcessed}</p>
                  <p className="text-sm text-muted-foreground">Documents Processed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{statistics.timesSaved}h</p>
                  <p className="text-sm text-muted-foreground">Time Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{(statistics.syncSuccessRate * 100).toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="case-management" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="case-management">Case Management</TabsTrigger>
          <TabsTrigger value="e-signature">E-Signature</TabsTrigger>
          <TabsTrigger value="ai-analytics">AI Analytics</TabsTrigger>
          <TabsTrigger value="nlp-services">NLP Services</TabsTrigger>
        </TabsList>

        {/* Case Management Integrations */}
        <TabsContent value="case-management">
          <Card>
            <CardHeader>
              <CardTitle>Case Management Systems</CardTitle>
              <CardDescription>Connect with legal practice management platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseManagementIntegrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(integration.syncStatus)}
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {integration.provider.replace('-', ' ')}
                        </p>
                        {integration.lastSync && (
                          <p className="text-xs text-muted-foreground">
                            Last sync: {new Date(integration.lastSync).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={integration.enabled} />
                      {integration.enabled && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSync(integration.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* E-Signature Integrations */}
        <TabsContent value="e-signature">
          <Card>
            <CardHeader>
              <CardTitle>E-Signature Platforms</CardTitle>
              <CardDescription>Digital signature and document execution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eSignatureIntegrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Signature className="h-5 w-5 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Environment: {integration.environment}
                        </p>
                        {integration.lastUsed && (
                          <p className="text-xs text-muted-foreground">
                            Last used: {new Date(integration.lastUsed).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={integration.status === 'active' ? 'default' : 'secondary'}>
                        {integration.status}
                      </Badge>
                      <Switch checked={integration.enabled} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Analytics */}
        <TabsContent value="ai-analytics">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Analytics</CardTitle>
              <CardDescription>AI-powered insights and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictiveAnalytics.map((analytics) => (
                  <div key={analytics.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Brain className="h-5 w-5 text-purple-600" />
                      <div>
                        <h3 className="font-medium capitalize">
                          {analytics.type.replace('-', ' ')} Prediction
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Accuracy: {(analytics.accuracy * 100).toFixed(1)}% | 
                          Training Data: {analytics.trainingDataSize.toLocaleString()} records
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last updated: {new Date(analytics.lastUpdated).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Switch checked={analytics.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NLP Services */}
        <TabsContent value="nlp-services">
          <Card>
            <CardHeader>
              <CardTitle>Natural Language Processing</CardTitle>
              <CardDescription>Document analysis and content extraction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nlpServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <h3 className="font-medium capitalize">
                          {service.type.replace('-', ' ')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Model: {service.model} | 
                          Processed: {service.processedDocuments} documents
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last used: {new Date(service.lastUsed).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Switch checked={service.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
