'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate, formatTime } from '@/lib/utils';
import { visitsApi, patientsApi, nursesApi } from '../../../src/services/api';
import { Visit, Patient, Nurse } from '@/types';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  AlertTriangle, 
  Plus,
  Eye,
  Clock,
  Activity,
  User
} from 'lucide-react';

export default function DashboardPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load all data in parallel
        const [visitsResponse, patientsResponse, nursesResponse] = await Promise.all([
          visitsApi.getVisits({ limit: 5 }), // Get recent 5 visits
          patientsApi.getPatients({ limit: 5 }), // Get recent 5 patients
          nursesApi.getNurses({ limit: 5 }), // Get recent 5 nurses
        ]);

        setVisits(visitsResponse.data);
        setPatients(patientsResponse.data);
        setNurses(nursesResponse.data);

        console.log('Dashboard loaded with real data:', {
          visits: visitsResponse.data.length,
          patients: patientsResponse.data.length,
          nurses: nursesResponse.data.length,
        });
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
        // Fallback to empty arrays
        setVisits([]);
        setPatients([]);
        setNurses([]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Mock incidents for now (we'll create incidents API later)
  const incidents: any[] = [];

  // Helper function to safely get patient name
  const getPatientName = (patientId: string) => {
    try {
      const patient = patients.find(p => p.id === patientId);
      return patient?.name || 'Unknown Patient';
    } catch (error) {
      console.error('Error getting patient name:', error);
      return 'Unknown Patient';
    }
  };

  // Helper function to safely get nurse name
  const getNurseName = (nurseId: string) => {
    try {
      const nurse = nurses.find(n => n.id === nurseId);
      return nurse?.name || 'Unknown Nurse';
    } catch (error) {
      console.error('Error getting nurse name:', error);
      return 'Unknown Nurse';
    }
  };

  // Safe data processing with error handling
  let todayVisits = [];
  let recentIncidents = [];
  let activeNurses = [];

  try {
    todayVisits = visits.filter(visit => {
      try {
        return new Date(visit.date).toDateString() === new Date().toDateString();
      } catch (error) {
        console.error('Error filtering today visits:', error);
        return false;
      }
    });

    recentIncidents = incidents.sort((a, b) => {
      try {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } catch (error) {
        console.error('Error sorting incidents:', error);
        return 0;
      }
    }).slice(0, 5);

    activeNurses = nurses.filter(nurse => {
      try {
        return nurse.status === 'active';
      } catch (error) {
        console.error('Error filtering active nurses:', error);
        return false;
      }
    });
  } catch (error) {
    console.error('Error processing dashboard data:', error);
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Loading dashboard data...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
        </div>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <p className="text-red-800">Failed to load dashboard data. Please try refreshing the page.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button asChild variant="primary" size="lg" className="shadow-lg">
          <Link href="/visits">
            <Plus className="h-5 w-5 mr-2" />
            Add Visit
          </Link>
        </Button>
        <Button asChild variant="primary" size="lg" className="shadow-lg">
          <Link href="/patients">
            <User className="h-5 w-5 mr-2" />
            Add Patient
          </Link>
        </Button>
        <Button asChild variant="primary" size="lg" className="shadow-lg">
          <Link href="/nurses">
            <UserCheck className="h-5 w-5 mr-2" />
            Add Nurse
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Nurses</p>
                <p className="text-2xl font-bold text-gray-900">{activeNurses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Visits</p>
                <p className="text-2xl font-bold text-gray-900">{todayVisits.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Open Incidents</p>
                <p className="text-2xl font-bold text-gray-900">
                  {incidents.filter(i => i.status === 'open').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Visits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Today's Visits
          </CardTitle>
          <CardDescription>
            {todayVisits.length} visits scheduled for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          {todayVisits.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No visits today</h3>
              <p className="text-gray-600">All caught up! No visits scheduled for today.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayVisits.map((visit) => (
                <div key={visit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {visit.time ? visit.time.substring(0, 2) : '--'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {getPatientName(visit.patientId)}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {visit.time || '--'} - {visit.type || 'Unknown Type'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">
                      {visit.status ? visit.status.replace('_', ' ') : 'Unknown Status'}
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

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Recent Incidents
          </CardTitle>
          <CardDescription>
            Latest incidents requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentIncidents.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No incidents</h3>
              <p className="text-gray-600">Great! No incidents to report.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {incident.title || 'Untitled Incident'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {incident.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {incident.createdAt ? formatDate(incident.createdAt) : 'Unknown Date'}
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
    </div>
  );
}