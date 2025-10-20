import { create } from 'zustand';

interface FiltersState {
  // Patient filters
  patientSearch: string;
  setPatientSearch: (search: string) => void;
  patientStatusFilter: string[];
  setPatientStatusFilter: (status: string[]) => void;
  
  // Nurse filters
  nurseSearch: string;
  setNurseSearch: (search: string) => void;
  nurseStatusFilter: string[];
  setNurseStatusFilter: (status: string[]) => void;
  nurseSpecialtyFilter: string[];
  setNurseSpecialtyFilter: (specialties: string[]) => void;
  
  // Visit filters
  visitStatusFilter: string[];
  setVisitStatusFilter: (status: string[]) => void;
  visitDateRange: { start: Date | null; end: Date | null };
  setVisitDateRange: (range: { start: Date | null; end: Date | null }) => void;
  visitNurseFilter: string[];
  setVisitNurseFilter: (nurseIds: string[]) => void;
  
  // Billing filters
  billingStatusFilter: string[];
  setBillingStatusFilter: (status: string[]) => void;
  billingDateRange: { start: Date | null; end: Date | null };
  setBillingDateRange: (range: { start: Date | null; end: Date | null }) => void;
  
  // Clear all filters
  clearAllFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  // Patient filters
  patientSearch: '',
  setPatientSearch: (search) => set({ patientSearch: search }),
  patientStatusFilter: [],
  setPatientStatusFilter: (status) => set({ patientStatusFilter: status }),
  
  // Nurse filters
  nurseSearch: '',
  setNurseSearch: (search) => set({ nurseSearch: search }),
  nurseStatusFilter: [],
  setNurseStatusFilter: (status) => set({ nurseStatusFilter: status }),
  nurseSpecialtyFilter: [],
  setNurseSpecialtyFilter: (specialties) => set({ nurseSpecialtyFilter: specialties }),
  
  // Visit filters
  visitStatusFilter: [],
  setVisitStatusFilter: (status) => set({ visitStatusFilter: status }),
  visitDateRange: { start: null, end: null },
  setVisitDateRange: (range) => set({ visitDateRange: range }),
  visitNurseFilter: [],
  setVisitNurseFilter: (nurseIds) => set({ visitNurseFilter: nurseIds }),
  
  // Billing filters
  billingStatusFilter: [],
  setBillingStatusFilter: (status) => set({ billingStatusFilter: status }),
  billingDateRange: { start: null, end: null },
  setBillingDateRange: (range) => set({ billingDateRange: range }),
  
  // Clear all filters
  clearAllFilters: () => set({
    patientSearch: '',
    patientStatusFilter: [],
    nurseSearch: '',
    nurseStatusFilter: [],
    nurseSpecialtyFilter: [],
    visitStatusFilter: [],
    visitDateRange: { start: null, end: null },
    visitNurseFilter: [],
    billingStatusFilter: [],
    billingDateRange: { start: null, end: null },
  }),
}));








