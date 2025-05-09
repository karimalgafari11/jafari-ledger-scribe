
import { useState, useRef } from "react";
import { InvoiceItem } from "@/types/invoices";
import { Product } from "@/types/inventory";
import { toast } from "sonner";
import { useTableKeyboardNavigation } from "./useTableKeyboardNavigation";
import { useCellFocus } from "./useCellFocus";

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
  const [isEditingCellActive, setIsEditingCellActive] = useState(false);
  const [lastSelectedRowIndex, setLastSelectedRowIndex] = useState(null);
  
  // التفضيلات المرئية
  const [showGridLines, setShowGridLines] = useState(true);
  const [isDenseView, setIsDenseView] = useState(false);
  
  // المراجع للعناصر
  const tableRef = useRef(null);
  const searchInputRef = useRef(null);
  const cellRefs = useRef(new Map()).current;
  
  // استدعاء هوك التركيز على الخلايا
  const { focusCell: focusCellBase } = useCellFocus();
  
  // واجهة لدالة focusCell لتبسيط الاستدعاء
  const focusCell = (rowIndex: number, cellName: string) => {
    focusCellBase(cellRefs, rowIndex, cellName, setActiveSearchCell, setLastSelectedRowIndex);
  };
  
  // استدعاء هوك التنقل بالكيبورد وتمرير دالة focusCell له
  const { 
    handleKeyNavigation, 
    finishEditing, 
    isEditingCell,
    setIsEditingActive
  } = useTableKeyboardNavigation(
    items, 
    setActiveSearchCell, 
    setIsEditingCellActive, 
    setLastSelectedRowIndex,
    focusCell // تمرير دالة focusCell
  );
  
  const handleCellClick = (rowIndex: number, cellName: string) => {
    if (isAddingItem || editingItemIndex !== null) return;
    
    // إذا كانت الخلية التي تم النقر عليها هي نفس الخلية النشطة، فقم بتفعيل التحرير
    if (activeSearchCell && 
        activeSearchCell.rowIndex === rowIndex && 
        activeSearchCell.cellName === cellName) {
      setIsEditingCellActive(true);
      setIsEditingActive(true); // تحديث الحالة في هوك التنقل أيضًا
    } else {
      // تحديث الخلية النشطة
      setActiveSearchCell({ rowIndex, cellName });
      setLastSelectedRowIndex(rowIndex);
      setIsEditingCellActive(true);
      setIsEditingActive(true); // تحديث الحالة في هوك التنقل أيضًا
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
    setIsEditingCellActive(false);
  };
  
  const handleTableClick = (e: React.MouseEvent) => {
    // التحقق من النقر خارج الخلايا
    const isClickOnCell = (e.target as HTMLElement).closest('[data-cell-name]');
    if (!isClickOnCell && activeSearchCell && !isEditingCellActive) {
      setActiveSearchCell(null);
    }
  };
  
  const toggleGridLines = () => {
    setShowGridLines(prev => !prev);
  };
  
  const toggleDenseView = () => {
    setIsDenseView(prev => !prev);
  };
  
  return {
    activeSearchCell,
    showGridLines,
    isDenseView,
    searchInputRef,
    tableRef,
    cellRefs,
    lastSelectedRowIndex,
    isEditingCell,
    handleCellClick,
    handleProductSelect,
    handleDirectEdit,
    handleTableClick,
    handleKeyNavigation,
    toggleGridLines,
    toggleDenseView,
    finishEditing,
    focusCell,
  };
}
