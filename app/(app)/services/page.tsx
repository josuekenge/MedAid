'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Modal, ConfirmDialog } from '@/components/ui/modal';
import { servicesApi } from '@/services/api';
import { formatCurrency } from '@/lib/utils';
import { Service } from '@/types';
import {
  Activity,
  Search,
  Plus,
  Eye,
  Edit,
  X,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: 0,
    minMinutes: 0,
    maxMinutes: 0,
    isActive: true
  });

  // Fetch services from Supabase
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      console.log('[Services] Loading services from Supabase...');
      const response = await servicesApi.getServices();
      console.log('[Services] Loaded', response.data.length, 'services:', response.data);
      setServices(response.data);
    } catch (error) {
      console.error('[Services] Error loading services:', error);
      toast.error('Failed to load services');
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = () => {
    setSelectedService(null);
    setFormData({
      name: '',
      description: '',
      basePrice: 0,
      minMinutes: 0,
      maxMinutes: 0,
      isActive: true
    });
    setIsAddModalOpen(true);
  };

  const handleSubmitService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      console.log('[Services] Submitting new service:', formData);

      const response = await servicesApi.createService(formData);
      console.log('[Services] Create response:', response);

      if (response.success) {
        console.log('[Services] Service created successfully, reloading list...');
        toast.success('Service added successfully!');
        setIsAddModalOpen(false);
        await loadServices(); // Wait for reload
        console.log('[Services] List reloaded');
        setFormData({
          name: '',
          description: '',
          basePrice: 0,
          minMinutes: 0,
          maxMinutes: 0,
          isActive: true
        });
      } else {
        console.error('[Services] Failed to create service:', response.error);
        toast.error(response.error || 'Failed to add service');
      }
    } catch (error) {
      console.error('[Services] Exception while adding service:', error);
      toast.error('Failed to add service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setIsViewModalOpen(true);
  };

  const handleDeleteService = (service: Service) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedService) return;

    try {
      console.log('[Services] Deleting service:', selectedService.id);
      const response = await servicesApi.deleteService(selectedService.id);
      console.log('[Services] Delete response:', response);

      if (response.success) {
        console.log('[Services] Service deleted successfully, reloading list...');
        toast.success('Service deleted successfully!');
        setIsDeleteDialogOpen(false);
        setSelectedService(null);
        await loadServices(); // Wait for reload
        console.log('[Services] List reloaded');
      } else {
        console.error('[Services] Failed to delete service:', response.error);
        toast.error(response.error || 'Failed to delete service');
      }
    } catch (error) {
      console.error('[Services] Exception while deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const getStatusText = (status: string) => {
    const statusConfig = {
      active: 'Active',
      inactive: 'Inactive',
      discontinued: 'Discontinued'
    };
    
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
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
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <Button onClick={handleAddService} variant="primary" size="lg" className="shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Activity className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Services</p>
                <p className="text-2xl font-bold text-gray-900">{services.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-gray-900">
                  {services.filter(s => s.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(services.reduce((sum, s) => sum + s.basePrice, 0) / services.length) || '$0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(services.reduce((sum, s) => sum + s.basePrice, 0))}
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
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Services ({filteredServices.length})
          </CardTitle>
          <CardDescription>
            Manage and track all available services
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredServices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Base Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration Range</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium text-gray-900">{service.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700 line-clamp-2 max-w-xs">
                          {service.description}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium text-gray-900">{formatCurrency(service.basePrice)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700">{service.minMinutes}-{service.maxMinutes} min</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewService(service)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteService(service)}>
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
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms.' : 'Get started by adding a new service.'}
              </p>
              {!searchQuery && (
                <Button onClick={handleAddService} variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Service"
        >
          <div className="p-6">
            <form className="space-y-4" onSubmit={handleSubmitService}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter service name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe the service"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (CAD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="30"
                    value={formData.minMinutes}
                    onChange={(e) => setFormData({ ...formData, minMinutes: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Duration (minutes)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="60"
                  value={formData.maxMinutes}
                  onChange={(e) => setFormData({ ...formData, maxMinutes: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.isActive ? 'active' : 'inactive'}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Service'}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {isViewModalOpen && selectedService && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Service Details"
        >
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Name</h3>
              <p className="text-gray-600">{selectedService.name}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Description</h3>
              <p className="text-gray-600">{selectedService.description}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Base Price</h3>
              <p className="text-gray-600">{formatCurrency(selectedService.basePrice)}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Duration Range</h3>
              <p className="text-gray-600">{selectedService.minMinutes}-{selectedService.maxMinutes} minutes</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Status</h3>
              <Badge
                variant={selectedService.isActive ? 'success' : 'destructive'}
              >
                {selectedService.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {
                setIsViewModalOpen(false);
                handleEditService(selectedService);
              }}>
                Edit Service
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isEditModalOpen && selectedService && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Service"
        >
          <div className="p-6">
            <p className="text-gray-600">Service editing form will be implemented here.</p>
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

      {isDeleteDialogOpen && selectedService && (
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Service"
          message={`Are you sure you want to delete "${selectedService.name}"? This action cannot be undone.`}
        />
      )}
    </div>
  );
}