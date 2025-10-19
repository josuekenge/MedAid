import { z } from 'zod';
import { 
  PatientSchema, 
  NurseSchema, 
  VisitSchema, 
  CarePlanSchema, 
  CareTaskSchema, 
  VitalsSchema, 
  MedicationEventSchema, 
  IncidentSchema, 
  ServiceSchema, 
  BillingItemSchema, 
  AuditLogSchema 
} from '@/lib/schemas';

// Generate realistic mock data for scalability testing
const generateMockPatients = (count: number) => {
  const firstNames = [
    'Sarah', 'Michael', 'Alice', 'Robert', 'John', 'Linda', 'David', 'Emily', 'James', 'Lisa',
    'Maria', 'Alex', 'Jennifer', 'Christopher', 'Jessica', 'Daniel', 'Ashley', 'Matthew', 'Amanda', 'Joshua',
    'Stephanie', 'Andrew', 'Nicole', 'Ryan', 'Elizabeth', 'Justin', 'Megan', 'Brandon', 'Rachel', 'Tyler',
    'Lauren', 'Jacob', 'Samantha', 'Nicholas', 'Brittany', 'Zachary', 'Kayla', 'Kevin', 'Amber', 'Jonathan',
    'Danielle', 'Nathan', 'Heather', 'Aaron', 'Melissa', 'Adam', 'Crystal', 'Sean', 'Tiffany', 'Timothy'
  ];
  
  const lastNames = [
    'Johnson', 'Brown', 'Smith', 'Davis', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Jackson',
    'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis',
    'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill',
    'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts',
    'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris'
  ];

  const conditions = [
    'Diabetes Type 2', 'Hypertension', 'COPD', 'Heart Failure', 'Arthritis', 'Depression', 'Anxiety',
    'Alzheimer\'s Disease', 'Parkinson\'s Disease', 'Cancer', 'Stroke Recovery', 'Chronic Pain',
    'Osteoporosis', 'Asthma', 'Chronic Kidney Disease', 'Multiple Sclerosis', 'Epilepsy', 'Bipolar Disorder'
  ];

  const allergies = [
    'Penicillin', 'Sulfa', 'Latex', 'Shellfish', 'Nuts', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Pollen',
    'Dust Mites', 'Mold', 'Pet Dander', 'Aspirin', 'Ibuprofen', 'Codeine', 'Morphine', 'Insulin'
  ];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const phone = `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    const patientAllergies = Array.from({ length: Math.floor(Math.random() * 4) }, () => 
      allergies[Math.floor(Math.random() * allergies.length)]
    ).filter((allergy, index, self) => self.indexOf(allergy) === index);

    const primaryDiagnosis = conditions[Math.floor(Math.random() * conditions.length)];
    const isHighRisk = patientAllergies.length > 3 || primaryDiagnosis.includes('Cancer') || primaryDiagnosis.includes('Heart Failure');

    return {
      id: `patient-${i + 1}`,
      name,
      email,
      phone,
      dateOfBirth: new Date(1940 + Math.floor(Math.random() * 50), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      address: {
        street: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Elm', 'Maple', 'Cedar', 'Birch', 'Willow'][Math.floor(Math.random() * 8)]} St`,
        city: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg', 'Quebec City'][Math.floor(Math.random() * 8)],
        province: ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB'][Math.floor(Math.random() * 8)],
        postalCode: `${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 9) + 1} ${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 9) + 1}`,
        country: 'Canada'
      },
      emergencyContact: {
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        relationship: ['Spouse', 'Child', 'Parent', 'Sibling', 'Friend'][Math.floor(Math.random() * 5)],
        phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
      },
      primaryDiagnosis,
      allergies: patientAllergies,
      medications: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
        name: ['Metformin', 'Lisinopril', 'Atorvastatin', 'Metoprolol', 'Omeprazole', 'Amlodipine', 'Losartan', 'Simvastatin'][Math.floor(Math.random() * 8)],
        dosage: `${Math.floor(Math.random() * 500) + 50}mg`,
        frequency: ['Daily', 'Twice Daily', 'As Needed', 'Weekly'][Math.floor(Math.random() * 4)],
        prescribedBy: `Dr. ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
      })),
      isActive: Math.random() > 0.1,
      lastVisitAt: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) : undefined,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
    };
  });
};

const generateMockNurses = (count: number) => {
  const firstNames = [
    'Emily', 'David', 'Lisa', 'James', 'Maria', 'Alex', 'Jennifer', 'Christopher', 'Jessica', 'Daniel',
    'Ashley', 'Matthew', 'Amanda', 'Joshua', 'Stephanie', 'Andrew', 'Nicole', 'Ryan', 'Elizabeth', 'Justin'
  ];
  
  const lastNames = [
    'Chen', 'Wilson', 'Anderson', 'Taylor', 'Rodriguez', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark',
    'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill',
    'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts'
  ];

  const specialties = [
    'General Nursing', 'Critical Care', 'Pediatrics', 'Geriatrics', 'Emergency', 'Mental Health',
    'Oncology', 'Cardiology', 'Orthopedics', 'Neurology', 'Dermatology', 'Endocrinology'
  ];

  const statuses = ['active', 'on_leave', 'inactive'] as const;
  const statusWeights = [0.8, 0.15, 0.05]; // 80% active, 15% on leave, 5% inactive

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@medaid.ca`;
    const phone = `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    const random = Math.random();
    let status: 'active' | 'on_leave' | 'inactive' = 'active';
    if (random < statusWeights[0]) status = 'active';
    else if (random < statusWeights[0] + statusWeights[1]) status = 'on_leave';
    else status = 'inactive';

    return {
      id: `nurse-${i + 1}`,
      name,
      email,
      phone,
      licenseNumber: `RN${Math.floor(Math.random() * 900000) + 100000}`,
      specialty: specialties[Math.floor(Math.random() * specialties.length)],
      experienceYears: Math.floor(Math.random() * 20) + 1,
      certifications: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, () => 
        ['CCRN', 'CEN', 'CPN', 'CGN', 'CMHN', 'RN License'][Math.floor(Math.random() * 6)]
      ).filter((cert, index, self) => self.indexOf(cert) === index),
      status,
      isActive: status === 'active',
      lastLoginAt: status === 'active' ? new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000) : undefined,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
    };
  });
};

const generateMockVisits = (count: number, patientIds: string[], nurseIds: string[], serviceIds: string[]) => {
  const reasons = [
    'Routine checkup', 'Blood pressure monitoring', 'Blood sugar check', 'Medication administration',
    'Wound care', 'Physical therapy', 'Mental health check', 'Pain management', 'Vital signs check',
    'Medication review', 'Fall risk assessment', 'Nutrition counseling', 'Disease management',
    'Emergency response', 'Post-surgery care', 'Chronic condition monitoring', 'Medication adjustment',
    'Symptom assessment', 'Care plan review', 'Family consultation'
  ];

  const statuses = ['requested', 'scheduled', 'en_route', 'in_progress', 'completed', 'cancelled', 'delayed'] as const;
  const statusWeights = [0.05, 0.3, 0.1, 0.15, 0.35, 0.03, 0.02]; // Weighted distribution

  return Array.from({ length: count }, (_, i) => {
    const random = Math.random();
    let status: 'requested' | 'scheduled' | 'en_route' | 'in_progress' | 'completed' | 'cancelled' | 'delayed' = 'scheduled';
    let cumulativeWeight = 0;
    for (let j = 0; j < statuses.length; j++) {
      cumulativeWeight += statusWeights[j];
      if (random < cumulativeWeight) {
        status = statuses[j];
        break;
      }
    }

    const visitDate = new Date(Date.now() + (Math.floor(Math.random() * 30) - 15) * 24 * 60 * 60 * 1000);
    const windowStart = new Date(visitDate);
    windowStart.setHours(8 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 4) * 15, 0, 0);
    const windowEnd = new Date(windowStart);
    windowEnd.setHours(windowStart.getHours() + 1 + Math.floor(Math.random() * 3), 0, 0, 0);

    const checkInTime = status === 'in_progress' || status === 'completed' ? 
      new Date(windowStart.getTime() + Math.floor(Math.random() * 30) * 60 * 1000) : undefined;
    
    const checkOutTime = status === 'completed' ? 
      new Date((checkInTime || windowStart).getTime() + (30 + Math.floor(Math.random() * 90)) * 60 * 1000) : undefined;

    return {
      id: `visit-${i + 1}`,
      patientId: patientIds[Math.floor(Math.random() * patientIds.length)],
      nurseId: nurseIds[Math.floor(Math.random() * nurseIds.length)],
      serviceId: serviceIds[Math.floor(Math.random() * serviceIds.length)],
      carePlanId: Math.random() > 0.7 ? `careplan-${Math.floor(Math.random() * 100) + 1}` : undefined,
      date: visitDate,
      windowStart,
      windowEnd,
      status,
      reasonForVisit: reasons[Math.floor(Math.random() * reasons.length)],
      notes: Math.random() > 0.5 ? `Visit notes for ${reasons[Math.floor(Math.random() * reasons.length)]}` : undefined,
      checkInTime,
      checkOutTime,
      location: Math.random() > 0.3 ? {
        latitude: 43.6532 + (Math.random() - 0.5) * 0.1,
        longitude: -79.3832 + (Math.random() - 0.5) * 0.1,
        address: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Elm', 'Maple'][Math.floor(Math.random() * 5)]} St, Toronto, ON`
      } : undefined,
      isUrgent: Math.random() < 0.1,
      isAfterHours: Math.random() < 0.2,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)
    };
  });
};

