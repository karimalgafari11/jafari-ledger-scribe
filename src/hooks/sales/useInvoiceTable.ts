
import { useState, useRef } from "react";
import { InvoiceItem } from "@/types/invoices";
import { Product } from "@/types/inventory";
import { toast } from "sonner";
import { useTableKeyboardNavigation } from "./useTableKeyboardNavigation";
import { useCellFocus } from "./useCellFocus";
import { ErrorTracker } from "@/utils/errorTracker";

/**
 * Hook for managing invoice table functionality
 * Provides cell selection, keyboard navigation, and editing capabilities
 */
export function useInvoiceTable({
  items,
  onUpdateItem,
  onRemoveItem,
  isAddingItem,
  editingItemIndex,
  setEditingItemIndex
}) {
  // Table state
  const [activeSearchCell, setActiveSearchCell] = useState(null);
  const [isEditingCellActive, setIsEditingCellActive] = useState(false);
  const [lastSelectedRowIndex, setLastSelectedRowIndex] = useState(null);
  
  // Visual preferences
  const [showGridLines, setShowGridLines] = useState(true);
  const [isDenseView, setIsDenseView] = useState(false);
  
  // References
  const tableRef = useRef(null);
  const searchInputRef = useRef(null);
  const cellRefs = useRef(new Map()).current;
  
  // Use cell focus hook
  const { 
    focusCell: focusCellBase, 
    registerCellRef 
  } = useCellFocus();
  
  // Simplified interface for focusing cells
  const focusCell = (rowIndex: number, cellName: string) => {
    focusCellBase(cellRefs, rowIndex, cellName, setActiveSearchCell, setLastSelectedRowIndex);
  };
  
  // Use keyboard navigation hook
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
    focusCell
  );
  
  /**
   * Handle click on a table cell
   * @param rowIndex Row index of the clicked cell
   * @param cellName Cell name that was clicked
   */
  const handleCellClick = (rowIndex: number, cellName: string) => {
    // Don't allow cell selection when adding or editing items in form mode
    if (isAddingItem || editingItemIndex !== null) return;
    
    // If clicking the already active cell, activate editing
    if (activeSearchCell && 
        activeSearchCell.rowIndex === rowIndex && 
        activeSearchCell.cellName === cellName) {
      setIsEditingCellActive(true);
      setIsEditingActive(true);
    } else {
      // Update the active cell
      setActiveSearchCell({ rowIndex, cellName });
      setLastSelectedRowIndex(rowIndex);
      setIsEditingCellActive(false);
      setIsEditingActive(false);
    }
    
    // Show hint for first-time users
    if (!localStorage.getItem('cellEditHintShown')) {
      toast.info('يمكنك الضغط على Enter للتحرير أو استخدام أسهم الكيبورد للتنقل');
      localStorage.setItem('cellEditHintShown', 'true');
    }
  };
  
  /**
   * Handle direct edit of a cell value
   * @param index Row index to update
   * @param field Field name to update
   * @param value New value
   */
  const handleDirectEdit = (index: number, field: string, value: any) => {
    try {
      const item = items[index];
      if (!item || !item.id) return;

      // Create partial item with updates
      const updatedItem: Partial<InvoiceItem> = { id: item.id };
      
      if (field === 'quantity' || field === 'price') {
        // Handle numeric fields
        const numValue = parseFloat(value);
        if (isNaN(numValue)) return;
        
        updatedItem[field] = numValue;
        
        // Calculate new total if quantity or price changed
        const basePrice = field === 'price' ? numValue : item.price;
        const quantity = field === 'quantity' ? numValue : item.quantity;
        const subtotal = basePrice * quantity;
        
        // Apply discount
        const discountAmount = item.discountType === 'percentage' 
          ? subtotal * (item.discount / 100) 
          : item.discount;
          
        // Apply tax
        const afterDiscount = subtotal - discountAmount;
        const taxAmount = afterDiscount * (item.tax / 100);
        
        updatedItem.total = Number((afterDiscount + taxAmount).toFixed(2));
      } else {
        // Handle other fields
        updatedItem[field] = value;
      }
      
      onUpdateItem(index, updatedItem);
    } catch (error) {
      ErrorTracker.error('Error in handleDirectEdit', {
        component: 'useInvoiceTable',
        additionalInfo: { index, field, value, error }
      });
    }
  };
  
  /**
   * Handle product selection
   * @param product Selected product
   * @param index Optional row index to update
   */
  const handleProductSelect = (product: Product, index?: number) => {
    try {
      if (typeof index === 'number') {
        const item = items[index];
        if (!item || !item.id) return;

        // Update item with product details
        onUpdateItem(index, {
          id: item.id,
          productId: product.id,
          code: product.code,
          name: product.name,
          price: product.price
        });
        
        toast.success(`تم تحديث بيانات "${product.name}"`);
      }
      
      // Clear active cell state
      setActiveSearchCell(null);
      setIsEditingCellActive(false);
    } catch (error) {
      ErrorTracker.error('Error in handleProductSelect', {
        component: 'useInvoiceTable',
        additionalInfo: { product, index, error }
      });
    }
  };
  
  /**
   * Handle clicks on the table container
   * @param e Click event
   */
  const handleTableClick = (e: React.MouseEvent) => {
    // Check if click was outside cells
    const isClickOnCell = (e.target as HTMLElement).closest('[data-cell-name]');
    if (!isClickOnCell && activeSearchCell && !isEditingCellActive) {
      setActiveSearchCell(null);
    }
  };
  
  // Toggle grid lines visibility
  const toggleGridLines = () => {
    setShowGridLines(prev => !prev);
  };
  
  // Toggle dense view mode
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
    registerCellRef
  };
}
