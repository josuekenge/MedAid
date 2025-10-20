'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockPatients } from '@/lib/mock-data';
import { formatDate, calculateAge } from '@/lib/utils';
import { 
  ArrowLeft,
  Trash2,
  AlertTriangle,
  User,
  X
} from 'lucide-react';

export default function PatientDeletePage() {
  const params = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchPatient = async () => {
      setIsLoading(true);
      try {
        const foundPatient = mockPatients.find(p => p.id === params.id);
        if (foundPatient) {
          setPatient(foundPatient);
        }
      } catch (error) {
        console.error('Error fetching patient:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchPatient();
    }
  }, [params.id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting patient:', patient?.id);
      // In a real app, this would be an API call
      router.push('/patients');
    } catch (error) {
      console.error('Error deleting patient:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/patients/${params.id}`);
  };

  const handleBack = () => {
    router.push('/patients');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Patients
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Patients
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Patient Not Found</h3>
            <p className="text-gray-600">The patient you're trying to delete doesn't exist.</p>
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
          Back to Patients
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delete Patient</h1>
          <p className="text-gray-600">Confirm deletion of patient record</p>
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
            Deleting this patient will permanently remove all associated data including visits, billing records, and medical history.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Patient to be Deleted
          </CardTitle>
          <CardDescription>
            Review the patient information before confirming deletion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-gray-700">
                {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
              <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-500">Email:</span>
              <span className="ml-2 text-gray-700">{patient.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Phone:</span>
              <span className="ml-2 text-gray-700">{patient.phone}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Age:</span>
              <span className="ml-2 text-gray-700">{calculateAge(patient.dateOfBirth)} years old</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Status:</span>
              <span className="ml-2 text-gray-700 capitalize">{patient.status}</span>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-500">Address:</span>
              <span className="ml-2 text-gray-700">{patient.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Are you sure you want to delete this patient?
            </h3>
            <p className="text-gray-600">
              This action will permanently delete <strong>{patient.name}</strong> and all associated data.
              This cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Yes, Delete Patient'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



