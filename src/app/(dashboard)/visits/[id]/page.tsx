'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockVisits, mockPatients, mockNurses } from '@/lib/mock-data';
import { formatDate, formatTime } from '@/lib/utils';
import { 
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Clock,
  User,
  MapPin,
  AlertTriangle
} from 'lucide-react';

export default function VisitViewPage() {
  const params = useParams();
  const router = useRouter();
  const [visit, setVisit] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisit = async () => {
      setIsLoading(true);
      try {
        const foundVisit = mockVisits.find(v => v.id === params.id);
        if (foundVisit) {
          setVisit(foundVisit);
        }
      } catch (error) {
        console.error('Error fetching visit:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchVisit();
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

  const handleEdit = () => {
    router.push(`/visits/${params.id}/edit`);
  };

  const handleDelete = () => {
    router.push(`/visits/${params.id}/delete`);
  };

  const handleBack = () => {
    router.push('/visits');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Visits
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!visit) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Visits
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Visit Not Found</h3>
            <p className="text-gray-600">The visit you're looking for doesn't exist or has been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Visits
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Visit Details</h1>
            <p className="text-gray-600">View and manage visit information</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Visit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Visit
          </Button>
        </div>
      </div>

      {/* Visit Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visit Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Visit Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Visit ID</h4>
              <p className="text-gray-700 font-mono">{visit.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Date</h4>
              <p className="text-gray-700">{formatDate(visit.date)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Time</h4>
              <p className="text-gray-700">{visit.time}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Type</h4>
              <p className="text-gray-700 capitalize">{visit.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {visit.status.charAt(0).toUpperCase() + visit.status.slice(1).replace('_', ' ')}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Patient & Nurse Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Patient & Nurse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Patient</h4>
              <p className="text-gray-700">{getPatientName(visit.patientId)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Nurse</h4>
              <p className="text-gray-700">{getNurseName(visit.nurseId)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
              <p className="text-gray-700">{visit.address}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Created</h4>
              <p className="text-gray-700">{formatDate(visit.createdAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Visit Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-600">
            {visit.notes ? (
              <p>{visit.notes}</p>
            ) : (
              <p>No notes available for this visit.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

