
import { useState, useRef } from "react";

/**
 * Hook for managing cell focus in data tables
 * Provides functionality to focus, track, and manage active cells
 */
export const useCellFocus = () => {
  const [activeCell, setActiveCell] = useState<{rowIndex: number; cellName: string} | null>(null);
  const [lastSelectedRowIndex, setLastSelectedRowIndex] = useState<number | null>(null);
  const cellElementsMap = useRef(new Map()).current;

  /**
   * Focus a specific cell in the table
   * @param cellRefs Map of cell references
   * @param rowIndex Row index to focus
   * @param cellName Cell name to focus
   * @param setActiveSearchCell Function to update active cell state
   * @param setLastSelectedRow Function to update last selected row
   */
  const focusCell = (
    cellRefs: Map<string, HTMLElement>,
    rowIndex: number,
    cellName: string,
    setActiveSearchCell: (cell: {rowIndex: number; cellName: string} | null) => void,
    setLastSelectedRow?: (index: number | null) => void
  ) => {
    // Generate a unique key for this cell
    const cellKey = `${rowIndex}-${cellName}`;
    const cellElement = cellRefs.get(cellKey);
    
    if (cellElement) {
      // Focus the cell element
      cellElement.focus();
      
      // Update active cell state
      setActiveSearchCell({rowIndex, cellName});
      
      // Update last selected row if provided
      if (setLastSelectedRow) {
        setLastSelectedRow(rowIndex);
      }
    }
  };

  /**
   * Register a cell reference
   * @param rowIndex Row index of the cell
   * @param cellName Name identifier of the cell
   * @param element HTML element reference
   */
  const registerCellRef = (rowIndex: number, cellName: string, element: HTMLElement | null) => {
    const key = `${rowIndex}-${cellName}`;
    
    if (element) {
      cellElementsMap.set(key, element);
    } else {
      cellElementsMap.delete(key);
    }
  };

  /**
   * Clear all cell focus
   * @param setActiveSearchCell Function to update active cell state
   */
  const clearFocus = (
    setActiveSearchCell: (cell: {rowIndex: number; cellName: string} | null) => void
  ) => {
    setActiveSearchCell(null);
    setLastSelectedRowIndex(null);
  };

  return {
    activeCell,
    lastSelectedRowIndex,
    cellElementsMap,
    focusCell,
    registerCellRef,
    clearFocus,
    setActiveCell,
    setLastSelectedRowIndex
  };
};
