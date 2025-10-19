'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockNurses } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { 
  ArrowLeft,
  Trash2,
  AlertTriangle,
  UserCheck,
  X
} from 'lucide-react';

export default function NurseDeletePage() {
  const params = useParams();
  const router = useRouter();
  const [nurse, setNurse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchNurse = async () => {
      setIsLoading(true);
      try {
        const foundNurse = mockNurses.find(n => n.id === params.id);
        if (foundNurse) {
          setNurse(foundNurse);
        }
      } catch (error) {
        console.error('Error fetching nurse:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchNurse();
    }
  }, [params.id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting nurse:', nurse?.id);
      router.push('/nurses');
    } catch (error) {
      console.error('Error deleting nurse:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/nurses/${params.id}`);
  };

  const handleBack = () => {
    router.push('/nurses');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Nurses
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!nurse) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Nurses
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nurse Not Found</h3>
            <p className="text-gray-600">The nurse you're trying to delete doesn't exist.</p>
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
          Back to Nurses
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delete Nurse</h1>
          <p className="text-gray-600">Confirm deletion of nurse record</p>
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
            Deleting this nurse will permanently remove all associated data including visits, certifications, and work history.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Nurse Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserCheck className="h-5 w-5 mr-2" />
            Nurse to be Deleted
          </CardTitle>
          <CardDescription>
            Review the nurse information before confirming deletion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-gray-700">
                {nurse.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{nurse.name}</h3>
              <p className="text-sm text-gray-500">Nurse ID: {nurse.id}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-500">Email:</span>
              <span className="ml-2 text-gray-700">{nurse.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Phone:</span>
              <span className="ml-2 text-gray-700">{nurse.phone}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Specialty:</span>
              <span className="ml-2 text-gray-700">{nurse.specialty}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Experience:</span>
              <span className="ml-2 text-gray-700">{nurse.experienceYears} years</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">License:</span>
              <span className="ml-2 text-gray-700 font-mono">{nurse.licenseNumber}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Status:</span>
              <span className="ml-2 text-gray-700 capitalize">{nurse.status.replace('_', ' ')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Are you sure you want to delete this nurse?
            </h3>
            <p className="text-gray-600">
              This action will permanently delete <strong>{nurse.name}</strong> and all associated data.
              This cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Yes, Delete Nurse'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

