'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockIncidents, mockPatients, mockNurses } from '@/lib/mock-data';
import { formatDate, formatTime } from '@/lib/utils';
import { 
  ArrowLeft,
  Trash2,
  AlertTriangle,
  User,
  Calendar,
  Clock
} from 'lucide-react';

export default function IncidentDeletePage() {
  const params = useParams();
  const router = useRouter();
  const [incident, setIncident] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchIncident = async () => {
      setIsLoading(true);
      try {
        const foundIncident = mockIncidents.find(i => i.id === params.id);
        if (foundIncident) {
          setIncident(foundIncident);
        }
      } catch (error) {
        console.error('Error fetching incident:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchIncident();
    }
  }, [params.id]);

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient?.name || 'Unknown Patient';
  };

  const getNurseName = (nurseId: string) => {
    const nurse = mockNurses.find(n => n.id === nurseId);
    return nurse?.name || 'Unknown Nurse';
  };

  const getPriorityText = (priority: string) => {
    const priorityConfig = {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical'
    };
    return priorityConfig[priority as keyof typeof priorityConfig] || priority;
  };

  const getStatusText = (status: string) => {
    const statusConfig = {
      open: 'Open',
      investigating: 'Investigating',
      resolved: 'Resolved',
      closed: 'Closed'
    };
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting incident:', incident?.id);
      router.push('/incidents');
    } catch (error) {
      console.error('Error deleting incident:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/incidents/${params.id}`);
  };

  const handleBack = () => {
    router.push('/incidents');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Incidents
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Incidents
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Incident Not Found</h3>
            <p className="text-gray-600">The incident you're trying to delete doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Incidents
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delete Incident</h1>
          <p className="text-gray-600">Confirm deletion of this incident</p>
        </div>
      </div>

      {/* Warning Card */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Warning: This action cannot be undone
          </CardTitle>
          <CardDescription className="text-red-700">
            You are about to permanently delete this incident. This action cannot be undone and will remove all associated data.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Incident Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Incident to be Deleted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Incident ID</h4>
                <p className="text-gray-700 font-mono">{incident.id}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Title</h4>
                <p className="text-gray-700 font-medium">{incident.title}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p className="text-gray-700">{incident.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Priority</h4>
                <p className="text-gray-700">{getPriorityText(incident.priority)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                <p className="text-gray-700">{getStatusText(incident.status)}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Patient</h4>
                <p className="text-gray-700">{getPatientName(incident.patientId)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Reported By</h4>
                <p className="text-gray-700">{getNurseName(incident.reportedBy)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Date of Incident</h4>
                <p className="text-gray-700">{formatDate(incident.date)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Time of Incident</h4>
                <p className="text-gray-700">{formatTime(incident.time)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                <p className="text-gray-700">{incident.location || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button 
          variant="destructive" 
          onClick={handleDelete} 
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {isDeleting ? 'Deleting...' : 'Delete Incident'}
        </Button>
      </div>
    </div>
  );
}



