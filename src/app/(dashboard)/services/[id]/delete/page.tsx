'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockServices } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { 
  ArrowLeft,
  Trash2,
  AlertTriangle,
  Activity,
  DollarSign,
  Clock
} from 'lucide-react';

export default function ServiceDeletePage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      setIsLoading(true);
      try {
        const foundService = mockServices.find(s => s.id === params.id);
        if (foundService) {
          setService(foundService);
        }
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchService();
    }
  }, [params.id]);

  const getStatusText = (status: string) => {
    const statusConfig = {
      active: 'Active',
      inactive: 'Inactive',
      discontinued: 'Discontinued'
    };
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting service:', service?.id);
      router.push('/services');
    } catch (error) {
      console.error('Error deleting service:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/services/${params.id}`);
  };

  const handleBack = () => {
    router.push('/services');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Service Not Found</h3>
            <p className="text-gray-600">The service you're trying to delete doesn't exist.</p>
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
          Back to Services
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delete Service</h1>
          <p className="text-gray-600">Confirm deletion of this service</p>
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
            You are about to permanently delete this service. This action cannot be undone and will remove all associated data.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Service Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Service to be Deleted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Service ID</h4>
                <p className="text-gray-700 font-mono">{service.id}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Name</h4>
                <p className="text-gray-700 font-medium text-lg">{service.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p className="text-gray-700">{service.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Category</h4>
                <p className="text-gray-700">{service.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                <p className="text-gray-700">{getStatusText(service.status)}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Base Price</h4>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(service.basePrice)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Duration</h4>
                <p className="text-gray-700">{service.duration} minutes</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Price per Hour</h4>
                <p className="text-gray-700">{formatCurrency((service.basePrice / service.duration) * 60)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Created</h4>
                <p className="text-gray-700">{new Date(service.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h4>
                <p className="text-gray-700">{new Date(service.updatedAt).toLocaleDateString()}</p>
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
          {isDeleting ? 'Deleting...' : 'Delete Service'}
        </Button>
      </div>
    </div>
  );
}



