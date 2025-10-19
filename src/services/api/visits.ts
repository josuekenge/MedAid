import { supabaseApiClient } from '../../lib/supabase/api-client';
import { Visit, VisitFormData, ApiResponse, PaginatedResponse, SearchFilters } from '../../types';

// Helper function to convert Supabase visit to our Visit type
const convertSupabaseVisit = (supabaseVisit: any): Visit => ({
  id: supabaseVisit.id,
  patientId: supabaseVisit.patient_id,
  nurseId: supabaseVisit.nurse_id,
  serviceId: supabaseVisit.service_id,
  carePlanId: supabaseVisit.care_plan_id,
  date: supabaseVisit.date,
  windowStart: supabaseVisit.window_start,
  windowEnd: supabaseVisit.window_end,
  status: supabaseVisit.status,
  reasonForVisit: supabaseVisit.reason_for_visit,
  notes: supabaseVisit.notes,
  checkInTime: supabaseVisit.check_in_time,
  checkOutTime: supabaseVisit.check_out_time,
  location: supabaseVisit.location,
  isUrgent: supabaseVisit.is_urgent,
  isAfterHours: supabaseVisit.is_after_hours,
  createdAt: supabaseVisit.created_at,
  updatedAt: supabaseVisit.updated_at,
});

// Helper function to convert our VisitFormData to Supabase format
const convertToSupabaseVisit = (visitData: VisitFormData) => ({
  patient_id: visitData.patientId,
  nurse_id: visitData.nurseId,
  service_id: visitData.serviceId,
  care_plan_id: visitData.carePlanId,
  date: visitData.date,
  window_start: visitData.windowStart,
  window_end: visitData.windowEnd,
  status: visitData.status || 'requested',
  reason_for_visit: visitData.reasonForVisit,
  notes: visitData.notes,
  check_in_time: visitData.checkInTime,
  check_out_time: visitData.checkOutTime,
  location: visitData.location,
  is_urgent: visitData.isUrgent || false,
  is_after_hours: visitData.isAfterHours || false,
});

export const visitsApi = {
  // Get all visits with optional filters
  async getVisits(filters?: SearchFilters): Promise<PaginatedResponse<Visit>> {
    try {
      const { data, error, count, totalPages } = await supabaseApiClient.getPaginated(
        'visits',
        filters?.page || 1,
        filters?.limit || 10,
        filters
      );

      if (error) {
        throw new Error(`Failed to fetch visits: ${error.message}`);
      }

      const visits = data?.map(convertSupabaseVisit) || [];

      return {
        data: visits,
        pagination: {
          page: filters?.page || 1,
          limit: filters?.limit || 10,
          total: count || 0,
          totalPages: totalPages || 0,
        },
      };
    } catch (error) {
      console.error('Error fetching visits:', error);
      throw error;
    }
  },

  // Get a single visit by ID
  async getVisit(id: string): Promise<Visit> {
    try {
      const { data, error } = await supabaseApiClient.getById('visits', id);

      if (error) {
        throw new Error(`Failed to fetch visit: ${error.message}`);
      }

      if (!data) {
        throw new Error('Visit not found');
      }

      return convertSupabaseVisit(data);
    } catch (error) {
      console.error('Error fetching visit:', error);
      throw error;
    }
  },

  // Create a new visit
  async createVisit(visitData: VisitFormData): Promise<ApiResponse<Visit>> {
    try {
      const supabaseData = convertToSupabaseVisit(visitData);
      const { data, error } = await supabaseApiClient.create('visits', supabaseData);

      if (error) {
        throw new Error(`Failed to create visit: ${error.message}`);
      }

      return {
        success: true,
        data: convertSupabaseVisit(data!),
        message: 'Visit created successfully',
      };
    } catch (error) {
      console.error('Error creating visit:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create visit',
      };
    }
  },

  // Update an existing visit
  async updateVisit(id: string, visitData: Partial<VisitFormData>): Promise<ApiResponse<Visit>> {
    try {
      const supabaseData = convertToSupabaseVisit(visitData as VisitFormData);
      const { data, error } = await supabaseApiClient.update('visits', id, supabaseData);

      if (error) {
        throw new Error(`Failed to update visit: ${error.message}`);
      }

      return {
        success: true,
        data: convertSupabaseVisit(data!),
        message: 'Visit updated successfully',
      };
    } catch (error) {
      console.error('Error updating visit:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update visit',
      };
    }
  },

  // Delete a visit
  async deleteVisit(id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabaseApiClient.delete('visits', id);

      if (error) {
        throw new Error(`Failed to delete visit: ${error.message}`);
      }

      return {
        success: true,
        message: 'Visit deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting visit:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete visit',
      };
    }
  },

  // Get visits for a specific date
  async getVisitsByDate(date: string): Promise<Visit[]> {
    try {
      const { data, error } = await supabaseApiClient.get('visits', { date });

      if (error) {
        throw new Error(`Failed to fetch visits by date: ${error.message}`);
      }

      return data?.map(convertSupabaseVisit) || [];
    } catch (error) {
      console.error('Error fetching visits by date:', error);
      throw error;
    }
  },

  // Get visits for a specific patient
  async getVisitsByPatient(patientId: string): Promise<Visit[]> {
    try {
      const { data, error } = await supabaseApiClient.get('visits', { patient_id: patientId });

      if (error) {
        throw new Error(`Failed to fetch visits by patient: ${error.message}`);
      }

      return data?.map(convertSupabaseVisit) || [];
    } catch (error) {
      console.error('Error fetching visits by patient:', error);
      throw error;
    }
  },

  // Get visits for a specific nurse
  async getVisitsByNurse(nurseId: string): Promise<Visit[]> {
    try {
      const { data, error } = await supabaseApiClient.get('visits', { nurse_id: nurseId });

      if (error) {
        throw new Error(`Failed to fetch visits by nurse: ${error.message}`);
      }

      return data?.map(convertSupabaseVisit) || [];
    } catch (error) {
      console.error('Error fetching visits by nurse:', error);
      throw error;
    }
  },

  // Update visit status
  async updateVisitStatus(id: string, status: Visit['status']): Promise<ApiResponse<Visit>> {
    try {
      const { data, error } = await supabaseApiClient.update('visits', id, { status });

      if (error) {
        throw new Error(`Failed to update visit status: ${error.message}`);
      }

      return {
        success: true,
        data: convertSupabaseVisit(data!),
        message: 'Visit status updated successfully',
      };
    } catch (error) {
      console.error('Error updating visit status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update visit status',
      };
    }
  },

  // Get visit statistics
  async getVisitStats(): Promise<{
    total: number;
    scheduled: number;
    completed: number;
    cancelled: number;
    inProgress: number;
  }> {
    try {
      const { data: allVisits, error } = await supabaseApiClient.get('visits');

      if (error) {
        throw new Error(`Failed to fetch visit stats: ${error.message}`);
      }

      const visits = allVisits || [];
      
      return {
        total: visits.length,
        scheduled: visits.filter((v: any) => v.status === 'scheduled').length,
        completed: visits.filter((v: any) => v.status === 'completed').length,
        cancelled: visits.filter((v: any) => v.status === 'cancelled').length,
        inProgress: visits.filter((v: any) => v.status === 'in_progress').length,
      };
    } catch (error) {
      console.error('Error fetching visit stats:', error);
      throw error;
    }
  }
};

