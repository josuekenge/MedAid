'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCertifications } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { 
  ArrowLeft,
  Trash2,
  AlertTriangle,
  Award,
  Calendar,
  CheckCircle
} from 'lucide-react';

export default function CertificationDeletePage() {
  const params = useParams();
  const router = useRouter();
  const [certification, setCertification] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchCertification = async () => {
      setIsLoading(true);
      try {
        const foundCertification = mockCertifications.find(c => c.id === params.id);
        if (foundCertification) {
          setCertification(foundCertification);
        }
      } catch (error) {
        console.error('Error fetching certification:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCertification();
    }
  }, [params.id]);

  const getStatusText = (status: string) => {
    const statusConfig = {
      active: 'Active',
      expired: 'Expired',
      pending: 'Pending',
      revoked: 'Revoked'
    };
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting certification:', certification?.id);
      router.push('/certifications');
    } catch (error) {
      console.error('Error deleting certification:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/certifications/${params.id}`);
  };

  const handleBack = () => {
    router.push('/certifications');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Certifications
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!certification) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Certifications
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Certification Not Found</h3>
            <p className="text-gray-600">The certification you're trying to delete doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const daysUntilExpiry = getDaysUntilExpiry(certification.expiryDate);
  const isExpiredCert = isExpired(certification.expiryDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Certifications
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delete Certification</h1>
          <p className="text-gray-600">Confirm deletion of this certification</p>
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
            You are about to permanently delete this certification. This action cannot be undone and will remove all associated data.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Certification Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Certification to be Deleted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Certification ID</h4>
                <p className="text-gray-700 font-mono">{certification.id}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Name</h4>
                <p className="text-gray-700 font-medium text-lg">{certification.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Issuing Organization</h4>
                <p className="text-gray-700">{certification.issuingOrganization}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Certification Number</h4>
                <p className="text-gray-700 font-mono">{certification.certificationNumber}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                <p className="text-gray-700">{isExpiredCert ? 'Expired' : getStatusText(certification.status)}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Issue Date</h4>
                <p className="text-gray-700">{formatDate(certification.issueDate)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Expiry Date</h4>
                <p className="text-gray-700">{formatDate(certification.expiryDate)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Days Until Expiry</h4>
                <p className={`text-lg font-medium ${
                  isExpiredCert ? 'text-red-600' : 
                  daysUntilExpiry <= 30 ? 'text-yellow-600' : 
                  'text-green-600'
                }`}>
                  {isExpiredCert ? 'Expired' : `${daysUntilExpiry} days`}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Created</h4>
                <p className="text-gray-700">{formatDate(certification.createdAt)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h4>
                <p className="text-gray-700">{formatDate(certification.updatedAt)}</p>
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
          {isDeleting ? 'Deleting...' : 'Delete Certification'}
        </Button>
      </div>
    </div>
  );
}



