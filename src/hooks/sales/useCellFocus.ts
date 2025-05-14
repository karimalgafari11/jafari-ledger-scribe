
import { useState, useCallback } from "react";

export function useCellFocus() {
  // يخزن معرف توقيت التأخير
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // دالة للتركيز على خلية محددة
  const focusCell = useCallback((cellRefs, rowIndex: number, cellName: string, setActiveSearchCell, setLastSelectedRowIndex) => {
    // إلغاء أي توقيت سابق
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // إنشاء مفتاح الخلية
    const cellKey = `${rowIndex}-${cellName}`;
    
    // الحصول على عنصر الخلية من المرجع
    const cellElement = cellRefs.get(cellKey);
    
    if (cellElement) {
      // تحديث الخلية النشطة
      setActiveSearchCell({ rowIndex, cellName });
      setLastSelectedRowIndex(rowIndex);
      
      // التأخير للسماح بتحديث الحالة أولاً
      const id = setTimeout(() => {
        try {
          // محاولة التركيز على عنصر الإدخال داخل الخلية
          const inputElement = cellElement.querySelector('input');
          if (inputElement) {
            inputElement.focus();
            // تحديد كل محتوى الإدخال للتحرير السريع
            inputElement.select();
          } else {
            // التركيز على الخلية نفسها
            cellElement.focus();
          }
        } catch (error) {
          console.error("Failed to focus cell:", error);
        }
      }, 50);
      
      setTimeoutId(id);
    } else {
      console.warn(`Cell with key ${cellKey} not found in refs`);
    }
  }, [timeoutId]);

  return { focusCell };
}
