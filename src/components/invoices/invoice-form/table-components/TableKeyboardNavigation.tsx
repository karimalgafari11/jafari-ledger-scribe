
import React, { useEffect, KeyboardEvent } from "react";

interface TableKeyboardNavigationProps {
  tableHasFocus: boolean;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  activeSearchCell: { rowIndex: number; cellName: string } | null;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleAddItemClick: () => void;
}

export const TableKeyboardNavigation: React.FC<TableKeyboardNavigationProps> = ({
  tableHasFocus,
  isAddingItem,
  editingItemIndex,
  activeSearchCell,
  handleCellClick,
  handleAddItemClick
}) => {
  // إضافة مستمع لأحداث لوحة المفاتيح للجدول بأكمله
  useEffect(() => {
    const handleTableKeyDown = (e: KeyboardEvent) => {
      if (!tableHasFocus) return;
      
      // اختصارات إضافة عنصر جديد
      if (e.key === 'Insert' || (e.ctrlKey && e.key === 'n')) {
        e.preventDefault();
        if (!isAddingItem && editingItemIndex === null) {
          handleAddItemClick();
        }
      }
      
      // اختصارات أخرى عامة للجدول
      if (e.key === 'F2' && activeSearchCell) {
        // بدء تحرير الخلية المحددة حاليًا
        e.preventDefault();
        const { rowIndex, cellName } = activeSearchCell;
        handleCellClick(rowIndex, cellName);
      }
    };
    
    // تسجيل مستمع الأحداث
    document.addEventListener('keydown', handleTableKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleTableKeyDown);
    };
  }, [tableHasFocus, isAddingItem, editingItemIndex, activeSearchCell, handleCellClick, handleAddItemClick]);

  return null;
};