const generateMockBillingItems = (count: number, patientIds: string[], visitIds: string[]) => {
  const serviceTypes = ['Visit', 'Consultation', 'Emergency', 'Follow-up', 'Assessment', 'Treatment'];
  const statuses = ['pending', 'paid', 'overdue', 'cancelled'] as const;
  const statusWeights = [0.4, 0.5, 0.08, 0.02]; // 40% pending, 50% paid, 8% overdue, 2% cancelled

  return Array.from({ length: count }, (_, i) => {
    const random = Math.random();
    let status: 'pending' | 'paid' | 'overdue' | 'cancelled' = 'pending';
    let cumulativeWeight = 0;
    for (let j = 0; j < statuses.length; j++) {
      cumulativeWeight += statusWeights[j];
      if (random < cumulativeWeight) {
        status = statuses[j];
        break;
      }
    }

    const baseAmount = 50 + Math.floor(Math.random() * 400);
    const surcharge = Math.random() < 0.3 ? Math.floor(Math.random() * 50) : 0;
    const amount = baseAmount + surcharge;

    return {
      id: `billing-${i + 1}`,
      patientId: patientIds[Math.floor(Math.random() * patientIds.length)],
      visitId: visitIds[Math.floor(Math.random() * visitIds.length)],
      description: `${serviceTypes[Math.floor(Math.random() * serviceTypes.length)]} - ${['Routine care', 'Emergency response', 'Specialized treatment', 'Assessment', 'Follow-up care'][Math.floor(Math.random() * 5)]}`,
      amount,
      serviceType: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
      status,
      dueDate: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      paidAt: status === 'paid' ? new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000) : undefined,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)
    };
  });
};

