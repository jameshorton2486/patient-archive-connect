
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
  RefreshCw,
  Building,
  Mail,
  MessageSquare,
  Stethoscope,
  Database,
  Link
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

interface ThirdPartyIntegration {
  id: string;
  name: string;
  category: 'case_management' | 'communication' | 'document' | 'medical' | 'financial';
  tier: 'tier_1' | 'tier_2';
  status: 'connected' | 'available' | 'configured' | 'error';
  description: string;
  features: string[];
  lastSync?: string;
}

export function IntegrationEcosystem({ onBack }: IntegrationEcosystemProps) {
  const [caseManagementIntegrations, setCaseManagementIntegrations] = useState<CaseManagementIntegration[]>([]);
  const [eSignatureIntegrations, setESignatureIntegrations] = useState<ESignatureIntegration[]>([]);
  const [predictiveAnalytics, setPredictiveAnalytics] = useState<PredictiveAnalytics[]>([]);
  const [nlpServices, setNLPServices] = useState<NLPService[]>([]);
  const [thirdPartyIntegrations, setThirdPartyIntegrations] = useState<ThirdPartyIntegration[]>([]);
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

      // Load third-party integrations
      setThirdPartyIntegrations([
        {
          id: 'clio_advanced',
          name: 'Clio',
          category: 'case_management',
          tier: 'tier_1',
          status: 'connected',
          description: 'Full bidirectional sync, automated billing',
          features: ['Case sync', 'Document sync', 'Time tracking', 'Billing automation'],
          lastSync: new Date().toISOString()
        },
        {
          id: 'lexisnexis',
          name: 'LexisNexis',
          category: 'case_management',
          tier: 'tier_1',
          status: 'available',
          description: 'Legal research integration',
          features: ['Legal research', 'Case law lookup', 'Statute validation']
        },
        {
          id: 'outlook',
          name: 'Microsoft Outlook',
          category: 'communication',
          tier: 'tier_1',
          status: 'connected',
          description: 'Calendar and email sync',
          features: ['Email sync', 'Calendar integration', 'Contact management'],
          lastSync: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'slack',
          name: 'Slack',
          category: 'communication',
          tier: 'tier_2',
          status: 'configured',
          description: 'Team collaboration alerts',
          features: ['Real-time notifications', 'Case updates', 'Team messaging']
        },
        {
          id: 'npi_registry',
          name: 'NPI Registry',
          category: 'medical',
          tier: 'tier_1',
          status: 'connected',
          description: 'Provider validation and lookup',
          features: ['Provider verification', 'NPI lookup', 'Credential validation'],
          lastSync: new Date().toISOString()
        },
        {
          id: 'epic_mychart',
          name: 'Epic MyChart',
          category: 'medical',
          tier: 'tier_1',
          status: 'available',
          description: 'Patient portal integration',
          features: ['Patient records', 'Appointment data', 'Test results']
        }
      ]);
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
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'configured':
        return <Settings className="h-4 w-4 text-blue-500" />;
      case 'available':
        return <Link className="h-4 w-4 text-gray-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'case_management':
        return <Building className="h-4 w-4" />;
      case 'communication':
        return <MessageSquare className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'medical':
        return <Stethoscope className="h-4 w-4" />;
      case 'financial':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const groupedIntegrations = thirdPartyIntegrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = [];
    }
    acc[integration.category].push(integration);
    return acc;
  }, {} as Record<string, ThirdPartyIntegration[]>);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {onBack && (
        <Button onClick={onBack} variant="outline" className="mb-4">
          ← Back to Dashboard
        </Button>
      )}

      <div className="flex items-center gap-2 mb-6">
        <Zap className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Advanced Integration Ecosystem</h1>
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

      <Tabs defaultValue="legal-tech" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="legal-tech">Legal Tech</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="document-services">Documents</TabsTrigger>
          <TabsTrigger value="medical-systems">Medical</TabsTrigger>
          <TabsTrigger value="ai-analytics">AI Analytics</TabsTrigger>
        </TabsList>

        {/* Legal Technology Integrations */}
        <TabsContent value="legal-tech">
          <Card>
            <CardHeader>
              <CardTitle>Legal Technology Stack</CardTitle>
              <CardDescription>Case management and legal research platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Tier 1 Integrations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupedIntegrations.case_management?.filter(i => i.tier === 'tier_1').map((integration) => (
                      <div key={integration.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(integration.status)}
                            <h4 className="font-medium">{integration.name}</h4>
                          </div>
                          <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                            {integration.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {integration.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          {integration.lastSync && (
                            <span className="text-xs text-muted-foreground">
                              Last sync: {new Date(integration.lastSync).toLocaleString()}
                            </span>
                          )}
                          <Button size="sm" variant={integration.status === 'connected' ? 'outline' : 'default'}>
                            {integration.status === 'connected' ? 'Configure' : 'Connect'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Platforms */}
        <TabsContent value="communication">
          <Card>
            <CardHeader>
              <CardTitle>Communication Platforms</CardTitle>
              <CardDescription>Email, messaging, and collaboration tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groupedIntegrations.communication?.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(integration.category)}
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {integration.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                        {integration.status}
                      </Badge>
                      <Switch checked={integration.status === 'connected'} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Document Services */}
        <TabsContent value="document-services">
          <Card>
            <CardHeader>
              <CardTitle>Document & E-Signature Services</CardTitle>
              <CardDescription>Digital signatures and document delivery</CardDescription>
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

        {/* Medical Systems */}
        <TabsContent value="medical-systems">
          <Card>
            <CardHeader>
              <CardTitle>Healthcare & Medical Integrations</CardTitle>
              <CardDescription>EHR systems, provider databases, and medical coding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groupedIntegrations.medical?.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Stethoscope className="h-5 w-5 text-green-600" />
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {integration.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        {integration.lastSync && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Last sync: {new Date(integration.lastSync).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                        {integration.status}
                      </Badge>
                      <Button size="sm" variant={integration.status === 'connected' ? 'outline' : 'default'}>
                        {integration.status === 'connected' ? 'Sync' : 'Connect'}
                      </Button>
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
              <CardTitle>AI Analytics & Processing</CardTitle>
              <CardDescription>Machine learning and natural language processing</CardDescription>
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
