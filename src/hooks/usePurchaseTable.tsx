
import { useState, useRef, useEffect } from "react";
import { PurchaseItem } from "@/types/purchases";
import { toast } from "sonner";

export interface UsePurchaseTableProps {
  items: PurchaseItem[];
  onAddItem: (item: Partial<PurchaseItem>) => void;
  onUpdateItem: (index: number, item: Partial<PurchaseItem>) => void;
  onRemoveItem: (index: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
}

export function usePurchaseTable({
  items,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  isAddingItem,
  editingItemIndex
}: UsePurchaseTableProps) {
  const [activeSearchCell, setActiveSearchCell] = useState<string | null>(null);
  const [showGridLines, setShowGridLines] = useState<'both' | 'horizontal' | 'vertical' | 'none'>('both');
  const [isDenseView, setIsDenseView] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [lastSelectedRowIndex, setLastSelectedRowIndex] = useState<number | null>(null);
  
  // Handle product search activation in table
  const handleCellClick = (index: number, field: string) => {
    if (isAddingItem || editingItemIndex !== null) return;
    
    // Generate a unique ID for the cell using consistent format
    const cellId = `${field}-${index}`;
    console.log(`Activating search cell: ${cellId}`);
    setActiveSearchCell(cellId);
    setLastSelectedRowIndex(index);
    
    // Focus the search input after rendering
    setTimeout(() => {
      if (searchInputRef.current) {
        console.log("Focusing search input");
        searchInputRef.current.focus();
      }
    }, 100);
  };
  
  // Handle product selection from search
  const handleProductSelect = (product: any, index?: number) => {
    console.log("Product selected:", product, "for index:", index);
    
    if (index !== undefined && index >= 0) {
      // Update existing item
      const updatedItem = {
        ...items[index],
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        total: items[index].quantity * product.price
      };
      onUpdateItem(index, updatedItem);
      toast.success(`تم تحديث المنتج إلى ${product.name}`);
      
      // Move to quantity field after selection
      setTimeout(() => {
        const quantityCellId = `quantity-${index}`;
        setActiveSearchCell(quantityCellId);
        console.log(`Moving to quantity cell: ${quantityCellId}`);
      }, 100);
    } else {
      // Add new item
      const newItem = {
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      };
      onAddItem(newItem);
      toast.success(`تم إضافة ${product.name} إلى الفاتورة`);
      
      // Move to quantity field of newly added item
      setTimeout(() => {
        if (items.length >= 0) {
          const newIndex = items.length; // The index of the newly added item
          const quantityCellId = `quantity-${newIndex}`;
          setActiveSearchCell(quantityCellId);
          console.log(`Moving to quantity cell: ${quantityCellId}`);
        }
      }, 100);
    }
  };
  
  // Handle direct edit of cell value
  const handleDirectEdit = (index: number, field: keyof PurchaseItem, value: any) => {
    const updatedItem = { ...items[index], [field]: value };
    
    // Recalculate total if quantity or price changed
    if (field === 'quantity' || field === 'price') {
      updatedItem.total = updatedItem.quantity * updatedItem.price;
    }
    
    onUpdateItem(index, updatedItem);
  };
  
  // Reset active search cell when user clicks away
  const handleTableClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Only close if clicking outside the search cells and search dropdowns
    if (!target.closest('.search-cell') && !target.closest('.product-search-dropdown')) {
      console.log("Clicked outside search cells, resetting active cell");
      setActiveSearchCell(null);
    }
  };
  
  // Effect to handle document clicks (outside table)
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (tableRef.current && 
          !tableRef.current.contains(target) && 
          !target.closest('.product-search-dropdown') &&
          !target.closest('.search-cell')) {
        setActiveSearchCell(null);
      }
    };
    
    document.addEventListener('mousedown', handleDocumentClick);
    
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  // Handle keyboard navigation within the table
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!activeSearchCell) return;
    
    const [field, indexStr] = activeSearchCell.split('-');
    const currentIndex = parseInt(indexStr, 10);
    const rowCount = items.length;
    
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
      
      // Define the field navigation order
      const fieldOrder = ['code', 'name', 'manufacturer', 'size', 'quantity', 'price', 'discount', 'tax', 'notes'];
      
      let currentFieldIndex = fieldOrder.indexOf(field);
      let nextIndex = currentIndex;
      let nextField = fieldOrder[0];
      
      if (currentFieldIndex !== -1) {
        // Move to the next field
        currentFieldIndex = (currentFieldIndex + 1) % fieldOrder.length;
        nextField = fieldOrder[currentFieldIndex];
        
        // If we've wrapped around to the first field, move to the next row
        if (currentFieldIndex === 0 && currentIndex < rowCount - 1) {
          nextIndex = currentIndex + 1;
        }
      }
      
      // Only navigate if the target row exists
      if (nextIndex < rowCount) {
        const nextCellId = `${nextField}-${nextIndex}`;
        setActiveSearchCell(nextCellId);
        console.log(`Navigating to cell: ${nextCellId}`);
      }
    }
  };
  
  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSearchCell, items.length]);
  
  // Toggle table display settings
  const toggleGridLines = () => {
    const options: Array<'both' | 'horizontal' | 'vertical' | 'none'> = ['both', 'horizontal', 'vertical', 'none'];
    const currentIndex = options.indexOf(showGridLines);
    const nextIndex = (currentIndex + 1) % options.length;
    setShowGridLines(options[nextIndex]);
  };

  return {
    activeSearchCell,
    showGridLines,
    isDenseView,
    searchInputRef,
    tableRef,
    lastSelectedRowIndex,
    handleCellClick,
    handleProductSelect,
    handleDirectEdit,
    handleTableClick,
    toggleGridLines,
    setActiveSearchCell
  };
}
