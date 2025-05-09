
import React, { KeyboardEvent, useEffect } from "react";
import { TableRow } from "@/components/ui/table";
import { InvoiceItem } from "@/types/invoices";
import { useRowRefs } from "./hooks/useRowRefs";
import { useRegisterCellRef } from "./hooks/useRegisterCellRef";

// Import all cell components
import { IndexCell } from "./table-cells/IndexCell";
import { CodeCell } from "./table-cells/CodeCell";
import { NameCell } from "./table-cells/NameCell";
import { QuantityCell } from "./table-cells/QuantityCell";
import { PriceCell } from "./table-cells/PriceCell";
import { TotalCell } from "./table-cells/TotalCell";
import { NotesCell } from "./table-cells/NotesCell";
import { ActionCell } from "./table-cells/ActionCell";

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
  // Get input refs for auto focusing
  const { inputRefs } = useRowRefs();

  // Register cell refs for keyboard navigation
  const registerCellRef = useRegisterCellRef(index, cellRefs);

  // Auto-focus on the input when editing is activated
  useEffect(() => {
    if (activeSearchCell?.rowIndex === index) {
      const field = activeSearchCell.cellName;
      if (isEditingCell(index, field) && inputRefs[field]?.current) {
        inputRefs[field].current?.focus();
        inputRefs[field].current?.select();
      }
    }
  }, [activeSearchCell, index, isEditingCell, inputRefs]);

  // Handle keyboard events for each cell
  const handleCellKeyDown = (e: KeyboardEvent<HTMLTableCellElement>, cellName: string) => {
    if (onKeyDown) {
      onKeyDown(e, index, cellName);
    }
  };

  // Helper functions for row actions
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
      data-row-index={index}
      aria-selected={activeSearchCell?.rowIndex === index}
    >
      <IndexCell index={index} />
      
      {showItemCodes && (
        <CodeCell 
          code={item.code}
          index={index}
          isEditing={isEditingCell(index, 'code')}
          isActive={isActive('code')}
          handleCellClick={handleCellClick}
          handleDirectEdit={handleDirectEdit}
          onKeyDown={(e) => handleCellKeyDown(e, 'code')}
          ref={registerCellRef('code')}
        />
      )}
      
      <NameCell 
        name={item.name}
        index={index}
        isEditing={isEditingCell(index, 'name')}
        isActive={isActive('name')}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        onKeyDown={(e) => handleCellKeyDown(e, 'name')}
        ref={registerCellRef('name')}
      />
      
      <QuantityCell 
        quantity={item.quantity}
        index={index}
        isEditing={isEditingCell(index, 'quantity')}
        isActive={isActive('quantity')}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        onKeyDown={(e) => handleCellKeyDown(e, 'quantity')}
        ref={registerCellRef('quantity')}
      />
      
      <PriceCell 
        price={item.price}
        index={index}
        isEditing={isEditingCell(index, 'price')}
        isActive={isActive('price')}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        onKeyDown={(e) => handleCellKeyDown(e, 'price')}
        ref={registerCellRef('price')}
      />
      
      <TotalCell total={item.total} />
      
      {showItemNotes && (
        <NotesCell 
          notes={item.notes}
          index={index}
          isEditing={isEditingCell(index, 'notes')}
          isActive={isActive('notes')}
          handleCellClick={handleCellClick}
          handleDirectEdit={handleDirectEdit}
          onKeyDown={(e) => handleCellKeyDown(e, 'notes')}
          ref={registerCellRef('notes')}
        />
      )}
      
      <ActionCell 
        onEdit={handleEditRow}
        onDelete={handleDeleteRow}
        disabled={isAddingItem || editingItemIndex !== null}
      />
    </TableRow>
  );
};
