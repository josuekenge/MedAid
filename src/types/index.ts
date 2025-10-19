// Core entity types
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  status: 'active' | 'inactive' | 'discharged';
  createdAt: string;
  updatedAt: string;
}

export interface Nurse {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experienceYears: number;
  licenseNumber: string;
  address: string;
  status: 'active' | 'inactive' | 'on_leave';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Visit {
  id: string;
  patientId: string;
  nurseId: string;
  patientName: string;
  nurseName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in_progress';
  address: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillingItem {
  id: string;
  patientId: string;
  description: string;
  serviceType: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  date: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  reportedBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  status: 'active' | 'inactive' | 'discontinued';
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'pending';
  createdAt: string;
  updatedAt: string;
}

// Form types
export interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  status: 'active' | 'inactive' | 'discharged';
}

export interface NurseFormData {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experienceYears: number;
  licenseNumber: string;
  address: string;
  status: 'active' | 'inactive' | 'on_leave';
  notes?: string;
}

export interface VisitFormData {
  patientId: string;
  nurseId: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in_progress';
  address: string;
  notes?: string;
}

export interface BillingFormData {
  patientId: string;
  description: string;
  serviceType: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  date: string;
  dueDate: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter and search types
export interface SearchFilters {
  query?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

// User and authentication types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'nurse_manager' | 'nurse' | 'billing_manager' | 'viewer';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Component prop types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

// Form component props
export interface PatientFormProps {
  patient?: Patient;
  onSubmit: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface NurseFormProps {
  nurse?: Nurse;
  onSubmit: (nurse: Omit<Nurse, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface VisitFormProps {
  visit?: Visit;
  patients: Patient[];
  nurses: Nurse[];
  services: Service[];
  onSubmit: (visit: Omit<Visit, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface BillingFormProps {
  billingItem?: BillingItem;
  patients: Patient[];
  onSubmit: (billingItem: Omit<BillingItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

