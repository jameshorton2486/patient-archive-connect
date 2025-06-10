
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, FileText, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { deliveryService, DeliveryAttempt, DeliveryStats } from '../services/deliveryService';
import { DeliveryMethod } from '../types/document';

export function DocumentDistribution() {
  const [availableMethods, setAvailableMethods] = useState<DeliveryMethod[]>([]);
  const [activeDeliveries, setActiveDeliveries] = useState<DeliveryAttempt[]>([]);
  const [stats, setStats] = useState<DeliveryStats | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<DeliveryMethod>('email');
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [methods, deliveries, statistics] = await Promise.all([
        deliveryService.getAvailableMethods(),
        deliveryService.getActiveDeliveries(),
        deliveryService.getDeliveryStatistics()
      ]);
      
      setAvailableMethods(methods);
      setActiveDeliveries(deliveries);
      setStats(statistics);
    } catch (error) {
      console.error('Failed to load delivery data:', error);
    }
  };

  const handleSendDocument = async () => {
    if (!recipient) return;
    
    setIsLoading(true);
    try {
      await deliveryService.initiateDelivery('doc-example', selectedMethod, recipient);
      await loadData(); // Refresh data
      setRecipient('');
    } catch (error) {
      console.error('Failed to send document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const getMethodIcon = (method: DeliveryMethod) => {
    switch (method) {
      case 'email': return <Mail className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Document Distribution</h1>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Deliveries</span>
                <Badge variant="outline">{stats.totalDeliveries}</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Successful</span>
                <Badge className="bg-green-100 text-green-800">{stats.successfulDeliveries}</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Failed</span>
                <Badge variant="destructive">{stats.failedDeliveries}</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending</span>
                <Badge variant="secondary">{stats.pendingDeliveries}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Send Document */}
      <Card>
        <CardHeader>
          <CardTitle>Send Document</CardTitle>
          <CardDescription>Distribute documents to clients and providers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="method">Delivery Method</Label>
              <Select value={selectedMethod} onValueChange={(value: DeliveryMethod) => setSelectedMethod(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      <div className="flex items-center gap-2">
                        {getMethodIcon(method)}
                        {method.replace('_', ' ').toUpperCase()}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="Enter email or address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSendDocument} disabled={!recipient || isLoading} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
          <CardDescription>Track document delivery status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeDeliveries.map((delivery) => (
              <div key={delivery.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(delivery.status)}
                  <div>
                    <p className="font-medium">Document {delivery.documentId}</p>
                    <p className="text-sm text-muted-foreground">
                      via {delivery.method} • {new Date(delivery.attemptedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge variant={delivery.status === 'delivered' ? 'default' : 'secondary'}>
                  {delivery.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
