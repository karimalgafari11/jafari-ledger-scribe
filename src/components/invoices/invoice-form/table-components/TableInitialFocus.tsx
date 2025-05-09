
import { useEffect } from "react";
import { InvoiceItem } from "@/types/invoices";

interface TableInitialFocusProps {
  items: InvoiceItem[];
  isAddingItem: boolean;
  editingItemIndex: number | null;
  activeSearchCell: { rowIndex: number; cellName: string } | null;
  showItemCodes: boolean;
  focusCell: (rowIndex: number, cellName: string) => void;
  firstRender: boolean;
  setFirstRender: (value: boolean) => void;
}

export const useTableInitialFocus = ({
  items,
  isAddingItem,
  editingItemIndex,
  activeSearchCell,
  showItemCodes,
  focusCell,
  firstRender,
  setFirstRender
}: TableInitialFocusProps) => {
  // عند تحميل الجدول، ركز على أول خلية للعنصر الأول إذا وجد
  useEffect(() => {
    // التركيز على الخلية الأولى بعد تحميل الجدول إذا كانت هناك عناصر
    if (firstRender && items.length > 0 && !isAddingItem && editingItemIndex === null && !activeSearchCell) {
      // استخدم مؤقتًا أطول للتأكد من أن الجدول قد تم رسمه بالكامل
      const timer = setTimeout(() => {
        // استخدم ترتيب الخلايا للحصول على الخلية الأولى المرئية
        const firstVisibleField = showItemCodes ? 'code' : 'name';
        focusCell(0, firstVisibleField);
        setFirstRender(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [items.length, firstRender, isAddingItem, editingItemIndex, activeSearchCell, showItemCodes, focusCell, setFirstRender]);

  // تحديث تركيز الجدول عند إضافة عناصر جديدة
  useEffect(() => {
    if (items.length > 0 && !activeSearchCell && !isAddingItem && editingItemIndex === null) {
      // التركيز على آخر عنصر تم إضافته
      const timer = setTimeout(() => {
        const lastItemIndex = items.length - 1;
        const firstVisibleField = showItemCodes ? 'code' : 'name';
        focusCell(lastItemIndex, firstVisibleField);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [items.length, isAddingItem, activeSearchCell, editingItemIndex, showItemCodes, focusCell]);
};
