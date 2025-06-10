
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { deliveryService } from "@/services/deliveryService";
import { DeliveryMethod, DeliveryAttempt } from "@/types/document";

const DocumentDistribution = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientFax, setRecipientFax] = useState('');
  
  const deliveryMethods = deliveryService.getAvailableMethods();
  const activeDeliveries = deliveryService.getActiveDeliveries();
  const stats = deliveryService.getDeliveryStatistics();

  const handleSendDocument = async () => {
    if (!selectedMethod) {
      toast.error("Please select a delivery method");
      return;
    }

    try {
      const mockDocumentId = 'doc_' + Date.now();
      const mockProviderId = 'prov_001';
      
      await deliveryService.initiateDelivery(mockDocumentId, selectedMethod, mockProviderId);
      toast.success("Document sent successfully!");
      
      // Reset form
      setSelectedMethod('');
      setRecipientEmail('');
      setRecipientFax('');
    } catch (error) {
      toast.error("Failed to send document");
      console.error('Delivery error:', error);
    }
  };

  const handleRetryDelivery = async (deliveryId: string) => {
    try {
      await deliveryService.retryDelivery(deliveryId);
      toast.success("Delivery retry initiated");
    } catch (error) {
      toast.error("Failed to retry delivery");
      console.error('Retry error:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'delivered': 'default',
      'pending': 'secondary',
      'failed': 'destructive',
      'sending': 'outline'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Document Distribution</h1>
      </div>

      {/* Distribution Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deliveryRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send">Send Document</TabsTrigger>
          <TabsTrigger value="tracking">Active Deliveries</TabsTrigger>
          <TabsTrigger value="methods">Delivery Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Document</CardTitle>
              <CardDescription>Choose delivery method and recipient details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="delivery-method">Delivery Method</Label>
                <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery method" />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name} - ${method.cost} ({method.estimatedDeliveryTime})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedMethod === 'email' && (
                <div className="space-y-2">
                  <Label htmlFor="email">Recipient Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="provider@example.com"
                  />
                </div>
              )}

              {selectedMethod === 'fax' && (
                <div className="space-y-2">
                  <Label htmlFor="fax">Recipient Fax Number</Label>
                  <Input
                    id="fax"
                    value={recipientFax}
                    onChange={(e) => setRecipientFax(e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              )}

              <Button onClick={handleSendDocument} className="w-full">
                Send Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Deliveries</CardTitle>
              <CardDescription>Track the status of sent documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">Document {delivery.documentId}</div>
                      <div className="text-sm text-muted-foreground">
                        Sent via {deliveryMethods.find(m => m.id === delivery.methodId)?.name} 
                        on {new Date(delivery.sentAt).toLocaleDateString()}
                      </div>
                      {delivery.retryCount > 0 && (
                        <div className="text-sm text-orange-600">
                          Retry attempts: {delivery.retryCount}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(delivery.status)}
                      {delivery.status === 'failed' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRetryDelivery(delivery.id)}
                        >
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <div className="grid gap-4">
            {deliveryMethods.map((method) => (
              <Card key={method.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{method.name}</CardTitle>
                      <CardDescription>
                        Delivery time: {method.estimatedDeliveryTime}
                      </CardDescription>
                    </div>
                    <Badge variant={method.enabled ? "default" : "secondary"}>
                      {method.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Cost</div>
                      <div>${method.cost}</div>
                    </div>
                    <div>
                      <div className="font-medium">Reliability</div>
                      <div>{method.reliabilityScore}%</div>
                    </div>
                    <div>
                      <div className="font-medium">HIPAA Compliant</div>
                      <div>{method.hipaaCompliant ? "Yes" : "No"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentDistribution;
