'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { mockIncidents, mockPatients, mockNurses } from '@/lib/mock-data';
import { formatDate, formatTime } from '@/lib/utils';
import { 
  AlertTriangle, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  X,
  Calendar,
  Clock,
  User,
  Flag,
  CheckCircle
} from 'lucide-react';

export default function IncidentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Use mock data instead of API calls
  const incidents = mockIncidents;
  const patients = mockPatients;
  const nurses = mockNurses;
  const isLoading = false;

  const handleAddIncident = () => {
    setIsAddModalOpen(true);
  };

  const handleEditIncident = (incident: any) => {
    router.push(`/incidents/${incident.id}/edit`);
  };

  const handleViewIncident = (incident: any) => {
    router.push(`/incidents/${incident.id}`);
  };

  const handleDeleteIncident = (incident: any) => {
    router.push(`/incidents/${incident.id}/delete`);
  };

  const filteredIncidents = incidents?.filter(incident => {
    const matchesSearch = 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  const getStatusText = (status: string) => {
    const statusConfig = {
      open: 'Open',
      investigating: 'Investigating',
      resolved: 'Resolved',
      closed: 'Closed'
    };
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  const getPriorityText = (priority: string) => {
    const priorityConfig = {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical'
    };
    return priorityConfig[priority as keyof typeof priorityConfig] || priority;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Incidents</h1>
        <Button onClick={handleAddIncident} variant="primary" size="lg" className="shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Incident
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search incidents..."
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
                <AlertTriangle className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-bold text-gray-900">{incidents.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-2xl font-bold text-gray-900">
                  {incidents.filter(i => i.status === 'open').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Flag className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Investigating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {incidents.filter(i => i.status === 'investigating').length}
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
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {incidents.filter(i => i.status === 'resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Incidents ({filteredIncidents.length})
          </CardTitle>
          <CardDescription>
            Track and manage all incident reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredIncidents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Priority</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reported By</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Assigned To</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reported At</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncidents.map((incident) => (
                    <tr key={incident.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{incident.title}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="max-w-xs">
                          <p className="text-gray-700 truncate">{incident.description}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">
                          {getPriorityText(incident.priority)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">
                          {getStatusText(incident.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-700">{incident.reportedBy}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">{incident.assignedTo || 'Unassigned'}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-700">{formatDate(incident.createdAt)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewIncident(incident)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditIncident(incident)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteIncident(incident)}
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
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No incidents found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms.' : 'Get started by reporting a new incident.'}
              </p>
              {!searchQuery && (
                <Button onClick={handleAddIncident} variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Incident
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Incident Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Incident"
        >
          <div className="p-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter incident title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe the incident"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                  console.log('Incident form submitted');
                  setIsAddModalOpen(false);
                }}>
                  Add Incident
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {isViewModalOpen && selectedIncident && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Incident Details"
        >
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900">Title</h3>
                <p className="text-gray-600">{selectedIncident.title}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Priority</h3>
                <p className="text-gray-600">{getPriorityText(selectedIncident.priority)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Status</h3>
                <p className="text-gray-600">{getStatusText(selectedIncident.status)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Reported By</h3>
                <p className="text-gray-600">{selectedIncident.reportedBy}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Assigned To</h3>
                <p className="text-gray-600">{selectedIncident.assignedTo || 'Unassigned'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Reported At</h3>
                <p className="text-gray-600">{formatDate(selectedIncident.createdAt)}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-medium text-gray-900">Description</h3>
                <p className="text-gray-600">{selectedIncident.description}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleEditIncident(selectedIncident)}>
                Edit Incident
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isEditModalOpen && selectedIncident && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Incident"
        >
          <div className="p-6">
            <p className="text-gray-600">Incident editing form will be implemented here.</p>
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
          alert(`Deleting incident ${selectedIncident?.id} (mock action)`);
          setIsDeleteDialogOpen(false);
        }}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${selectedIncident?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
