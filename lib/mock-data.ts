// Mock data for frontend development
// Replace with real API calls when backend is added

// Error handling wrapper for data access
const safeDataAccess = <T>(data: T[], fallback: T[] = []): T[] => {
  try {
    return Array.isArray(data) ? data : fallback;
  } catch (error) {
    console.error('Error accessing mock data:', error);
    return fallback;
  }
};

export const mockPatients = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    status: 'active',
    dateOfBirth: '1985-03-15',
    address: '123 Main St, Toronto, ON',
    emergencyContact: 'Jane Doe - (555) 987-6543'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane.smith@email.com',
    phone: '(555) 234-5678',
    status: 'active',
    dateOfBirth: '1990-07-22',
    address: '456 Oak Ave, Toronto, ON',
    emergencyContact: 'Bob Smith - (555) 876-5432'
  },
  { 
    id: '3', 
    name: 'Bob Johnson', 
    email: 'bob.johnson@email.com',
    phone: '(555) 345-6789',
    status: 'inactive',
    dateOfBirth: '1978-11-08',
    address: '789 Pine Rd, Toronto, ON',
    emergencyContact: 'Mary Johnson - (555) 765-4321'
  }
];

export const mockNurses = [
  { 
    id: '1', 
    name: 'Sarah Wilson', 
    email: 'sarah.wilson@medaid.ca',
    phone: '(555) 111-2222',
    status: 'active',
    specialty: 'General Care',
    licenseNumber: 'RN123456',
    experience: '5 years'
  },
  { 
    id: '2', 
    name: 'Mike Brown', 
    email: 'mike.brown@medaid.ca',
    phone: '(555) 333-4444',
    status: 'active',
    specialty: 'Critical Care',
    licenseNumber: 'RN789012',
    experience: '8 years'
  },
  { 
    id: '3', 
    name: 'Lisa Davis', 
    email: 'lisa.davis@medaid.ca',
    phone: '(555) 555-6666',
    status: 'inactive',
    specialty: 'Pediatrics',
    licenseNumber: 'RN345678',
    experience: '3 years'
  }
];

export const mockVisits = [
  {
    id: '1',
    patientId: '1',
    nurseId: '1',
    patientName: 'John Doe',
    nurseName: 'Sarah Wilson',
    date: '2024-01-15T09:00:00.000Z',
    time: '09:00',
    status: 'scheduled',
    type: 'routine',
    notes: 'Regular checkup',
    address: '123 Main St, Toronto, ON'
  },
  {
    id: '2',
    patientId: '2',
    nurseId: '2',
    patientName: 'Jane Smith',
    nurseName: 'Mike Brown',
    date: '2024-01-15T10:30:00.000Z',
    time: '10:30',
    status: 'completed',
    type: 'follow-up',
    notes: 'Post-surgery check',
    address: '456 Oak Ave, Toronto, ON'
  },
  {
    id: '3',
    patientId: '1',
    nurseId: '2',
    patientName: 'John Doe',
    nurseName: 'Mike Brown',
    date: '2024-01-16T14:00:00.000Z', // Tomorrow
    time: '14:00',
    status: 'scheduled',
    type: 'urgent',
    notes: 'Follow-up appointment',
    address: '123 Main St, Toronto, ON'
  }
];

export const mockIncidents = [
  {
    id: '1',
    title: 'Medication Error',
    description: 'Incorrect dosage administered to patient',
    status: 'open',
    priority: 'high',
    reportedBy: 'Sarah Wilson',
    reportedAt: '2024-01-15T08:30:00.000Z',
    assignedTo: 'Mike Brown',
    createdAt: '2024-01-15T08:30:00.000Z'
  },
  {
    id: '2',
    title: 'Equipment Malfunction',
    description: 'Blood pressure monitor not working properly',
    status: 'investigating',
    priority: 'medium',
    reportedBy: 'Mike Brown',
    reportedAt: '2024-01-15T09:15:00.000Z',
    assignedTo: 'Lisa Davis',
    createdAt: '2024-01-15T09:15:00.000Z'
  },
  {
    id: '3',
    title: 'Patient Fall',
    description: 'Patient fell in bathroom during visit',
    status: 'resolved',
    priority: 'high',
    reportedBy: 'Sarah Wilson',
    reportedAt: '2024-01-14T14:20:00.000Z',
    assignedTo: 'Mike Brown',
    createdAt: '2024-01-14T14:20:00.000Z'
  }
];

export const mockBillingItems = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Doe',
    service: 'Home Visit - Routine',
    amount: 150.00,
    status: 'pending',
    date: '2024-01-15T09:00:00.000Z',
    dueDate: '2024-02-14T23:59:59.000Z'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Jane Smith',
    service: 'Home Visit - Follow-up',
    amount: 200.00,
    status: 'paid',
    date: '2024-01-15T10:30:00.000Z',
    dueDate: '2024-02-14T23:59:59.000Z'
  }
];