const generateMockIncidents = (count: number, patientIds: string[], nurseIds: string[]) => {
  const categories = [
    'fall', 'medication_error', 'equipment_failure', 'patient_refusal', 'safety_concern', 'other'
  ];

  const severities = ['low', 'medium', 'high', 'critical'] as const;
  const severityWeights = [0.4, 0.35, 0.2, 0.05]; // 40% low, 35% medium, 20% high, 5% critical

  const statuses = ['open', 'investigating', 'resolved', 'closed'] as const;
  const statusWeights = [0.2, 0.3, 0.4, 0.1]; // 20% open, 30% investigating, 40% resolved, 10% closed

  return Array.from({ length: count }, (_, i) => {
    const severityRandom = Math.random();
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
    let cumulativeWeight = 0;
    for (let j = 0; j < severities.length; j++) {
      cumulativeWeight += severityWeights[j];
      if (severityRandom < cumulativeWeight) {
        severity = severities[j];
        break;
      }
    }

    const statusRandom = Math.random();
    let status: 'open' | 'investigating' | 'resolved' | 'closed' = 'open';
    cumulativeWeight = 0;
    for (let j = 0; j < statuses.length; j++) {
      cumulativeWeight += statusWeights[j];
      if (statusRandom < cumulativeWeight) {
        status = statuses[j];
        break;
      }
    }

    return {
      id: `incident-${i + 1}`,
      patientId: patientIds[Math.floor(Math.random() * patientIds.length)],
      nurseId: nurseIds[Math.floor(Math.random() * nurseIds.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      description: `Incident report: ${categories[Math.floor(Math.random() * categories.length)]} occurred during patient care`,
      severity,
      status,
      actionTaken: Math.random() > 0.3 ? `Action taken: ${['Immediate response', 'Escalated to supervisor', 'Documented and monitored', 'Patient notified'][Math.floor(Math.random() * 4)]}` : undefined,
      followUpRequired: Math.random() > 0.6,
      reportedTo: Math.random() > 0.4 ? `Supervisor ${Math.floor(Math.random() * 10) + 1}` : undefined,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)
    };
  });
};

// Generate large datasets for scalability testing
const generatedPatients = generateMockPatients(500);
const generatedNurses = generateMockNurses(50);
const generatedVisits = generateMockVisits(1000, generatedPatients.map(p => p.id), generatedNurses.map(n => n.id), [
  'service-1', 'service-2', 'service-3', 'service-4', 'service-5'
]);
const generatedBillingItems = generateMockBillingItems(800, generatedPatients.map(p => p.id), generatedVisits.map(v => v.id));
const generatedIncidents = generateMockIncidents(150, generatedPatients.map(p => p.id), generatedNurses.map(n => n.id));

// Services data (keeping original 5 services)
export const mockServices: z.infer<typeof ServiceSchema>[] = [
  {
    id: 'service-1',
    name: 'Basic Home Care Visit',
    basePrice: 120.00,
    minMinutes: 30,
    maxMinutes: 60,
    description: 'Standard home care visit including basic health monitoring and assistance',
    notes: 'Most common service type',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'service-2',
    name: 'Extended Care Visit',
    basePrice: 180.00,
    minMinutes: 60,
    maxMinutes: 120,
    description: 'Extended home care visit for complex care needs',
    notes: 'Includes medication management and wound care',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'service-3',
    name: 'Emergency Response',
    basePrice: 300.00,
    minMinutes: 15,
    maxMinutes: 45,
    description: 'Urgent medical response and emergency care',
    notes: '24/7 availability with rapid response',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'service-4',
    name: 'Specialized Care',
    basePrice: 250.00,
    minMinutes: 45,
    maxMinutes: 90,
    description: 'Specialized care for specific conditions (dementia, palliative, etc.)',
    notes: 'Requires specialized training',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'service-5',
    name: 'Assessment & Planning',
    basePrice: 200.00,
    minMinutes: 60,
    maxMinutes: 120,
    description: 'Comprehensive health assessment and care plan development',
    notes: 'Includes family consultation',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Care Plans (generated for some patients)
export const mockCarePlans: z.infer<typeof CarePlanSchema>[] = Array.from({ length: 200 }, (_, i) => ({
  id: `careplan-${i + 1}`,
  patientId: generatedPatients[Math.floor(Math.random() * generatedPatients.length)].id,
  title: `Care Plan ${i + 1}`,
  description: `Comprehensive care plan for patient management`,
  startDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
  endDate: new Date(Date.now() + Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000),
  status: ['active', 'completed', 'paused'][Math.floor(Math.random() * 3)] as 'active' | 'completed' | 'paused',
  goals: [
    'Improve patient mobility',
    'Manage chronic condition',
    'Prevent complications',
    'Enhance quality of life'
  ].slice(0, Math.floor(Math.random() * 4) + 1),
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
}));

// Care Tasks (generated for care plans)
export const mockCareTasks: z.infer<typeof CareTaskSchema>[] = Array.from({ length: 800 }, (_, i) => ({
  id: `task-${i + 1}`,
  carePlanId: mockCarePlans[Math.floor(Math.random() * mockCarePlans.length)].id,
  title: `Task ${i + 1}`,
  description: `Care task description for patient management`,
  dueDate: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  status: ['pending', 'in_progress', 'completed', 'cancelled'][Math.floor(Math.random() * 4)] as 'pending' | 'in_progress' | 'completed' | 'cancelled',
  priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
  assignedTo: generatedNurses[Math.floor(Math.random() * generatedNurses.length)].id,
  completedAt: Math.random() > 0.6 ? new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000) : undefined,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)
}));

// Vitals (generated for some visits)
export const mockVitals: z.infer<typeof VitalsSchema>[] = Array.from({ length: 600 }, (_, i) => ({
  id: `vitals-${i + 1}`,
  visitId: generatedVisits[Math.floor(Math.random() * generatedVisits.length)].id,
  patientId: generatedPatients[Math.floor(Math.random() * generatedPatients.length)].id,
  bloodPressure: {
    systolic: 100 + Math.floor(Math.random() * 40),
    diastolic: 60 + Math.floor(Math.random() * 20)
  },
  heartRate: 60 + Math.floor(Math.random() * 40),
  temperature: 36.0 + Math.random() * 2.0,
  respiratoryRate: 12 + Math.floor(Math.random() * 8),
  oxygenSaturation: 95 + Math.floor(Math.random() * 5),
  weight: 50 + Math.floor(Math.random() * 50),
  height: 150 + Math.floor(Math.random() * 30),
  notes: Math.random() > 0.7 ? 'Vital signs within normal range' : undefined,
  recordedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  recordedBy: generatedNurses[Math.floor(Math.random() * generatedNurses.length)].id,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)
}));

