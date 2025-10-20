'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockBillingItems, mockPatients } from '@/lib/mock-data';
import { formatDate, formatCurrency } from '@/lib/utils';
import { 
  ArrowLeft,
  Trash2,
  AlertTriangle,
  DollarSign,
  User,
  Calendar
} from 'lucide-react';

export default function BillingDeletePage() {
  const params = useParams();
  const router = useRouter();
  const [billingItem, setBillingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting billing item:', billingItem?.id);
      router.push('/billing');
    } catch (error) {
      console.error('Error deleting billing item:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/billing/${params.id}`);
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
            <p className="text-gray-600">The billing item you're trying to delete doesn't exist.</p>
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
          Back to Billing
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delete Billing Item</h1>
          <p className="text-gray-600">Confirm deletion of this billing item</p>
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
            You are about to permanently delete this billing item. This action cannot be undone and will remove all associated data.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Billing Item Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Billing Item to be Deleted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
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
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Patient</h4>
                <p className="text-gray-700">{getPatientName(billingItem.patientId)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                <p className="text-gray-700 capitalize">{billingItem.status}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Billing Date</h4>
                <p className="text-gray-700">{formatDate(billingItem.date)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Due Date</h4>
                <p className="text-gray-700">{formatDate(billingItem.dueDate)}</p>
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
          {isDeleting ? 'Deleting...' : 'Delete Billing Item'}
        </Button>
      </div>
    </div>
  );
}



