
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, FileText, TrendingUp, Search, Download, Upload, Brain, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const stats = [
  {
    title: "Total Cases",
    value: "23",
    description: "+3 new this week",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Pending Records",
    value: "12",
    description: "8 due this week",
    icon: Clock,
    color: "text-orange-600"
  },
  {
    title: "AI Processed Docs",
    value: "156",
    description: "+24 this week",
    icon: Brain,
    color: "text-purple-600"
  },
  {
    title: "Success Rate",
    value: "94.2%",
    description: "+2.1% from last month",
    icon: TrendingUp,
    color: "text-green-600"
  }
];

// Mock case data with provider tracking
const mockCases = [
  {
    id: "CASE-2024-001",
    clientName: "John Smith",
    status: "Active",
    lastActivity: "2024-01-15",
    nextFollowUp: "2024-01-22",
    providers: [
      {
        id: "prov_001",
        name: "Regional Medical Center",
        specialty: "Emergency Room",
        requestSent: "2024-01-10",
        status: "pending",
        daysOverdue: 5,
        documentType: "Emergency Records"
      },
      {
        id: "prov_002", 
        name: "Dr. Sarah Johnson",
        specialty: "Orthopedic Surgery",
        requestSent: "2024-01-12",
        status: "received",
        documentType: "Consultation Notes"
      }
    ],
    aiSummaries: [
      {
        id: "ai_001",
        documentType: "X-Ray Report",
        summary: "Right femur fracture confirmed. No complications noted.",
        extractedData: {
          patientName: "John Smith",
          providerName: "Regional Medical Center",
          dateOfService: "2024-01-10",
          keyFindings: ["Right femur fracture", "No complications"]
        },
        processedAt: "2024-01-15",
        downloadUrl: "#"
      }
    ]
  },
  {
    id: "CASE-2024-002",
    clientName: "Maria Garcia",
    status: "Pending",
    lastActivity: "2024-01-12",
    nextFollowUp: "2024-01-19",
    providers: [
      {
        id: "prov_003",
        name: "City Hospital",
        specialty: "Physical Therapy",
        requestSent: "2024-01-08",
        status: "denied",
        daysOverdue: 0,
        documentType: "PT Notes"
      }
    ],
    aiSummaries: []
  }
];

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredCases = mockCases.filter(caseItem => {
    const matchesSearch = caseItem.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || caseItem.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'received': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'overdue': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'received': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'denied': return <XCircle className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      console.log(`Processing uploaded file: ${file.name}`);
      setIsProcessing(false);
      setSelectedFile(null);
      // In real implementation, this would trigger the AI processing service
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Legal Case Dashboard</h2>
          <p className="text-muted-foreground">AI-powered medical records management and tracking</p>
        </div>
        
        {/* File Upload for AI Processing */}
        <div className="flex gap-2">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Button asChild variant="outline">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Upload Medical Record
            </label>
          </Button>
        </div>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
              <div>
                <p className="font-medium text-blue-900">Processing Medical Record</p>
                <p className="text-sm text-blue-700">
                  AI is extracting patient data, provider information, and key medical findings...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Case Management</CardTitle>
          <CardDescription>Track case status, provider responses, and AI summaries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by client name or case ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cases</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cases List */}
          <div className="space-y-6">
            {filteredCases.map((caseItem) => (
              <div key={caseItem.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{caseItem.clientName}</h3>
                    <p className="text-sm text-muted-foreground">Case ID: {caseItem.id}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{caseItem.status}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Last Activity: {caseItem.lastActivity}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Next Follow-up: {caseItem.nextFollowUp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Provider Response Tracker */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Provider Response Tracker</h4>
                  <div className="grid gap-3">
                    {caseItem.providers.map((provider) => (
                      <div key={provider.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(provider.status)}
                          <div>
                            <p className="font-medium">{provider.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {provider.specialty} • {provider.documentType}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Sent: {provider.requestSent}
                              {provider.daysOverdue > 0 && (
                                <span className="text-red-600 ml-2">
                                  ({provider.daysOverdue} days overdue)
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(provider.status)}>
                          {provider.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Summaries */}
                {caseItem.aiSummaries.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      AI Processed Documents
                    </h4>
                    <div className="grid gap-3">
                      {caseItem.aiSummaries.map((summary) => (
                        <div key={summary.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{summary.documentType}</p>
                              <p className="text-sm text-muted-foreground">
                                Processed: {summary.processedAt}
                              </p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                          <p className="text-sm mb-2">{summary.summary}</p>
                          <div className="text-xs text-muted-foreground">
                            <strong>Extracted:</strong> Patient: {summary.extractedData.patientName}, 
                            Provider: {summary.extractedData.providerName}, 
                            Date: {summary.extractedData.dateOfService}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No cases found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
