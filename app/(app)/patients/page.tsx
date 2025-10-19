'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal, ConfirmDialog } from '@/components/ui/modal';
import { PatientForm } from '@/components/forms/patient-form';
import { mockPatients } from '@/lib/mock-data';
import { formatDate, calculateAge } from '@/lib/utils';
import { 
  Users, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  MessageSquare, 
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Trash2
} from 'lucide-react';

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Use mock data instead of API calls
  const patients = mockPatients;
  const isLoading = false;

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsAddModalOpen(true);
  };

  const handleSubmitPatient = (patientData: any) => {
    console.log('New patient data:', patientData);
    // TODO: Add API call to create patient
    setIsAddModalOpen(false);
    // Show success message or refresh data
  };

  const handleEditPatient = (patient: any) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const handleDeletePatient = (patient: any) => {
    setSelectedPatient(patient);
    setIsDeleteDialogOpen(true);
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusText = (status: string) => {
    const statusConfig = {
      active: 'Active',
      inactive: 'Inactive',
      discharged: 'Discharged'
    };
    
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
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
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <Button onClick={handleAddPatient} variant="primary" size="lg" className="shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Heart className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Patients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Age</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(patients.reduce((sum, p) => sum + calculateAge(p.dateOfBirth), 0) / patients.length) || 0}
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
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Patients ({filteredPatients.length})
          </CardTitle>
          <CardDescription>
            Manage and track all patient information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPatients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Age</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date of Birth</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Address</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Emergency Contact</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium text-gray-900">{patient.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700">{patient.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700">{patient.phone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700">{calculateAge(patient.dateOfBirth)} years</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">{formatDate(patient.dateOfBirth)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center max-w-xs">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-700 truncate">{patient.address}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700">{patient.emergencyContact}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">
                          {getStatusText(patient.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewPatient(patient)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditPatient(patient)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeletePatient(patient)}>
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
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms.' : 'Get started by adding a new patient.'}
              </p>
              {!searchQuery && (
                <Button onClick={handleAddPatient} variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Patient Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Patient"
        >
          <PatientForm
            onSubmit={handleSubmitPatient}
            onCancel={() => setIsAddModalOpen(false)}
            isLoading={false}
          />
        </Modal>
      )}

      {isViewModalOpen && selectedPatient && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Patient Details"
        >
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Name</h3>
              <p className="text-gray-600">{selectedPatient.name}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Email</h3>
              <p className="text-gray-600">{selectedPatient.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Phone</h3>
              <p className="text-gray-600">{selectedPatient.phone}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Date of Birth</h3>
              <p className="text-gray-600">{formatDate(selectedPatient.dateOfBirth)}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Age</h3>
              <p className="text-gray-600">{calculateAge(selectedPatient.dateOfBirth)} years old</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Address</h3>
              <p className="text-gray-600">{selectedPatient.address}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Emergency Contact</h3>
              <p className="text-gray-600">{selectedPatient.emergencyContact}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Status</h3>
              <Badge 
                variant={selectedPatient.status === 'active' ? 'success' : 'destructive'}
              >
                {selectedPatient.status}
              </Badge>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {
                setIsViewModalOpen(false);
                handleEditPatient(selectedPatient);
              }}>
                Edit Patient
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isEditModalOpen && selectedPatient && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Patient"
        >
          <div className="p-6">
            <p className="text-gray-600">Patient editing form will be implemented here.</p>
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

      {isDeleteDialogOpen && selectedPatient && (
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={() => {
            // Handle delete logic here
            setIsDeleteDialogOpen(false);
          }}
          title="Delete Patient"
          message={`Are you sure you want to delete ${selectedPatient.name}? This action cannot be undone.`}
        />
      )}
    </div>
  );
}