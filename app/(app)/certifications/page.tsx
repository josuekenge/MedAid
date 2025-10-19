'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal, ConfirmDialog } from '@/components/ui/modal';
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
  User
} from 'lucide-react';

export default function CertificationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<any>(null);

  // Use mock data instead of API calls
  const certifications = mockCertifications;
  const isLoading = false;

  const handleAddCertification = () => {
    setSelectedCertification(null);
    setIsAddModalOpen(true);
  };

  const handleEditCertification = (certification: any) => {
    setSelectedCertification(certification);
    setIsEditModalOpen(true);
  };

  const handleViewCertification = (certification: any) => {
    setSelectedCertification(certification);
    setIsViewModalOpen(true);
  };

  const handleDeleteCertification = (certification: any) => {
    setSelectedCertification(certification);
    setIsDeleteDialogOpen(true);
  };

  const filteredCertifications = certifications.filter(certification => {
    const matchesSearch = 
      certification.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certification.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certification.status.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Certifications</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

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

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search certifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Certifications List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertifications.map((certification) => (
          <Card key={certification.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{certification.name}</CardTitle>
                <Badge 
                  variant={
                    certification.status === 'valid' ? 'success' : 
                    certification.status === 'expiring' ? 'default' : 
                    'destructive'
                  }
                >
                  {certification.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {certification.issuer}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                {certification.nurseName}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Issued: {formatDate(certification.issueDate)}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                Expires: {formatDate(certification.expiryDate)}
              </div>
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewCertification(certification)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditCertification(certification)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCertifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
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
          </CardContent>
        </Card>
      )}

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
            <div>
              <h3 className="font-medium text-gray-900">Name</h3>
              <p className="text-gray-600">{selectedCertification.name}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Issuer</h3>
              <p className="text-gray-600">{selectedCertification.issuer}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Nurse</h3>
              <p className="text-gray-600">{selectedCertification.nurseName}</p>
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
              <Badge 
                variant={
                  selectedCertification.status === 'valid' ? 'success' : 
                  selectedCertification.status === 'expiring' ? 'default' : 
                  'destructive'
                }
              >
                {selectedCertification.status}
              </Badge>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {
                setIsViewModalOpen(false);
                handleEditCertification(selectedCertification);
              }}>
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

      {isDeleteDialogOpen && selectedCertification && (
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={() => {
            // Handle delete logic here
            setIsDeleteDialogOpen(false);
          }}
          title="Delete Certification"
          message={`Are you sure you want to delete "${selectedCertification.name}"? This action cannot be undone.`}
        />
      )}
    </div>
  );
}