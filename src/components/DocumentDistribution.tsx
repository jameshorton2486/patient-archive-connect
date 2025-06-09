
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Send, 
  Phone, 
  Globe, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  DollarSign,
  BarChart3,
  Truck
} from 'lucide-react';
import { GeneratedDocument, DeliveryMethod, DeliveryAttempt, DeliveryTracking } from '@/types/document';
import { toast } from '@/hooks/use-toast';

interface DocumentDistributionProps {
  document: GeneratedDocument;
  onBack?: () => void;
}

const deliveryMethods: DeliveryMethod[] = [
  {
    id: 'usps-certified',
    name: 'USPS Certified Mail',
    type: 'usps',
    cost: 8.50,
    estimatedDeliveryTime: '3-5 business days',
    reliabilityScore: 98,
    hipaaCompliant: true,
    enabled: true
  },
  {
    id: 'secure-fax',
    name: 'HIPAA-Compliant Fax',
    type: 'fax',
    cost: 2.00,
    estimatedDeliveryTime: 'Immediate',
    reliabilityScore: 92,
    hipaaCompliant: true,
    enabled: true
  },
  {
    id: 'encrypted-email',
    name: 'Encrypted Email',
    type: 'email',
    cost: 0.50,
    estimatedDeliveryTime: 'Immediate',
    reliabilityScore: 85,
    hipaaCompliant: true,
    enabled: true
  },
  {
    id: 'provider-portal',
    name: 'Provider Web Portal',
    type: 'portal',
    cost: 1.00,
    estimatedDeliveryTime: 'Immediate',
    reliabilityScore: 95,
    hipaaCompliant: true,
    enabled: false
  }
];

const mockProvider = {
  id: 'provider_001',
  name: 'Dr. Sarah Johnson',
  address: '456 Medical Plaza, Healthcare City, CA 90211',
  phone: '(555) 123-4567',
  fax: '(555) 123-4568',
  email: 'records@drjohnson.com',
  hasPortalAccess: false
};

