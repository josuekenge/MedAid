'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatTime } from '@/lib/utils';
import { Visit, Patient, Nurse } from '@/src/types';
import { patientsApi, nursesApi, visitsApi } from '@/src/services/api';
import {
  Users,
  UserCheck,
  Calendar,
  AlertTriangle,
  Plus,
  Eye,
  Clock,
  Activity,
  User,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // For now, use mock data to get the app running
      const mockVisits: Visit[] = [
        {
          id: '1',
          patientId: '1',
          nurseId: '1',
          serviceId: '1',
          carePlanId: null,
          date: '2024-01-15',
          windowStart: '2024-01-15T09:00:00Z',
          windowEnd: '2024-01-15T10:00:00Z',
          status: 'scheduled',
          reasonForVisit: 'Regular checkup',
          notes: null,
          checkInTime: null,
          checkOutTime: null,
          location: null,
          isUrgent: false,
          isAfterHours: false,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        }
      ];

      const mockPatients: Patient[] = [
        {
          id: '1',
          userId: null,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-0123',
          dateOfBirth: '1980-01-01',
          address: { street: '123 Main St', city: 'Toronto', province: 'ON' },
          emergencyContact: { name: 'Jane Doe', phone: '555-0124' },
          status: 'active',
          notes: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        }
      ];

      const mockNurses: Nurse[] = [
        {
          id: '1',
          userId: '1',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '555-0125',
          specialties: ['General Care'],
          availability: { monday: ['9-17'], tuesday: ['9-17'] },
          status: 'active',
          notes: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        }
      ];

      setVisits(mockVisits);
      setPatients(mockPatients);
      setNurses(mockNurses);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };

  const getNurseName = (nurseId: string | null) => {
    if (!nurseId) return 'Unassigned Nurse';
    const nurse = nurses.find(n => n.id === nurseId);
    return nurse ? nurse.name : 'Unknown Nurse';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={() => router.push('/visits')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Visit
          </Button>
          <Button variant="outline" onClick={() => router.push('/patients')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
          <Button variant="outline" onClick={() => router.push('/nurses')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Nurse
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">
              {patients.length > 0 ? 'Active patients' : 'No patients yet'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Nurses</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nurses.length}</div>
            <p className="text-xs text-muted-foreground">
              {nurses.length > 0 ? 'Available staff' : 'No nurses yet'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Visits</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visits.length}</div>
            <p className="text-xs text-muted-foreground">
              {visits.length > 0 ? 'Scheduled visits' : 'No visits today'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              All clear
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Visits */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Visits</CardTitle>
          <CardDescription>Latest scheduled and completed visits</CardDescription>
        </CardHeader>
        <CardContent>
          {visits.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No visits scheduled yet</p>
              <Button className="mt-4" onClick={() => router.push('/visits')}>
                Schedule First Visit
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {visits.map((visit) => (
                <div key={visit.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{getPatientName(visit.patientId)}</p>
                      <p className="text-sm text-gray-600">{getNurseName(visit.nurseId)}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(visit.date)} at {formatTime(visit.windowStart)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visit.status)}`}>
                      {visit.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Patients
            </CardTitle>
            <CardDescription>Manage patient records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total: {patients.length}</p>
              <Button className="w-full" onClick={() => router.push('/patients')}>
                View All Patients
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2" />
              Nurses
            </CardTitle>
            <CardDescription>Manage nursing staff</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total: {nurses.length}</p>
              <Button className="w-full" onClick={() => router.push('/nurses')}>
                View All Nurses
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule
            </CardTitle>
            <CardDescription>Manage visit schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Today: {visits.length}</p>
              <Button className="w-full" onClick={() => router.push('/schedule')}>
                View Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}