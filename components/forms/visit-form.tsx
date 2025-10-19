'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Visit } from '@/lib/schemas';

interface VisitFormProps {
  visit?: Visit;
  patients: any[];
  nurses: any[];
  services: any[];
  onSubmit: (visit: Omit<Visit, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function VisitForm({ visit, patients, nurses, services, onSubmit, onCancel, isLoading = false }: VisitFormProps) {
  const [formData, setFormData] = useState({
    patientId: visit?.patientId || '',
    nurseId: visit?.nurseId || '',
    serviceId: visit?.serviceId || '',
    date: visit?.date ? new Date(visit.date).toISOString().split('T')[0] : '',
    windowStart: visit?.windowStart ? new Date(visit.windowStart).toISOString().slice(0, 16) : '',
    windowEnd: visit?.windowEnd ? new Date(visit.windowEnd).toISOString().slice(0, 16) : '',
    reasonForVisit: visit?.reasonForVisit || '',
    status: visit?.status || 'scheduled',
    priority: visit?.priority || 'medium',
    notes: visit?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date(formData.date),
      windowStart: new Date(formData.windowStart),
      windowEnd: new Date(formData.windowEnd),
      checkInTime: visit?.checkInTime || null,
      checkOutTime: visit?.checkOutTime || null,
      location: visit?.location || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="patientId">Patient *</Label>
          <select
            id="patientId"
            value={formData.patientId}
            onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select a patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <Label htmlFor="nurseId">Nurse *</Label>
          <select
            id="nurseId"
            value={formData.nurseId}
            onChange={(e) => setFormData(prev => ({ ...prev, nurseId: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select a nurse</option>
            {nurses.map(nurse => (
              <option key={nurse.id} value={nurse.id}>
                {nurse.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <Label htmlFor="serviceId">Service *</Label>
          <select
            id="serviceId"
            value={formData.serviceId}
            onChange={(e) => setFormData(prev => ({ ...prev, serviceId: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="windowStart">Start Time *</Label>
          <Input
            id="windowStart"
            type="datetime-local"
            value={formData.windowStart}
            onChange={(e) => setFormData(prev => ({ ...prev, windowStart: e.target.value }))}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="windowEnd">End Time *</Label>
          <Input
            id="windowEnd"
            type="datetime-local"
            value={formData.windowEnd}
            onChange={(e) => setFormData(prev => ({ ...prev, windowEnd: e.target.value }))}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="priority">Priority</Label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="reasonForVisit">Reason for Visit *</Label>
        <Input
          id="reasonForVisit"
          value={formData.reasonForVisit}
          onChange={(e) => setFormData(prev => ({ ...prev, reasonForVisit: e.target.value }))}
          required
          placeholder="Enter reason for visit"
        />
      </div>
      
      <div>
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows={3}
          placeholder="Additional notes about the visit"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (visit ? 'Update Visit' : 'Add Visit')}
        </Button>
      </div>
    </form>
  );
}
