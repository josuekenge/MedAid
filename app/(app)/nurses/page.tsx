'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal, ConfirmDialog } from '@/components/ui/modal';
import { NurseForm } from '@/components/forms/nurse-form';
import { nursesApi } from '@/services/api';
import { formatDate } from '@/lib/utils';
import { Nurse } from '@/types';
import {
  UserCheck,
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
  Star,
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function NursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch nurses from Supabase
  useEffect(() => {
    loadNurses();
  }, []);

  const loadNurses = async () => {
    try {
      setIsLoading(true);
      console.log('[Nurses] Loading nurses from Supabase...');
      const response = await nursesApi.getNurses();
      console.log('[Nurses] Loaded', response.data.length, 'nurses:', response.data);
      setNurses(response.data);
    } catch (error) {
      console.error('[Nurses] Error loading nurses:', error);
      toast.error('Failed to load nurses');
      setNurses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNurse = () => {
    setSelectedNurse(null);
    setIsAddModalOpen(true);
  };

  const handleSubmitNurse = async (nurseData: any) => {
    try {
      setIsSubmitting(true);
      console.log('[Nurses] Submitting new nurse:', nurseData);

      const response = await nursesApi.createNurse({
        name: nurseData.name,
        email: nurseData.email,
        phone: nurseData.phone,
        specialties: nurseData.specialties || [],
        availability: nurseData.availability,
        status: 'active',
        notes: nurseData.notes
      });

      console.log('[Nurses] Create response:', response);

      if (response.success) {
        console.log('[Nurses] Nurse created successfully, reloading list...');
        toast.success('Nurse added successfully!');
        setIsAddModalOpen(false);
        await loadNurses(); // Wait for reload
        console.log('[Nurses] List reloaded');
      } else {
        console.error('[Nurses] Failed to create nurse:', response.error);
        toast.error(response.error || 'Failed to add nurse');
      }
    } catch (error) {
      console.error('[Nurses] Exception while adding nurse:', error);
      toast.error('Failed to add nurse');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditNurse = (nurse: Nurse) => {
    setSelectedNurse(nurse);
    setIsEditModalOpen(true);
  };

  const handleViewNurse = (nurse: Nurse) => {
    setSelectedNurse(nurse);
    setIsViewModalOpen(true);
  };

  const handleDeleteNurse = (nurse: Nurse) => {
    setSelectedNurse(nurse);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedNurse) return;

    try {
      console.log('[Nurses] Deleting nurse:', selectedNurse.id);
      const response = await nursesApi.deleteNurse(selectedNurse.id);
      console.log('[Nurses] Delete response:', response);

      if (response.success) {
        console.log('[Nurses] Nurse deleted successfully, reloading list...');
        toast.success('Nurse deleted successfully!');
        setIsDeleteDialogOpen(false);
        setSelectedNurse(null);
        await loadNurses(); // Wait for reload
        console.log('[Nurses] List reloaded');
      } else {
        console.error('[Nurses] Failed to delete nurse:', response.error);
        toast.error(response.error || 'Failed to delete nurse');
      }
    } catch (error) {
      console.error('[Nurses] Exception while deleting nurse:', error);
      toast.error('Failed to delete nurse');
    }
  };

  const filteredNurses = nurses.filter(nurse => {
    const matchesSearch =
      nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nurse.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusText = (status: string) => {
    const statusConfig = {
      active: 'Active',
      inactive: 'Inactive',
      on_leave: 'On Leave'
    };
    
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Nurses</h1>
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
        <h1 className="text-2xl font-bold text-gray-900">Nurses</h1>
        <Button onClick={handleAddNurse} variant="primary" size="lg" className="shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Nurse
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Nurses</p>
                <p className="text-2xl font-bold text-gray-900">{nurses.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Active Nurses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {nurses.filter(n => n.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Star className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Specialties</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(nurses.map(n => n.specialty)).size}
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
            placeholder="Search nurses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Nurses Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserCheck className="h-5 w-5 mr-2" />
            Nurses ({filteredNurses.length})
          </CardTitle>
          <CardDescription>
            Manage and track all nursing staff
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNurses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Specialty</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Experience</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">License</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNurses.map((nurse) => (
                    <tr key={nurse.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <UserCheck className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium text-gray-900">{nurse.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700">{nurse.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700">{nurse.phone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">{nurse.specialty}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700">{nurse.experience}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700 font-mono text-sm">{nurse.licenseNumber}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">
                          {getStatusText(nurse.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewNurse(nurse)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditNurse(nurse)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteNurse(nurse)}>
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
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No nurses found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms.' : 'Get started by adding a new nurse.'}
              </p>
              {!searchQuery && (
                <Button onClick={handleAddNurse} variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Nurse
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Nurse Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Nurse"
        >
          <NurseForm
            onSubmit={handleSubmitNurse}
            onCancel={() => setIsAddModalOpen(false)}
            isLoading={isSubmitting}
          />
        </Modal>
      )}

      {isViewModalOpen && selectedNurse && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Nurse Details"
        >
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Name</h3>
              <p className="text-gray-600">{selectedNurse.name}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Email</h3>
              <p className="text-gray-600">{selectedNurse.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Phone</h3>
              <p className="text-gray-600">{selectedNurse.phone}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Specialty</h3>
              <p className="text-gray-600">{selectedNurse.specialty}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Experience</h3>
              <p className="text-gray-600">{selectedNurse.experience}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">License Number</h3>
              <p className="text-gray-600">{selectedNurse.licenseNumber}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Status</h3>
              <Badge 
                variant={selectedNurse.status === 'active' ? 'success' : 'destructive'}
              >
                {selectedNurse.status}
              </Badge>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {
                setIsViewModalOpen(false);
                handleEditNurse(selectedNurse);
              }}>
                Edit Nurse
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isEditModalOpen && selectedNurse && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Nurse"
        >
          <div className="p-6">
            <p className="text-gray-600">Nurse editing form will be implemented here.</p>
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

      {isDeleteDialogOpen && selectedNurse && (
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Nurse"
          message={`Are you sure you want to delete ${selectedNurse.name}? This action cannot be undone.`}
        />
      )}
    </div>
  );
}