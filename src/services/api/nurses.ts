import { apiClient } from './client';
import { Nurse, NurseFormData, ApiResponse, PaginatedResponse, SearchFilters } from '@/types';

export const nursesApi = {
  // Get all nurses with optional filters
  async getNurses(filters?: SearchFilters): Promise<PaginatedResponse<Nurse>> {
    return apiClient.get<PaginatedResponse<Nurse>>('/nurses', filters as Record<string, string>);
  },

  // Get a single nurse by ID
  async getNurse(id: string): Promise<Nurse> {
    return apiClient.get<Nurse>(`/nurses/${id}`);
  },

  // Create a new nurse
  async createNurse(nurseData: NurseFormData): Promise<ApiResponse<Nurse>> {
    return apiClient.post<ApiResponse<Nurse>>('/nurses', nurseData);
  },

  // Update an existing nurse
  async updateNurse(id: string, nurseData: Partial<NurseFormData>): Promise<ApiResponse<Nurse>> {
    return apiClient.put<ApiResponse<Nurse>>(`/nurses/${id}`, nurseData);
  },

  // Delete a nurse
  async deleteNurse(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/nurses/${id}`);
  },

  // Search nurses
  async searchNurses(query: string): Promise<Nurse[]> {
    return apiClient.get<Nurse[]>(`/nurses/search?q=${encodeURIComponent(query)}`);
  },

  // Get nurse statistics
  async getNurseStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    onLeave: number;
    specialties: string[];
  }> {
    return apiClient.get('/nurses/stats');
  }
};