// Medication Events (generated for some visits)
export const mockMedicationEvents: z.infer<typeof MedicationEventSchema>[] = Array.from({ length: 400 }, (_, i) => ({
  id: `medication-${i + 1}`,
  visitId: generatedVisits[Math.floor(Math.random() * generatedVisits.length)].id,
  patientId: generatedPatients[Math.floor(Math.random() * generatedPatients.length)].id,
  medicationName: ['Metformin', 'Lisinopril', 'Atorvastatin', 'Metoprolol', 'Omeprazole', 'Amlodipine', 'Losartan', 'Simvastatin'][Math.floor(Math.random() * 8)],
  dosage: `${Math.floor(Math.random() * 500) + 50}mg`,
  route: ['Oral', 'Subcutaneous', 'Intramuscular', 'Intravenous'][Math.floor(Math.random() * 4)],
  administeredAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  administeredBy: generatedNurses[Math.floor(Math.random() * generatedNurses.length)].id,
  notes: Math.random() > 0.6 ? 'Medication administered as prescribed' : undefined,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)
}));

// Audit Logs (generated for various actions)
export const mockAuditLogs: z.infer<typeof AuditLogSchema>[] = Array.from({ length: 1000 }, (_, i) => ({
  id: `audit-${i + 1}`,
  entityType: ['patient', 'nurse', 'visit', 'billing', 'incident'][Math.floor(Math.random() * 5)] as 'patient' | 'nurse' | 'visit' | 'billing' | 'incident',
  entityId: `entity-${Math.floor(Math.random() * 1000) + 1}`,
  action: ['create', 'update', 'delete', 'view', 'export'][Math.floor(Math.random() * 5)] as 'create' | 'update' | 'delete' | 'view' | 'export',
  userId: generatedNurses[Math.floor(Math.random() * generatedNurses.length)].id,
  changes: Math.random() > 0.5 ? { field: 'status', oldValue: 'pending', newValue: 'completed' } : undefined,
  ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
}));

