import { supabaseApiClient } from '../../lib/supabase/api-client';
import { Nurse, NurseFormData, ApiResponse, PaginatedResponse, SearchFilters } from '../../types';

// Helper function to convert Supabase nurse to our Nurse type
const convertSupabaseNurse = (supabaseNurse: any): Nurse => ({
  id: supabaseNurse.id,
  userId: supabaseNurse.user_id,
  name: supabaseNurse.name,
  email: supabaseNurse.email,
  phone: supabaseNurse.phone,
  specialties: supabaseNurse.specialties,
  availability: supabaseNurse.availability,
  status: supabaseNurse.status,
  notes: supabaseNurse.notes,
  createdAt: supabaseNurse.created_at,
  updatedAt: supabaseNurse.updated_at,
});

// Helper function to convert our NurseFormData to Supabase format
const convertToSupabaseNurse = (nurseData: NurseFormData) => ({
  user_id: nurseData.userId,
  name: nurseData.name,
  email: nurseData.email,
  phone: nurseData.phone,
  specialties: nurseData.specialties,
  availability: nurseData.availability,
  status: nurseData.status,
  notes: nurseData.notes,
});

export const nursesApi = {
  // Get all nurses with optional filters
  async getNurses(filters?: SearchFilters): Promise<PaginatedResponse<Nurse>> {
    try {
      const { data, error, count, totalPages } = await supabaseApiClient.getPaginated(
        'nurses',
        filters?.page || 1,
        filters?.limit || 10,
        filters
      );

      if (error) {
        throw new Error(`Failed to fetch nurses: ${error.message}`);
      }

      const nurses = data?.map(convertSupabaseNurse) || [];

      return {
        data: nurses,
        pagination: {
          page: filters?.page || 1,
          limit: filters?.limit || 10,
          total: count || 0,
          totalPages: totalPages || 0,
        },
      };
    } catch (error) {
      console.error('Error fetching nurses:', error);
      throw error;
    }
  },

  // Get a single nurse by ID
  async getNurse(id: string): Promise<Nurse> {
    try {
      const { data, error } = await supabaseApiClient.getById('nurses', id);

      if (error) {
        throw new Error(`Failed to fetch nurse: ${error.message}`);
      }

      if (!data) {
        throw new Error('Nurse not found');
      }

      return convertSupabaseNurse(data);
    } catch (error) {
      console.error('Error fetching nurse:', error);
      throw error;
    }
  },

  // Create a new nurse
  async createNurse(nurseData: NurseFormData): Promise<ApiResponse<Nurse>> {
    try {
      const supabaseData = convertToSupabaseNurse(nurseData);
      const { data, error } = await supabaseApiClient.create('nurses', supabaseData);

      if (error) {
        throw new Error(`Failed to create nurse: ${error.message}`);
      }

      return {
        success: true,
        data: convertSupabaseNurse(data!),
        message: 'Nurse created successfully',
      };
    } catch (error) {
      console.error('Error creating nurse:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create nurse',
      };
    }
  },

  // Update an existing nurse
  async updateNurse(id: string, nurseData: Partial<NurseFormData>): Promise<ApiResponse<Nurse>> {
    try {
      const supabaseData = convertToSupabaseNurse(nurseData as NurseFormData);
      const { data, error } = await supabaseApiClient.update('nurses', id, supabaseData);

      if (error) {
        throw new Error(`Failed to update nurse: ${error.message}`);
      }

      return {
        success: true,
        data: convertSupabaseNurse(data!),
        message: 'Nurse updated successfully',
      };
    } catch (error) {
      console.error('Error updating nurse:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update nurse',
      };
    }
  },

  // Delete a nurse
  async deleteNurse(id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabaseApiClient.delete('nurses', id);

      if (error) {
        throw new Error(`Failed to delete nurse: ${error.message}`);
      }

      return {
        success: true,
        message: 'Nurse deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting nurse:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete nurse',
      };
    }
  },

  // Search nurses
  async searchNurses(query: string): Promise<Nurse[]> {
    try {
      const { data, error } = await supabaseApiClient.search(
        'nurses',
        query,
        ['name', 'email', 'phone', 'specialties']
      );

      if (error) {
        throw new Error(`Failed to search nurses: ${error.message}`);
      }

      return data?.map(convertSupabaseNurse) || [];
    } catch (error) {
      console.error('Error searching nurses:', error);
      throw error;
    }
  },

  // Get nurse statistics
  async getNurseStats(): Promise<{
    total: number;
    active: number;
    onLeave: number;
    inactive: number;
  }> {
    try {
      const { data: allNurses, error } = await supabaseApiClient.get('nurses');

      if (error) {
        throw new Error(`Failed to fetch nurse stats: ${error.message}`);
      }

      const nurses = allNurses || [];
      const activeNurses = nurses.filter((n: any) => n.status === 'active');
      const onLeaveNurses = nurses.filter((n: any) => n.status === 'on_leave');
      const inactiveNurses = nurses.filter((n: any) => n.status === 'inactive');

      return {
        total: nurses.length,
        active: activeNurses.length,
        onLeave: onLeaveNurses.length,
        inactive: inactiveNurses.length,
      };
    } catch (error) {
      console.error('Error fetching nurse stats:', error);
      throw error;
    }
  }
};