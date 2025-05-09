
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
    // منع تمرير الحدث إذا كانت الخلية في وضع التحرير
    if (isEditingCell && activeSearchCell?.rowIndex === rowIndex && activeSearchCell?.cellName === cellName) {
      // السماح بإيفنتس معينة فقط في وضع التحرير (Enter و Escape)
      if (e.key === 'Enter' || e.key === 'Escape') {
        if (e.key === 'Escape') {
          setIsEditingCell(false);
        } else if (e.key === 'Enter') {
          setIsEditingCell(false);
          // التحرك للخلية التالية بعد الضغط على Enter
          const cellOrder = ['code', 'name', 'quantity', 'price', 'notes'];
          const currentIndex = cellOrder.indexOf(cellName);
          if (currentIndex < cellOrder.length - 1) {
            const nextCellName = cellOrder[currentIndex + 1];
            focusCell(rowIndex, nextCellName);
          } else if (rowIndex < items.length - 1) {
            // الانتقال إلى الصف التالي، الخلية الأولى
            focusCell(rowIndex + 1, cellOrder[0]);
          }
        }
        e.preventDefault();
      }
      return;
    }
    
    // تعريف ترتيب الخلايا للتنقل
    const cellOrder = ['code', 'name', 'quantity', 'price', 'notes'];
    
    // الحصول على الفهرس الحالي للخلية
    const currentIndex = cellOrder.indexOf(cellName);
    
    if (currentIndex === -1) return;
    
    // معالجة مفاتيح الأسهم
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (currentIndex > 0) {
        const prevCell = cellOrder[currentIndex - 1];
        if (prevCell !== 'total') { // لا يمكن تحرير الإجمالي
          focusCell(rowIndex, prevCell);
        }
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentIndex < cellOrder.length - 1) {
        const nextCell = cellOrder[currentIndex + 1];
        if (nextCell !== 'total') { // لا يمكن تحرير الإجمالي
          focusCell(rowIndex, nextCell);
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (rowIndex > 0) {
        focusCell(rowIndex - 1, cellName);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (rowIndex < items.length - 1) {
        focusCell(rowIndex + 1, cellName);
      }
    } else if (e.key === 'Enter' && !isEditingCell) {
      e.preventDefault();
      setActiveSearchCell({ rowIndex, cellName });
      setIsEditingCell(true);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      finishEditing();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      navigateWithTab(rowIndex, cellName, e.shiftKey);
    } else if (!isEditingCell && /^[a-zA-Z0-9]$/.test(e.key)) {
      // بدء التحرير مباشرة عند كتابة حرف أو رقم
      setActiveSearchCell({ rowIndex, cellName });
      setIsEditingCell(true);
    }
  };
  
  // التنقل باستخدام مفتاح Tab
  const navigateWithTab = (rowIndex: number, cellName: string, isShiftKey: boolean) => {
    const cellOrder = ['code', 'name', 'quantity', 'price', 'notes'];
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
  
  // التركيز على خلية معينة
  const focusCell = (rowIndex: number, cellName: string) => {
    const cellId = `${rowIndex}-${cellName}`;
    const cell = cellRefs.get(cellId);
    
    if (cell) {
      cell.focus();
      setActiveSearchCell({ rowIndex, cellName });
      setLastSelectedRowIndex(rowIndex);
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
