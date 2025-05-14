
import { useState } from "react";
import { InvoiceItem } from "@/types/invoices";
import { ErrorTracker } from "@/utils/errorTracker";

/**
 * Hook for keyboard navigation in data tables
 * Provides arrow key navigation, enter to edit, and escape to cancel
 */
export const useTableKeyboardNavigation = (
  items: any[],
  setActiveCell: (cell: {rowIndex: number; cellName: string} | null) => void,
  setIsEditingActive: (isEditing: boolean) => void,
  setLastSelectedRowIndex: (index: number | null) => void,
  focusCell: (rowIndex: number, cellName: string) => void
) => {
  const [isEditingCell, setIsEditingCell] = useState(false);

  /**
   * Get the next valid cell when navigating with keyboard
   * @param direction Direction to move ('up', 'down', 'left', 'right')
   * @param currentRow Current row index
   * @param currentCell Current cell name
   * @param availableCells Array of available cell names in order
   */
  const getNextCell = (
    direction: 'up' | 'down' | 'left' | 'right',
    currentRow: number,
    currentCell: string,
    availableCells: string[]
  ): {rowIndex: number; cellName: string} | null => {
    try {
      const currentCellIndex = availableCells.indexOf(currentCell);
      if (currentCellIndex === -1) return null;
      
      switch (direction) {
        case 'up':
          return currentRow > 0 
            ? { rowIndex: currentRow - 1, cellName: currentCell } 
            : null;
        
        case 'down':
          return currentRow < items.length - 1 
            ? { rowIndex: currentRow + 1, cellName: currentCell } 
            : null;
        
        case 'left':
          return currentCellIndex > 0 
            ? { rowIndex: currentRow, cellName: availableCells[currentCellIndex - 1] } 
            : null;
        
        case 'right':
          return currentCellIndex < availableCells.length - 1 
            ? { rowIndex: currentRow, cellName: availableCells[currentCellIndex + 1] } 
            : null;
        
        default:
          return null;
      }
    } catch (error) {
      ErrorTracker.error('Error in getNextCell', { 
        component: 'useTableKeyboardNavigation',
        additionalInfo: { direction, currentRow, currentCell, error }
      });
      return null;
    }
  };

  /**
   * Handle keyboard navigation events
   * @param e Keyboard event
   * @param activeCell Current active cell
   * @param availableCells Array of available cell names in order
   */
  const handleKeyNavigation = (
    e: React.KeyboardEvent,
    activeCell: {rowIndex: number; cellName: string} | null,
    availableCells: string[]
  ) => {
    if (!activeCell) return;
    
    // If currently editing, don't navigate
    if (isEditingCell) return;
    
    const { rowIndex, cellName } = activeCell;
    
    try {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight': {
          e.preventDefault();
          
          const direction = e.key.replace('Arrow', '').toLowerCase() as 'up' | 'down' | 'left' | 'right';
          const nextCell = getNextCell(direction, rowIndex, cellName, availableCells);
          
          if (nextCell) {
            focusCell(nextCell.rowIndex, nextCell.cellName);
            setActiveCell(nextCell);
            setLastSelectedRowIndex(nextCell.rowIndex);
          }
          break;
        }
        
        case 'Enter':
          e.preventDefault();
          setIsEditingCell(true);
          setIsEditingActive(true);
          break;
        
        case 'Escape':
          e.preventDefault();
          setActiveCell(null);
          setLastSelectedRowIndex(null);
          break;
        
        case 'Tab':
          // Allow default tab behavior for accessibility
          break;
          
        default:
          // Ignore other keys
          break;
      }
    } catch (error) {
      ErrorTracker.error('Error in handleKeyNavigation', { 
        component: 'useTableKeyboardNavigation',
        additionalInfo: { key: e.key, activeCell, error }
      });
    }
  };

  /**
   * Finish editing the current cell
   */
  const finishEditing = () => {
    setIsEditingCell(false);
    setIsEditingActive(false);
  };

  return {
    handleKeyNavigation,
    finishEditing,
    isEditingCell,
    setIsEditingActive: setIsEditingCell
  };
};
