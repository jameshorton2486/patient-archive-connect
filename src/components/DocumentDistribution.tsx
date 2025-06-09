
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Mail,
  Phone,
  Globe,
  RefreshCw
} from 'lucide-react';
import { DeliveryMethod, DeliveryAttempt, DeliveryTracking } from '@/types/document';
import { deliveryService } from '@/services/deliveryService';

interface DocumentDistributionProps {
  onBack?: () => void;
}

export function DocumentDistribution({ onBack }: DocumentDistributionProps) {
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([]);
  const [activeAttempts, setActiveAttempts] = useState<DeliveryAttempt[]>([]);
  const [deliveryStats, setDeliveryStats] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const methods = await deliveryService.getAvailableMethods();
      const attempts = await deliveryService.getActiveDeliveries();
      const stats = await deliveryService.getDeliveryStatistics();
      
      setDeliveryMethods(methods);
      setActiveAttempts(attempts);
      setDeliveryStats(stats);
    } catch (error) {
      console.error('Error loading delivery data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async (attemptId: string) => {
    try {
      await deliveryService.retryFailedDelivery(attemptId);
      await loadData();
    } catch (error) {
      console.error('Error retrying delivery:', error);
    }
  };

  const handleSendDocument = async (methodId: string, documentId: string, providerId: string) => {
    try {
      await deliveryService.initiateDelivery(documentId, methodId, providerId);
      await loadData();
    } catch (error) {
      console.error('Error sending document:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'sending':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'usps':
        return <Send className="h-4 w-4" />;
      case 'fax':
        return <Phone className="h-4 w-4" />;
      case 'portal':
        return <Globe className="h-4 w-4" />;
      default:
        return <Send className="h-4 w-4" />;
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
        <h1 className="text-3xl font-bold text-foreground">Document Distribution</h1>
      </div>

      {/* Delivery Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Available Delivery Methods</CardTitle>
          <CardDescription>Configure and manage document delivery channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliveryMethods.map((method) => (
              <div key={method.id} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {getMethodIcon(method.type)}
                  <h3 className="font-medium">{method.name}</h3>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Cost: ${method.cost}</p>
                  <p>Delivery: {method.estimatedDeliveryTime}</p>
                  <p>Reliability: {(method.reliabilityScore * 100).toFixed(0)}%</p>
                </div>
                <Badge variant={method.enabled ? "default" : "secondary"} className="mt-2">
                  {method.enabled ? 'Active' : 'Disabled'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Active Deliveries</CardTitle>
          <CardDescription>Track ongoing document deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAttempts.map((attempt) => (
              <div key={attempt.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(attempt.status)}
                  <div>
                    <p className="font-medium">Document #{attempt.documentId}</p>
                    <p className="text-sm text-muted-foreground">
                      Method: {deliveryMethods.find(m => m.id === attempt.methodId)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sent: {new Date(attempt.sentAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {attempt.trackingNumber && (
                    <Badge variant="outline">{attempt.trackingNumber}</Badge>
                  )}
                  {attempt.status === 'failed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRetry(attempt.id)}
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

      {/* Delivery Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Statistics</CardTitle>
          <CardDescription>Performance metrics across all delivery methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{deliveryStats.totalDeliveries || 0}</p>
              <p className="text-sm text-muted-foreground">Total Deliveries</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {deliveryStats.successRate ? (deliveryStats.successRate * 100).toFixed(1) : 0}%
              </p>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">${deliveryStats.totalCost || 0}</p>
              <p className="text-sm text-muted-foreground">Total Cost</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {deliveryStats.averageDeliveryTime || 0} days
              </p>
              <p className="text-sm text-muted-foreground">Avg. Delivery Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
