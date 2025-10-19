import { supabaseApiClient } from '@/src/lib/supabase/api-client';
import { Service, ServiceFormData, ApiResponse, PaginatedResponse, SearchFilters } from '@/src/types';

// Helper function to convert Supabase service to our Service type
const convertSupabaseService = (supabaseService: any): Service => ({
  id: supabaseService.id,
  name: supabaseService.name,
  description: supabaseService.description,
  basePrice: supabaseService.base_price,
  minMinutes: supabaseService.min_minutes,
  maxMinutes: supabaseService.max_minutes,
  isActive: supabaseService.is_active,
  createdAt: supabaseService.created_at,
  updatedAt: supabaseService.updated_at,
});

// Helper function to convert our ServiceFormData to Supabase format
const convertToSupabaseService = (serviceData: ServiceFormData) => ({
  name: serviceData.name,
  description: serviceData.description,
  base_price: serviceData.basePrice,
  min_minutes: serviceData.minMinutes,
  max_minutes: serviceData.maxMinutes,
  is_active: serviceData.isActive !== undefined ? serviceData.isActive : true,
});

export const servicesApi = {
  // Get all services with optional filters
  async getServices(filters?: SearchFilters): Promise<PaginatedResponse<Service>> {
    try {
      const { data, error, count, totalPages } = await supabaseApiClient.getPaginated(
        'services',
        filters?.page || 1,
        filters?.limit || 10,
        filters
      );

      if (error) {
        throw new Error(`Failed to fetch services: ${error.message}`);
      }

      const services = data?.map(convertSupabaseService) || [];

      return {
        data: services,
        pagination: {
          page: filters?.page || 1,
          limit: filters?.limit || 10,
          total: count || 0,
          totalPages: totalPages || 0,
        },
      };
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get a single service by ID
  async getService(id: string): Promise<Service> {
    try {
      const { data, error } = await supabaseApiClient.getById('services', id);

      if (error) {
        throw new Error(`Failed to fetch service: ${error.message}`);
      }

      if (!data) {
        throw new Error('Service not found');
      }

      return convertSupabaseService(data);
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  },

  // Create a new service
  async createService(serviceData: ServiceFormData): Promise<ApiResponse<Service>> {
    try {
      const supabaseData = convertToSupabaseService(serviceData);
      const { data, error } = await supabaseApiClient.create('services', supabaseData);

      if (error) {
        throw new Error(`Failed to create service: ${error.message}`);
      }

      return {
        success: true,
        data: convertSupabaseService(data!),
        message: 'Service created successfully',
      };
    } catch (error) {
      console.error('Error creating service:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create service',
      };
    }
  },

  // Update an existing service
  async updateService(id: string, serviceData: Partial<ServiceFormData>): Promise<ApiResponse<Service>> {
    try {
      const supabaseData = convertToSupabaseService(serviceData as ServiceFormData);
      const { data, error } = await supabaseApiClient.update('services', id, supabaseData);

      if (error) {
        throw new Error(`Failed to update service: ${error.message}`);
      }

      return {
        success: true,
        data: convertSupabaseService(data!),
        message: 'Service updated successfully',
      };
    } catch (error) {
      console.error('Error updating service:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update service',
      };
    }
  },

  // Delete a service
  async deleteService(id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabaseApiClient.delete('services', id);

      if (error) {
        throw new Error(`Failed to delete service: ${error.message}`);
      }

      return {
        success: true,
        message: 'Service deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting service:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete service',
      };
    }
  },

  // Search services
  async searchServices(query: string): Promise<Service[]> {
    try {
      const { data, error } = await supabaseApiClient.search(
        'services',
        query,
        ['name', 'description']
      );

      if (error) {
        throw new Error(`Failed to search services: ${error.message}`);
      }

      return data?.map(convertSupabaseService) || [];
    } catch (error) {
      console.error('Error searching services:', error);
      throw error;
    }
  },

  // Get active services only
  async getActiveServices(): Promise<Service[]> {
    try {
      const { data, error } = await supabaseApiClient.get('services', { is_active: true });

      if (error) {
        throw new Error(`Failed to fetch active services: ${error.message}`);
      }

      return data?.map(convertSupabaseService) || [];
    } catch (error) {
      console.error('Error fetching active services:', error);
      throw error;
    }
  },

  // Get service statistics
  async getServiceStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    averagePrice: number;
  }> {
    try {
      const { data: allServices, error } = await supabaseApiClient.get('services');

      if (error) {
        throw new Error(`Failed to fetch service stats: ${error.message}`);
      }

      const services = allServices || [];
      const activeServices = services.filter((s: any) => s.is_active);
      const averagePrice = services.length > 0 
        ? services.reduce((sum: number, s: any) => sum + s.base_price, 0) / services.length 
        : 0;
      
      return {
        total: services.length,
        active: activeServices.length,
        inactive: services.length - activeServices.length,
        averagePrice: Math.round(averagePrice * 100) / 100,
      };
    } catch (error) {
      console.error('Error fetching service stats:', error);
      throw error;
    }
  }
};
