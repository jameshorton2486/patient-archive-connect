
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  BarChart3,
  Target,
  Brain,
  Zap
} from 'lucide-react';

interface PredictiveAnalyticsProps {
  onBack?: () => void;
}

interface CaseValuePrediction {
  caseId: string;
  clientName: string;
  estimatedValue: number;
  confidence: number;
  factors: {
    medicalCosts: number;
    treatmentDuration: number;
    complexity: number;
    jurisdiction: string;
  };
  riskScore: number;
}

interface ProviderResponsePrediction {
  providerId: string;
  providerName: string;
  probabilityOfResponse: number;
  estimatedResponseTime: number;
  bestContactDay: string;
  bestContactTime: string;
}

export function PredictiveAnalytics({ onBack }: PredictiveAnalyticsProps) {
  const [caseValuePredictions, setCaseValuePredictions] = useState<CaseValuePrediction[]>([]);
  const [providerPredictions, setProviderPredictions] = useState<ProviderResponsePrediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setCaseValuePredictions([
        {
          caseId: 'CASE-001',
          clientName: 'John Smith',
          estimatedValue: 125000,
          confidence: 0.87,
          factors: {
            medicalCosts: 45000,
            treatmentDuration: 8,
            complexity: 7,
            jurisdiction: 'California'
          },
          riskScore: 0.23
        },
        {
          caseId: 'CASE-002',
          clientName: 'Sarah Johnson',
          estimatedValue: 75000,
          confidence: 0.92,
          factors: {
            medicalCosts: 28000,
            treatmentDuration: 6,
            complexity: 5,
            jurisdiction: 'Texas'
          },
          riskScore: 0.15
        },
        {
          caseId: 'CASE-003',
          clientName: 'Michael Brown',
          estimatedValue: 200000,
          confidence: 0.78,
          factors: {
            medicalCosts: 85000,
            treatmentDuration: 12,
            complexity: 9,
            jurisdiction: 'New York'
          },
          riskScore: 0.45
        }
      ]);

      setProviderPredictions([
        {
          providerId: 'PROV-001',
          providerName: 'Regional Medical Center',
          probabilityOfResponse: 0.85,
          estimatedResponseTime: 14,
          bestContactDay: 'Tuesday',
          bestContactTime: '10:00 AM'
        },
        {
          providerId: 'PROV-002',
          providerName: 'Dr. Sarah Wilson Orthopedics',
          probabilityOfResponse: 0.92,
          estimatedResponseTime: 7,
          bestContactDay: 'Wednesday',
          bestContactTime: '2:00 PM'
        },
        {
          providerId: 'PROV-003',
          providerName: 'Central Imaging Associates',
          probabilityOfResponse: 0.76,
          estimatedResponseTime: 21,
          bestContactDay: 'Thursday',
          bestContactTime: '11:00 AM'
        }
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: number) => {
    if (risk <= 0.3) return 'text-green-600';
    if (risk <= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Brain className="h-12 w-12 mx-auto mb-4 animate-pulse text-primary" />
            <p className="text-lg font-medium">Analyzing data patterns...</p>
            <p className="text-sm text-muted-foreground">Training predictive models</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {onBack && (
        <Button onClick={onBack} variant="outline" className="mb-4">
          ← Back to Dashboard
        </Button>
      )}

      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Predictive Analytics Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <div className="text-2xl font-bold">{formatCurrency(400000)}</div>
            </div>
            <p className="text-sm text-muted-foreground">Total Predicted Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <div className="text-2xl font-bold">85.7%</div>
            </div>
            <p className="text-sm text-muted-foreground">Average Confidence</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <div className="text-2xl font-bold">14 days</div>
            </div>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <div className="text-2xl font-bold">84%</div>
            </div>
            <p className="text-sm text-muted-foreground">Response Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Case Value Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Case Value Predictions
          </CardTitle>
          <CardDescription>
            AI-powered settlement value estimates based on case factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {caseValuePredictions.map((prediction) => (
              <div key={prediction.caseId} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{prediction.clientName}</h3>
                    <p className="text-sm text-muted-foreground">Case ID: {prediction.caseId}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(prediction.estimatedValue)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Confidence: <span className={getConfidenceColor(prediction.confidence)}>
                        {(prediction.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Medical Costs:</span>
                    <div className="text-muted-foreground">{formatCurrency(prediction.factors.medicalCosts)}</div>
                  </div>
                  <div>
                    <span className="font-medium">Treatment Duration:</span>
                    <div className="text-muted-foreground">{prediction.factors.treatmentDuration} months</div>
                  </div>
                  <div>
                    <span className="font-medium">Complexity Score:</span>
                    <div className="text-muted-foreground">{prediction.factors.complexity}/10</div>
                  </div>
                  <div>
                    <span className="font-medium">Risk Score:</span>
                    <div className={getRiskColor(prediction.riskScore)}>
                      {(prediction.riskScore * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">Confidence Level</span>
                  </div>
                  <Progress value={prediction.confidence * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Provider Response Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Provider Response Predictions
          </CardTitle>
          <CardDescription>
            Optimize timing and approach for maximum response rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providerPredictions.map((prediction) => (
              <div key={prediction.providerId} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{prediction.providerName}</h3>
                    <p className="text-sm text-muted-foreground">ID: {prediction.providerId}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={prediction.probabilityOfResponse > 0.8 ? 'default' : 'secondary'}>
                      {(prediction.probabilityOfResponse * 100).toFixed(0)}% Response Rate
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Est. Response Time:</span>
                    <div className="text-muted-foreground">{prediction.estimatedResponseTime} days</div>
                  </div>
                  <div>
                    <span className="font-medium">Best Contact Day:</span>
                    <div className="text-muted-foreground">{prediction.bestContactDay}</div>
                  </div>
                  <div>
                    <span className="font-medium">Optimal Time:</span>
                    <div className="text-muted-foreground">{prediction.bestContactTime}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">Response Probability</span>
                    <Zap className="h-3 w-3 text-yellow-500" />
                  </div>
                  <Progress value={prediction.probabilityOfResponse * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
