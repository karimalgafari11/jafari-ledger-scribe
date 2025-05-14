
import { PurchaseItem } from "@/types/purchases";

interface UseCellEditingProps {
  items: PurchaseItem[];
  onUpdateItem: (index: number, item: Partial<PurchaseItem>) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setActiveSearchCell: (cell: { rowIndex: number; cellName: string } | null) => void;
  setIsEditingCell: (isEditing: boolean) => void;
  setLastSelectedRowIndex: (index: number | null) => void;
}

export function useCellEditing({
  items,
  onUpdateItem,
  isAddingItem,
  editingItemIndex,
  setActiveSearchCell,
  setIsEditingCell,
  setLastSelectedRowIndex
}: UseCellEditingProps) {
  
  const handleCellClick = (rowIndex: number, cellName: string) => {
    if (isAddingItem || editingItemIndex !== null) return;
    
    setActiveSearchCell({ rowIndex, cellName });
    setLastSelectedRowIndex(rowIndex);
    setIsEditingCell(true);
  };
  
  const handleDirectEdit = (index: number, field: string, value: any) => {
    if (field === 'quantity' || field === 'price') {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return;
      
      const updates: Partial<PurchaseItem> = {
        [field]: numValue
      };
      
      // إذا تم تغيير الكمية أو السعر، أعد حساب المجموع
      updates.total = field === 'quantity' 
        ? numValue * items[index].price 
        : items[index].quantity * numValue;
        
      onUpdateItem(index, updates);
    } else {
      onUpdateItem(index, { [field]: value });
    }
  };
  
  const handleProductSelect = (product: any, index?: number) => {
    if (typeof index === 'number') {
      onUpdateItem(index, {
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        total: items[index].quantity * product.price
      });
    }
    
    setActiveSearchCell(null);
    setIsEditingCell(false);
  };
  
  const finishEditing = () => {
    setActiveSearchCell(null);
    setIsEditingCell(false);
    setLastSelectedRowIndex(null);
  };
  
  return {
    handleCellClick,
    handleDirectEdit,
    handleProductSelect,
    finishEditing
  };
}
