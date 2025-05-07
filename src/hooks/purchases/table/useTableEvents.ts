
import { useRef, useEffect } from 'react';
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
  const clickOutsideRef = useRef<boolean>(false);
  
  // Handle click outside active cell
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (clickOutsideRef.current) {
        clickOutsideRef.current = false;
        return;
      }
      
      if (activeSearchCell && tableRef.current && !tableRef.current.contains(e.target as Node)) {
        console.log("Click outside table - finishing editing");
        setActiveSearchCell(null);
        setIsEditingCell(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeSearchCell, setActiveSearchCell, setIsEditingCell, tableRef]);
  
  // Function to detect clicks inside the table but outside the active cell
  const handleTableClick = (e: React.MouseEvent) => {
    if (!activeSearchCell) return;
    
    // Check if click is on a table cell
    const target = e.target as HTMLElement;
    const isCellElement = target.tagName === 'TD' || 
                          target.closest('td') || 
                          target.tagName === 'TR' || 
                          target.closest('tr');
    
    if (isCellElement) {
      // Let the cell click handler deal with this
      return;
    }
    
    // Click inside table but not on a cell - finish editing
    console.log("Click inside table but not on cell - finishing editing");
    setActiveSearchCell(null);
    setIsEditingCell(false);
  };
  
  return {
    handleTableClick
  };
}
