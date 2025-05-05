
import { useState, useRef } from 'react';

export function useTableState() {
  const [activeSearchCell, setActiveSearchCell] = useState<string | null>(null);
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [isDenseView, setIsDenseView] = useState<boolean>(false);
  const [lastSelectedRowIndex, setLastSelectedRowIndex] = useState<number | null>(null);
  const [isEditingCell, setIsEditingCell] = useState<boolean>(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  
  const toggleGridLines = () => {
    setShowGridLines(prev => !prev);
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
    toggleGridLines
  };
}
