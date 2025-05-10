
import { useState } from "react";
import { toast } from "sonner";

export function useTableKeyboardNavigation(items, setActiveSearchCell, setIsEditingCell, setLastSelectedRowIndex, focusCellFn) {
  // Flag to track active editing cell
  const [isEditingActive, setIsEditingActive] = useState(false);

  // تحسين معالجة أحداث لوحة المفاتيح
  const handleKeyNavigation = (e: React.KeyboardEvent<HTMLTableCellElement>, rowIndex: number, cellName: string) => {
    // منع السلوك الافتراضي لمفاتيح الأسهم والتاب دائمًا في حالة عدم التحرير
    if (!isEditingCell(rowIndex, cellName) && 
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab", "Enter", "Escape"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }

    // الحصول على ترتيب الخلايا المرئية للتنقل
    const cellOrder = getVisibleCellOrder();
    const currentIndex = cellOrder.indexOf(cellName);
    
    if (currentIndex === -1) return;

    // إذا كان في وضع التحرير، تعامل مع أحداث خاصة فقط
    if (isEditingCell(rowIndex, cellName)) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsEditingCell(false);
        setIsEditingActive(false);
        return;
      } 
      
      if (e.key === 'Enter') {
        e.preventDefault();
        setIsEditingCell(false);
        setIsEditingActive(false);
        
        // التحرك للخلية التالية بعد الضغط على Enter
        if (currentIndex < cellOrder.length - 1) {
          const nextCellName = cellOrder[currentIndex + 1];
          setTimeout(() => focusCellFn(rowIndex, nextCellName), 100);
        } else if (rowIndex < items.length - 1) {
          // الانتقال إلى الصف التالي، الخلية الأولى
          setTimeout(() => focusCellFn(rowIndex + 1, cellOrder[0]), 100);
        }
        
        return;
      }
      
      // معالجة أحداث مفاتيح الأسهم حتى في وضع التحرير
      switch (e.key) {
        case 'ArrowUp':
          if (rowIndex > 0) {
            e.preventDefault();
            setIsEditingCell(false);
            setIsEditingActive(false);
            setTimeout(() => focusCellFn(rowIndex - 1, cellName), 100);
          }
          break;
        
        case 'ArrowDown':
          if (rowIndex < items.length - 1) {
            e.preventDefault();
            setIsEditingCell(false);
            setIsEditingActive(false);
            setTimeout(() => focusCellFn(rowIndex + 1, cellName), 100);
          }
          break;
        
        case 'ArrowRight':
          // نظرًا لأن الواجهة عربية (RTL)، الانتقال لليمين يعني الخلية السابقة في الترتيب
          if (currentIndex > 0) {
            e.preventDefault();
            setIsEditingCell(false);
            setIsEditingActive(false);
            const prevCell = cellOrder[currentIndex - 1];
            setTimeout(() => focusCellFn(rowIndex, prevCell), 100);
          }
          break;
        
        case 'ArrowLeft':
          // نظرًا لأن الواجهة عربية (RTL)، الانتقال لليسار يعني الخلية التالية في الترتيب
          if (currentIndex < cellOrder.length - 1) {
            e.preventDefault();
            setIsEditingCell(false);
            setIsEditingActive(false);
            const nextCell = cellOrder[currentIndex + 1];
            setTimeout(() => focusCellFn(rowIndex, nextCell), 100);
          }
          break;
          
        case 'Tab':
          // نسمح بسلوك Tab الافتراضي
          return;
      }
      
      // باقي المفاتيح يتم تجاهلها في وضع التحرير
      return;
    }
    
    // معالجة أحداث مفاتيح الأسهم مع مراعاة اتجاه الصفحة من اليمين إلى اليسار
    switch (e.key) {
      case 'ArrowRight':
        // نظرًا لأن الواجهة عربية (RTL)، الانتقال لليمين يعني الخلية السابقة في الترتيب
        if (currentIndex > 0) {
          const prevCell = cellOrder[currentIndex - 1];
          setTimeout(() => focusCellFn(rowIndex, prevCell), 100);
        } else {
          // إذا كنا في أول خلية وضغطنا على اليمين، ننتقل إلى الصف السابق آخر خلية
          if (rowIndex > 0) {
            setTimeout(() => focusCellFn(rowIndex - 1, cellOrder[cellOrder.length - 1]), 100);
          }
        }
        break;
      
      case 'ArrowLeft':
        // نظرًا لأن الواجهة عربية (RTL)، الانتقال لليسار يعني الخلية التالية في الترتيب
        if (currentIndex < cellOrder.length - 1) {
          const nextCell = cellOrder[currentIndex + 1];
          setTimeout(() => focusCellFn(rowIndex, nextCell), 100);
        } else {
          // إذا كنا في آخر خلية وضغطنا على اليسار، ننتقل إلى الصف التالي أول خلية
          if (rowIndex < items.length - 1) {
            setTimeout(() => focusCellFn(rowIndex + 1, cellOrder[0]), 100);
          }
        }
        break;
      
      case 'ArrowUp':
        if (rowIndex > 0) {
          setTimeout(() => focusCellFn(rowIndex - 1, cellName), 100);
        }
        break;
      
      case 'ArrowDown':
        if (rowIndex < items.length - 1) {
          setTimeout(() => focusCellFn(rowIndex + 1, cellName), 100);
        }
        break;
      
      case 'Enter':
        if (!isEditingCell(rowIndex, cellName)) {
          setActiveSearchCell({ rowIndex, cellName });
          setIsEditingCell(true);
          setIsEditingActive(true);
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
          setIsEditingActive(true);
        }
        break;
    }
  };
  
  // Helper function to check if a cell is being edited
  const isEditingCell = (rowIndex: number, cellName: string) => {
    // We need to use the callback pattern to get the current activeSearchCell value
    return isEditingActive && typeof setActiveSearchCell === 'function';
  };
  
  // Function to handle focusing on a cell
  const focusCell = (rowIndex: number, cellName: string) => {
    if (focusCellFn && typeof focusCellFn === 'function') {
      focusCellFn(rowIndex, cellName);
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
        focusCellFn(rowIndex, cellOrder[currentIndex - 1]);
      } else if (rowIndex > 0) {
        // الانتقال إلى الخلية الأخيرة من الصف السابق
        focusCellFn(rowIndex - 1, cellOrder[cellOrder.length - 1]);
      }
    } else {
      // التنقل للأمام
      if (currentIndex < cellOrder.length - 1) {
        // الانتقال إلى الخلية التالية في نفس الصف
        focusCellFn(rowIndex, cellOrder[currentIndex + 1]);
      } else if (rowIndex < items.length - 1) {
        // الانتقال إلى الخلية الأولى من الصف التالي
        focusCellFn(rowIndex + 1, cellOrder[0]);
      }
    }
  };
  
  // إنهاء التحرير
  const finishEditing = () => {
    setActiveSearchCell(null);
    setIsEditingCell(false);
    setIsEditingActive(false);
    setLastSelectedRowIndex(null);
  };

  return {
    handleKeyNavigation,
    finishEditing,
    getVisibleCellOrder,
    isEditingCell,
    setIsEditingActive
  };
}
