import { supabaseApiClient } from '../../lib/supabase/api-client';
import { Patient, PatientFormData, ApiResponse, PaginatedResponse, SearchFilters } from '../../types';

// Helper function to convert Supabase patient to our Patient type
const convertSupabasePatient = (supabasePatient: any): Patient => ({
  id: supabasePatient.id,
  name: supabasePatient.name,
  email: supabasePatient.email,
  phone: supabasePatient.phone,
  dateOfBirth: supabasePatient.date_of_birth,
  address: supabasePatient.address,
  emergencyContact: supabasePatient.emergency_contact,
  medicalHistory: supabasePatient.medical_history,
  allergies: supabasePatient.allergies || [],
  status: supabasePatient.status,
  createdAt: supabasePatient.created_at,
  updatedAt: supabasePatient.updated_at,
});

// Helper function to convert our PatientFormData to Supabase format
const convertToSupabasePatient = (patientData: PatientFormData) => ({
  name: patientData.name,
  email: patientData.email,
  phone: patientData.phone,
  date_of_birth: patientData.dateOfBirth,
  address: patientData.address,
  emergency_contact: patientData.emergencyContact,
  medical_history: patientData.medicalHistory,
  allergies: patientData.allergies || [],
  status: patientData.status || 'active',
});

export const patientsApi = {
  // Get all patients with optional filters
  async getPatients(filters?: SearchFilters): Promise<PaginatedResponse<Patient>> {
    try {
      const { data, error, count, totalPages } = await supabaseApiClient.getPaginated(
        'patients',
        filters?.page || 1,
        filters?.limit || 10,
        filters
      );

      if (error) {
        throw new Error(`Failed to fetch patients: ${error.message}`);
      }

      const patients = data?.map(convertSupabasePatient) || [];

      return {
        data: patients,
        pagination: {
          page: filters?.page || 1,
          limit: filters?.limit || 10,
          total: count || 0,
          totalPages: totalPages || 0,
        },
      };
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  // Get a single patient by ID
  async getPatient(id: string): Promise<Patient> {
    try {
      const { data, error } = await supabaseApiClient.getById('patients', id);

      if (error) {
        throw new Error(`Failed to fetch patient: ${error.message}`);
      }

      if (!data) {
        throw new Error('Patient not found');
      }

      return convertSupabasePatient(data);
    } catch (error) {
      console.error('Error fetching patient:', error);
      throw error;
    }
  },

  // Create a new patient
  async createPatient(patientData: PatientFormData): Promise<ApiResponse<Patient>> {
    try {
      const supabaseData = convertToSupabasePatient(patientData);
      const { data, error } = await supabaseApiClient.create('patients', supabaseData);

      if (error) {
        throw new Error(`Failed to create patient: ${error.message}`);
      }

      return {
        success: true,
        data: convertSupabasePatient(data!),
        message: 'Patient created successfully',
      };
    } catch (error) {
      console.error('Error creating patient:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create patient',
      };
    }
  },

  // Update an existing patient
  async updatePatient(id: string, patientData: Partial<PatientFormData>): Promise<ApiResponse<Patient>> {
    try {
      const supabaseData = convertToSupabasePatient(patientData as PatientFormData);
      const { data, error } = await supabaseApiClient.update('patients', id, supabaseData);

      if (error) {
        throw new Error(`Failed to update patient: ${error.message}`);
      }

      return {
        success: true,
        data: convertSupabasePatient(data!),
        message: 'Patient updated successfully',
      };
    } catch (error) {
      console.error('Error updating patient:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update patient',
      };
    }
  },

  // Delete a patient
  async deletePatient(id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabaseApiClient.delete('patients', id);

      if (error) {
        throw new Error(`Failed to delete patient: ${error.message}`);
      }

      return {
        success: true,
        message: 'Patient deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting patient:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete patient',
      };
    }
  },

  // Search patients
  async searchPatients(query: string): Promise<Patient[]> {
    try {
      const { data, error } = await supabaseApiClient.search(
        'patients',
        query,
        ['name', 'email', 'phone']
      );

      if (error) {
        throw new Error(`Failed to search patients: ${error.message}`);
      }

      return data?.map(convertSupabasePatient) || [];
    } catch (error) {
      console.error('Error searching patients:', error);
      throw error;
    }
  },

  // Get patient statistics
  async getPatientStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    discharged: number;
  }> {
    try {
      const { data: allPatients, error } = await supabaseApiClient.get('patients');

      if (error) {
        throw new Error(`Failed to fetch patient stats: ${error.message}`);
      }

      const patients = allPatients || [];
      
      return {
        total: patients.length,
        active: patients.filter((p: any) => p.status === 'active').length,
        inactive: patients.filter((p: any) => p.status === 'inactive').length,
        discharged: patients.filter((p: any) => p.status === 'discharged').length,
      };
    } catch (error) {
      console.error('Error fetching patient stats:', error);
      throw error;
    }
  }
};

