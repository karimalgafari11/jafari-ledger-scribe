
import { useEffect } from "react";

interface UseTableEventsProps {
  activeSearchCell: string | null;
  tableRef: React.RefObject<HTMLDivElement>;
  setActiveSearchCell: (cellId: string | null) => void;
  setIsEditingCell: (isEditing: boolean) => void;
  items: any[];
}

export function useTableEvents({
  activeSearchCell,
  tableRef,
  setActiveSearchCell,
  setIsEditingCell,
  items
}: UseTableEventsProps) {
  
  // Handle table click (for dismissing active cell)
  const handleTableClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Don't reset if clicking on input, search cell, search dropdown, or any editable element
    if (
      target.closest('input') || 
      target.closest('select') ||
      target.closest('.search-cell') || 
      target.closest('.product-search-dropdown') ||
      target.closest('.editable-cell')
    ) {
      return;
    }
    
    // Only log and reset if we're actually changing from an active state
    if (activeSearchCell) {
      console.log("Clicked outside search cells, resetting active cell");
      setActiveSearchCell(null);
      setIsEditingCell(false);
    }
  };

  // Effect for document clicks (outside table)
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Don't reset focus if clicking on table elements that should maintain focus
      if (
        tableRef.current && 
        !tableRef.current.contains(target) && 
        !target.closest('.product-search-dropdown') &&
        !target.closest('.search-cell') &&
        !target.closest('input') &&
        !target.closest('select') &&
        !target.closest('.editable-cell')
      ) {
        setActiveSearchCell(null);
        setIsEditingCell(false);
      }
    };
    
    document.addEventListener('mousedown', handleDocumentClick);
    
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [tableRef, setActiveSearchCell, setIsEditingCell]);

  // Effect for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeSearchCell) return;
      
      const [field, indexStr] = activeSearchCell.split('-');
      const currentIndex = parseInt(indexStr, 10);
      const rowCount = items.length;
      
      if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        
        // Define the field navigation order
        const fieldOrder = ['code', 'name', 'manufacturer', 'size', 'quantity', 'price', 'discount', 'tax', 'notes'];
        
        let currentFieldIndex = fieldOrder.indexOf(field);
        let nextIndex = currentIndex;
        let nextField = fieldOrder[0];
        
        if (currentFieldIndex !== -1) {
          // Move to the next field
          currentFieldIndex = (currentFieldIndex + 1) % fieldOrder.length;
          nextField = fieldOrder[currentFieldIndex];
          
          // If we've wrapped around to the first field, move to the next row
          if (currentFieldIndex === 0 && currentIndex < rowCount - 1) {
            nextIndex = currentIndex + 1;
          }
        }
        
        // Only navigate if the target row exists
        if (nextIndex < rowCount) {
          const nextCellId = `${nextField}-${nextIndex}`;
          setActiveSearchCell(nextCellId);
          setIsEditingCell(true);
          console.log(`Navigating to cell: ${nextCellId}`);
        }
      } else if (e.key === 'Escape') {
        setActiveSearchCell(null);
        setIsEditingCell(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSearchCell, items.length, setActiveSearchCell, setIsEditingCell]);

  return {
    handleTableClick
  };
}
