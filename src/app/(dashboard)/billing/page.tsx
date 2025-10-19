'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { BillingForm } from '@/components/forms/billing-form';
import { mockBillingItems, mockPatients } from '@/lib/mock-data';
import { formatDate, formatCurrency } from '@/lib/utils';
import { 
  DollarSign, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download, 
  X,
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Trash2
} from 'lucide-react';

export default function BillingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Use mock data instead of API calls
  const billingItems = mockBillingItems;
  const patients = mockPatients;
  const isLoading = false;

  const handleAddBillingItem = () => {
    setIsAddModalOpen(true);
  };

  const handleSubmitBillingItem = (billingData: any) => {
    console.log('New billing item data:', billingData);
    // TODO: Add API call to create billing item
    setIsAddModalOpen(false);
    // Show success message or refresh data
  };

  const handleEditBillingItem = (item: any) => {
    router.push(`/billing/${item.id}/edit`);
  };

  const handleViewBillingItem = (item: any) => {
    router.push(`/billing/${item.id}`);
  };

  const handleDeleteBillingItem = (item: any) => {
    router.push(`/billing/${item.id}/delete`);
  };

  const filteredBillingItems = billingItems.filter(item => {
    const patient = patients.find(p => p.id === item.patientId);
    const matchesSearch = 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'paid') return false;
    return new Date(dueDate) < new Date();
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

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient?.name || 'Unknown Patient';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <Button onClick={handleAddBillingItem} variant="primary" size="lg" className="shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Billing Item
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search billing items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 w-full border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500 rounded-2xl shadow-sm"
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(billingItems.reduce((sum, item) => sum + item.amount, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-gray-900">
                  {billingItems.filter(item => item.status === 'paid').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Clock className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {billingItems.filter(item => item.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {billingItems.filter(item => isOverdue(item.dueDate, item.status)).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Billing Items ({filteredBillingItems.length})
          </CardTitle>
          <CardDescription>
            Manage and track all billing and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredBillingItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBillingItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {getPatientName(item.patientId)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{item.description}</div>
                          <div className="text-sm text-gray-500">{item.serviceType}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">
                          {formatCurrency(item.amount)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">
                          {getStatusText(isOverdue(item.dueDate, item.status) ? 'overdue' : item.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">{formatDate(item.date)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">{formatDate(item.dueDate)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewBillingItem(item)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditBillingItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBillingItem(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No billing items found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms.' : 'Get started by adding a new billing item.'}
              </p>
              {!searchQuery && (
                <Button onClick={handleAddBillingItem} variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Billing Item
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Billing Item Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Billing Item"
        >
          <BillingForm
            patients={patients || []}
            onSubmit={handleSubmitBillingItem}
            onCancel={() => setIsAddModalOpen(false)}
            isLoading={false}
          />
        </Modal>
      )}
    </div>
  );
}
