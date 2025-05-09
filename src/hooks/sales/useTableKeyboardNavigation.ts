
import { useState } from "react";
import { toast } from "sonner";

export function useTableKeyboardNavigation(items, setActiveSearchCell, setIsEditingCell, setLastSelectedRowIndex) {
  // تحسين معالجة أحداث لوحة المفاتيح
  const handleKeyNavigation = (e: React.KeyboardEvent<HTMLTableCellElement>, rowIndex: number, cellName: string) => {
    // منع السلوك الافتراضي لمفاتيح الأسهم والتاب دائمًا
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab", "Enter", "Escape"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }

    // إذا كان في وضع التحرير، تعامل فقط مع Enter و Escape
    if (isEditingCell(rowIndex, cellName)) {
      if (e.key === 'Escape') {
        setIsEditingCell(false);
        return;
      } 
      
      if (e.key === 'Enter') {
        setIsEditingCell(false);
        
        // التحرك للخلية التالية بعد الضغط على Enter
        const cellOrder = getVisibleCellOrder();
        const currentIndex = cellOrder.indexOf(cellName);
        
        if (currentIndex < cellOrder.length - 1) {
          const nextCellName = cellOrder[currentIndex + 1];
          setTimeout(() => focusCell(rowIndex, nextCellName), 100);
        } else if (rowIndex < items.length - 1) {
          // الانتقال إلى الصف التالي، الخلية الأولى
          setTimeout(() => focusCell(rowIndex + 1, cellOrder[0]), 100);
        }
        
        return;
      }
      
      // باقي المفاتيح يتم تجاهلها في وضع التحرير
      return;
    }
    
    // الحصول على ترتيب الخلايا المرئية للتنقل
    const cellOrder = getVisibleCellOrder();
    const currentIndex = cellOrder.indexOf(cellName);
    
    if (currentIndex === -1) return;
    
    // معالجة أحداث مفاتيح الأسهم مع مراعاة اتجاه الصفحة من اليمين إلى اليسار
    switch (e.key) {
      case 'ArrowRight':
        // نظرًا لأن الواجهة عربية (RTL)، الانتقال لليمين يعني الخلية السابقة في الترتيب
        if (currentIndex > 0) {
          const prevCell = cellOrder[currentIndex - 1];
          setTimeout(() => focusCell(rowIndex, prevCell), 100);
        } else {
          // إذا كنا في أول خلية وضغطنا على اليمين، ننتقل إلى الصف السابق آخر خلية
          if (rowIndex > 0) {
            setTimeout(() => focusCell(rowIndex - 1, cellOrder[cellOrder.length - 1]), 100);
          }
        }
        break;
      
      case 'ArrowLeft':
        // نظرًا لأن الواجهة عربية (RTL)، الانتقال لليسار يعني الخلية التالية في الترتيب
        if (currentIndex < cellOrder.length - 1) {
          const nextCell = cellOrder[currentIndex + 1];
          setTimeout(() => focusCell(rowIndex, nextCell), 100);
        } else {
          // إذا كنا في آخر خلية وضغطنا على اليسار، ننتقل إلى الصف التالي أول خلية
          if (rowIndex < items.length - 1) {
            setTimeout(() => focusCell(rowIndex + 1, cellOrder[0]), 100);
          }
        }
        break;
      
      case 'ArrowUp':
        if (rowIndex > 0) {
          setTimeout(() => focusCell(rowIndex - 1, cellName), 100);
        }
        break;
      
      case 'ArrowDown':
        if (rowIndex < items.length - 1) {
          setTimeout(() => focusCell(rowIndex + 1, cellName), 100);
        }
        break;
      
      case 'Enter':
        if (!isEditingCell(rowIndex, cellName)) {
          setActiveSearchCell({ rowIndex, cellName });
          setIsEditingCell(true);
        }
        break;
      
      case 'Escape':
        finishEditing();
        break;
      
      case 'Tab':
        navigateWithTab(rowIndex, cellName, e.shiftKey);
        break;
      
      default:
        // بدء التحرير مباشرة عند كتابة حرف أو رقم
        if (!isEditingCell(rowIndex, cellName) && /^[a-zA-Z0-9\u0600-\u06FF]$/.test(e.key)) {
          setActiveSearchCell({ rowIndex, cellName });
          setIsEditingCell(true);
        }
        break;
    }
  };
  
  // الحصول على ترتيب الخلايا المرئية للتنقل
  const getVisibleCellOrder = () => {
    // حسب الترتيب الطبيعي للجدول من اليمين إلى اليسار
    // ملاحظة: تأكد من أن هذا الترتيب متوافق مع ترتيب الخلايا الفعلي في الجدول
    return ['code', 'name', 'quantity', 'price', 'notes'];
  };
  
  // التنقل باستخدام مفتاح Tab
  const navigateWithTab = (rowIndex: number, cellName: string, isShiftKey: boolean) => {
    const cellOrder = getVisibleCellOrder();
    const currentIndex = cellOrder.indexOf(cellName);
    
    if (isShiftKey) {
      // التنقل للخلف
      if (currentIndex > 0) {
        // الانتقال إلى الخلية السابقة في نفس الصف
        focusCell(rowIndex, cellOrder[currentIndex - 1]);
      } else if (rowIndex > 0) {
        // الانتقال إلى الخلية الأخيرة من الصف السابق
        focusCell(rowIndex - 1, cellOrder[cellOrder.length - 1]);
      }
    } else {
      // التنقل للأمام
      if (currentIndex < cellOrder.length - 1) {
        // الانتقال إلى الخلية التالية في نفس الصف
        focusCell(rowIndex, cellOrder[currentIndex + 1]);
      } else if (rowIndex < items.length - 1) {
        // الانتقال إلى الخلية الأولى من الصف التالي
        focusCell(rowIndex + 1, cellOrder[0]);
      }
    }
  };
  
  // إنهاء التحرير
  const finishEditing = () => {
    setActiveSearchCell(null);
    setIsEditingCell(false);
    setLastSelectedRowIndex(null);
  };

  return {
    handleKeyNavigation,
    finishEditing,
    getVisibleCellOrder,
  };
}
