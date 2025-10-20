'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { VisitForm } from '@/components/forms/visit-form';
import { mockVisits, mockNurses, mockPatients, mockServices } from '@/lib/mock-data';
import { formatDate, formatTime, getInitials } from '@/lib/utils';
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  MapPin,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Use mock data instead of API calls
  const visits = mockVisits;
  const nurses = mockNurses;
  const patients = mockPatients;
  const visitsLoading = false;

  const getNurseName = (nurseId: string) => {
    return nurses?.find(n => n.id === nurseId)?.name || 'Unknown Nurse';
  };

  const getPatientName = (patientId: string) => {
    return patients?.find(p => p.id === patientId)?.name || 'Unknown Patient';
  };

  const getStatusText = (status: string) => {
    const statusConfig = {
      scheduled: 'Scheduled',
      completed: 'Completed',
      cancelled: 'Cancelled',
      in_progress: 'In Progress'
    };
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getVisitsForDate = (date: Date) => {
    if (!visits) return [];
    return visits.filter(visit => {
      const visitDate = new Date(visit.date);
      return visitDate.toDateString() === date.toDateString();
    });
  };

  const handleAddVisit = () => {
    setIsAddModalOpen(true);
  };

  const handleSubmitVisit = (visitData: any) => {
    console.log('New visit data:', visitData);
    // TODO: Add API call to create visit
    setIsAddModalOpen(false);
    // Show success message or refresh data
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  if (visitsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: 35 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <Button onClick={handleAddVisit} variant="primary" size="lg" className="shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Visit
        </Button>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">{monthName}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-h-[120px] p-2 border border-gray-200 ${
                  day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                }`}
              >
                {day && (
                  <>
                    <div className="text-sm font-medium text-gray-900 mb-2">
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {getVisitsForDate(day).slice(0, 3).map(visit => (
                        <div
                          key={visit.id}
                          className="text-xs p-1 bg-gray-100 text-gray-800 rounded cursor-pointer hover:bg-gray-200"
                          onClick={() => setSelectedVisit(visit)}
                        >
                          <div className="font-medium">{visit.time}</div>
                          <div className="truncate">{getPatientName(visit.patientId)}</div>
                        </div>
                      ))}
                      {getVisitsForDate(day).length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{getVisitsForDate(day).length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Visits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Today's Visits
          </CardTitle>
          <CardDescription>
            Visits scheduled for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          {getVisitsForDate(new Date()).length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No visits today</h3>
              <p className="text-gray-600">All caught up! No visits scheduled for today.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Nurse</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Address</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getVisitsForDate(new Date()).map((visit) => (
                    <tr key={visit.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-700">{visit.time}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-700">{getPatientName(visit.patientId)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">{getNurseName(visit.nurseId)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700 capitalize">{visit.type}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700">
                          {getStatusText(visit.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center max-w-xs">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-700 truncate">{visit.address}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedVisit(visit)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Visit Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Visit"
        >
          <VisitForm
            patients={patients || []}
            nurses={nurses || []}
            services={mockServices || []}
            onSubmit={handleSubmitVisit}
            onCancel={() => setIsAddModalOpen(false)}
            isLoading={false}
          />
        </Modal>
      )}

      {/* Visit Details Modal */}
      {selectedVisit && (
        <Modal
          isOpen={!!selectedVisit}
          onClose={() => setSelectedVisit(null)}
          title="Visit Details"
        >
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Patient</p>
                <p className="text-gray-900">{getPatientName(selectedVisit.patientId)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Nurse</p>
                <p className="text-gray-900">{getNurseName(selectedVisit.nurseId)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Date</p>
                <p className="text-gray-900">{formatDate(selectedVisit.date)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Time</p>
                <p className="text-gray-900">{selectedVisit.time || '--'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-gray-900 capitalize">{selectedVisit.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Type</p>
                <p className="text-gray-900 capitalize">{selectedVisit.type}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-600">Address</p>
                <p className="text-gray-900">{selectedVisit.address}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-600">Notes</p>
                <p className="text-gray-900">{selectedVisit.notes || 'No notes available'}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedVisit(null)}>
                Close
              </Button>
              <Button variant="primary">
                Edit Visit
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}