export const mockServices = [
  {
    id: '1',
    name: 'Home Visit - Routine Checkup',
    description: 'Comprehensive health assessment and routine checkup at patient\'s home',
    category: 'Medical Care',
    price: 150.00,
    duration: 60,
    status: 'active',
    createdAt: '2024-01-15T08:00:00.000Z'
  },
  {
    id: '2',
    name: 'Medication Administration',
    description: 'Professional medication administration and monitoring',
    category: 'Medical Care',
    price: 75.00,
    duration: 30,
    status: 'active',
    createdAt: '2024-01-15T08:30:00.000Z'
  },
  {
    id: '3',
    name: 'Wound Care',
    description: 'Specialized wound cleaning, dressing, and monitoring',
    category: 'Specialized Care',
    price: 200.00,
    duration: 45,
    status: 'active',
    createdAt: '2024-01-15T09:00:00.000Z'
  },
  {
    id: '4',
    name: 'Physical Therapy',
    description: 'Rehabilitation exercises and mobility assistance',
    category: 'Therapy',
    price: 120.00,
    duration: 45,
    status: 'active',
    createdAt: '2024-01-15T09:30:00.000Z'
  },
  {
    id: '5',
    name: 'Emergency Response',
    description: '24/7 emergency medical response and assessment',
    category: 'Emergency',
    price: 300.00,
    duration: 90,
    status: 'active',
    createdAt: '2024-01-15T10:00:00.000Z'
  },
  {
    id: '6',
    name: 'Health Education',
    description: 'Patient and family health education and counseling',
    category: 'Education',
    price: 80.00,
    duration: 30,
    status: 'active',
    createdAt: '2024-01-15T10:30:00.000Z'
  }
];

export const mockCertifications = [
  {
    id: '1',
    name: 'Registered Nurse (RN)',
    issuer: 'Ontario College of Nurses',
    nurseId: '1',
    nurseName: 'Sarah Wilson',
    issueDate: '2022-01-15T00:00:00.000Z',
    expiryDate: '2025-01-15T00:00:00.000Z',
    status: 'valid',
    certificateNumber: 'RN-2022-001',
    createdAt: '2024-01-15T08:00:00.000Z'
  },
  {
    id: '2',
    name: 'CPR Certification',
    issuer: 'Canadian Red Cross',
    nurseId: '1',
    nurseName: 'Sarah Wilson',
    issueDate: '2023-06-01T00:00:00.000Z',
    expiryDate: '2024-06-01T00:00:00.000Z',
    status: 'expiring',
    certificateNumber: 'CPR-2023-001',
    createdAt: '2024-01-15T08:30:00.000Z'
  },
  {
    id: '3',
    name: 'Advanced Cardiac Life Support (ACLS)',
    issuer: 'American Heart Association',
    nurseId: '2',
    nurseName: 'Mike Brown',
    issueDate: '2021-03-10T00:00:00.000Z',
    expiryDate: '2023-03-10T00:00:00.000Z',
    status: 'expired',
    certificateNumber: 'ACLS-2021-001',
    createdAt: '2024-01-15T09:00:00.000Z'
  },
  {
    id: '4',
    name: 'Wound Care Specialist',
    issuer: 'Wound Care Education Institute',
    nurseId: '2',
    nurseName: 'Mike Brown',
    issueDate: '2023-08-20T00:00:00.000Z',
    expiryDate: '2026-08-20T00:00:00.000Z',
    status: 'valid',
    certificateNumber: 'WCS-2023-001',
    createdAt: '2024-01-15T09:30:00.000Z'
  },
  {
    id: '5',
    name: 'Pediatric Advanced Life Support (PALS)',
    issuer: 'American Heart Association',
    nurseId: '3',
    nurseName: 'Emily Davis',
    issueDate: '2022-11-15T00:00:00.000Z',
    expiryDate: '2024-11-15T00:00:00.000Z',
    status: 'expiring',
    certificateNumber: 'PALS-2022-001',
    createdAt: '2024-01-15T10:00:00.000Z'
  },
  {
    id: '6',
    name: 'Geriatric Care Specialist',
    issuer: 'National Association of Geriatric Care',
    nurseId: '3',
    nurseName: 'Emily Davis',
    issueDate: '2023-01-10T00:00:00.000Z',
    expiryDate: '2026-01-10T00:00:00.000Z',
    status: 'valid',
    certificateNumber: 'GCS-2023-001',
    createdAt: '2024-01-15T10:30:00.000Z'
  }
];

// Safe exports with error handling
export const getMockPatients = () => safeDataAccess(mockPatients);
export const getMockNurses = () => safeDataAccess(mockNurses);
export const getMockVisits = () => safeDataAccess(mockVisits);
export const getMockIncidents = () => safeDataAccess(mockIncidents);
export const getMockBillingItems = () => safeDataAccess(mockBillingItems);
export const getMockServices = () => safeDataAccess(mockServices);
export const getMockCertifications = () => safeDataAccess(mockCertifications);
