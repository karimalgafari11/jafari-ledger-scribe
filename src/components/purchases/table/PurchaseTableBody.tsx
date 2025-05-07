
import React from "react";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { PurchaseItem } from "@/types/purchases";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ItemCodeCell } from "./cells/ItemCodeCell";
import { ItemNameCell } from "./cells/ItemNameCell";

interface PurchaseTableBodyProps {
  items: PurchaseItem[];
  activeSearchCell: { rowIndex: number; cellName: string } | null;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleProductSelect: (product: any, index?: number) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  setActiveSearchCell: (cell: { rowIndex: number; cellName: string } | null) => void;
  setEditingItemIndex: (index: number | null) => void;
  onRemoveItem: (index: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  searchInputRef: React.RefObject<HTMLInputElement>;
  setIsAddingItem: (isAdding: boolean) => void;
  isEditingCell: (rowIndex: number, cellName: string) => boolean;
  showItemCodes?: boolean;
  showItemNotes?: boolean;
}

export const PurchaseTableBody: React.FC<PurchaseTableBodyProps> = ({
  items,
  activeSearchCell,
  handleCellClick,
  handleProductSelect,
  handleDirectEdit,
  setActiveSearchCell,
  setEditingItemIndex,
  onRemoveItem,
  isAddingItem,
  editingItemIndex,
  searchInputRef,
  setIsAddingItem,
  isEditingCell,
  showItemCodes = true,
  showItemNotes = true
}) => {
  const handleEditRow = (index: number) => {
    if (!isAddingItem && editingItemIndex === null) {
      setEditingItemIndex(index);
    }
  };

  const handleDeleteRow = (index: number) => {
    onRemoveItem(index);
  };

  const currentlyEditing = (index: number): boolean => {
    return editingItemIndex === index;
  };

  const isActive = (rowIndex: number, cellName: string): boolean => {
    return activeSearchCell !== null && 
           activeSearchCell.rowIndex === rowIndex && 
           activeSearchCell.cellName === cellName;
  };

  const handleNormalCellChange = (index: number, field: keyof PurchaseItem, e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
    
    // Convert to numbers for numeric fields
    if (field === 'quantity' || field === 'price') {
      value = parseFloat(value) || 0;
      // Recalculate total
      const item = items[index];
      const newTotal = field === 'quantity' 
        ? value * item.price 
        : item.quantity * value;
      
      // Update total along with the changed field
      handleDirectEdit(index, field, value);
      handleDirectEdit(index, 'total', newTotal);
    } else {
      // For non-numeric fields just update the field
      handleDirectEdit(index, field, value);
    }
  };

  return (
    <TableBody>
      {items.length === 0 ? (
        <TableRow>
          <TableCell colSpan={showItemCodes && showItemNotes ? 9 : showItemCodes || showItemNotes ? 8 : 7} className="text-center h-24 text-muted-foreground">
            {isAddingItem ? (
              "يتم إضافة صنف جديد..."
            ) : (
              <div className="flex flex-col items-center">
                <p>لا توجد أصناف في الفاتورة</p>
                {/* تمت إزالة زر إضافة صنف جديد من هنا */}
              </div>
            )}
          </TableCell>
        </TableRow>
      ) : (
        items.map((item, index) => (
          <TableRow 
            key={item.id || index} 
            className={`
              ${currentlyEditing(index) ? 'bg-blue-50' : ''}
              ${activeSearchCell?.rowIndex === index ? 'bg-blue-50' : ''}
            `}
          >
            <TableCell className="text-center">{index + 1}</TableCell>
            
            {showItemCodes && (
              <ItemCodeCell
                code={item.code}
                index={index}
                handleProductSelect={handleProductSelect}
                isAddingItem={isAddingItem}
                editingItemIndex={editingItemIndex}
                handleDirectEdit={(index, field, value) => handleDirectEdit(index, field, value)}
              />
            )}
            
            <ItemNameCell
              name={item.name}
              index={index}
              handleProductSelect={handleProductSelect}
              isAddingItem={isAddingItem}
              editingItemIndex={editingItemIndex}
              handleDirectEdit={(index, field, value) => handleDirectEdit(index, field, value)}
            />
            
            {/* وحدة القياس */}
            <TableCell className="text-center">
              {isEditingCell(index, 'unit') ? (
                <Input
                  value={item.unit || ''}
                  onChange={(e) => handleNormalCellChange(index, 'unit', e)}
                  className="w-full h-full border-none p-0 text-center focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div 
                  className="w-full h-full min-h-[24px] cursor-pointer flex items-center justify-center"
                  onClick={() => handleCellClick(index, 'unit')}
                >
                  {item.unit || 'قطعة'}
                </div>
              )}
            </TableCell>
            
            {/* الكمية */}
            <TableCell className="text-center">
              {isEditingCell(index, 'quantity') ? (
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.quantity}
                  onChange={(e) => handleNormalCellChange(index, 'quantity', e)}
                  className="w-full h-full border-none p-0 text-center focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div 
                  className="w-full h-full min-h-[24px] cursor-pointer flex items-center justify-center"
                  onClick={() => handleCellClick(index, 'quantity')}
                >
                  {item.quantity}
                </div>
              )}
            </TableCell>
            
            {/* السعر */}
            <TableCell className="text-center">
              {isEditingCell(index, 'price') ? (
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => handleNormalCellChange(index, 'price', e)}
                  className="w-full h-full border-none p-0 text-center focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div 
                  className="w-full h-full min-h-[24px] cursor-pointer flex items-center justify-center"
                  onClick={() => handleCellClick(index, 'price')}
                >
                  {item.price.toFixed(2)}
                </div>
              )}
            </TableCell>
            
            {/* المجموع */}
            <TableCell className="text-center font-semibold">
              {item.total.toFixed(2)}
            </TableCell>
            
            {/* ملاحظات */}
            {showItemNotes && (
              <TableCell>
                {isEditingCell(index, 'notes') ? (
                  <Input
                    value={item.notes || ''}
                    onChange={(e) => handleNormalCellChange(index, 'notes', e)}
                    className="w-full h-full border-none p-0 focus:ring-2 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div 
                    className="w-full h-full min-h-[24px] cursor-pointer flex items-center"
                    onClick={() => handleCellClick(index, 'notes')}
                  >
                    {item.notes || ''}
                  </div>
                )}
              </TableCell>
            )}
            
            {/* الإجراءات */}
            <TableCell className="text-center">
              <div className="flex justify-center space-x-1 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleEditRow(index)}
                  disabled={isAddingItem || editingItemIndex !== null}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteRow(index)}
                  disabled={isAddingItem || editingItemIndex !== null}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
};
