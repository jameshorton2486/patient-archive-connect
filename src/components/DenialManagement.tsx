import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText, 
  User,
  Calendar,
  TrendingUp,
  Filter
} from "lucide-react";
import { DenialRecord, DenialCategory, DenialStatus, DenialStats, DENIAL_CATEGORIES } from "@/types/denial";
import { denialService } from "@/services/denialService";

interface DenialManagementProps {
  onBack: () => void;
}

export function DenialManagement({ onBack }: DenialManagementProps) {
  const [denials, setDenials] = useState<DenialRecord[]>([]);
  const [stats, setStats] = useState<DenialStats | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDenials();
    loadStats();
  }, []);

  const loadDenials = async () => {
    try {
      setLoading(true);
      const denialData = await denialService.getAllDenials();
      setDenials(denialData);
    } catch (error) {
      console.error('Error loading denials:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await denialService.getDenialStatistics();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading denial statistics:', error);
    }
  };

  const filteredDenials = denials.filter(denial => {
    const matchesSearch = denial.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         denial.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || denial.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || denial.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusVariant = (status: DenialStatus) => {
    switch (status) {
      case 'processing':
        return 'default';
      case 'reviewing':
        return 'secondary';
      case 'resolved':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getCategoryVariant = (category: DenialCategory) => {
    switch (category) {
      case 'additional-authorization':
        return 'secondary';
      case 'records-not-available':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Denial Management</h2>
          <p className="text-muted-foreground">Manage and resolve document request denials</p>
        </div>
        <Button onClick={onBack} variant="outline">
          Back to Dashboard
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Denial List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search denials by reason or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="reviewing">Reviewing</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(DENIAL_CATEGORIES).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Clock className="mx-auto h-6 w-6 animate-spin mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Loading denials...</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredDenials.map((denial) => (
                <Card key={denial.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                        <div>
                          <h3 className="font-semibold text-lg">{denial.reason}</h3>
                          <p className="text-sm text-muted-foreground">
                            Denial ID: {denial.id}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={getStatusVariant(denial.status as DenialStatus)}>{denial.status}</Badge>
                            <Badge variant={getCategoryVariant(denial.category)}>{DENIAL_CATEGORIES[denial.category]}</Badge>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Client & Provider</p>
                          <p className="text-sm text-muted-foreground">
                            Client ID: {denial.clientId}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Provider ID: {denial.providerId}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Dates</p>
                          <p className="text-sm text-muted-foreground">
                            Date: {new Date(denial.denialDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Created: {new Date(denial.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredDenials.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <AlertTriangle className="mx-auto h-6 w-6 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No denials found matching your criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          {stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Total Denials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalDenials}</div>
                  <p className="text-sm text-muted-foreground">
                    From all document requests
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Resolution Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{(stats.resolutionRate * 100).toFixed(1)}%</div>
                  <p className="text-sm text-muted-foreground">
                    Of all denials
                  </p>
                  <Progress value={stats.resolutionRate * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Avg. Resolution Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.averageResolutionTime.toFixed(1)} hrs</div>
                  <p className="text-sm text-muted-foreground">
                    Average time to resolve a denial
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    Monthly Trends
                  </CardTitle>
                  <CardDescription>Denial counts and resolution rates over the last three months.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {stats.monthlyTrends.map((trend) => (
                      <div key={trend.month} className="space-y-1">
                        <p className="text-sm font-medium">{trend.month}</p>
                        <p className="text-xl font-bold">{trend.count}</p>
                        <p className="text-green-500 text-sm">
                          Resolution: {(trend.resolutionRate * 100).toFixed(1)}%
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    Top Categories
                  </CardTitle>
                  <CardDescription>Distribution of denials by category.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-none space-y-2">
                    {Object.entries(stats.denialsByCategory).map(([category, count]) => (
                      <li key={category} className="flex items-center justify-between">
                        <span className="text-sm">{DENIAL_CATEGORIES[category as DenialCategory]}</span>
                        <span className="font-medium">{count}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Clock className="mx-auto h-6 w-6 animate-spin mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Loading analytics...</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
