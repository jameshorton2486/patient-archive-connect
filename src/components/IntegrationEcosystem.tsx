
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
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'configured':
        return <Settings className="h-4 w-4 text-accent" />;
      case 'available':
        return <Link className="h-4 w-4 text-muted-foreground" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'case_management':
        return <Building className="h-5 w-5 text-primary" />;
      case 'communication':
        return <MessageSquare className="h-5 w-5 text-accent" />;
      case 'document':
        return <FileText className="h-5 w-5 text-warning" />;
      case 'medical':
        return <Stethoscope className="h-5 w-5 text-success" />;
      case 'financial':
        return <TrendingUp className="h-5 w-5 text-destructive" />;
      default:
        return <Database className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'connected':
        return 'success';
      case 'configured':
        return 'info';
      case 'available':
        return 'secondary';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8 space-y-8">
        {onBack && (
          <Button onClick={onBack} variant="outline" className="mb-6 hover:bg-accent hover:text-accent-foreground transition-colors">
            ← Back to Dashboard
          </Button>
        )}

        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
              <Zap className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground tracking-tight">Integration Ecosystem</h1>
              <p className="text-lg text-muted-foreground mt-1">Enterprise-grade legal technology integrations</p>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Overview */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Active Integrations</p>
                    <p className="text-3xl font-bold text-foreground">{statistics.activeIntegrations}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                    <Settings className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Documents Processed</p>
                    <p className="text-3xl font-bold text-foreground">{statistics.documentsProcessed.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-success/10 border border-success/20">
                    <FileText className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Time Saved</p>
                    <p className="text-3xl font-bold text-foreground">{statistics.timesSaved}h</p>
                  </div>
                  <div className="p-3 rounded-xl bg-warning/10 border border-warning/20">
                    <Clock className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <p className="text-3xl font-bold text-foreground">{(statistics.syncSuccessRate * 100).toFixed(1)}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-success/10 border border-success/20">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Professional Tabs */}
        <Tabs defaultValue="legal-tech" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-muted/30 p-1 h-14 rounded-xl border">
            <TabsTrigger 
              value="legal-tech" 
              className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border transition-all duration-300 rounded-lg font-medium"
            >
              <Building className="h-4 w-4 mr-2" />
              Legal Tech
            </TabsTrigger>
            <TabsTrigger 
              value="communication"
              className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border transition-all duration-300 rounded-lg font-medium"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Communication
            </TabsTrigger>
            <TabsTrigger 
              value="document-services"
              className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border transition-all duration-300 rounded-lg font-medium"
            >
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="medical-systems"
              className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border transition-all duration-300 rounded-lg font-medium"
            >
              <Stethoscope className="h-4 w-4 mr-2" />
              Medical
            </TabsTrigger>
            <TabsTrigger 
              value="ai-analytics"
              className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border transition-all duration-300 rounded-lg font-medium"
            >
              <Brain className="h-4 w-4 mr-2" />
              AI Analytics
            </TabsTrigger>
          </TabsList>

          {/* Legal Technology Integrations */}
          <TabsContent value="legal-tech" className="space-y-6">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Legal Technology Stack</CardTitle>
                    <CardDescription className="text-base">Case management and legal research platforms</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Enterprise Integrations</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {groupedIntegrations.case_management?.filter(i => i.tier === 'tier_1').map((integration) => (
                      <Card key={integration.id} className="group hover:shadow-md transition-all duration-300 border bg-background/50">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(integration.status)}
                              <div>
                                <h4 className="font-semibold text-foreground text-lg">{integration.name}</h4>
                                <p className="text-sm text-muted-foreground">Tier {integration.tier.split('_')[1]} Integration</p>
                              </div>
                            </div>
                            <Badge variant={getStatusBadgeVariant(integration.status) as any} className="capitalize font-medium">
                              {integration.status}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground mb-4 leading-relaxed">{integration.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {integration.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs font-medium px-3 py-1 bg-accent/5 text-accent border-accent/20">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            {integration.lastSync && (
                              <span className="text-xs text-muted-foreground">
                                Last sync: {new Date(integration.lastSync).toLocaleString()}
                              </span>
                            )}
                            <Button 
                              size="sm" 
                              variant={integration.status === 'connected' ? 'outline' : 'default'}
                              className="ml-auto transition-colors"
                            >
                              {integration.status === 'connected' ? 'Configure' : 'Connect'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Platforms */}
          <TabsContent value="communication" className="space-y-6">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <MessageSquare className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Communication Platforms</CardTitle>
                    <CardDescription className="text-base">Email, messaging, and collaboration tools</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupedIntegrations.communication?.map((integration) => (
                    <Card key={integration.id} className="group hover:shadow-md transition-all duration-300 border bg-background/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                              {getCategoryIcon(integration.category)}
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground text-lg">{integration.name}</h3>
                              <p className="text-muted-foreground">{integration.description}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {integration.features.map((feature, index) => (
                                  <Badge key={index} variant="outline" className="text-xs font-medium px-3 py-1 bg-accent/5 text-accent border-accent/20">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={getStatusBadgeVariant(integration.status) as any} className="capitalize font-medium">
                              {integration.status}
                            </Badge>
                            <Switch checked={integration.status === 'connected'} className="data-[state=checked]:bg-success" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Document Services */}
          <TabsContent value="document-services" className="space-y-6">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10 border border-warning/20">
                    <Signature className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Document & E-Signature Services</CardTitle>
                    <CardDescription className="text-base">Digital signatures and document delivery</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eSignatureIntegrations.map((integration) => (
                    <Card key={integration.id} className="group hover:shadow-md transition-all duration-300 border bg-background/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-warning/10 border border-warning/20">
                              <Signature className="h-5 w-5 text-warning" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground text-lg">{integration.name}</h3>
                              <p className="text-muted-foreground">Environment: {integration.environment}</p>
                              {integration.lastUsed && (
                                <p className="text-xs text-muted-foreground">
                                  Last used: {new Date(integration.lastUsed).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={integration.status === 'active' ? 'success' : 'secondary'} className="capitalize font-medium">
                              {integration.status}
                            </Badge>
                            <Switch checked={integration.enabled} className="data-[state=checked]:bg-success" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Systems */}
          <TabsContent value="medical-systems" className="space-y-6">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10 border border-success/20">
                    <Stethoscope className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Healthcare & Medical Integrations</CardTitle>
                    <CardDescription className="text-base">EHR systems, provider databases, and medical coding</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupedIntegrations.medical?.map((integration) => (
                    <Card key={integration.id} className="group hover:shadow-md transition-all duration-300 border bg-background/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-success/10 border border-success/20">
                              <Stethoscope className="h-5 w-5 text-success" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground text-lg">{integration.name}</h3>
                              <p className="text-muted-foreground">{integration.description}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {integration.features.map((feature, index) => (
                                  <Badge key={index} variant="outline" className="text-xs font-medium px-3 py-1 bg-success/5 text-success border-success/20">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                              {integration.lastSync && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  Last sync: {new Date(integration.lastSync).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={getStatusBadgeVariant(integration.status) as any} className="capitalize font-medium">
                              {integration.status}
                            </Badge>
                            <Button size="sm" variant={integration.status === 'connected' ? 'outline' : 'default'}>
                              {integration.status === 'connected' ? 'Sync' : 'Connect'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Analytics */}
          <TabsContent value="ai-analytics" className="space-y-6">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/20">
                    <Brain className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">AI Analytics & Processing</CardTitle>
                    <CardDescription className="text-base">Machine learning and natural language processing</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveAnalytics.map((analytics) => (
                    <Card key={analytics.id} className="group hover:shadow-md transition-all duration-300 border bg-background/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                              <Brain className="h-5 w-5 text-destructive" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground text-lg capitalize">
                                {analytics.type.replace('-', ' ')} Prediction
                              </h3>
                              <p className="text-muted-foreground">
                                Accuracy: {(analytics.accuracy * 100).toFixed(1)}% | 
                                Training Data: {analytics.trainingDataSize.toLocaleString()} records
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Last updated: {new Date(analytics.lastUpdated).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Switch checked={analytics.enabled} className="data-[state=checked]:bg-success" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {nlpServices.map((service) => (
                    <Card key={service.id} className="group hover:shadow-md transition-all duration-300 border bg-background/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-success/10 border border-success/20">
                              <Shield className="h-5 w-5 text-success" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground text-lg capitalize">
                                {service.type.replace('-', ' ')}
                              </h3>
                              <p className="text-muted-foreground">
                                Model: {service.model} | 
                                Processed: {service.processedDocuments} documents
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Last used: {new Date(service.lastUsed).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Switch checked={service.enabled} className="data-[state=checked]:bg-success" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
