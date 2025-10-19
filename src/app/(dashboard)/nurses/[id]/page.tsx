'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockNurses } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { 
  ArrowLeft,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  UserCheck,
  Star,
  FileText,
  AlertTriangle
} from 'lucide-react';

export default function NurseViewPage() {
  const params = useParams();
  const router = useRouter();
  const [nurse, setNurse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
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

  const handleEdit = () => {
    router.push(`/nurses/${params.id}/edit`);
  };

  const handleDelete = () => {
    router.push(`/nurses/${params.id}/delete`);
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
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nurse Not Found</h3>
            <p className="text-gray-600">The nurse you're looking for doesn't exist or has been removed.</p>
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
            Back to Nurses
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nurse Details</h1>
            <p className="text-gray-600">View and manage nurse information</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Nurse
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Nurse
          </Button>
        </div>
      </div>

      {/* Nurse Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
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
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-gray-400" />
                <span className="text-gray-700">{nurse.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-gray-400" />
                <span className="text-gray-700">{nurse.phone}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-3 text-gray-400" />
                <span className="text-gray-700">{nurse.specialty}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Specialty</h4>
              <p className="text-gray-700">{nurse.specialty}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Experience</h4>
              <p className="text-gray-700">{nurse.experienceYears} years</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">License Number</h4>
              <p className="text-gray-700 font-mono text-sm">{nurse.licenseNumber}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {nurse.status.charAt(0).toUpperCase() + nurse.status.slice(1).replace('_', ' ')}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
              <p className="text-gray-700">{nurse.address}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Created</h4>
              <p className="text-gray-700">{formatDate(nurse.createdAt)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h4>
              <p className="text-gray-700">{formatDate(nurse.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-600">
            {nurse.notes ? (
              <p>{nurse.notes}</p>
            ) : (
              <p>No additional notes or information available for this nurse.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

