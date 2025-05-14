
import { useCallback } from "react";

export function useCellFocus() {
  // وظيفة لتركيز خلية محددة
  const focusCell = useCallback((
    cellRefs: Map<string, HTMLTableCellElement>,
    rowIndex: number,
    cellName: string,
    setActiveSearchCell: (cell: { rowIndex: number; cellName: string } | null) => void,
    setLastSelectedRowIndex: (index: number | null) => void
  ) => {
    // تحديث الخلية النشطة
    setActiveSearchCell({ rowIndex, cellName });
    setLastSelectedRowIndex(rowIndex);
    
    // الحصول على معرف الخلية
    const cellId = `${rowIndex}-${cellName}`;
    
    // تركيز الخلية الجديدة
    const cell = cellRefs.get(cellId);
    if (cell) {
      cell.focus();
      
      // محاولة تحديد محتوى الخلية إذا كانت تحتوي على عنصر نصي قابل للتحرير
      const input = cell.querySelector('input');
      if (input) {
        input.focus();
        input.select();
      }
    }
  }, []);
  
  return { focusCell };
}
