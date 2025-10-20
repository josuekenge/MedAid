'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal,
  Download,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
} from 'lucide-react';

interface BulkActionsProps {
  selectedItems: string[];
  totalItems: number;
  onBulkAction: (action: string, items: string[]) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  availableActions?: string[];
}

export function BulkActions({
  selectedItems,
  totalItems,
  onBulkAction,
  onSelectAll,
  onClearSelection,
  availableActions = ['export', 'delete', 'update_status']
}: BulkActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: string) => {
    onBulkAction(action, selectedItems);
    setIsOpen(false);
  };

  const isAllSelected = selectedItems.length === totalItems;
  const isPartiallySelected = selectedItems.length > 0 && selectedItems.length < totalItems;

  if (selectedItems.length === 0) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onSelectAll}
          className="rounded-xl"
        >
          Select All ({totalItems})
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Badge variant="default" className="rounded-xl">
          {selectedItems.length} selected
        </Badge>
        {isPartiallySelected && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            className="text-xs"
          >
            Select All
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="text-xs"
        >
          Clear
        </Button>
      </div>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="rounded-xl">
            <MoreHorizontal className="h-4 w-4 mr-2" />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {availableActions.includes('export') && (
            <DropdownMenuItem onClick={() => handleAction('export')}>
              <Download className="h-4 w-4 mr-2" />
              Export Selected
            </DropdownMenuItem>
          )}
          
          {availableActions.includes('update_status') && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleAction('mark_complete')}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('mark_pending')}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Mark as Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('mark_cancelled')}>
                <XCircle className="h-4 w-4 mr-2" />
                Mark as Cancelled
              </DropdownMenuItem>
            </>
          )}

          {availableActions.includes('delete') && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleAction('delete')}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Hook for managing bulk selection
export function useBulkSelection<T extends { id: string }>(
  items: T[],
  onBulkAction?: (action: string, selectedItems: T[]) => void
) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedItems(items.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const isSelected = (id: string) => selectedItems.includes(id);
  const isAllSelected = selectedItems.length === items.length;
  const isPartiallySelected = selectedItems.length > 0 && selectedItems.length < items.length;

  const handleBulkAction = (action: string) => {
    const selectedObjects = items.filter(item => selectedItems.includes(item.id));
    onBulkAction?.(action, selectedObjects);
    clearSelection();
  };

  return {
    selectedItems,
    setSelectedItems,
    toggleItem,
    selectAll,
    clearSelection,
    isSelected,
    isAllSelected,
    isPartiallySelected,
    handleBulkAction,
  };
}








