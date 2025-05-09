
import React, { KeyboardEvent } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { PurchaseItem } from "@/types/purchases";
import { QuantityCell } from "../cells/QuantityCell";
import { PriceCell } from "../cells/PriceCell";
import { UnitCell } from "../cells/UnitCell";
import { NotesCell } from "../cells/NotesCell";
import { ItemCodeCell } from "../cells/ItemCodeCell";
import { ItemNameCell } from "../cells/ItemNameCell";

interface PurchaseItemRowProps {
  item: PurchaseItem;
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

export const PurchaseItemRow: React.FC<PurchaseItemRowProps> = ({
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

  // Helper function to register cell references
  const registerCellRef = (cellName: string) => (el: HTMLTableCellElement | null) => {
    if (el && cellRefs) {
      const cellId = `${index}-${cellName}`;
      cellRefs.set(cellId, el);
    }
  };

  // Handle keyboard events for each cell
  const handleCellKeyDown = (e: KeyboardEvent<HTMLTableCellElement>, cellName: string) => {
    if (onKeyDown) {
      onKeyDown(e, index, cellName);
    }
  };

  return (
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
          isEditing={isEditingCell(index, 'code')}
          handleCellClick={handleCellClick}
          handleDirectEdit={handleDirectEdit}
          onKeyDown={(e) => handleCellKeyDown(e, 'code')}
          ref={registerCellRef('code')}
          tabIndex={0}
        />
      )}
      
      <ItemNameCell
        name={item.name}
        index={index}
        handleProductSelect={handleProductSelect}
        isAddingItem={isAddingItem}
        editingItemIndex={editingItemIndex}
        handleDirectEdit={handleDirectEdit}
        isEditing={isEditingCell(index, 'name')}
        handleCellClick={handleCellClick}
        onKeyDown={(e) => handleCellKeyDown(e, 'name')}
        ref={registerCellRef('name')}
        tabIndex={0}
      />
      
      <UnitCell 
        unit={item.unit} 
        index={index}
        isEditing={isEditingCell(index, 'unit')}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        onKeyDown={(e) => handleCellKeyDown(e, 'unit')}
        ref={registerCellRef('unit')}
        tabIndex={0}
      />
      
      <QuantityCell 
        quantity={item.quantity} 
        index={index}
        isEditing={isEditingCell(index, 'quantity')}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        onKeyDown={(e) => handleCellKeyDown(e, 'quantity')}
        ref={registerCellRef('quantity')}
        tabIndex={0}
      />
      
      <PriceCell 
        price={item.price} 
        index={index}
        isEditing={isEditingCell(index, 'price')}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        onKeyDown={(e) => handleCellKeyDown(e, 'price')}
        ref={registerCellRef('price')}
        tabIndex={0}
      />
      
      <TableCell className="text-center font-semibold">
        {item.total.toFixed(2)}
      </TableCell>
      
      {showItemNotes && (
        <NotesCell 
          notes={item.notes} 
          index={index}
          isEditing={isEditingCell(index, 'notes')}
          handleCellClick={handleCellClick}
          handleDirectEdit={handleDirectEdit}
          onKeyDown={(e) => handleCellKeyDown(e, 'notes')}
          ref={registerCellRef('notes')}
          tabIndex={0}
        />
      )}
      
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
  );
};