export function DocumentDistribution({ document, onBack }: DocumentDistributionProps) {
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [deliveryAttempts, setDeliveryAttempts] = useState<DeliveryAttempt[]>([]);
  const [isDelivering, setIsDelivering] = useState(false);
  const [tracking, setTracking] = useState<DeliveryTracking>({
    documentId: document.id,
    attempts: [],
    totalCost: 0,
    successfulDelivery: false,
    responseReceived: false
  });

  const handleMethodSelection = (methodId: string) => {
    setSelectedMethods(prev => 
      prev.includes(methodId) 
        ? prev.filter(m => m !== methodId)
        : [...prev, methodId]
    );
  };

  const calculateTotalCost = () => {
    return selectedMethods.reduce((total, methodId) => {
      const method = deliveryMethods.find(m => m.id === methodId);
      return total + (method?.cost || 0);
    }, 0);
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'usps':
        return <Truck className="h-4 w-4" />;
      case 'fax':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'portal':
        return <Globe className="h-4 w-4" />;
      default:
        return <Send className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
      case 'sending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
      case 'bounced':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleDelivery = async () => {
    if (selectedMethods.length === 0) {
      toast({
        title: "No Methods Selected",
        description: "Please select at least one delivery method.",
        variant: "destructive",
      });
      return;
    }

    setIsDelivering(true);

    try {
      const newAttempts: DeliveryAttempt[] = [];

      for (const methodId of selectedMethods) {
        const method = deliveryMethods.find(m => m.id === methodId);
        if (!method) continue;

        const attempt: DeliveryAttempt = {
          id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2)}`,
          documentId: document.id,
          methodId,
          providerId: mockProvider.id,
          status: 'sending',
          sentAt: new Date().toISOString(),
          cost: method.cost,
          confirmationReceived: false,
          retryCount: 0,
          maxRetries: 3
        };

        newAttempts.push(attempt);

        // Simulate delivery process
        setTimeout(() => {
          const success = Math.random() > 0.1; // 90% success rate simulation
          
          const updatedAttempt = { ...attempt };
          if (success) {
            updatedAttempt.status = 'delivered';
            updatedAttempt.deliveredAt = new Date().toISOString();
            updatedAttempt.trackingNumber = `TRK${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            updatedAttempt.confirmationReceived = true;
          } else {
            updatedAttempt.status = 'failed';
            updatedAttempt.failureReason = 'Provider system temporarily unavailable';
          }

          setDeliveryAttempts(prev => [...prev.filter(a => a.id !== attempt.id), updatedAttempt]);
        }, 2000 + Math.random() * 3000);
      }

      setDeliveryAttempts(prev => [...prev, ...newAttempts]);
      
      const newTracking: DeliveryTracking = {
        ...tracking,
        attempts: [...tracking.attempts, ...newAttempts],
        totalCost: tracking.totalCost + calculateTotalCost()
      };
      
      setTracking(newTracking);

      toast({
        title: "Delivery Initiated",
        description: `Document delivery started via ${selectedMethods.length} method(s).`,
      });

    } catch (error) {
      console.error('Error initiating delivery:', error);
      toast({
        title: "Delivery Failed",
        description: "Failed to initiate document delivery. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDelivering(false);
    }
  };

  const handleRetry = async (attemptId: string) => {
    const attempt = deliveryAttempts.find(a => a.id === attemptId);
    if (!attempt || attempt.retryCount >= attempt.maxRetries) return;

    const updatedAttempt = {
      ...attempt,
      status: 'sending' as const,
      retryCount: attempt.retryCount + 1
    };

    setDeliveryAttempts(prev => prev.map(a => a.id === attemptId ? updatedAttempt : a));

    // Simulate retry
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate on retry
      
      const finalAttempt = { ...updatedAttempt };
      if (success) {
        finalAttempt.status = 'delivered';
        finalAttempt.deliveredAt = new Date().toISOString();
        finalAttempt.trackingNumber = `TRK${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        finalAttempt.confirmationReceived = true;
      } else {
        finalAttempt.status = 'failed';
        finalAttempt.failureReason = 'Retry failed - provider system error';
      }

      setDeliveryAttempts(prev => prev.map(a => a.id === attemptId ? finalAttempt : a));
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {onBack && (
        <Button onClick={onBack} variant="outline" className="mb-4">
          ← Back to Documents
        </Button>
      )}

      <div className="flex items-center gap-2 mb-6">
        <Send className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Document Distribution</h1>
      </div>

      {/* Document Info */}
      <Card>
        <CardHeader>
          <CardTitle>Document Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Document Type</Label>
              <p className="text-sm text-muted-foreground">{document.type.replace('-', ' ').toUpperCase()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Tracking ID</Label>
              <p className="text-sm text-muted-foreground">{document.trackingId}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Provider</Label>
              <p className="text-sm text-muted-foreground">{mockProvider.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Select Delivery Methods</CardTitle>
          <CardDescription>Choose one or more methods to deliver this document</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {deliveryMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id={method.id}
                  checked={selectedMethods.includes(method.id)}
                  onChange={() => handleMethodSelection(method.id)}
                  disabled={!method.enabled}
                  className="h-4 w-4"
                />
                <div className="flex items-center gap-2">
                  {getMethodIcon(method.type)}
                  <div>
                    <Label htmlFor={method.id} className="font-medium cursor-pointer">
                      {method.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {method.estimatedDeliveryTime} • {method.reliabilityScore}% reliability
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={method.hipaaCompliant ? "default" : "secondary"}>
                  {method.hipaaCompliant ? "HIPAA" : "Standard"}
                </Badge>
                <span className="text-sm font-medium">${method.cost.toFixed(2)}</span>
              </div>
            </div>
          ))}
          
          {selectedMethods.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="font-medium">Total Cost:</span>
              <span className="text-lg font-bold">${calculateTotalCost().toFixed(2)}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delivery Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleDelivery}
          disabled={selectedMethods.length === 0 || isDelivering}
          size="lg"
          className="w-full md:w-auto"
        >
          {isDelivering ? (
            <>
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Sending Document...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Document ({selectedMethods.length} method{selectedMethods.length !== 1 ? 's' : ''})
            </>
          )}
        </Button>
      </div>

      {/* Delivery Tracking */}
      {deliveryAttempts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Delivery Tracking</CardTitle>
            <CardDescription>Real-time status of document delivery attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveryAttempts.map((attempt) => {
                const method = deliveryMethods.find(m => m.id === attempt.methodId);
                return (
                  <div key={attempt.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(attempt.status)}
                      <div>
                        <p className="font-medium">{method?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Sent: {new Date(attempt.sentAt).toLocaleString()}
                          {attempt.trackingNumber && ` • Tracking: ${attempt.trackingNumber}`}
                        </p>
                        {attempt.failureReason && (
                          <p className="text-sm text-red-600">{attempt.failureReason}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          attempt.status === 'delivered' ? 'default' : 
                          attempt.status === 'failed' ? 'destructive' : 
                          'secondary'
                        }
                      >
                        {attempt.status}
                      </Badge>
                      {attempt.status === 'failed' && attempt.retryCount < attempt.maxRetries && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRetry(attempt.id)}
                        >
                          Retry
                        </Button>
                      )}
                      <span className="text-sm">${attempt.cost.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Summary */}
      {tracking.totalCost > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Delivery Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{tracking.attempts.length}</div>
                <p className="text-sm text-muted-foreground">Total Attempts</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {tracking.attempts.filter(a => a.status === 'delivered').length}
                </div>
                <p className="text-sm text-muted-foreground">Successful</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">${tracking.totalCost.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {tracking.attempts.length > 0 ? 
                    Math.round((tracking.attempts.filter(a => a.status === 'delivered').length / tracking.attempts.length) * 100) : 0}%
                </div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
