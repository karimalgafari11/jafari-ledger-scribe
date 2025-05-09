
import { useState, useRef } from 'react';

export function useTableState() {
  const [activeSearchCell, setActiveSearchCell] = useState<{ rowIndex: number; cellName: string } | null>(null);
  const [showGridLines, setShowGridLines] = useState(true);
  const [isDenseView, setIsDenseView] = useState(false);
  const [lastSelectedRowIndex, setLastSelectedRowIndex] = useState<number | null>(null);
  const [isEditingCell, setIsEditingCell] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  
  const toggleGridLines = () => {
    setShowGridLines(prev => !prev);
  };
  
  const toggleDenseView = () => {
    setIsDenseView(prev => !prev);
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
    isEditingCell,
    setIsEditingCell,
    toggleGridLines,
    toggleDenseView
  };
}
