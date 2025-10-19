'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  User,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: 'MedAid Healthcare',
    organizationEmail: 'admin@medaid.com',
    organizationPhone: '+1 (555) 123-4567',
    organizationAddress: '123 Healthcare St, Toronto, ON M5V 3A8',
    timezone: 'America/Toronto',
    currency: 'CAD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    apiKey: 'sk-1234567890abcdef',
    webhookUrl: 'https://api.medaid.com/webhooks',
    backupFrequency: 'daily',
    retentionPeriod: '7 years',
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    dataEncryption: true,
    auditLogging: true,
    gdprCompliance: true,
    hipaaCompliance: true
  });

  const handleSave = () => {
    console.log('Saving settings:', formData);
    setIsEditing(false);
    // TODO: Add API call to save settings
  };

  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reset form data to original values
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const roles = [
    {
      name: 'Administrator',
      description: 'Full access to all features and settings',
      permissions: ['All permissions'],
      userCount: 2
    },
    {
      name: 'Nurse Manager',
      description: 'Manage nurses, visits, and patient care',
      permissions: ['Manage nurses', 'View all visits', 'Manage patients'],
      userCount: 5
    },
    {
      name: 'Nurse',
      description: 'Manage assigned visits and patient care',
      permissions: ['View assigned visits', 'Update visit status', 'View patient info'],
      userCount: 12
    },
    {
      name: 'Billing Manager',
      description: 'Manage billing and financial operations',
      permissions: ['Manage billing', 'View financial reports', 'Process payments'],
      userCount: 3
    },
    {
      name: 'Viewer',
      description: 'Read-only access to reports and data',
      permissions: ['View reports', 'View analytics'],
      userCount: 8
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your organization's settings and preferences.</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Edit Settings
            </Button>
          )}
        </div>
      </div>

      {/* Organization Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Organization Settings
          </CardTitle>
          <CardDescription>
            Basic information about your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organizationName">Organization Name</Label>
              <Input
                id="organizationName"
                value={formData.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="organizationEmail">Email</Label>
              <Input
                id="organizationEmail"
                type="email"
                value={formData.organizationEmail}
                onChange={(e) => handleInputChange('organizationEmail', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="organizationPhone">Phone</Label>
              <Input
                id="organizationPhone"
                value={formData.organizationPhone}
                onChange={(e) => handleInputChange('organizationPhone', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={formData.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="organizationAddress">Address</Label>
            <Input
              id="organizationAddress"
              value={formData.organizationAddress}
              onChange={(e) => handleInputChange('organizationAddress', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* User Roles & Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            User Roles & Permissions
          </CardTitle>
          <CardDescription>
            Manage user roles and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map((role, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{role.name}</h3>
                  <span className="text-sm text-gray-500">{role.userCount} users</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission, permIndex) => (
                    <span
                      key={permIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure security and compliance settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <Key className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Require 2FA for all users</p>
                </div>
              </div>
              <div className="flex items-center">
                {formData.twoFactorEnabled ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Data Encryption</h3>
                  <p className="text-sm text-gray-600">Encrypt all data at rest</p>
                </div>
              </div>
              <div className="flex items-center">
                {formData.dataEncryption ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Audit Logging</h3>
                  <p className="text-sm text-gray-600">Log all user actions</p>
                </div>
              </div>
              <div className="flex items-center">
                {formData.auditLogging ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">HIPAA Compliance</h3>
                  <p className="text-sm text-gray-600">HIPAA compliant data handling</p>
                </div>
              </div>
              <div className="flex items-center">
                {formData.hipaaCompliance ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plug className="h-5 w-5 mr-2" />
            API Settings
          </CardTitle>
          <CardDescription>
            Configure API access and integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input
                id="apiKey"
                type={showApiKey ? 'text' : 'password'}
                value={formData.apiKey}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                disabled={!isEditing}
                className="font-mono"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
                disabled={!isEditing}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input
              id="webhookUrl"
              value={formData.webhookUrl}
              onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize the appearance of your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Label htmlFor="theme">Theme</Label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

