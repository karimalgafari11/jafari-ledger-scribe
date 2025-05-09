
import { useState, useRef } from "react";
import { InvoiceItem } from "@/types/invoices";
import { Product } from "@/types/inventory";
import { toast } from "sonner";

export function useInvoiceTable({
  items,
  onUpdateItem,
  onRemoveItem,
  isAddingItem,
  editingItemIndex,
  setEditingItemIndex
}) {
  // حالة البحث النشط والتحرير
  const [activeSearchCell, setActiveSearchCell] = useState(null);
  const [isEditingCell, setIsEditingCell] = useState(false);
  const [lastSelectedRowIndex, setLastSelectedRowIndex] = useState(null);
  
  // التفضيلات المرئية
  const [showGridLines, setShowGridLines] = useState(true);
  const [isDenseView, setIsDenseView] = useState(false);
  
  // المراجع للعناصر
  const tableRef = useRef(null);
  const searchInputRef = useRef(null);
  const cellRefs = useRef(new Map()).current;
  
  const handleCellClick = (rowIndex: number, cellName: string) => {
    if (isAddingItem || editingItemIndex !== null) return;
    
    // إذا كانت الخلية التي تم النقر عليها هي نفس الخلية النشطة، فقم بتفعيل التحرير
    if (activeSearchCell && 
        activeSearchCell.rowIndex === rowIndex && 
        activeSearchCell.cellName === cellName) {
      setIsEditingCell(true);
    } else {
      // تحديث الخلية النشطة
      setActiveSearchCell({ rowIndex, cellName });
      setLastSelectedRowIndex(rowIndex);
      setIsEditingCell(true);
    }
    
    // إظهار رسالة للمستخدم بالنقر المزدوج للتحرير (فقط في المرة الأولى)
    if (!localStorage.getItem('cellEditHintShown')) {
      toast.info('يمكنك الضغط على Enter للتحرير أو استخدام أسهم الكيبورد للتنقل');
      localStorage.setItem('cellEditHintShown', 'true');
    }
  };
  
  const handleDirectEdit = (index: number, field: string, value: any) => {
    const item = items[index];
    if (!item || !item.id) return;

    // إنشاء نسخة من العنصر مع التحديثات
    const updatedItem: Partial<InvoiceItem> = { id: item.id };
    
    if (field === 'quantity' || field === 'price') {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return;
      
      updatedItem[field] = numValue;
      
      // إذا تم تغيير الكمية أو السعر، أعد حساب المجموع
      const basePrice = field === 'price' ? numValue : item.price;
      const quantity = field === 'quantity' ? numValue : item.quantity;
      const subtotal = basePrice * quantity;
      
      // حساب الخصم
      const discountAmount = item.discountType === 'percentage' 
        ? subtotal * (item.discount / 100) 
        : item.discount;
        
      // حساب الضريبة
      const afterDiscount = subtotal - discountAmount;
      const taxAmount = afterDiscount * (item.tax / 100);
      
      updatedItem.total = Number((afterDiscount + taxAmount).toFixed(2));
    } else {
      updatedItem[field] = value;
    }
    
    onUpdateItem(index, updatedItem);
  };
  
  const handleProductSelect = (product: Product, index?: number) => {
    if (typeof index === 'number') {
      const item = items[index];
      if (!item || !item.id) return;

      // تحديث العنصر بمعلومات المنتج
      onUpdateItem(index, {
        id: item.id,
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price
      });
      
      toast.success(`تم تحديث بيانات "${product.name}"`);
    }
    
    setActiveSearchCell(null);
    setIsEditingCell(false);
  };
  
  const handleTableClick = (e: React.MouseEvent) => {
    // التحقق من النقر خارج الخلايا
    const isClickOnCell = (e.target as HTMLElement).closest('[data-cell-name]');
    if (!isClickOnCell && activeSearchCell && !isEditingCell) {
      setActiveSearchCell(null);
    }
  };
  
  const toggleGridLines = () => {
    setShowGridLines(prev => !prev);
  };
  
  const toggleDenseView = () => {
    setIsDenseView(prev => !prev);
  };
  
  const finishEditing = () => {
    setActiveSearchCell(null);
    setIsEditingCell(false);
    setLastSelectedRowIndex(null);
  };

  const handleKeyNavigation = (e: React.KeyboardEvent<HTMLTableCellElement>, rowIndex: number, cellName: string) => {
    // منع السلوك الافتراضي لمفاتيح الأسهم دائمًا
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab", "Enter", "Escape"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }

    // إذا كان في وضع التحرير، تعامل فقط مع Enter و Escape
    if (isEditingCell && activeSearchCell?.rowIndex === rowIndex && activeSearchCell?.cellName === cellName) {
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
          setTimeout(() => focusCell(rowIndex, nextCellName), 50);
        } else if (rowIndex < items.length - 1) {
          // الانتقال إلى الصف التالي، الخلية الأولى
          setTimeout(() => focusCell(rowIndex + 1, cellOrder[0]), 50);
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
    
    // معالجة أحداث مفاتيح الأسهم بشكل صحيح مع مراعاة اتجاه الصفحة من اليمين إلى اليسار
    switch (e.key) {
      case 'ArrowRight':
        // نظرًا لأن الواجهة عربية (RTL)، الانتقال لليمين يعني الخلية السابقة في الترتيب
        if (currentIndex > 0) {
          const prevCell = cellOrder[currentIndex - 1];
          setTimeout(() => focusCell(rowIndex, prevCell), 50);
        }
        break;
      
      case 'ArrowLeft':
        // نظرًا لأن الواجهة عربية (RTL)، الانتقال لليسار يعني الخلية التالية في الترتيب
        if (currentIndex < cellOrder.length - 1) {
          const nextCell = cellOrder[currentIndex + 1];
          setTimeout(() => focusCell(rowIndex, nextCell), 50);
        }
        break;
      
      case 'ArrowUp':
        if (rowIndex > 0) {
          setTimeout(() => focusCell(rowIndex - 1, cellName), 50);
        }
        break;
      
      case 'ArrowDown':
        if (rowIndex < items.length - 1) {
          setTimeout(() => focusCell(rowIndex + 1, cellName), 50);
        }
        break;
      
      case 'Enter':
        if (!isEditingCell) {
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
        if (!isEditingCell && /^[a-zA-Z0-9\u0600-\u06FF]$/.test(e.key)) {
          setActiveSearchCell({ rowIndex, cellName });
          setIsEditingCell(true);
        }
        break;
    }
  };
  
  // الحصول على ترتيب الخلايا المرئية للتنقل
  const getVisibleCellOrder = () => {
    // حسب الترتيب الطبيعي للجدول من اليمين إلى اليسار
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
  
  // التركيز على خلية معينة مع تحسين الأداء
  const focusCell = (rowIndex: number, cellName: string) => {
    if (rowIndex < 0 || rowIndex >= items.length) return;
    
    const cellId = `${rowIndex}-${cellName}`;
    const cell = cellRefs.get(cellId);
    
    if (cell) {
      // استخدم تأخيرًا صغيرًا للسماح بإعادة الرسم قبل التركيز
      setTimeout(() => {
        try {
          cell.focus();
          cell.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          setActiveSearchCell({ rowIndex, cellName });
          setLastSelectedRowIndex(rowIndex);
          setIsEditingCell(false);
        } catch (err) {
          console.error("فشل التركيز على الخلية:", err);
        }
      }, 20);
    } else {
      console.log(`لم يتم العثور على خلية ${cellId}`, cellRefs);
    }
  };
  
  // دالة مساعدة للتحقق مما إذا كانت الخلية في وضع التحرير
  const isCellEditing = (rowIndex: number, cellName: string) => {
    return isEditingCell && 
           activeSearchCell?.rowIndex === rowIndex && 
           activeSearchCell?.cellName === cellName;
  };
  
  return {
    activeSearchCell,
    showGridLines,
    isDenseView,
    searchInputRef,
    tableRef,
    cellRefs,
    lastSelectedRowIndex,
    isEditingCell: isCellEditing,
    handleCellClick,
    handleProductSelect,
    handleDirectEdit,
    handleTableClick,
    toggleGridLines,
    toggleDenseView,
    finishEditing,
    handleKeyNavigation,
    focusCell,
  };
}
