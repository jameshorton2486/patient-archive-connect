import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Calendar,
  Filter
} from 'lucide-react';
import { DenialRecord, DenialCategory, DenialStats } from '@/types/denial';
import { denialService } from '@/services/denialService';

interface DenialManagementProps {
  onBack?: () => void;
}

export function DenialManagement({ onBack }: DenialManagementProps) {
  const [denials, setDenials] = useState<DenialRecord[]>([]);
  const [filteredDenials, setFilteredDenials] = useState<DenialRecord[]>([]);
  const [denialStats, setDenialStats] = useState<DenialStats | null>(null);
  const [selectedDenial, setSelectedDenial] = useState<DenialRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all-statuses',
    category: 'all-categories',
    dateRange: { start: '', end: '' }
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [denials, filters]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [denialsData, statsData] = await Promise.all([
        denialService.getAllDenials(),
        denialService.getDenialStatistics()
      ]);
      
      setDenials(denialsData);
      setDenialStats(statsData);
    } catch (error) {
      console.error('Error loading denial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...denials];
    
    if (filters.status && filters.status !== 'all-statuses') {
      filtered = filtered.filter(denial => denial.status === filters.status);
    }
    
    if (filters.category && filters.category !== 'all-categories') {
      filtered = filtered.filter(denial => denial.category === filters.category);
    }
    
    if (filters.dateRange.start && filters.dateRange.end) {
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      filtered = filtered.filter(denial => {
        const denialDate = new Date(denial.denialDate);
        return denialDate >= start && denialDate <= end;
      });
    }
    
    setFilteredDenials(filtered);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDateRangeChange = (key: 'start' | 'end', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [key]: value
      }
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'reviewing':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryBadgeColor = (category: DenialCategory) => {
    switch (category) {
      case 'fee-required':
        return 'bg-orange-100 text-orange-800';
      case 'additional-authorization':
        return 'bg-blue-100 text-blue-800';
      case 'records-not-available':
        return 'bg-red-100 text-red-800';
      case 'invalid-request':
        return 'bg-purple-100 text-purple-800';
      case 'patient-mismatch':
        return 'bg-yellow-100 text-yellow-800';
      case 'date-range-issue':
        return 'bg-indigo-100 text-indigo-800';
      case 'provider-relationship':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCategoryName = (category: DenialCategory) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleResolveDenial = async (denialId: string) => {
    try {
      await denialService.resolvedenial(
        denialId,
        'manual-resolution',
        { resolvedBy: 'staff_001' },
        'Manually resolved by staff'
      );
      await loadData();
    } catch (error) {
      console.error('Error resolving denial:', error);
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
      {denialStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Denials</p>
                  <p className="text-2xl font-bold">{denialStats.totalDenials}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Resolution Rate</p>
                  <p className="text-2xl font-bold">{(denialStats.resolutionRate * 100).toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Resolution Time</p>
                  <p className="text-2xl font-bold">{denialStats.averageResolutionTime}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Cost Impact</p>
                  <p className="text-2xl font-bold">${denialStats.costImpact.feesRequired}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>Filter denials by status, category, or date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-statuses">All Statuses</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="reviewing">Reviewing</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="category-filter">Category</Label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  <SelectItem value="fee-required">Fee Required</SelectItem>
                  <SelectItem value="additional-authorization">Additional Authorization</SelectItem>
                  <SelectItem value="records-not-available">Records Not Available</SelectItem>
                  <SelectItem value="invalid-request">Invalid Request</SelectItem>
                  <SelectItem value="patient-mismatch">Patient Mismatch</SelectItem>
                  <SelectItem value="date-range-issue">Date Range Issue</SelectItem>
                  <SelectItem value="provider-relationship">Provider Relationship</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Denials List */}
      <Card>
        <CardHeader>
          <CardTitle>Denial Records</CardTitle>
          <CardDescription>Manage and track denial resolutions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDenials.map((denial) => (
              <div key={denial.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(denial.status)}
                      <span className="font-medium">Denial #{denial.id}</span>
                      <Badge className={getCategoryBadgeColor(denial.category)}>
                        {formatCategoryName(denial.category)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Reason:</strong> {denial.reason}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Date:</strong> {new Date(denial.denialDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Client:</strong> {denial.clientId} | <strong>Provider:</strong> {denial.providerId}
                    </p>
                    
                    {denial.assignedStaffId && (
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>Assigned to:</strong> {denial.assignedStaffId}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDenial(denial)}
                    >
                      View Details
                    </Button>
                    {denial.status !== 'resolved' && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleResolveDenial(denial.id)}
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDenials.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No denials found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Denial Details Modal */}
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
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <Label>Denial ID</Label>
                  <p className="font-mono text-sm">{selectedDenial.id}</p>
                </div>
                
                <div>
                  <Label>Category</Label>
                  <Badge className={getCategoryBadgeColor(selectedDenial.category)}>
                    {formatCategoryName(selectedDenial.category)}
                  </Badge>
                </div>
                
                <div>
                  <Label>Reason</Label>
                  <p className="text-sm">{selectedDenial.reason}</p>
                </div>
                
                <div>
                  <Label>Details</Label>
                  <pre className="text-sm bg-muted p-2 rounded whitespace-pre-wrap">
                    {JSON.stringify(selectedDenial.details, null, 2)}
                  </pre>
                </div>
                
                <div>
                  <Label>Status</Label>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedDenial.status)}
                    <span className="capitalize">{selectedDenial.status}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Created</Label>
                    <p className="text-sm">{new Date(selectedDenial.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label>Updated</Label>
                    <p className="text-sm">{new Date(selectedDenial.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
