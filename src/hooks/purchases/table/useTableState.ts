
import { useState, useRef } from 'react';

export function useTableState() {
  const [activeSearchCell, setActiveSearchCell] = useState<{ rowIndex: number; cellName: string } | null>(null);
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [isDenseView, setIsDenseView] = useState<boolean>(false);
  const [lastSelectedRowIndex, setLastSelectedRowIndex] = useState<number | null>(null);
  const [isEditingCell, setIsEditingCell] = useState<boolean>(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  
  const toggleGridLines = () => {
    setShowGridLines(prev => !prev);
  };
  
  // Helper function to check if a specific cell is currently being edited
  const isEditingCellCheck = (rowIndex: number, cellName: string): boolean => {
    return activeSearchCell !== null && 
           activeSearchCell.rowIndex === rowIndex && 
           activeSearchCell.cellName === cellName;
  };
  
  return {
    activeSearchCell,
    setActiveSearchCell,
    showGridLines,
    isDenseView,
    searchInputRef,
    tableRef,
    lastSelectedRowIndex,
    setLastSelectedRowIndex,
    isEditingCell: isEditingCellCheck, // Return the function instead of boolean
    setIsEditingCell,
    toggleGridLines
  };
}
