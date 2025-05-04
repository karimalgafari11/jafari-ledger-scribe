
import { useState, useRef } from "react";

export function useTableState() {
  const [activeSearchCell, setActiveSearchCell] = useState<string | null>(null);
  const [showGridLines, setShowGridLines] = useState<'both' | 'horizontal' | 'vertical' | 'none'>('both');
  const [isDenseView, setIsDenseView] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [lastSelectedRowIndex, setLastSelectedRowIndex] = useState<number | null>(null);
  const [isEditingCell, setIsEditingCell] = useState(false);

  const toggleGridLines = () => {
    const options: Array<'both' | 'horizontal' | 'vertical' | 'none'> = ['both', 'horizontal', 'vertical', 'none'];
    const currentIndex = options.indexOf(showGridLines);
    const nextIndex = (currentIndex + 1) % options.length;
    setShowGridLines(options[nextIndex]);
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
