import React from "react";
import { PurchaseItem } from "@/types/purchases";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface PurchaseTableBodyProps {
  items: PurchaseItem[];
  activeSearchCell: { rowIndex: number; cellName: string } | null;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleProductSelect: (product: any, rowIndex: number) => void;
  handleDirectEdit: (value: string, rowIndex: number, cellName: string) => void;
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
  return (
    <TableBody>
      {items.length === 0 ? (
        <TableRow>
          <TableCell colSpan={showItemNotes ? (showItemCodes ? 10 : 9) : (showItemCodes ? 9 : 8)} className="h-32 text-center">
            لا توجد أصناف مضافة بعد. اضغط على "إضافة صنف جديد" لإضافة الأصناف.
          </TableCell>
        </TableRow>
      ) : (
        items.map((item, index) => (
          <TableRow key={index} className={editingItemIndex === index ? "bg-muted/20" : ""}>
            <TableCell className="text-center">{index + 1}</TableCell>
            
            {showItemCodes && (
              <TableCell
                className="cursor-pointer"
                onClick={() => handleCellClick(index, 'code')}
              >
                {isEditingCell(index, 'code') ? (
                  <input
                    ref={activeSearchCell?.rowIndex === index && activeSearchCell?.cellName === 'code' ? searchInputRef : null}
                    type="text"
                    className="w-full p-1 border rounded"
                    value={item.code || ''}
                    onChange={(e) => handleDirectEdit(e.target.value, index, 'code')}
                    onBlur={() => setActiveSearchCell(null)}
                  />
                ) : (
                  item.code || '-'
                )}
              </TableCell>
            )}
            
            <TableCell
              className="cursor-pointer"
              onClick={() => handleCellClick(index, 'name')}
            >
              {isEditingCell(index, 'name') ? (
                <input
                  ref={activeSearchCell?.rowIndex === index && activeSearchCell?.cellName === 'name' ? searchInputRef : null}
                  type="text"
                  className="w-full p-1 border rounded"
                  value={item.name || ''}
                  onChange={(e) => handleDirectEdit(e.target.value, index, 'name')}
                  onBlur={() => setActiveSearchCell(null)}
                />
              ) : (
                item.name || '-'
              )}
            </TableCell>
            
            <TableCell
              className="cursor-pointer text-center"
              onClick={() => handleCellClick(index, 'unit')}
            >
              {isEditingCell(index, 'unit') ? (
                <input
                  ref={activeSearchCell?.rowIndex === index && activeSearchCell?.cellName === 'unit' ? searchInputRef : null}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  value={item.unit || ''}
                  onChange={(e) => handleDirectEdit(e.target.value, index, 'unit')}
                  onBlur={() => setActiveSearchCell(null)}
                />
              ) : (
                item.unit || '-'
              )}
            </TableCell>
            
            <TableCell
              className="cursor-pointer text-center"
              onClick={() => handleCellClick(index, 'quantity')}
            >
              {isEditingCell(index, 'quantity') ? (
                <input
                  ref={activeSearchCell?.rowIndex === index && activeSearchCell?.cellName === 'quantity' ? searchInputRef : null}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  value={item.quantity || ''}
                  onChange={(e) => handleDirectEdit(e.target.value, index, 'quantity')}
                  onBlur={() => setActiveSearchCell(null)}
                />
              ) : (
                item.quantity
              )}
            </TableCell>
            
            <TableCell
              className="cursor-pointer text-center"
              onClick={() => handleCellClick(index, 'price')}
            >
              {isEditingCell(index, 'price') ? (
                <input
                  ref={activeSearchCell?.rowIndex === index && activeSearchCell?.cellName === 'price' ? searchInputRef : null}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  value={item.price || ''}
                  onChange={(e) => handleDirectEdit(e.target.value, index, 'price')}
                  onBlur={() => setActiveSearchCell(null)}
                />
              ) : (
                formatCurrency(item.price || 0)
              )}
            </TableCell>
            
            <TableCell
              className="cursor-pointer text-center"
              onClick={() => handleCellClick(index, 'tax')}
            >
              {isEditingCell(index, 'tax') ? (
                <input
                  ref={activeSearchCell?.rowIndex === index && activeSearchCell?.cellName === 'tax' ? searchInputRef : null}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  value={item.tax || ''}
                  onChange={(e) => handleDirectEdit(e.target.value, index, 'tax')}
                  onBlur={() => setActiveSearchCell(null)}
                />
              ) : (
                `${item.tax || 0}%`
              )}
            </TableCell>
            
            <TableCell
              className="cursor-pointer text-center"
              onClick={() => handleCellClick(index, 'discount')}
            >
              {isEditingCell(index, 'discount') ? (
                <input
                  ref={activeSearchCell?.rowIndex === index && activeSearchCell?.cellName === 'discount' ? searchInputRef : null}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  value={item.discount || ''}
                  onChange={(e) => handleDirectEdit(e.target.value, index, 'discount')}
                  onBlur={() => setActiveSearchCell(null)}
                />
              ) : (
                `${item.discount || 0}%`
              )}
            </TableCell>
            
            <TableCell className="text-center font-medium">
              {formatCurrency(item.total || 0)}
            </TableCell>
            
            {showItemNotes && (
              <TableCell
                className="cursor-pointer"
                onClick={() => handleCellClick(index, 'notes')}
              >
                {isEditingCell(index, 'notes') ? (
                  <input
                    ref={activeSearchCell?.rowIndex === index && activeSearchCell?.cellName === 'notes' ? searchInputRef : null}
                    type="text"
                    className="w-full p-1 border rounded"
                    value={item.notes || ''}
                    onChange={(e) => handleDirectEdit(e.target.value, index, 'notes')}
                    onBlur={() => setActiveSearchCell(null)}
                  />
                ) : (
                  item.notes || '-'
                )}
              </TableCell>
            )}
            
            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onRemoveItem(index)}
              >
                <Trash className="h-4 w-4 text-destructive" />
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
};
