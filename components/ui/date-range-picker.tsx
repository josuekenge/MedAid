'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange) => void;
  placeholder?: string;
  className?: string;
  presets?: Array<{
    label: string;
    value: () => DateRange;
  }>;
}

const defaultPresets = [
  {
    label: 'Today',
    value: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
  },
  {
    label: 'Yesterday',
    value: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        startDate: yesterday,
        endDate: yesterday,
      };
    },
  },
  {
    label: 'Last 7 days',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 7);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'Last 30 days',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 30);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'This month',
    value: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'Last month',
    value: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { startDate: start, endDate: end };
    },
  },
];

export function DateRangePicker({
  value = { startDate: null, endDate: null },
  onChange,
  placeholder = 'Select date range',
  className,
  presets = defaultPresets,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleStartDateChange = (date: Date | null) => {
    onChange({
      ...value,
      startDate: date,
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    onChange({
      ...value,
      endDate: date,
    });
  };

  const handlePresetClick = (preset: typeof defaultPresets[0]) => {
    const range = preset.value();
    onChange(range);
    setIsOpen(false);
  };

  const clearRange = () => {
    onChange({ startDate: null, endDate: null });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDisplayText = () => {
    if (value.startDate && value.endDate) {
      if (value.startDate.getTime() === value.endDate.getTime()) {
        return formatDate(value.startDate);
      }
      return `${formatDate(value.startDate)} - ${formatDate(value.endDate)}`;
    }
    if (value.startDate) {
      return `From ${formatDate(value.startDate)}`;
    }
    if (value.endDate) {
      return `Until ${formatDate(value.endDate)}`;
    }
    return placeholder;
  };

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full justify-start text-left font-normal rounded-2xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500 shadow-sm',
          !value.startDate && !value.endDate && 'text-gray-500'
        )}
      >
        <Calendar className="h-4 w-4 mr-2" />
        <span className="flex-1 truncate">{getDisplayText()}</span>
        {(value.startDate || value.endDate) && (
          <X
            className="h-4 w-4 ml-2 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              clearRange();
            }}
          />
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 min-w-[600px]">
          <div className="grid grid-cols-2 gap-4">
            {/* Presets */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Select</h4>
              <div className="space-y-1">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetClick(preset)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Pickers */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Start Date
                </label>
                <DatePicker
                  selected={value.startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={value.startDate}
                  endDate={value.endDate}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholderText="Select start date"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  End Date
                </label>
                <DatePicker
                  selected={value.endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={value.startDate}
                  endDate={value.endDate}
                  minDate={value.startDate}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholderText="Select end date"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => setIsOpen(false)}
              className="rounded-xl"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}








