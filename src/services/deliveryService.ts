
import { DeliveryMethod, DeliveryAttempt, DeliveryTracking, DeliveryStats } from "@/types/document";

class DeliveryService {
  private deliveryMethods: DeliveryMethod[] = [
    {
      id: 'email',
      type: 'email',
      name: 'Email',
      trackingEnabled: true,
      confirmationRequired: true,
      estimatedDeliveryDays: 1,
      estimatedDeliveryTime: 1,
      cost: 0,
      enabled: true,
      reliabilityScore: 95,
      hipaaCompliant: true
    },
    {
      id: 'fax',
      type: 'fax',
      name: 'Fax',
      trackingEnabled: false,
      confirmationRequired: true,
      estimatedDeliveryDays: 1,
      estimatedDeliveryTime: 1,
      cost: 2.50,
      enabled: true,
      reliabilityScore: 88,
      hipaaCompliant: true
    },
    {
      id: 'certified_mail',
      type: 'certified_mail',
      name: 'Certified Mail',
      trackingEnabled: true,
      confirmationRequired: true,
      estimatedDeliveryDays: 3,
      estimatedDeliveryTime: 3,
      cost: 8.75,
      enabled: true,
      reliabilityScore: 98,
      hipaaCompliant: true
    },
    {
      id: 'portal',
      type: 'portal',
      name: 'Secure Portal',
      trackingEnabled: true,
      confirmationRequired: false,
      estimatedDeliveryDays: 1,
      estimatedDeliveryTime: 1,
      cost: 0,
      enabled: true,
      reliabilityScore: 92,
      hipaaCompliant: true
    }
  ];

  private activeDeliveries: DeliveryAttempt[] = [
    {
      id: 'del_001',
      requestId: 'req_001',
      attemptNumber: 1,
      method: this.deliveryMethods[0],
      methodId: 'email',
      attemptedAt: '2024-01-15T10:00:00Z',
      sentAt: '2024-01-15T10:01:00Z',
      status: 'delivered',
      deliveredAt: '2024-01-15T10:05:00Z',
      retryCount: 0
    },
    {
      id: 'del_002',
      requestId: 'req_002',
      attemptNumber: 1,
      method: this.deliveryMethods[1],
      methodId: 'fax',
      attemptedAt: '2024-01-15T11:00:00Z',
      status: 'pending',
      retryCount: 0
    },
    {
      id: 'del_003',
      requestId: 'req_003',
      attemptNumber: 2,
      method: this.deliveryMethods[0],
      methodId: 'email',
      attemptedAt: '2024-01-15T09:00:00Z',
      status: 'failed',
      failureReason: 'Invalid email address',
      retryCount: 1
    }
  ];

  getAvailableMethods(): DeliveryMethod[] {
    return this.deliveryMethods.filter(method => method.enabled);
  }

  getActiveDeliveries(): DeliveryAttempt[] {
    return this.activeDeliveries;
  }

  getDeliveryStatistics(): DeliveryStats {
    const total = this.activeDeliveries.length;
    const delivered = this.activeDeliveries.filter(d => d.status === 'delivered').length;
    const failed = this.activeDeliveries.filter(d => d.status === 'failed').length;
    const pending = this.activeDeliveries.filter(d => d.status === 'pending').length;
    
    return {
      totalSent: total,
      delivered,
      failed,
      pending,
      deliveryRate: total > 0 ? Math.round((delivered / total) * 100) : 0
    };
  }

  async initiateDelivery(documentId: string, methodId: string, providerId: string): Promise<DeliveryAttempt> {
    const method = this.deliveryMethods.find(m => m.id === methodId);
    if (!method) {
      throw new Error('Invalid delivery method');
    }

    const delivery: DeliveryAttempt = {
      id: 'del_' + Date.now(),
      requestId: 'req_' + Date.now(),
      documentId,
      attemptNumber: 1,
      method,
      methodId,
      attemptedAt: new Date().toISOString(),
      status: 'sending',
      retryCount: 0
    };

    this.activeDeliveries.push(delivery);

    // Simulate delivery process
    setTimeout(() => {
      delivery.status = 'delivered';
      delivery.deliveredAt = new Date().toISOString();
    }, 2000);

    return delivery;
  }

  async retryDelivery(deliveryId: string): Promise<void> {
    const delivery = this.activeDeliveries.find(d => d.id === deliveryId);
    if (!delivery) {
      throw new Error('Delivery not found');
    }

    delivery.status = 'sending';
    delivery.retryCount = (delivery.retryCount || 0) + 1;
    delivery.attemptedAt = new Date().toISOString();

    // Simulate retry process
    setTimeout(() => {
      delivery.status = Math.random() > 0.3 ? 'delivered' : 'failed';
      if (delivery.status === 'delivered') {
        delivery.deliveredAt = new Date().toISOString();
      }
    }, 1500);
  }

  getDeliveryStats(): DeliveryStats {
    return this.getDeliveryStatistics();
  }
}

export const deliveryService = new DeliveryService();
