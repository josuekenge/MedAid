import { describe, it, expect } from 'vitest';
import {
  computeBase,
  computeSurcharge,
  computeTotal,
  computeDeposit,
  handleCancellation,
  roundTimeToNearestFiveMinutes,
  calculateInvoice,
  calculateMileageCost,
  formatCurrency,
} from '@/lib/billing';
import { Service, Visit } from '@/lib/schemas';

// Mock data for testing
const mockService: Service = {
  id: '1',
  name: 'General Checkup',
  basePrice: 120,
  minMinutes: 30,
  maxMinutes: 60,
  description: 'General health checkup',
  notes: '',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockVisit: Visit = {
  id: '1',
  patientId: '1',
  nurseId: '1',
  serviceId: '1',
  date: new Date(),
  windowStart: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
  windowEnd: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
  status: 'scheduled',
  reasonForVisit: 'Regular checkup',
  notes: '',
  isUrgent: false,
  isAfterHours: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Billing Calculations', () => {
  describe('computeBase', () => {
    it('should return service base price', () => {
      expect(computeBase(mockService, 45)).toBe(120);
      expect(computeBase(mockService, 30)).toBe(120);
      expect(computeBase(mockService, 60)).toBe(120);
    });
  });

  describe('computeSurcharge', () => {
    it('should return 0 for normal hours and non-urgent', () => {
      expect(computeSurcharge({ isAfterHours: false, isUrgent: false })).toBe(0);
    });

    it('should return 0.10 for after hours only', () => {
      expect(computeSurcharge({ isAfterHours: true, isUrgent: false })).toBe(0.10);
    });

    it('should return 0.15 for urgent only', () => {
      expect(computeSurcharge({ isAfterHours: false, isUrgent: true })).toBe(0.15);
    });

    it('should return 0.265 for both after hours and urgent (multiplicative)', () => {
      expect(computeSurcharge({ isAfterHours: true, isUrgent: true })).toBe(0.265);
    });
  });

  describe('computeTotal', () => {
    it('should return base amount with no surcharge', () => {
      expect(computeTotal(120, 0)).toBe(120);
    });

    it('should calculate surcharge correctly', () => {
      expect(computeTotal(120, 0.10)).toBe(132);
      expect(computeTotal(120, 0.15)).toBe(138);
      expect(computeTotal(120, 0.265)).toBe(151.8);
    });

    it('should round to 2 decimal places', () => {
      expect(computeTotal(100, 0.333)).toBe(133.3);
    });
  });

  describe('computeDeposit', () => {
    it('should calculate 50% deposit by default', () => {
      const result = computeDeposit(120);
      expect(result.depositAmount).toBe(60);
      expect(result.remainingAmount).toBe(60);
    });

    it('should calculate custom deposit percentage', () => {
      const result = computeDeposit(120, 0.25);
      expect(result.depositAmount).toBe(30);
      expect(result.remainingAmount).toBe(90);
    });

    it('should round to 2 decimal places', () => {
      const result = computeDeposit(100, 0.333);
      expect(result.depositAmount).toBe(33.3);
      expect(result.remainingAmount).toBe(66.7);
    });
  });

  describe('handleCancellation', () => {
    it('should return 0 for cancellation more than 2 hours before visit', () => {
      const windowStart = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours from now
      const cancelAt = new Date();
      expect(handleCancellation(windowStart, cancelAt)).toBe(0);
    });

    it('should return 40 for cancellation within 2 hours', () => {
      const windowStart = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour from now
      const cancelAt = new Date();
      expect(handleCancellation(windowStart, cancelAt)).toBe(40);
    });

    it('should return 40 for cancellation exactly 2 hours before', () => {
      const windowStart = new Date(Date.now() + 2 * 60 * 60 * 1000 - 1); // Just under 2 hours from now
      const cancelAt = new Date();
      expect(handleCancellation(windowStart, cancelAt)).toBe(40);
    });
  });

  describe('roundTimeToNearestFiveMinutes', () => {
    it('should round down to nearest 5 minutes', () => {
      expect(roundTimeToNearestFiveMinutes(12)).toBe(10);
      expect(roundTimeToNearestFiveMinutes(17)).toBe(15);
      expect(roundTimeToNearestFiveMinutes(22)).toBe(20);
    });

    it('should round up to nearest 5 minutes', () => {
      expect(roundTimeToNearestFiveMinutes(13)).toBe(15);
      expect(roundTimeToNearestFiveMinutes(18)).toBe(20);
      expect(roundTimeToNearestFiveMinutes(24)).toBe(25);
    });

    it('should not change exact multiples of 5', () => {
      expect(roundTimeToNearestFiveMinutes(10)).toBe(10);
      expect(roundTimeToNearestFiveMinutes(15)).toBe(15);
      expect(roundTimeToNearestFiveMinutes(20)).toBe(20);
    });
  });

  describe('calculateInvoice', () => {
    it('should calculate basic invoice correctly', () => {
      const result = calculateInvoice({
        service: mockService,
        visit: mockVisit,
        timeMinutes: 45,
        mileageKm: 10,
        isAfterHours: false,
        isUrgent: false,
        depositPercentage: 0.5,
      });

      expect(result.baseAmount).toBe(120);
      expect(result.timeMinutes).toBe(45);
      expect(result.mileageKm).toBe(10);
      expect(result.surchargePercentage).toBe(0);
      expect(result.surchargeAmount).toBe(0);
      expect(result.totalAmount).toBe(120);
      expect(result.depositAmount).toBe(60);
      expect(result.remainingAmount).toBe(60);
      expect(result.cancellationFee).toBe(0);
    });

    it('should calculate invoice with after hours surcharge', () => {
      const result = calculateInvoice({
        service: mockService,
        visit: mockVisit,
        timeMinutes: 45,
        mileageKm: 0,
        isAfterHours: true,
        isUrgent: false,
        depositPercentage: 0.5,
      });

      expect(result.baseAmount).toBe(120);
      expect(result.surchargePercentage).toBe(0.10);
      expect(result.surchargeAmount).toBe(12);
      expect(result.totalAmount).toBe(132);
      expect(result.depositAmount).toBe(66);
      expect(result.remainingAmount).toBe(66);
    });

    it('should calculate invoice with urgent surcharge', () => {
      const result = calculateInvoice({
        service: mockService,
        visit: mockVisit,
        timeMinutes: 45,
        mileageKm: 0,
        isAfterHours: false,
        isUrgent: true,
        depositPercentage: 0.5,
      });

      expect(result.baseAmount).toBe(120);
      expect(result.surchargePercentage).toBe(0.15);
      expect(result.surchargeAmount).toBe(18);
      expect(result.totalAmount).toBe(138);
      expect(result.depositAmount).toBe(69);
      expect(result.remainingAmount).toBe(69);
    });

    it('should calculate invoice with both surcharges (multiplicative)', () => {
      const result = calculateInvoice({
        service: mockService,
        visit: mockVisit,
        timeMinutes: 45,
        mileageKm: 0,
        isAfterHours: true,
        isUrgent: true,
        depositPercentage: 0.5,
      });

      expect(result.baseAmount).toBe(120);
      expect(result.surchargePercentage).toBe(0.265);
      expect(result.surchargeAmount).toBe(31.8);
      expect(result.totalAmount).toBe(151.8);
      expect(result.depositAmount).toBe(75.9);
      expect(result.remainingAmount).toBe(75.9);
    });

    it('should calculate cancellation fee when applicable', () => {
      const visitWithNearWindow = {
        ...mockVisit,
        windowStart: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
      };

      const result = calculateInvoice({
        service: mockService,
        visit: visitWithNearWindow,
        timeMinutes: 45,
        mileageKm: 0,
        isAfterHours: false,
        isUrgent: false,
        depositPercentage: 0.5,
        cancellationTime: new Date(),
      });

      expect(result.cancellationFee).toBe(40);
    });
  });

  describe('calculateMileageCost', () => {
    it('should calculate mileage cost with default rate', () => {
      expect(calculateMileageCost(10)).toBe(5);
      expect(calculateMileageCost(20)).toBe(10);
      expect(calculateMileageCost(0)).toBe(0);
    });

    it('should calculate mileage cost with custom rate', () => {
      expect(calculateMileageCost(10, 0.75)).toBe(7.5);
      expect(calculateMileageCost(15, 0.6)).toBe(9);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency in CAD by default', () => {
      expect(formatCurrency(120)).toBe('$120.00');
      expect(formatCurrency(120.50)).toBe('$120.50');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should format currency with custom currency', () => {
      expect(formatCurrency(120, 'USD')).toBe('US$120.00');
    });
  });
});
