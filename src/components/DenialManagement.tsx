
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileX,
  User,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { DenialRecord, DenialCategory, DenialStats, DENIAL_CATEGORIES } from '@/types/denial';
import { denialService } from '@/services/denialService';

interface DenialManagementProps {
  onBack?: () => void;
}

export function DenialManagement({ onBack }: DenialManagementProps) {
  const [denials, setDenials] = useState<DenialRecord[]>([]);
  const [stats, setStats] = useState<DenialStats | null>(null);
  const [selectedDenial, setSelectedDenial] = useState<DenialRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    category: '' as DenialCategory | '',
    dateRange: { start: '', end: '' }
  });

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [denialsData, statsData] = await Promise.all([
        denialService.getDenials(filters.status || filters.category ? filters : undefined),
        denialService.getDenialStatistics()
      ]);
      
      setDenials(denialsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading denial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolveDenial = async (denialId: string, resolutionType: string, notes: string) => {
    try {
      await denialService.resolvedenial(denialId, resolutionType, {}, notes);
      await loadData();
      setSelectedDenial(null);
    } catch (error) {
      console.error('Error resolving denial:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'escalated':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getCategoryIcon = (category: DenialCategory) => {
    switch (category) {
      case 'fee-required':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'additional-authorization':
        return <FileX className="h-4 w-4 text-blue-600" />;
      case 'records-not-available':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <FileX className="h-4 w-4 text-gray-600" />;
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
        <AlertTriangle className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Denial Management & Resolution</h1>
      </div>

      {/* Statistics Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileX className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalDenials}</p>
                  <p className="text-sm text-muted-foreground">Total Denials</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{(stats.resolutionRate * 100).toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground">Resolution Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.averageResolutionTime.toFixed(1)}h</p>
                  <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">${stats.costImpact.feesRequired}</p>
                  <p className="text-sm text-muted-foreground">Fees Required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Denials</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              className="w-full p-2 border rounded"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">All Statuses</option>
              <option value="received">Received</option>
              <option value="reviewing">Reviewing</option>
              <option value="processing">Processing</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="w-full p-2 border rounded"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as DenialCategory }))}
            >
              <option value="">All Categories</option>
              {Object.entries(DENIAL_CATEGORIES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="dateStart">Date Range</Label>
            <div className="flex gap-2">
              <Input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  dateRange: { ...prev.dateRange, start: e.target.value }
                }))}
              />
              <Input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  dateRange: { ...prev.dateRange, end: e.target.value }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Denials List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Denials</CardTitle>
          <CardDescription>Manage and track denial resolution progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {denials.map((denial) => (
              <div key={denial.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(denial.category)}
                    <div>
                      <p className="font-medium">{DENIAL_CATEGORIES[denial.category]}</p>
                      <p className="text-sm text-muted-foreground">
                        Denial ID: {denial.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(denial.status)}
                    <Badge variant={denial.status === 'resolved' ? 'default' : 'secondary'}>
                      {denial.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium">Provider Response:</p>
                    <p className="text-sm text-muted-foreground">{denial.reason}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date Received:</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(denial.denialDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Assigned Staff:</p>
                    <p className="text-sm text-muted-foreground">
                      {denial.assignedStaffId || 'Unassigned'}
                    </p>
                  </div>
                </div>

                {/* Denial Details */}
                {denial.details.feeAmount && (
                  <div className="mb-3">
                    <p className="text-sm font-medium">Fee Required: ${denial.details.feeAmount}</p>
                    <p className="text-sm text-muted-foreground">
                      Payment Method: {denial.details.paymentMethod}
                    </p>
                  </div>
                )}

                {denial.details.authRequirements && (
                  <div className="mb-3">
                    <p className="text-sm font-medium">Authorization Requirements:</p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside">
                      {denial.details.authRequirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedDenial(denial)}
                  >
                    View Details
                  </Button>
                  
                  {denial.status !== 'resolved' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleResolveDenial(denial.id, 'payment-sent', 'Payment processed')}
                      >
                        Mark Resolved
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => denialService.assignStaff(denial.id, 'staff_001')}
                      >
                        Assign Staff
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Denial Categories Chart */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Denial Categories Breakdown</CardTitle>
            <CardDescription>Distribution of denial types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.denialsByCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category as DenialCategory)}
                    <span className="text-sm">{DENIAL_CATEGORIES[category as DenialCategory]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(count / stats.totalDenials) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Denial Detail Modal */}
      {selectedDenial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Denial Details</h2>
                <Button variant="outline" onClick={() => setSelectedDenial(null)}>
                  Close
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                <div>
                  <Label>Category</Label>
                  <p className="text-sm">{DENIAL_CATEGORIES[selectedDenial.category]}</p>
                </div>
                
                <div>
                  <Label>Provider Response</Label>
                  <p className="text-sm">{selectedDenial.reason}</p>
                </div>
                
                <div>
                  <Label>Resolution Notes</Label>
                  <Textarea 
                    placeholder="Add resolution notes..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleResolveDenial(selectedDenial.id, 'resolved', 'Manually resolved')}
                  >
                    Mark Resolved
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleResolveDenial(selectedDenial.id, 'escalated', 'Escalated to management')}
                  >
                    Escalate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
