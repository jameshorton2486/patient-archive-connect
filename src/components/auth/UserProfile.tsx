
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Building, Save, Shield } from 'lucide-react';

type UserRole = 'client' | 'staff' | 'attorney' | 'admin';

interface UserProfileProps {
  role?: UserRole;
  onBack?: () => void;
}

export function UserProfile({ role = 'client', onBack }: UserProfileProps) {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    organization: 'Smith & Associates Law',
    bio: 'Personal injury attorney with 10+ years experience',
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const getRoleInfo = (userRole: UserRole) => {
    const roleConfig = {
      client: { color: 'blue', label: 'Client', icon: User },
      staff: { color: 'green', label: 'Staff Member', icon: User },
      attorney: { color: 'purple', label: 'Attorney', icon: Shield },
      admin: { color: 'red', label: 'Administrator', icon: Shield }
    };
    return roleConfig[userRole];
  };

  const roleInfo = getRoleInfo(role);
  const RoleIcon = roleInfo.icon;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="space-y-6">
        {onBack && (
          <Button onClick={onBack} variant="outline">
            ← Back
          </Button>
        )}

        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <RoleIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={`bg-${roleInfo.color}-100 text-${roleInfo.color}-800`}>
                {roleInfo.label}
              </Badge>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="organization"
                  value={profile.organization}
                  onChange={(e) => setProfile(prev => ({ ...prev, organization: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Choose how you want to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={profile.notifications.email}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, email: checked }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts via text message
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={profile.notifications.sms}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, sms: checked }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive browser push notifications
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={profile.notifications.push}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, push: checked }
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
