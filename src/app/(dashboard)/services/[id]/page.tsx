'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockServices } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { 
  ArrowLeft,
  Edit,
  Trash2,
  Activity,
  Clock,
  DollarSign,
  Users,
  CheckCircle
} from 'lucide-react';

export default function ServiceViewPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleEdit = () => {
    router.push(`/services/${params.id}/edit`);
  };

  const handleDelete = () => {
    router.push(`/services/${params.id}/delete`);
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
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Service Not Found</h3>
            <p className="text-gray-600">The service you're looking for doesn't exist or has been removed.</p>
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
            Back to Services
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Service Details</h1>
            <p className="text-gray-600">View and manage service information</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Service
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Service
          </Button>
        </div>
      </div>

      {/* Service Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Service Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {getStatusText(service.status)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Duration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Pricing & Duration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      </div>

      {/* Additional Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Additional Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Requirements</h4>
              <p className="text-gray-700">{service.requirements || 'No specific requirements'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
              <p className="text-gray-700">{service.notes || 'No additional notes'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Availability</h4>
              <p className="text-gray-700">{service.availability || 'Available 24/7'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

