// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// Application Configuration
export const APP_CONFIG = {
  NAME: 'MedAid',
  VERSION: '1.0.0',
  DESCRIPTION: 'Healthcare Management System',
  SUPPORT_EMAIL: 'support@medaid.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: '123 Healthcare St, Toronto, ON M5V 3A8',
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  DEFAULT_THEME: 'system',
  STORAGE_KEY: 'medaid-theme',
} as const;

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// Date and Time Configuration
export const DATE_CONFIG = {
  DEFAULT_TIMEZONE: 'America/Toronto',
  DATE_FORMAT: 'MM/DD/YYYY',
  TIME_FORMAT: '12h',
  DATETIME_FORMAT: 'MM/DD/YYYY h:mm A',
} as const;

// Currency Configuration
export const CURRENCY_CONFIG = {
  DEFAULT_CURRENCY: 'CAD',
  SYMBOL: '$',
  DECIMAL_PLACES: 2,
} as const;

// Status Options
export const STATUS_OPTIONS = {
  PATIENT: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'discharged', label: 'Discharged' },
  ],
  NURSE: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on_leave', label: 'On Leave' },
  ],
  VISIT: [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'in_progress', label: 'In Progress' },
  ],
  BILLING: [
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'cancelled', label: 'Cancelled' },
  ],
  INCIDENT: [
    { value: 'open', label: 'Open' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
  ],
  SERVICE: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'discontinued', label: 'Discontinued' },
  ],
  CERTIFICATION: [
    { value: 'valid', label: 'Valid' },
    { value: 'expired', label: 'Expired' },
    { value: 'pending', label: 'Pending' },
  ],
} as const;

// Priority Options
export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'gray' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'critical', label: 'Critical', color: 'red' },
] as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  NURSE_MANAGER: 'nurse_manager',
  NURSE: 'nurse',
  BILLING_MANAGER: 'billing_manager',
  VIEWER: 'viewer',
} as const;

// Permission Levels
export const PERMISSIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  ADMIN: 'admin',
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',
  NURSES: '/nurses',
  VISITS: '/visits',
  BILLING: '/billing',
  INCIDENTS: '/incidents',
  SERVICES: '/services',
  SCHEDULE: '/schedule',
  CERTIFICATIONS: '/certifications',
  SETTINGS: '/settings',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'medaid-theme',
  USER: 'medaid-user',
  TOKEN: 'medaid-token',
  FILTERS: 'medaid-filters',
  PREFERENCES: 'medaid-preferences',
} as const;

// Form Validation Rules
export const VALIDATION_RULES = {
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  PHONE: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number',
  },
  PASSWORD: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  },
  REQUIRED: {
    message: 'This field is required',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Successfully created',
  UPDATED: 'Successfully updated',
  DELETED: 'Successfully deleted',
  SAVED: 'Successfully saved',
  SENT: 'Successfully sent',
} as const;

// Table Configuration
export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  SORT_DIRECTIONS: ['asc', 'desc'] as const,
  EXPORT_FORMATS: ['csv', 'xlsx', 'pdf'] as const,
} as const;

// Chart Configuration
export const CHART_CONFIG = {
  COLORS: [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // yellow
    '#EF4444', // red
    '#8B5CF6', // purple
    '#06B6D4', // cyan
    '#84CC16', // lime
    '#F97316', // orange
  ],
  DEFAULT_HEIGHT: 300,
} as const;



