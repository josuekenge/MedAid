// Core entity types
export interface Patient {
  id: string;
  userId?: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  address: any | null;
  emergencyContact: any | null;
  status: 'active' | 'inactive' | 'discharged';
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Nurse {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string | null;
  specialties: string[] | null;
  availability: any | null;
  status: 'active' | 'inactive' | 'on_leave';
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Visit {
  id: string;
  patientId: string;
  nurseId: string | null;
  serviceId: string | null;
  carePlanId: string | null;
  date: string;
  windowStart: string;
  windowEnd: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in_progress';
  reasonForVisit: string | null;
  notes?: string | null;
  checkInTime: string | null;
  checkOutTime: string | null;
  location: any | null;
  isUrgent: boolean;
  isAfterHours: boolean;
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
  description: string | null;
  basePrice: number;
  minMinutes: number | null;
  maxMinutes: number | null;
  isActive: boolean;
  notes: string | null;
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
  userId?: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  address: any | null;
  emergencyContact: any | null;
  status: 'active' | 'inactive' | 'discharged';
  notes?: string | null;
}

export interface NurseFormData {
  userId: string;
  name: string;
  email: string;
  phone: string | null;
  specialties: string[] | null;
  availability: any | null;
  status: 'active' | 'inactive' | 'on_leave';
  notes?: string | null;
}

export interface VisitFormData {
  patientId: string;
  nurseId: string | null;
  serviceId: string | null;
  carePlanId: string | null;
  date: string;
  windowStart: string;
  windowEnd: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in_progress';
  reasonForVisit: string | null;
  notes?: string | null;
  checkInTime: string | null;
  checkOutTime: string | null;
  location: any | null;
  isUrgent: boolean;
  isAfterHours: boolean;
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
  data?: T;
  message?: string;
  success: boolean;
  error?: string;
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
  role: 'admin' | 'nurse_manager' | 'nurse' | 'billing_manager' | 'viewer' | 'coordinator';
  avatar?: string;
  isActive?: boolean;
  lastLoginAt?: Date;
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    language: string;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
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

