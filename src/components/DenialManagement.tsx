import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  FileText, 
  Users, 
  TrendingUp,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { Denial, DenialCategory, DenialStatus, WorkflowStep } from '@/types/denial';
import { denialService } from '@/services/denialService';

interface DenialManagementProps {
  onBack?: () => void;
}

export function DenialManagement({ onBack }: DenialManagementProps) {
  const [denials, setDenials] = useState<Denial[]>([]);
  const [filteredDenials, setFilteredDenials] = useState<Denial[]>([]);
  const [statistics, setStatistics] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    category: '' as DenialCategory | '',
    dateRange: { start: '', end: '' }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const denialsData = await denialService.getAllDenials();
      const stats = await denialService.getDenialStatistics();
      setDenials(denialsData);
      setFilteredDenials(denialsData);
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading denial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async () => {
    const filterParams = {
      status: filters.status || undefined,
      category: filters.category === '' ? undefined : filters.category as DenialCategory,
      dateRange: filters.dateRange.start && filters.dateRange.end ? filters.dateRange : undefined
    };
    
    const filtered = await denialService.filterDenials(filterParams);
    setFilteredDenials(filtered);
  };

  
  const getStatusIcon = (status: DenialStatus) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: DenialCategory) => {
    switch (category) {
      case 'fee-required':
        return 'bg-blue-100 text-blue-800';
      case 'additional-auth':
        return 'bg-yellow-100 text-yellow-800';
      case 'records-unavailable':
        return 'bg-red-100 text-red-800';
      case 'invalid-request':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-3xl font-bold text-foreground">Denial Management</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{statistics.totalDenials || 0}</p>
                <p className="text-sm text-muted-foreground">Total Denials</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{statistics.averageResolutionTime || 0} days</p>
                <p className="text-sm text-muted-foreground">Avg Resolution</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{statistics.resolutionRate ? (statistics.resolutionRate * 100).toFixed(1) : 0}%</p>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${statistics.totalRecovered || 0}</p>
                <p className="text-sm text-muted-foreground">Records Recovered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Denials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value as DenialCategory | ''})}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="fee-required">Fee Required</SelectItem>
                <SelectItem value="additional-auth">Additional Auth</SelectItem>
                <SelectItem value="records-unavailable">Records Unavailable</SelectItem>
                <SelectItem value="invalid-request">Invalid Request</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              type="date"
              placeholder="Start Date"
              value={filters.dateRange.start}
              onChange={(e) => setFilters({...filters, dateRange: {...filters.dateRange, start: e.target.value}})}
            />
            
            <Input
              type="date"
              placeholder="End Date"
              value={filters.dateRange.end}
              onChange={(e) => setFilters({...filters, dateRange: {...filters.dateRange, end: e.target.value}})}
            />
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button onClick={handleFilterChange}>
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
            <Button variant="outline" onClick={() => setFilters({status: '', category: '', dateRange: {start: '', end: ''}})}>
              Clear Filters
            </Button>
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
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(denial.status)}
                    <div>
                      <p className="font-medium">Document #{denial.originalDocumentId}</p>
                      <p className="text-sm text-muted-foreground">Provider: {denial.providerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(denial.category)}>
                      {denial.category.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      {denial.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Received</p>
                    <p>{new Date(denial.receivedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p>{new Date(denial.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Priority</p>
                    <p className="capitalize">{denial.priority}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Assigned To</p>
                    <p>{denial.assignedStaff || 'Unassigned'}</p>
                  </div>
                </div>
                
                {denial.reason && (
                  <div className="mt-3 p-3 bg-muted rounded">
                    <p className="text-sm"><strong>Reason:</strong> {denial.reason}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
