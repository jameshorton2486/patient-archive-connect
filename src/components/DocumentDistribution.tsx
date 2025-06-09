
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Send, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign,
  Mail,
  Fax,
  Upload,
  Truck
} from 'lucide-react';
import { DeliveryMethod, DeliveryAttempt, DeliveryTracking } from '@/types/document';
import { deliveryService } from '@/services/deliveryService';

interface DocumentDistributionProps {
  onBack?: () => void;
}

export function DocumentDistribution({ onBack }: DocumentDistributionProps) {
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([]);
  const [activeAttempts, setActiveAttempts] = useState<DeliveryAttempt[]>([]);
  const [deliveryStats, setDeliveryStats] = useState({
    totalDeliveries: 0,
    successRate: 0,
    totalCost: 0,
    averageCost: 0
  });

  useEffect(() => {
    loadDeliveryMethods();
    loadActiveAttempts();
    loadDeliveryStats();
  }, []);

  const loadDeliveryMethods = async () => {
    try {
      const methods = await deliveryService.getDeliveryMethods();
      setDeliveryMethods(methods);
    } catch (error) {
      console.error('Error loading delivery methods:', error);
    }
  };

  const loadActiveAttempts = async () => {
    try {
      const attempts = await deliveryService.getActiveAttempts();
      setActiveAttempts(attempts);
    } catch (error) {
      console.error('Error loading active attempts:', error);
    }
  };

  const loadDeliveryStats = async () => {
    try {
      const stats = await deliveryService.getDeliveryStats();
      setDeliveryStats(stats);
    } catch (error) {
      console.error('Error loading delivery stats:', error);
    }
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'usps':
        return <Truck className="h-4 w-4" />;
      case 'fax':
        return <Fax className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'portal':
        return <Upload className="h-4 w-4" />;
      default:
        return <Send className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
      case 'bounced':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'sending':
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default' as const;
      case 'failed':
      case 'bounced':
        return 'destructive' as const;
      case 'sending':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  const handleRetryDelivery = async (attemptId: string) => {
    try {
      await deliveryService.retryDelivery(attemptId);
      loadActiveAttempts();
    } catch (error) {
      console.error('Error retrying delivery:', error);
    }
  };

  const handleTestDelivery = async (methodId: string) => {
    try {
      const mockDocument = {
        id: 'test_doc',
        content: 'Test document content',
        trackingId: 'TEST-' + Date.now()
      };
      
      await deliveryService.sendDocument(mockDocument, methodId, 'test_provider');
      loadActiveAttempts();
    } catch (error) {
      console.error('Error sending test delivery:', error);
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
        <Send className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Document Distribution Center</h1>
      </div>

      {/* Delivery Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Deliveries</p>
                <p className="text-2xl font-bold">{deliveryStats.totalDeliveries}</p>
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
                <p className="text-2xl font-bold">{deliveryStats.successRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">${deliveryStats.totalCost}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Cost</p>
                <p className="text-2xl font-bold">${deliveryStats.averageCost}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Available Delivery Methods</CardTitle>
          <CardDescription>Configure and test document delivery channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliveryMethods.map((method) => (
              <div key={method.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getMethodIcon(method.type)}
                    <span className="font-medium">{method.name}</span>
                  </div>
                  <Badge variant={method.enabled ? "default" : "secondary"}>
                    {method.enabled ? "Active" : "Disabled"}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Cost</p>
                    <p className="font-medium">${method.cost}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Delivery Time</p>
                    <p className="font-medium">{method.estimatedDeliveryTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reliability</p>
                    <p className="font-medium">{method.reliabilityScore}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">HIPAA</p>
                    <p className="font-medium">{method.hipaaCompliant ? "✓" : "✗"}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Reliability Score</span>
                    <span>{method.reliabilityScore}%</span>
                  </div>
                  <Progress value={method.reliabilityScore} className="h-2" />
                </div>

                <Button 
                  onClick={() => handleTestDelivery(method.id)}
                  variant="outline" 
                  size="sm"
                  disabled={!method.enabled}
                  className="w-full"
                >
                  Test Delivery
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Delivery Attempts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Delivery Attempts</CardTitle>
          <CardDescription>Monitor ongoing and recent delivery attempts</CardDescription>
        </CardHeader>
        <CardContent>
          {activeAttempts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No active delivery attempts</p>
          ) : (
            <div className="space-y-4">
              {activeAttempts.map((attempt) => (
                <div key={attempt.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(attempt.status)}
                      <span className="font-medium">Document #{attempt.documentId.substring(0, 8)}</span>
                      <Badge variant={getStatusBadgeVariant(attempt.status)}>
                        {attempt.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${attempt.cost}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Method</p>
                      <p className="font-medium">
                        {deliveryMethods.find(m => m.id === attempt.methodId)?.name || 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sent At</p>
                      <p className="font-medium">
                        {new Date(attempt.sentAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tracking</p>
                      <p className="font-medium font-mono text-xs">
                        {attempt.trackingNumber || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {attempt.status === 'failed' && (
                    <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
                      <p className="text-sm text-red-800">
                        <strong>Failure Reason:</strong> {attempt.failureReason}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button 
                          onClick={() => handleRetryDelivery(attempt.id)}
                          size="sm"
                          variant="outline"
                          disabled={attempt.retryCount >= attempt.maxRetries}
                        >
                          Retry ({attempt.retryCount}/{attempt.maxRetries})
                        </Button>
                      </div>
                    </div>
                  )}

                  {attempt.deliveredAt && (
                    <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                      <p className="text-sm text-green-800">
                        <strong>Delivered:</strong> {new Date(attempt.deliveredAt).toLocaleString()}
                      </p>
                      {attempt.confirmationReceived && (
                        <p className="text-sm text-green-800">
                          ✓ Delivery confirmation received
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