// Export all mock data with the expected names
export const mockPatients = generatedPatients;
export const mockNurses = generatedNurses;
export const mockVisits = generatedVisits;
export const mockBillingItems = generatedBillingItems;
export const mockIncidents = generatedIncidents;

// Mock users for authentication
export const mockUsers: z.infer<typeof PatientSchema>[] = [
  {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@medaid.ca',
    phone: '+1-555-0101',
    dateOfBirth: new Date('1980-01-01'),
    address: {
      street: '123 Admin St',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 3A8',
      country: 'Canada'
    },
    emergencyContact: {
      name: 'Emergency Contact',
      relationship: 'Spouse',
      phone: '+1-555-0102'
    },
    primaryDiagnosis: 'Administrative',
    allergies: [],
    medications: [],
    isActive: true,
    lastVisitAt: new Date(),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-2',
    name: 'Demo Coordinator',
    email: 'demo@medaid.ca',
    phone: '+1-555-0202',
    dateOfBirth: new Date('1985-05-15'),
    address: {
      street: '456 Coordinator Ave',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 3B9',
      country: 'Canada'
    },
    emergencyContact: {
      name: 'Emergency Contact',
      relationship: 'Parent',
      phone: '+1-555-0203'
    },
    primaryDiagnosis: 'Coordination',
    allergies: [],
    medications: [],
    isActive: true,
    lastVisitAt: new Date(),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];