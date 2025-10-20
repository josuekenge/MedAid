'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockBillingItems, mockPatients } from '@/lib/mock-data';
import { formatDate, formatCurrency } from '@/lib/utils';
import { 
  ArrowLeft,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  User,
  AlertTriangle
} from 'lucide-react';

export default function BillingViewPage() {
  const params = useParams();
  const router = useRouter();
  const [billingItem, setBillingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBillingItem = async () => {
      setIsLoading(true);
      try {
        const foundItem = mockBillingItems.find(b => b.id === params.id);
        if (foundItem) {
          setBillingItem(foundItem);
        }
      } catch (error) {
        console.error('Error fetching billing item:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBillingItem();
    }
  }, [params.id]);

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient?.name || 'Unknown Patient';
  };

  const getStatusText = (status: string) => {
    const statusConfig = {
      paid: 'Paid',
      pending: 'Pending',
      overdue: 'Overdue',
      cancelled: 'Cancelled'
    };
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'paid') return false;
    return new Date(dueDate) < new Date();
  };

  const handleEdit = () => {
    router.push(`/billing/${params.id}/edit`);
  };

  const handleDelete = () => {
    router.push(`/billing/${params.id}/delete`);
  };

  const handleBack = () => {
    router.push('/billing');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Billing
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!billingItem) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Billing
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Billing Item Not Found</h3>
            <p className="text-gray-600">The billing item you're looking for doesn't exist or has been removed.</p>
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
            Back to Billing
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Billing Item Details</h1>
            <p className="text-gray-600">View and manage billing information</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Item
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Item
          </Button>
        </div>
      </div>

      {/* Billing Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Billing Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Item ID</h4>
              <p className="text-gray-700 font-mono">{billingItem.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
              <p className="text-gray-700">{billingItem.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Service Type</h4>
              <p className="text-gray-700">{billingItem.serviceType}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Amount</h4>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(billingItem.amount)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {getStatusText(isOverdue(billingItem.dueDate, billingItem.status) ? 'overdue' : billingItem.status)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Patient & Dates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Patient & Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Patient</h4>
              <p className="text-gray-700">{getPatientName(billingItem.patientId)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Billing Date</h4>
              <p className="text-gray-700">{formatDate(billingItem.date)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Due Date</h4>
              <p className="text-gray-700">{formatDate(billingItem.dueDate)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Created</h4>
              <p className="text-gray-700">{formatDate(billingItem.createdAt)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h4>
              <p className="text-gray-700">{formatDate(billingItem.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-600">
            <p>No payment information available for this billing item.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



