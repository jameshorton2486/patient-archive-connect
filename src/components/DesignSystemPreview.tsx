
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Plus, 
  Download, 
  Settings, 
  Heart,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info
} from "lucide-react";

export function DesignSystemPreview() {
  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Design System Preview</h1>
        <p className="text-base text-[var(--text-secondary)]">Linear-style component showcase and design system playground</p>
      </div>

      <Separator className="bg-[var(--border-primary)]" />

      {/* Typography Section */}
      <Card className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-primary)] shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[var(--text-primary)]">Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Heading 1 - Bold Title</h1>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Heading 2 - Section Title</h2>
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Heading 3 - Subsection</h3>
            <h4 className="text-lg font-medium text-[var(--text-primary)]">Heading 4 - Card Title</h4>
            <p className="text-base text-[var(--text-primary)]">Body text - Primary content</p>
            <p className="text-sm text-[var(--text-secondary)]">Secondary text - Supporting information</p>
            <p className="text-xs text-[var(--text-secondary)]">Caption text - Small details</p>
          </div>
        </CardContent>
      </Card>

      {/* Buttons Section */}
      <Card className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-primary)] shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[var(--text-primary)]">Buttons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-[var(--text-secondary)]">Primary Actions</h4>
              <div className="space-y-2">
                <Button className="w-full bg-[var(--accent-medical)] text-white hover:shadow-md">
                  <Plus className="h-4 w-4 mr-2" />
                  Primary Action
                </Button>
                <Button variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Secondary Action
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Outline Action
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-[var(--text-secondary)]">Ghost & Links</h4>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Ghost Action
                </Button>
                <Button variant="link" className="w-full">
                  Link Action
                </Button>
                <Button variant="destructive" className="w-full">
                  <XCircle className="h-4 w-4 mr-2" />
                  Destructive
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-[var(--text-secondary)]">Sizes & States</h4>
              <div className="space-y-2">
                <Button size="lg" className="w-full bg-[var(--accent-medical)] text-white">
                  Large Button
                </Button>
                <Button size="default" className="w-full bg-[var(--accent-medical)] text-white">
                  Default Size
                </Button>
                <Button size="sm" className="w-full bg-[var(--accent-medical)] text-white">
                  Small Button
                </Button>
                <Button disabled className="w-full">
                  Disabled State
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Components */}
      <Card className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-primary)] shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[var(--text-primary)]">Form Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[var(--text-primary)] font-medium">Email Address</Label>
                <Input 
                  placeholder="Enter your email" 
                  className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[var(--text-primary)] font-medium">Password</Label>
                <Input 
                  type="password" 
                  placeholder="Enter password" 
                  className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[var(--text-primary)] font-medium">Error State</Label>
                <Input 
                  placeholder="Invalid input" 
                  error={true}
                  className="bg-[var(--bg-primary)] border-red-500 rounded-md"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-[var(--text-primary)]">
                  Accept terms and conditions
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications" className="text-[var(--text-primary)]">
                  Enable notifications
                </Label>
              </div>

              <div className="space-y-2">
                <Label className="text-[var(--text-primary)] font-medium">Progress Example</Label>
                <Progress value={75} className="w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status & Tags */}
      <Card className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-primary)] shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[var(--text-primary)]">Status & Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-[var(--text-secondary)]">Status Badges</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Success
                </Badge>
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  <XCircle className="h-3 w-3 mr-1" />
                  Error
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Warning
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Info className="h-3 w-3 mr-1" />
                  Info
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-[var(--text-secondary)]">Feature Tags</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-[var(--accent-medical)]/10 text-[var(--accent-medical)] border-[var(--accent-medical)]/20">
                  Medical
                </Badge>
                <Badge variant="outline">
                  Legal
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  AI Powered
                </Badge>
                <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                  Pro Feature
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Variations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-primary)] shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[var(--text-primary)]">Standard Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--text-secondary)]">
              This is a standard card with proper Linear styling and hover effects.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--bg-primary)] rounded-xl border border-[var(--accent-medical)]/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[var(--accent-medical)] flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              Featured Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--text-secondary)]">
              This card has an accent border to highlight important content.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[var(--text-primary)]">Gradient Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--text-secondary)]">
              Subtle gradient background for visual interest.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Elements Preview */}
      <Card className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-primary)] shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[var(--text-primary)]">Interactive Elements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)]">
              <div>
                <h4 className="font-medium text-[var(--text-primary)]">Notification Settings</h4>
                <p className="text-sm text-[var(--text-secondary)]">Manage your email preferences</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)]">
              <div>
                <h4 className="font-medium text-[var(--text-primary)]">Dark Mode</h4>
                <p className="text-sm text-[var(--text-secondary)]">Toggle theme appearance</p>
              </div>
              <Switch />
            </div>

            <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-[var(--text-primary)]">Storage Usage</h4>
                <span className="text-sm text-[var(--text-secondary)]">7.2 GB / 10 GB</span>
              </div>
              <Progress value={72} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
