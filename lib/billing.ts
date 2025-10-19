import { z } from 'zod';
import { Service, Visit } from './schemas';

// Billing calculation input schema
export const BillingCalculationInputSchema = z.object({
  service: z.object({
    id: z.string(),
    name: z.string(),
    basePrice: z.number().positive(),
    minMinutes: z.number().positive(),
    maxMinutes: z.number().positive(),
    description: z.string().optional(),
    notes: z.string().optional(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  visit: z.object({
    id: z.string(),
    patientId: z.string(),
    nurseId: z.string(),
    serviceId: z.string(),
    carePlanId: z.string().optional(),
    date: z.date(),
    windowStart: z.date(),
    windowEnd: z.date(),
    status: z.enum(['requested', 'scheduled', 'en_route', 'in_progress', 'completed', 'cancelled', 'delayed']),
    reasonForVisit: z.string(),
    notes: z.string().optional(),
    checkInTime: z.date().optional(),
    checkOutTime: z.date().optional(),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
      address: z.string(),
    }).optional(),
    isUrgent: z.boolean(),
    isAfterHours: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  timeMinutes: z.number().nonnegative(),
  mileageKm: z.number().nonnegative().default(0),
  isAfterHours: z.boolean().default(false),
  isUrgent: z.boolean().default(false),
  depositPercentage: z.number().min(0).max(1).default(0.5),
  cancellationTime: z.date().optional(),
});

export type BillingCalculationInput = z.infer<typeof BillingCalculationInputSchema>;

// Billing calculation result schema
export const BillingCalculationResultSchema = z.object({
  baseAmount: z.number().nonnegative(),
  timeMinutes: z.number().nonnegative(),
  mileageKm: z.number().nonnegative(),
  surchargePercentage: z.number().min(0).max(1),
  surchargeAmount: z.number().nonnegative(),
  totalAmount: z.number().nonnegative(),
  depositAmount: z.number().nonnegative(),
  remainingAmount: z.number().nonnegative(),
  cancellationFee: z.number().nonnegative().default(0),
});

export type BillingCalculationResult = z.infer<typeof BillingCalculationResultSchema>;

/**
 * Calculate base amount from service price
 * Currently returns service base price, ignoring time scaling
 */
export function computeBase(service: Service, timeMinutes: number): number {
  return service.basePrice;
}

/**
 * Calculate surcharge percentage based on options
 * After hours: 10%, Urgent: 15%, combined multiplicatively
 */
export function computeSurcharge(options: {
  isAfterHours: boolean;
  isUrgent: boolean;
}): number {
  let surcharge = 0;
  
  if (options.isAfterHours) {
    surcharge += 0.10;
  }
  
  if (options.isUrgent) {
    surcharge += 0.15;
  }
  
  // Apply multiplicative combination if both are true
  if (options.isAfterHours && options.isUrgent) {
    surcharge = 0.10 + 0.15 + (0.10 * 0.15); // 0.265 = 26.5%
  }
  
  return surcharge;
}

/**
 * Calculate total amount with surcharge
 */
export function computeTotal(baseAmount: number, surchargePercentage: number): number {
  const surchargeAmount = baseAmount * surchargePercentage;
  return Math.round((baseAmount + surchargeAmount) * 100) / 100; // Round to 2 decimals
}

/**
 * Calculate deposit and remaining amounts
 */
export function computeDeposit(totalAmount: number, depositPercentage: number = 0.5): {
  depositAmount: number;
  remainingAmount: number;
} {
  const depositAmount = Math.round(totalAmount * depositPercentage * 100) / 100;
  const remainingAmount = Math.round((totalAmount - depositAmount) * 100) / 100;
  
  return {
    depositAmount,
    remainingAmount,
  };
}

/**
 * Calculate cancellation fee if within 2 hours of visit window
 */
export function handleCancellation(
  windowStart: Date,
  cancelAt: Date
): number {
  const hoursUntilVisit = (windowStart.getTime() - cancelAt.getTime()) / (1000 * 60 * 60);
  
  if (hoursUntilVisit < 2) {
    return 40;
  }
  
  return 0;
}

/**
 * Round time to nearest 5 minutes for reporting
 */
export function roundTimeToNearestFiveMinutes(minutes: number): number {
  return Math.round(minutes / 5) * 5;
}

/**
 * Main billing calculation orchestrator
 */
export function calculateInvoice(input: BillingCalculationInput): BillingCalculationResult {
  // Validate input
  const validatedInput = BillingCalculationInputSchema.parse(input);
  
  // Calculate base amount
  const baseAmount = computeBase(validatedInput.service, validatedInput.timeMinutes);
  
  // Round time to nearest 5 minutes
  const roundedTimeMinutes = roundTimeToNearestFiveMinutes(validatedInput.timeMinutes);
  
  // Calculate surcharge
  const surchargePercentage = computeSurcharge({
    isAfterHours: validatedInput.isAfterHours,
    isUrgent: validatedInput.isUrgent,
  });
  
  // Calculate total amount
  const totalAmount = computeTotal(baseAmount, surchargePercentage);
  
  // Calculate deposit
  const { depositAmount, remainingAmount } = computeDeposit(
    totalAmount,
    validatedInput.depositPercentage
  );
  
  // Calculate cancellation fee if applicable
  let cancellationFee = 0;
  if (validatedInput.cancellationTime) {
    cancellationFee = handleCancellation(
      validatedInput.visit.windowStart,
      validatedInput.cancellationTime
    );
  }
  
  return {
    baseAmount,
    timeMinutes: roundedTimeMinutes,
    mileageKm: validatedInput.mileageKm,
    surchargePercentage,
    surchargeAmount: Math.round((totalAmount - baseAmount) * 100) / 100,
    totalAmount,
    depositAmount,
    remainingAmount,
    cancellationFee,
  };
}

/**
 * Calculate mileage cost (simple rate calculator)
 * Default rate: $0.50 per km
 */
export function calculateMileageCost(km: number, ratePerKm: number = 0.5): number {
  return Math.round(km * ratePerKm * 100) / 100;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = 'CAD'): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
  }).format(amount);
}
