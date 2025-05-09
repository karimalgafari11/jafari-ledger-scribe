
import { RefObject } from 'react';
import { PurchaseItem } from "@/types/purchases";

interface UseTableEventsProps {
  activeSearchCell: { rowIndex: number; cellName: string } | null;
  tableRef: RefObject<HTMLDivElement>;
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
  
  const handleTableClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // تجاهل الإغلاق إذا تم النقر داخل خلية البحث النشطة
    if (activeSearchCell && tableRef.current) {
      const target = e.target as HTMLElement;
      const searchCellElements = tableRef.current.querySelectorAll(`[data-cell-name="${activeSearchCell.cellName}"][data-row-index="${activeSearchCell.rowIndex}"]`);
      
      for (let i = 0; i < searchCellElements.length; i++) {
        if (searchCellElements[i].contains(target)) {
          return; // النقر داخل خلية البحث النشطة، لا تفعل شيئًا
        }
      }
      
      // النقر خارج خلية البحث النشطة، أغلق البحث
      setActiveSearchCell(null);
      setIsEditingCell(false);
    }
  };
  
  return {
    handleTableClick
  };
}
