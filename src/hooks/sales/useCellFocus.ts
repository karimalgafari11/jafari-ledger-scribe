
import { useRef } from "react";

export function useCellFocus() {
  // تحسين التركيز على خلية معينة
  const focusCell = (cellRefs: Map<string, HTMLTableCellElement>, rowIndex: number, cellName: string, setActiveSearchCell, setLastSelectedRowIndex) => {
    if (rowIndex < 0) return;
    
    const cellId = `${rowIndex}-${cellName}`;
    const cell = cellRefs.get(cellId);
    
    if (cell) {
      try {
        // تأخير التركيز قليلاً للسماح بإعادة الرسم
        requestAnimationFrame(() => {
          cell.focus();
          cell.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          setActiveSearchCell({ rowIndex, cellName });
          setLastSelectedRowIndex(rowIndex);
        });
      } catch (err) {
        console.error("فشل التركيز على الخلية:", err);
      }
    } else {
      console.warn(`لم يتم العثور على خلية ${cellId}`);
    }
  };
  
  return { focusCell };
}
