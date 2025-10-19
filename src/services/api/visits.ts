import { apiClient } from './client';
import { Visit, VisitFormData, ApiResponse, PaginatedResponse, SearchFilters } from '@/types';

export const visitsApi = {
  // Get all visits with optional filters
  async getVisits(filters?: SearchFilters): Promise<PaginatedResponse<Visit>> {
    return apiClient.get<PaginatedResponse<Visit>>('/visits', filters as Record<string, string>);
  },

  // Get a single visit by ID
  async getVisit(id: string): Promise<Visit> {
    return apiClient.get<Visit>(`/visits/${id}`);
  },

  // Create a new visit
  async createVisit(visitData: VisitFormData): Promise<ApiResponse<Visit>> {
    return apiClient.post<ApiResponse<Visit>>('/visits', visitData);
  },

  // Update an existing visit
  async updateVisit(id: string, visitData: Partial<VisitFormData>): Promise<ApiResponse<Visit>> {
    return apiClient.put<ApiResponse<Visit>>(`/visits/${id}`, visitData);
  },

  // Delete a visit
  async deleteVisit(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/visits/${id}`);
  },

  // Get visits for a specific date
  async getVisitsByDate(date: string): Promise<Visit[]> {
    return apiClient.get<Visit[]>(`/visits/date/${date}`);
  },

  // Get visits for a specific patient
  async getVisitsByPatient(patientId: string): Promise<Visit[]> {
    return apiClient.get<Visit[]>(`/visits/patient/${patientId}`);
  },

  // Get visits for a specific nurse
  async getVisitsByNurse(nurseId: string): Promise<Visit[]> {
    return apiClient.get<Visit[]>(`/visits/nurse/${nurseId}`);
  },

  // Update visit status
  async updateVisitStatus(id: string, status: Visit['status']): Promise<ApiResponse<Visit>> {
    return apiClient.put<ApiResponse<Visit>>(`/visits/${id}/status`, { status });
  },

  // Get visit statistics
  async getVisitStats(): Promise<{
    total: number;
    scheduled: number;
    completed: number;
    cancelled: number;
    inProgress: number;
  }> {
    return apiClient.get('/visits/stats');
  }
};

