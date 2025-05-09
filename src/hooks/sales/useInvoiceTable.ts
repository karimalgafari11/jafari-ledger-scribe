
import { useState, useRef } from "react";
import { InvoiceItem } from "@/types/invoices";
import { Product } from "@/types/inventory";

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
    
    setActiveSearchCell({ rowIndex, cellName });
    setLastSelectedRowIndex(rowIndex);
    setIsEditingCell(true);
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
      
      // إذا تم تغيير الكمية أو السعر، أعد حساب المجموع (حسب المنطق الحالي)
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
    }
    
    setActiveSearchCell(null);
    setIsEditingCell(false);
  };
  
  const handleTableClick = () => {
    // إلغاء تحديد الخلايا عند النقر خارج الجدول
    if (activeSearchCell) {
      setActiveSearchCell(null);
      setIsEditingCell(false);
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
    // تعريف ترتيب الخلايا للتنقل
    const cellOrder = ['code', 'name', 'quantity', 'price', 'total', 'discount', 'notes'];
    
    // الحصول على الفهرس الحالي للخلية
    const currentIndex = cellOrder.indexOf(cellName);
    
    // معالجة مفاتيح الأسهم
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (currentIndex > 0) {
        focusCell(rowIndex, cellOrder[currentIndex - 1]);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentIndex < cellOrder.length - 1) {
        focusCell(rowIndex, cellOrder[currentIndex + 1]);
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
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleCellClick(rowIndex, cellName);
    }
  };
  
  // التركيز على خلية معينة
  const focusCell = (rowIndex: number, cellName: string) => {
    const cellId = `${rowIndex}-${cellName}`;
    const cell = cellRefs.get(cellId);
    if (cell) {
      cell.focus();
    }
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
    toggleGridLines,
    toggleDenseView,
    finishEditing,
    handleKeyNavigation,
    focusCell,
  };
}
