'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { mockCertifications } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { 
  Award, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  X,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  Trash2
} from 'lucide-react';

export default function CertificationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Use mock data instead of API calls
  const certifications = mockCertifications;
  const isLoading = false;

  const handleAddCertification = () => {
    setIsAddModalOpen(true);
  };

  const handleEditCertification = (certification: any) => {
    router.push(`/certifications/${certification.id}/edit`);
  };

  const handleViewCertification = (certification: any) => {
    router.push(`/certifications/${certification.id}`);
  };

  const handleDeleteCertification = (certification: any) => {
    router.push(`/certifications/${certification.id}/delete`);
  };

  const filteredCertifications = certifications?.filter(certification => {
    const matchesSearch = 
      certification.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certification.issuingOrganization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certification.status.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  const getStatusText = (status: string) => {
    const statusConfig = {
      valid: 'Valid',
      expired: 'Expired',
      pending: 'Pending'
    };
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Certifications</h1>
        <Button onClick={handleAddCertification} variant="primary" size="lg" className="shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Certification
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search certifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 w-full border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500 rounded-2xl shadow-sm"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Award className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Certifications</p>
                <p className="text-2xl font-bold text-gray-900">{certifications.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Valid</p>
                <p className="text-2xl font-bold text-gray-900">
                  {certifications.filter(c => c.status === 'valid').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">
                  {certifications.filter(c => {
                    const expiryDate = new Date(c.expiryDate);
                    const thirtyDaysFromNow = new Date();
                    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
                    return expiryDate <= thirtyDaysFromNow && c.status === 'valid';
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <X className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-gray-900">
                  {certifications.filter(c => c.status === 'expired').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certifications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Certifications ({filteredCertifications.length})
          </CardTitle>
          <CardDescription>
            Manage and track all staff certifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCertifications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Organization</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Issue Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Expiry Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCertifications.map((certification) => (
                    <tr key={certification.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{certification.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">{certification.issuingOrganization}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-700">{formatDate(certification.issueDate)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-700">{formatDate(certification.expiryDate)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">
                          {getStatusText(certification.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewCertification(certification)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditCertification(certification)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCertification(certification)}
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
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms.' : 'Get started by adding a new certification.'}
              </p>
              {!searchQuery && (
                <Button onClick={handleAddCertification} variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Certification Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Certification"
        >
          <div className="p-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter certification name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter issuing organization"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                  console.log('Certification form submitted');
                  setIsAddModalOpen(false);
                }}>
                  Add Certification
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {isViewModalOpen && selectedCertification && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Certification Details"
        >
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900">Name</h3>
                <p className="text-gray-600">{selectedCertification.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Organization</h3>
                <p className="text-gray-600">{selectedCertification.issuingOrganization}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Issue Date</h3>
                <p className="text-gray-600">{formatDate(selectedCertification.issueDate)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Expiry Date</h3>
                <p className="text-gray-600">{formatDate(selectedCertification.expiryDate)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Status</h3>
                <p className="text-gray-600">{getStatusText(selectedCertification.status)}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleEditCertification(selectedCertification)}>
                Edit Certification
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isEditModalOpen && selectedCertification && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Certification"
        >
          <div className="p-6">
            <p className="text-gray-600">Certification editing form will be implemented here.</p>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsEditModalOpen(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          alert(`Deleting certification ${selectedCertification?.id} (mock action)`);
          setIsDeleteDialogOpen(false);
        }}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${selectedCertification?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
