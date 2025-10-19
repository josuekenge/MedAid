import { apiClient } from './client';
import { Patient, PatientFormData, ApiResponse, PaginatedResponse, SearchFilters } from '@/types';

export const patientsApi = {
  // Get all patients with optional filters
  async getPatients(filters?: SearchFilters): Promise<PaginatedResponse<Patient>> {
    return apiClient.get<PaginatedResponse<Patient>>('/patients', filters as Record<string, string>);
  },

  // Get a single patient by ID
  async getPatient(id: string): Promise<Patient> {
    return apiClient.get<Patient>(`/patients/${id}`);
  },

  // Create a new patient
  async createPatient(patientData: PatientFormData): Promise<ApiResponse<Patient>> {
    return apiClient.post<ApiResponse<Patient>>('/patients', patientData);
  },

  // Update an existing patient
  async updatePatient(id: string, patientData: Partial<PatientFormData>): Promise<ApiResponse<Patient>> {
    return apiClient.put<ApiResponse<Patient>>(`/patients/${id}`, patientData);
  },

  // Delete a patient
  async deletePatient(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/patients/${id}`);
  },

  // Search patients
  async searchPatients(query: string): Promise<Patient[]> {
    return apiClient.get<Patient[]>(`/patients/search?q=${encodeURIComponent(query)}`);
  },

  // Get patient statistics
  async getPatientStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    discharged: number;
  }> {
    return apiClient.get('/patients/stats');
  }
};

