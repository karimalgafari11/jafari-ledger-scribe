
import { useRef, useState } from "react";

export function useTableState() {
  // State for cell editing
  const [activeSearchCell, setActiveSearchCell] = useState<{ rowIndex: number; cellName: string } | null>(null);
  const [isEditingCell, setIsEditingCell] = useState(false);
  const [showGridLines, setShowGridLines] = useState(true);
  const [isDenseView, setIsDenseView] = useState(false);
  const [lastSelectedRowIndex, setLastSelectedRowIndex] = useState<number | null>(null);
  
  // Refs for UI elements
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Toggle grid lines in the table
  const toggleGridLines = () => {
    setShowGridLines(prev => !prev);
  };

  // Toggle dense view mode
  const toggleDenseView = () => {
    setIsDenseView(prev => !prev);
  };

  return {
    activeSearchCell,
    setActiveSearchCell,
    isEditingCell,
    setIsEditingCell,
    showGridLines,
    isDenseView,
    lastSelectedRowIndex,
    setLastSelectedRowIndex,
    searchInputRef,
    tableRef,
    toggleGridLines,
    toggleDenseView
  };
}
