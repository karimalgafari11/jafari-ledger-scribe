
import React, { KeyboardEvent, useRef, useEffect } from "react";
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
  // مراجع لحقول الإدخال للتركيز التلقائي
  const inputRefs = {
    code: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
    quantity: useRef<HTMLInputElement>(null),
    price: useRef<HTMLInputElement>(null),
    notes: useRef<HTMLInputElement>(null)
  };

  // تسجيل مرجع للخلايا
  const registerCellRef = (cellName: string) => (el: HTMLTableCellElement | null) => {
    if (el && cellRefs) {
      const cellId = `${index}-${cellName}`;
      cellRefs.set(cellId, el);
    }
  };

  // التركيز التلقائي على حقل الإدخال عند تفعيل التحرير
  useEffect(() => {
    if (activeSearchCell?.rowIndex === index) {
      const field = activeSearchCell.cellName;
      if (isEditingCell(index, field) && inputRefs[field]?.current) {
        inputRefs[field].current?.focus();
        inputRefs[field].current?.select();
      }
    }
  }, [activeSearchCell, index, isEditingCell]);

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
        hover:bg-gray-50 transition-colors
      `}
    >
      <TableCell className="text-center">{index + 1}</TableCell>
      
      {showItemCodes && (
        <TableCell 
          className={`text-center p-2 ${isActive('code') ? 'bg-blue-100' : ''} transition-colors`}
          onClick={() => handleCellClick(index, 'code')}
          onKeyDown={(e) => handleCellKeyDown(e, 'code')}
          data-row-index={index}
          data-cell-name="code"
          ref={registerCellRef('code')}
          tabIndex={0}
          aria-selected={isActive('code')}
          role="gridcell"
        >
          {isEditingCell(index, 'code') ? (
            <input
              ref={inputRefs.code}
              type="text"
              value={item.code || ""}
              onChange={(e) => handleDirectEdit(index, 'code', e.target.value)}
              className="w-full h-8 text-center border rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
              autoFocus
              onKeyDown={(e) => {
                // منع انتشار أحداث المفاتيح للخلية الأم
                e.stopPropagation();
              }}
            />
          ) : (
            <span className="cursor-text block w-full h-full py-1">{item.code || "—"}</span>
          )}
        </TableCell>
      )}
      
      <TableCell 
        className={`p-2 ${isActive('name') ? 'bg-blue-100' : ''} transition-colors`}
        onClick={() => handleCellClick(index, 'name')}
        onKeyDown={(e) => handleCellKeyDown(e, 'name')}
        data-row-index={index}
        data-cell-name="name"
        ref={registerCellRef('name')}
        tabIndex={0}
        aria-selected={isActive('name')}
        role="gridcell"
      >
        {isEditingCell(index, 'name') ? (
          <input
            ref={inputRefs.name}
            type="text"
            value={item.name || ""}
            onChange={(e) => handleDirectEdit(index, 'name', e.target.value)}
            className="w-full h-8 border rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
            autoFocus
            onKeyDown={(e) => {
              // منع انتشار أحداث المفاتيح للخلية الأم
              e.stopPropagation();
            }}
          />
        ) : (
          <span className="cursor-text block w-full h-full py-1 font-medium">{item.name || "انقر لإضافة اسم"}</span>
        )}
      </TableCell>
      
      <TableCell 
        className={`text-center p-2 ${isActive('quantity') ? 'bg-blue-100' : ''} transition-colors`}
        onClick={() => handleCellClick(index, 'quantity')}
        onKeyDown={(e) => handleCellKeyDown(e, 'quantity')}
        data-row-index={index}
        data-cell-name="quantity"
        ref={registerCellRef('quantity')}
        tabIndex={0}
        aria-selected={isActive('quantity')}
        role="gridcell"
      >
        {isEditingCell(index, 'quantity') ? (
          <input
            ref={inputRefs.quantity}
            type="number"
            value={item.quantity || 0}
            onChange={(e) => handleDirectEdit(index, 'quantity', e.target.value)}
            className="w-full h-8 text-center border rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
            autoFocus
            onKeyDown={(e) => {
              // منع انتشار أحداث المفاتيح للخلية الأم
              e.stopPropagation();
            }}
          />
        ) : (
          <span className="cursor-text block w-full h-full py-1">{item.quantity}</span>
        )}
      </TableCell>
      
      <TableCell 
        className={`text-center p-2 ${isActive('price') ? 'bg-blue-100' : ''} transition-colors`}
        onClick={() => handleCellClick(index, 'price')}
        onKeyDown={(e) => handleCellKeyDown(e, 'price')}
        data-row-index={index}
        data-cell-name="price"
        ref={registerCellRef('price')}
        tabIndex={0}
        aria-selected={isActive('price')}
        role="gridcell"
      >
        {isEditingCell(index, 'price') ? (
          <input
            ref={inputRefs.price}
            type="number"
            value={item.price || 0}
            onChange={(e) => handleDirectEdit(index, 'price', e.target.value)}
            className="w-full h-8 text-center border rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
            autoFocus
            onKeyDown={(e) => {
              // منع انتشار أحداث المفاتيح للخلية الأم
              e.stopPropagation();
            }}
          />
        ) : (
          <span className="cursor-text block w-full h-full py-1">{formatCurrency(item.price)}</span>
        )}
      </TableCell>
      
      <TableCell className="text-center font-semibold">
        {formatCurrency(item.total)}
      </TableCell>
      
      {showItemNotes && (
        <TableCell 
          className={`p-2 ${isActive('notes') ? 'bg-blue-100' : ''} transition-colors`}
          onClick={() => handleCellClick(index, 'notes')}
          onKeyDown={(e) => handleCellKeyDown(e, 'notes')}
          data-row-index={index}
          data-cell-name="notes"
          ref={registerCellRef('notes')}
          tabIndex={0}
          aria-selected={isActive('notes')}
          role="gridcell"
        >
          {isEditingCell(index, 'notes') ? (
            <input
              ref={inputRefs.notes}
              type="text"
              value={item.notes || ""}
              onChange={(e) => handleDirectEdit(index, 'notes', e.target.value)}
              className="w-full h-8 border rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
              autoFocus
              onKeyDown={(e) => {
                // منع انتشار أحداث المفاتيح للخلية الأم
                e.stopPropagation();
              }}
            />
          ) : (
            <span className="cursor-text block w-full h-full py-1">{item.notes || "—"}</span>
          )}
        </TableCell>
      )}
      
      <TableCell className="text-center">
        <div className="flex justify-center space-x-1 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-blue-100 hover:text-blue-700"
            onClick={handleEditRow}
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-red-100 hover:text-red-700"
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
