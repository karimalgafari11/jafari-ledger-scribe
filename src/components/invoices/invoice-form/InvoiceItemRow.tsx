
import React, { KeyboardEvent } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { InvoiceItem } from "@/types/invoices";
import { formatCurrency } from "@/utils/formatters";

interface InvoiceItemRowProps {
  item: InvoiceItem;
  index: number;
  activeSearchCell: { rowIndex: number; cellName: string } | null;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleProductSelect: (product: any, index?: number) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  isEditingCell: (rowIndex: number, cellName: string) => boolean;
  editingItemIndex: number | null;
  isAddingItem: boolean;
  setEditingItemIndex: (index: number | null) => void;
  onRemoveItem: (index: number) => void;
  showItemCodes?: boolean;
  showItemNotes?: boolean;
  onKeyDown?: (e: KeyboardEvent<HTMLTableCellElement>, rowIndex: number, cellName: string) => void;
  cellRefs?: Map<string, HTMLTableCellElement>;
}

export const InvoiceItemRow: React.FC<InvoiceItemRowProps> = ({
  item,
  index,
  activeSearchCell,
  handleCellClick,
  handleProductSelect,
  handleDirectEdit,
  isEditingCell,
  editingItemIndex,
  isAddingItem,
  setEditingItemIndex,
  onRemoveItem,
  showItemCodes = true,
  showItemNotes = true,
  onKeyDown,
  cellRefs
}) => {
  // تسجيل مرجع للخلايا
  const registerCellRef = (cellName: string) => (el: HTMLTableCellElement | null) => {
    if (el && cellRefs) {
      const cellId = `${index}-${cellName}`;
      cellRefs.set(cellId, el);
    }
  };

  // معالجة أحداث لوحة المفاتيح لكل خلية
  const handleCellKeyDown = (e: KeyboardEvent<HTMLTableCellElement>, cellName: string) => {
    if (onKeyDown) {
      onKeyDown(e, index, cellName);
    }
  };

  const handleEditRow = () => {
    if (!isAddingItem && editingItemIndex === null) {
      setEditingItemIndex(index);
    }
  };

  const handleDeleteRow = () => {
    onRemoveItem(index);
  };

  const currentlyEditing = editingItemIndex === index;
  const isActive = (cellName: string): boolean => {
    return activeSearchCell !== null && 
           activeSearchCell.rowIndex === index && 
           activeSearchCell.cellName === cellName;
  };

  return (
    <TableRow 
      key={item.id} 
      className={`
        ${currentlyEditing ? 'bg-blue-50' : ''}
        ${activeSearchCell?.rowIndex === index ? 'bg-blue-50' : ''}
      `}
    >
      <TableCell className="text-center">{index + 1}</TableCell>
      
      {showItemCodes && (
        <TableCell 
          className={`text-center p-2 ${isActive('code') ? 'bg-blue-100' : ''}`}
          onClick={() => handleCellClick(index, 'code')}
          onKeyDown={(e) => handleCellKeyDown(e, 'code')}
          data-row-index={index}
          data-cell-name="code"
          ref={registerCellRef('code')}
          tabIndex={0}
        >
          {isEditingCell(index, 'code') ? (
            <input
              type="text"
              value={item.code}
              onChange={(e) => handleDirectEdit(index, 'code', e.target.value)}
              className="w-full h-8 text-center border rounded"
              autoFocus
            />
          ) : (
            <span className="cursor-text">{item.code || "—"}</span>
          )}
        </TableCell>
      )}
      
      <TableCell 
        className={`p-2 ${isActive('name') ? 'bg-blue-100' : ''}`}
        onClick={() => handleCellClick(index, 'name')}
        onKeyDown={(e) => handleCellKeyDown(e, 'name')}
        data-row-index={index}
        data-cell-name="name"
        ref={registerCellRef('name')}
        tabIndex={0}
      >
        {isEditingCell(index, 'name') ? (
          <input
            type="text"
            value={item.name}
            onChange={(e) => handleDirectEdit(index, 'name', e.target.value)}
            className="w-full h-8 border rounded"
            autoFocus
          />
        ) : (
          <span className="cursor-text font-medium">{item.name || "انقر لإضافة اسم"}</span>
        )}
      </TableCell>
      
      <TableCell 
        className={`text-center p-2 ${isActive('quantity') ? 'bg-blue-100' : ''}`}
        onClick={() => handleCellClick(index, 'quantity')}
        onKeyDown={(e) => handleCellKeyDown(e, 'quantity')}
        data-row-index={index}
        data-cell-name="quantity"
        ref={registerCellRef('quantity')}
        tabIndex={0}
      >
        {isEditingCell(index, 'quantity') ? (
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleDirectEdit(index, 'quantity', e.target.value)}
            className="w-full h-8 text-center border rounded"
            autoFocus
          />
        ) : (
          <span className="cursor-text">{item.quantity}</span>
        )}
      </TableCell>
      
      <TableCell 
        className={`text-center p-2 ${isActive('price') ? 'bg-blue-100' : ''}`}
        onClick={() => handleCellClick(index, 'price')}
        onKeyDown={(e) => handleCellKeyDown(e, 'price')}
        data-row-index={index}
        data-cell-name="price"
        ref={registerCellRef('price')}
        tabIndex={0}
      >
        {isEditingCell(index, 'price') ? (
          <input
            type="number"
            value={item.price}
            onChange={(e) => handleDirectEdit(index, 'price', e.target.value)}
            className="w-full h-8 text-center border rounded"
            autoFocus
          />
        ) : (
          <span className="cursor-text">{formatCurrency(item.price)}</span>
        )}
      </TableCell>
      
      <TableCell className="text-center font-semibold">
        {formatCurrency(item.total)}
      </TableCell>
      
      {showItemNotes && (
        <TableCell 
          className={`p-2 ${isActive('notes') ? 'bg-blue-100' : ''}`}
          onClick={() => handleCellClick(index, 'notes')}
          onKeyDown={(e) => handleCellKeyDown(e, 'notes')}
          data-row-index={index}
          data-cell-name="notes"
          ref={registerCellRef('notes')}
          tabIndex={0}
        >
          {isEditingCell(index, 'notes') ? (
            <input
              type="text"
              value={item.notes || ""}
              onChange={(e) => handleDirectEdit(index, 'notes', e.target.value)}
              className="w-full h-8 border rounded"
              autoFocus
            />
          ) : (
            <span className="cursor-text">{item.notes || "—"}</span>
          )}
        </TableCell>
      )}
      
      <TableCell className="text-center">
        <div className="flex justify-center space-x-1 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleEditRow}
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-red-500 hover:text-red-700"
            onClick={handleDeleteRow}
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
