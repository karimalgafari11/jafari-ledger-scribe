
import { MouseEvent, useCallback } from "react";
import { PurchaseItem } from "@/types/purchases";

interface UseTableEventsProps {
  activeSearchCell: { rowIndex: number; cellName: string } | null;
  tableRef: React.RefObject<HTMLDivElement>;
  setActiveSearchCell: (cell: { rowIndex: number; cellName: string } | null) => void;
  setIsEditingCell: (isEditing: boolean) => void;
  items: PurchaseItem[];
}

export function useTableEvents({
  activeSearchCell,
  tableRef,
  setActiveSearchCell,
  setIsEditingCell,
  items
}: UseTableEventsProps) {
  
  // Handle clicks outside the table cells to finish editing
  const handleTableClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!activeSearchCell) return;
    
    const target = e.target as HTMLElement;
    const isClickOnCell = target.closest('td');
    const isClickOnSearch = target.closest('.search-results');
    
    // If clicking outside cell and not on search results, finish editing
    if (!isClickOnCell && !isClickOnSearch) {
      setActiveSearchCell(null);
      setIsEditingCell(false);
    }
  }, [activeSearchCell, setActiveSearchCell, setIsEditingCell]);

  // Handle keyboard navigation in the table
  const handleTableKeyDown = useCallback((e: KeyboardEvent) => {
    if (!activeSearchCell) return;
    
    const { rowIndex, cellName } = activeSearchCell;
    const cellNames = ['code', 'name', 'quantity', 'price', 'notes'];
    const currentCellIndex = cellNames.indexOf(cellName);
    
    switch (e.key) {
      case 'Tab':
        e.preventDefault();
        let nextCellIndex = currentCellIndex;
        let nextRowIndex = rowIndex;
        
        if (e.shiftKey) {
          // Move to previous cell or row
          nextCellIndex--;
          if (nextCellIndex < 0) {
            nextRowIndex--;
            nextCellIndex = cellNames.length - 1;
          }
        } else {
          // Move to next cell or row
          nextCellIndex++;
          if (nextCellIndex >= cellNames.length) {
            nextRowIndex++;
            nextCellIndex = 0;
          }
        }
        
        // Ensure we stay within valid range
        if (nextRowIndex >= 0 && nextRowIndex < items.length) {
          setActiveSearchCell({
            rowIndex: nextRowIndex,
            cellName: cellNames[nextCellIndex]
          });
        } else {
          setActiveSearchCell(null);
        }
        break;
        
      case 'Escape':
        setActiveSearchCell(null);
        setIsEditingCell(false);
        break;
    }
  }, [activeSearchCell, items.length, setActiveSearchCell, setIsEditingCell]);

  return {
    handleTableClick,
    handleTableKeyDown
  };
}
