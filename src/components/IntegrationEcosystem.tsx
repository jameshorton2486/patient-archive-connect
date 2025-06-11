
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
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'configured':
        return <Settings className="h-4 w-4 text-blue-600" />;
      case 'available':
        return <Link className="h-4 w-4 text-gray-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'case_management':
        return <Building className="h-5 w-5 text-slate-700" />;
      case 'communication':
        return <MessageSquare className="h-5 w-5 text-blue-600" />;
      case 'document':
        return <FileText className="h-5 w-5 text-amber-600" />;
      case 'medical':
        return <Stethoscope className="h-5 w-5 text-green-600" />;
      case 'financial':
        return <TrendingUp className="h-5 w-5 text-red-600" />;
      default:
        return <Database className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'connected':
        return 'default';
      case 'configured':
        return 'secondary';
      case 'available':
        return 'outline';
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
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto p-8 space-y-8">
        {onBack && (
          <Button 
            onClick={onBack} 
            variant="outline" 
            className="mb-6 border-slate-300 hover:bg-slate-100 transition-all duration-200"
          >
            ← Back to Dashboard
          </Button>
        )}

        {/* Professional Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Integration Ecosystem</h1>
              <p className="text-lg text-slate-600 mt-2">Enterprise-grade legal technology integrations</p>
            </div>
          </div>
        </div>

        {/* Enhanced Professional Statistics */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Active Integrations</p>
                    <p className="text-4xl font-bold text-slate-900">{statistics.activeIntegrations}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:shadow-xl transition-shadow">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Documents Processed</p>
                    <p className="text-4xl font-bold text-slate-900">{statistics.documentsProcessed.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg group-hover:shadow-xl transition-shadow">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Time Saved</p>
                    <p className="text-4xl font-bold text-slate-900">{statistics.timesSaved}h</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg group-hover:shadow-xl transition-shadow">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Success Rate</p>
                    <p className="text-4xl font-bold text-slate-900">{(statistics.syncSuccessRate * 100).toFixed(1)}%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg group-hover:shadow-xl transition-shadow">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Professional Navigation Tabs */}
        <Tabs defaultValue="legal-tech" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-slate-200 p-2 h-16 rounded-xl shadow-lg">
            <TabsTrigger 
              value="legal-tech" 
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-900 transition-all duration-300 rounded-lg font-semibold py-3"
            >
              <Building className="h-4 w-4 mr-2" />
              Legal Tech
            </TabsTrigger>
            <TabsTrigger 
              value="communication"
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-900 transition-all duration-300 rounded-lg font-semibold py-3"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Communication
            </TabsTrigger>
            <TabsTrigger 
              value="document-services"
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-900 transition-all duration-300 rounded-lg font-semibold py-3"
            >
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="medical-systems"
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-900 transition-all duration-300 rounded-lg font-semibold py-3"
            >
              <Stethoscope className="h-4 w-4 mr-2" />
              Medical
            </TabsTrigger>
            <TabsTrigger 
              value="ai-analytics"
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-900 transition-all duration-300 rounded-lg font-semibold py-3"
            >
              <Brain className="h-4 w-4 mr-2" />
              AI Analytics
            </TabsTrigger>
          </TabsList>

          {/* Legal Technology Integrations */}
          <TabsContent value="legal-tech" className="space-y-6">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-slate-900">Legal Technology Stack</CardTitle>
                    <CardDescription className="text-lg text-slate-600">Case management and legal research platforms</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-6 text-slate-900">Enterprise Integrations</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {groupedIntegrations.case_management?.filter(i => i.tier === 'tier_1').map((integration) => (
                      <Card key={integration.id} className="group hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white hover:border-blue-300">
                        <CardContent className="p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                              {getStatusIcon(integration.status)}
                              <div>
                                <h4 className="font-bold text-slate-900 text-xl">{integration.name}</h4>
                                <p className="text-sm text-slate-500 font-medium">Tier {integration.tier.split('_')[1]} Integration</p>
                              </div>
                            </div>
                            <Badge 
                              variant={getStatusBadgeVariant(integration.status)} 
                              className={`capitalize font-semibold px-4 py-2 ${
                                integration.status === 'connected' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {integration.status}
                            </Badge>
                          </div>
                          
                          <p className="text-slate-600 mb-6 leading-relaxed text-base">{integration.description}</p>
                          
                          <div className="flex flex-wrap gap-3 mb-6">
                            {integration.features.map((feature, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-sm font-medium px-4 py-2 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                            {integration.lastSync && (
                              <span className="text-sm text-slate-500 font-medium">
                                Last sync: {new Date(integration.lastSync).toLocaleString()}
                              </span>
                            )}
                            <Button 
                              size="sm" 
                              variant={integration.status === 'connected' ? 'outline' : 'default'}
                              className={`ml-auto font-semibold transition-all duration-200 ${
                                integration.status === 'connected'
                                  ? 'border-slate-300 hover:bg-slate-900 hover:text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                              }`}
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
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-slate-900">Communication Platforms</CardTitle>
                    <CardDescription className="text-lg text-slate-600">Email, messaging, and collaboration tools</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {groupedIntegrations.communication?.map((integration) => (
                    <Card key={integration.id} className="group hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white hover:border-blue-300">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                              {getCategoryIcon(integration.category)}
                            </div>
                            <div className="space-y-3">
                              <h3 className="font-bold text-slate-900 text-xl">{integration.name}</h3>
                              <p className="text-slate-600 text-base">{integration.description}</p>
                              <div className="flex flex-wrap gap-3">
                                {integration.features.map((feature, index) => (
                                  <Badge 
                                    key={index} 
                                    variant="outline" 
                                    className="text-sm font-medium px-4 py-2 bg-blue-50 text-blue-700 border-blue-200"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge 
                              variant={getStatusBadgeVariant(integration.status)} 
                              className={`capitalize font-semibold px-4 py-2 ${
                                integration.status === 'connected' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {integration.status}
                            </Badge>
                            <Switch 
                              checked={integration.status === 'connected'} 
                              className="data-[state=checked]:bg-green-600 scale-125"
                            />
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
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg">
                    <Signature className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-slate-900">Document & E-Signature Services</CardTitle>
                    <CardDescription className="text-lg text-slate-600">Digital signatures and document delivery</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {eSignatureIntegrations.map((integration) => (
                    <Card key={integration.id} className="group hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white hover:border-amber-300">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
                              <Signature className="h-6 w-6 text-amber-600" />
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-bold text-slate-900 text-xl">{integration.name}</h3>
                              <p className="text-slate-600">Environment: {integration.environment}</p>
                              {integration.lastUsed && (
                                <p className="text-sm text-slate-500">
                                  Last used: {new Date(integration.lastUsed).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge 
                              variant={integration.status === 'active' ? 'default' : 'secondary'} 
                              className={`capitalize font-semibold px-4 py-2 ${
                                integration.status === 'active' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {integration.status}
                            </Badge>
                            <Switch 
                              checked={integration.enabled} 
                              className="data-[state=checked]:bg-green-600 scale-125"
                            />
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
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                    <Stethoscope className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-slate-900">Healthcare & Medical Integrations</CardTitle>
                    <CardDescription className="text-lg text-slate-600">EHR systems, provider databases, and medical coding</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {groupedIntegrations.medical?.map((integration) => (
                    <Card key={integration.id} className="group hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white hover:border-green-300">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                              <Stethoscope className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="space-y-3">
                              <h3 className="font-bold text-slate-900 text-xl">{integration.name}</h3>
                              <p className="text-slate-600 text-base">{integration.description}</p>
                              <div className="flex flex-wrap gap-3">
                                {integration.features.map((feature, index) => (
                                  <Badge 
                                    key={index} 
                                    variant="outline" 
                                    className="text-sm font-medium px-4 py-2 bg-green-50 text-green-700 border-green-200"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                              {integration.lastSync && (
                                <p className="text-sm text-slate-500 font-medium">
                                  Last sync: {new Date(integration.lastSync).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge 
                              variant={getStatusBadgeVariant(integration.status)} 
                              className={`capitalize font-semibold px-4 py-2 ${
                                integration.status === 'connected' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {integration.status}
                            </Badge>
                            <Button 
                              size="sm" 
                              variant={integration.status === 'connected' ? 'outline' : 'default'}
                              className={`font-semibold transition-all duration-200 ${
                                integration.status === 'connected'
                                  ? 'border-slate-300 hover:bg-slate-900 hover:text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                              }`}
                            >
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
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-slate-900">AI Analytics & Processing</CardTitle>
                    <CardDescription className="text-lg text-slate-600">Machine learning and natural language processing</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {predictiveAnalytics.map((analytics) => (
                    <Card key={analytics.id} className="group hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white hover:border-purple-300">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                              <Brain className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-bold text-slate-900 text-xl capitalize">
                                {analytics.type.replace('-', ' ')} Prediction
                              </h3>
                              <p className="text-slate-600">
                                Accuracy: {(analytics.accuracy * 100).toFixed(1)}% | 
                                Training Data: {analytics.trainingDataSize.toLocaleString()} records
                              </p>
                              <p className="text-sm text-slate-500">
                                Last updated: {new Date(analytics.lastUpdated).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Switch 
                            checked={analytics.enabled} 
                            className="data-[state=checked]:bg-green-600 scale-125"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {nlpServices.map((service) => (
                    <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white hover:border-purple-300">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
                              <Shield className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-bold text-slate-900 text-xl capitalize">
                                {service.type.replace('-', ' ')}
                              </h3>
                              <p className="text-slate-600">
                                Model: {service.model} | 
                                Processed: {service.processedDocuments} documents
                              </p>
                              <p className="text-sm text-slate-500">
                                Last used: {new Date(service.lastUsed).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Switch 
                            checked={service.enabled} 
                            className="data-[state=checked]:bg-green-600 scale-125"
                          />
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
