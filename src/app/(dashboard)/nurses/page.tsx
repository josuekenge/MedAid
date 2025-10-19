'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { NurseForm } from '@/components/forms/nurse-form';
import { mockNurses } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
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

export default function NursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Use mock data instead of API calls
  const nurses = mockNurses;
  const isLoading = false;

  const handleAddNurse = () => {
    setIsAddModalOpen(true);
  };

  const handleSubmitNurse = (nurseData: any) => {
    console.log('New nurse data:', nurseData);
    // TODO: Add API call to create nurse
    setIsAddModalOpen(false);
    // Show success message or refresh data
  };

  const handleEditNurse = (nurse: any) => {
    router.push(`/nurses/${nurse.id}/edit`);
  };

  const handleViewNurse = (nurse: any) => {
    router.push(`/nurses/${nurse.id}`);
  };

  const handleDeleteNurse = (nurse: any) => {
    router.push(`/nurses/${nurse.id}/delete`);
  };

  const filteredNurses = nurses?.filter(nurse => {
    const matchesSearch = 
      nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nurse.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nurse.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nurse.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nurse.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  const getStatusText = (status: string) => {
    const statusConfig = {
      active: 'Active',
      inactive: 'Inactive',
      on_leave: 'On Leave'
    };
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

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

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search nurses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 w-full border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500 rounded-2xl shadow-sm"
          />
        </div>
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
                          <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-gray-700">
                              {nurse.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{nurse.name}</div>
                            <div className="text-sm text-gray-500">ID: {nurse.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-700">{nurse.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-700">{nurse.phone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">{nurse.specialty}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">{nurse.experienceYears} years</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700 font-mono text-sm">{nurse.licenseNumber}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">
                          {getStatusText(nurse.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewNurse(nurse)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditNurse(nurse)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteNurse(nurse)}
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
            isLoading={false}
          />
        </Modal>
      )}
    </div>
  );
}
