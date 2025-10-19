'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/providers/theme-provider';
import { generateMetadata } from '@/lib/seo';
import { 
  Settings, 
  Save, 
  Building, 
  DollarSign, 
  Shield, 
  Palette,
  Bell,
  Globe,
  Database,
  Users,
  Key,
  Lock,
  CheckCircle,
  XCircle,
  Plug,
  Link,
  Cloud,
  Zap,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

// Metadata is handled in layout.tsx for client components

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    organizationName: 'MedAid Healthcare',
    organizationEmail: 'admin@medaid.ca',
    organizationPhone: '+1 (416) 555-0000',
    organizationAddress: '123 Healthcare Ave, Toronto, ON M5H 2N2',
    depositPercentage: 50,
    taxRate: 13, // HST for Ontario
    currency: 'CAD',
    timezone: 'America/Toronto',
    notifications: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving settings:', settings);
    // Show success message
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600 mt-1">
            Configure application settings and preferences
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Organization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Organization
            </CardTitle>
            <CardDescription>
              Basic organization information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                value={settings.organizationName}
                onChange={(e) => setSettings({...settings, organizationName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="orgEmail">Email</Label>
              <Input
                id="orgEmail"
                type="email"
                value={settings.organizationEmail}
                onChange={(e) => setSettings({...settings, organizationEmail: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="orgPhone">Phone</Label>
              <Input
                id="orgPhone"
                value={settings.organizationPhone}
                onChange={(e) => setSettings({...settings, organizationPhone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="orgAddress">Address</Label>
              <Input
                id="orgAddress"
                value={settings.organizationAddress}
                onChange={(e) => setSettings({...settings, organizationAddress: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Billing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Billing
            </CardTitle>
            <CardDescription>
              Configure billing and payment settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="depositPercentage">Default Deposit Percentage</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="depositPercentage"
                  type="number"
                  min="0"
                  max="100"
                  value={settings.depositPercentage}
                  onChange={(e) => setSettings({...settings, depositPercentage: parseInt(e.target.value)})}
                  className="w-20"
                />
                <span className="text-sm text-neutral-500">%</span>
              </div>
            </div>
            <div>
              <Label htmlFor="taxRate">Tax Rate</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="taxRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={settings.taxRate}
                  onChange={(e) => setSettings({...settings, taxRate: parseFloat(e.target.value)})}
                  className="w-20"
                />
                <span className="text-sm text-neutral-500">%</span>
              </div>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings({...settings, currency: e.target.value})}
                className="w-20"
              />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the application appearance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Theme</Label>
              <div className="flex space-x-2 mt-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('system')}
                >
                  System
                </Button>
              </div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl">
              <p className="text-sm text-neutral-600">
                Current theme: <Badge variant="outline">{theme}</Badge>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </CardTitle>
          <CardDescription>
            Configure notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-neutral-600">Receive notifications in the app</p>
              </div>
              <Button
                variant={settings.notifications ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSettings({...settings, notifications: !settings.notifications})}
              >
                {settings.notifications ? 'On' : 'Off'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-neutral-600">Receive notifications via email</p>
              </div>
              <Button
                variant={settings.emailNotifications ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
              >
                {settings.emailNotifications ? 'On' : 'Off'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-neutral-600">Receive notifications via SMS</p>
              </div>
              <Button
                variant={settings.smsNotifications ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSettings({...settings, smsNotifications: !settings.smsNotifications})}
              >
                {settings.smsNotifications ? 'On' : 'Off'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security
          </CardTitle>
          <CardDescription>
            Security and compliance settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Security Headers Active</span>
              </div>
              <p className="text-sm text-green-700">
                X-Frame-Options, CSP, HSTS, and other security headers are configured.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Data Protection</span>
              </div>
              <p className="text-sm text-blue-700">
                All data is encrypted in transit and at rest. Audit logging is enabled.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Demo Environment</span>
              </div>
              <p className="text-sm text-yellow-700">
                This is a demo environment. No real patient data is stored or processed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Application version and system details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500">Application Version</p>
              <p className="font-medium">1.0.0</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Build Date</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Environment</p>
              <p className="font-medium">Development</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Database</p>
              <p className="font-medium">Mock (LocalStorage)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Role Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            User Role Management
          </CardTitle>
          <CardDescription>
            Granular permissions and access control for different user types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Role Overview */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Key className="h-4 w-4 mr-2 text-blue-500" />
                Role Permissions Overview
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { role: "Admin", users: 2, permissions: "Full Access" },
                  { role: "Coordinator", users: 5, permissions: "Management" },
                  { role: "Nurse", users: 12, permissions: "Care Delivery" },
                  { role: "Viewer", users: 3, permissions: "Read Only" }
                ].map((role, index) => (
                  <div key={index} className="p-4 rounded-xl border-2 bg-gray-50 border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">
                        {role.users}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{role.role}</div>
                      <div className="text-xs text-gray-600">{role.permissions}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Permission Matrix */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="h-4 w-4 mr-2 text-green-500" />
                Permission Matrix
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-900">Feature</th>
                      <th className="text-center py-2 font-medium text-gray-900">Admin</th>
                      <th className="text-center py-2 font-medium text-gray-900">Coordinator</th>
                      <th className="text-center py-2 font-medium text-gray-900">Nurse</th>
                      <th className="text-center py-2 font-medium text-gray-900">Viewer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { feature: "Patient Management", admin: true, coordinator: true, nurse: true, viewer: false },
                      { feature: "Visit Scheduling", admin: true, coordinator: true, nurse: false, viewer: false },
                      { feature: "Billing Management", admin: true, coordinator: true, nurse: false, viewer: false },
                      { feature: "Incident Reporting", admin: true, coordinator: true, nurse: true, viewer: false },
                      { feature: "User Management", admin: true, coordinator: false, nurse: false, viewer: false },
                      { feature: "System Settings", admin: true, coordinator: false, nurse: false, viewer: false },
                      { feature: "Reports & Analytics", admin: true, coordinator: true, nurse: false, viewer: true }
                    ].map((permission, index) => (
                      <tr key={index}>
                        <td className="py-2 font-medium text-gray-900">{permission.feature}</td>
                        <td className="py-2 text-center">
                          {permission.admin ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-gray-300 mx-auto" />}
                        </td>
                        <td className="py-2 text-center">
                          {permission.coordinator ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-gray-300 mx-auto" />}
                        </td>
                        <td className="py-2 text-center">
                          {permission.nurse ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-gray-300 mx-auto" />}
                        </td>
                        <td className="py-2 text-center">
                          {permission.viewer ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-gray-300 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Hub */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plug className="h-5 w-5 mr-2" />
            Integration Hub
          </CardTitle>
          <CardDescription>
            EMR connections, insurance APIs, and third-party app integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* EMR Connections */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Link className="h-4 w-4 mr-2 text-blue-500" />
                EMR & Health System Integrations
              </h4>
              <div className="space-y-4">
                {[
                  { 
                    name: "Epic MyChart", 
                    status: "connected", 
                    lastSync: "2 minutes ago",
                    type: "EMR"
                  },
                  { 
                    name: "Cerner PowerChart", 
                    status: "connected", 
                    lastSync: "5 minutes ago",
                    type: "EMR"
                  },
                  { 
                    name: "Allscripts Sunrise", 
                    status: "disconnected", 
                    lastSync: "2 hours ago",
                    type: "EMR"
                  },
                  { 
                    name: "OHIP Claims Portal", 
                    status: "connected", 
                    lastSync: "1 hour ago",
                    type: "Insurance"
                  }
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        integration.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-semibold text-gray-900">{integration.name}</p>
                        <p className="text-sm text-gray-600">{integration.type} • {integration.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={integration.status === 'connected' ? 'success' : 'destructive'}
                        className="text-xs"
                      >
                        {integration.status}
                      </Badge>
                      <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Third-Party Apps */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Cloud className="h-4 w-4 mr-2 text-green-500" />
                Third-Party Applications
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-gray-900">Available Integrations</h5>
                    <Badge variant="success" className="text-xs">12 Available</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Connect with popular healthcare and productivity tools</p>
                  <Button className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Browse Integrations
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    { app: "Slack", description: "Team communication", status: "available" },
                    { app: "Microsoft Teams", description: "Video conferencing", status: "available" },
                    { app: "Google Calendar", description: "Schedule management", status: "connected" },
                    { app: "Zoom", description: "Video calls", status: "available" },
                    { app: "Dropbox", description: "File storage", status: "available" },
                    { app: "Salesforce", description: "CRM integration", status: "available" }
                  ].map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          app.status === 'connected' ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{app.app}</p>
                          <p className="text-sm text-gray-600">{app.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={app.status === 'connected' ? 'success' : 'default'}
                          className="text-xs"
                        >
                          {app.status}
                        </Badge>
                        {app.status === 'available' && (
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                            <Link className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Integration Analytics */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-purple-500" />
              Integration Analytics
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-xl text-center">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600">Active Connections</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl text-center">
                <div className="text-2xl font-bold text-yellow-600">2.3s</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl text-center">
                <div className="text-2xl font-bold text-purple-600">1,247</div>
                <div className="text-sm text-gray-600">API Calls Today</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
