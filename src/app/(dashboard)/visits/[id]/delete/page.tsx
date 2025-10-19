'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockVisits, mockPatients, mockNurses } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { 
  ArrowLeft,
  Trash2,
  AlertTriangle,
  Calendar,
  X
} from 'lucide-react';

export default function VisitDeletePage() {
  const params = useParams();
  const router = useRouter();
  const [visit, setVisit] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting visit:', visit?.id);
      router.push('/visits');
    } catch (error) {
      console.error('Error deleting visit:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/visits/${params.id}`);
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">Visit Not Found</h3>
            <p className="text-gray-600">The visit you're trying to delete doesn't exist.</p>
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
          Back to Visits
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delete Visit</h1>
          <p className="text-gray-600">Confirm deletion of visit record</p>
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
            Deleting this visit will permanently remove all associated data including billing records and visit notes.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Visit Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Visit to be Deleted
          </CardTitle>
          <CardDescription>
            Review the visit information before confirming deletion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Visit ID</h4>
              <p className="text-gray-700 font-mono">{visit.id}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">Date:</span>
                <span className="ml-2 text-gray-700">{formatDate(visit.date)}</span>
              </div>
              <div>
                <span className="font-medium text-gray-500">Time:</span>
                <span className="ml-2 text-gray-700">{visit.time}</span>
              </div>
              <div>
                <span className="font-medium text-gray-500">Type:</span>
                <span className="ml-2 text-gray-700 capitalize">{visit.type}</span>
              </div>
              <div>
                <span className="font-medium text-gray-500">Status:</span>
                <span className="ml-2 text-gray-700 capitalize">{visit.status.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="font-medium text-gray-500">Patient:</span>
                <span className="ml-2 text-gray-700">{getPatientName(visit.patientId)}</span>
              </div>
              <div>
                <span className="font-medium text-gray-500">Nurse:</span>
                <span className="ml-2 text-gray-700">{getNurseName(visit.nurseId)}</span>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-gray-500">Address:</span>
                <span className="ml-2 text-gray-700">{visit.address}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Are you sure you want to delete this visit?
            </h3>
            <p className="text-gray-600">
              This action will permanently delete the visit for <strong>{getPatientName(visit.patientId)}</strong> on <strong>{formatDate(visit.date)}</strong>.
              This cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Yes, Delete Visit'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

