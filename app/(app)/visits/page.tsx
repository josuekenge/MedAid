'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal, ConfirmDialog } from '@/components/ui/modal';
import { VisitForm } from '@/components/forms/visit-form';
import { mockVisits, mockPatients, mockNurses, mockServices } from '@/lib/mock-data';
import { formatDate, formatTime } from '@/lib/utils';
import {
  Calendar,
  Search,
  Plus,
  Eye,
  Edit,
  Phone,
  X,
  Clock,
  User,
  MapPin,
  CheckCircle,
  Trash2
} from 'lucide-react';

export default function VisitsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);

  const visits = mockVisits;
  const patients = mockPatients;
  const nurses = mockNurses;

  const filteredVisits = visits?.filter(visit => {
    const patient = patients?.find(p => p.id === visit.patientId);
    const nurse = nurses?.find(n => n.id === visit.nurseId);
    const matchesSearch =
      visit.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.nurseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.status.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  const handleAddVisit = () => {
    setSelectedVisit(null);
    setIsAddModalOpen(true);
  };

  const handleSubmitVisit = (visitData: any) => {
    console.log('New visit data:', visitData);
    // TODO: Add API call to create visit
    setIsAddModalOpen(false);
    // Show success message or refresh data
  };

  const handleEditVisit = (visit: any) => {
    setSelectedVisit(visit);
    setIsEditModalOpen(true);
  };

  const handleDeleteVisit = (visit: any) => {
    setSelectedVisit(visit);
    setIsDeleteDialogOpen(true);
  };

  const handleViewVisit = (visit: any) => {
    setSelectedVisit(visit);
    setIsViewModalOpen(true);
  };

  const getPatientName = (patientId: string) => {
    return patients?.find(p => p.id === patientId)?.name || 'Unknown Patient';
  };

  const getNurseName = (nurseId: string) => {
    return nurses?.find(n => n.id === nurseId)?.name || 'Unknown Nurse';
  };

  const getStatusText = (status: string) => {
    const statusConfig = {
      scheduled: 'Scheduled',
      completed: 'Completed',
      cancelled: 'Cancelled',
      in_progress: 'In Progress'
    };
    
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Visits</h1>
        <Button onClick={handleAddVisit} variant="primary" size="lg" className="shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Visit
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search visits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 w-full border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500 rounded-2xl shadow-sm"
          />
        </div>
      </div>

      {/* Visits Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Visits ({filteredVisits.length})
          </CardTitle>
          <CardDescription>
            Manage and track all patient visits
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredVisits.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Nurse</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Address</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisits.map((visit) => (
                    <tr key={visit.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium text-gray-900">
                            {getPatientName(visit.patientId)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700">
                            {getNurseName(visit.nurseId)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700">
                            {formatDate(visit.date)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700">
                            {visit.time}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700 capitalize">
                          {visit.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">
                          {getStatusText(visit.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center max-w-xs">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-700 truncate">
                            {visit.address}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewVisit(visit)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditVisit(visit)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteVisit(visit)}>
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
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No visits found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms.' : 'Get started by scheduling a new visit.'}
              </p>
              {!searchQuery && (
                <Button onClick={handleAddVisit} variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Visit
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      {/* Add Visit Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Visit"
        >
          <VisitForm
            patients={patients || []}
            nurses={nurses || []}
            services={mockServices || []}
            onSubmit={handleSubmitVisit}
            onCancel={() => setIsAddModalOpen(false)}
            isLoading={false}
          />
        </Modal>
      )}

      {/* Edit/View Visit Modal */}
      {(isEditModalOpen || isViewModalOpen) && (
        <Modal
          isOpen={isEditModalOpen || isViewModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setIsViewModalOpen(false);
            setSelectedVisit(null);
          }}
          title={isEditModalOpen ? 'Edit Visit' : 'View Visit Details'}
        >
          <div className="space-y-4">
            <p>
              {isViewModalOpen
                ? `Viewing details for visit with patient ${selectedVisit?.patientName} on ${formatDate(selectedVisit?.date)} at ${selectedVisit?.time}.`
                : 'Form to edit the selected visit would go here.'}
            </p>
          {selectedVisit && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Patient</p>
                <p className="text-gray-900">{selectedVisit.patientName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Nurse</p>
                <p className="text-gray-900">{selectedVisit.nurseName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Date</p>
                <p className="text-gray-900">{formatDate(selectedVisit.date)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Time</p>
                <p className="text-gray-900">{selectedVisit.time}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-gray-900 capitalize">{selectedVisit.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Type</p>
                <p className="text-gray-900 capitalize">{selectedVisit.type}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-600">Address</p>
                <p className="text-gray-900">{selectedVisit.address}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-600">Notes</p>
                <p className="text-gray-900">{selectedVisit.notes}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                setIsViewModalOpen(false);
                setSelectedVisit(null);
              }}
            >
              Close
            </Button>
            {!isViewModalOpen && (
              <Button variant="primary" onClick={() => alert('Action not implemented for mock data.')}>
                {isAddModalOpen ? 'Schedule' : 'Save Changes'}
              </Button>
            )}
          </div>
        </div>
        </Modal>
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          alert(`Deleting visit ${selectedVisit?.id} (mock action)`);
          setIsDeleteDialogOpen(false);
        }}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the visit for patient ${selectedVisit?.patientName} on ${formatDate(selectedVisit?.date)}? This action cannot be undone.`}
      />
    </div>
  );
}