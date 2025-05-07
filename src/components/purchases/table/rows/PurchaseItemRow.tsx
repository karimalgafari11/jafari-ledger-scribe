
import React from "react";
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
          handleDirectEdit={handleDirectEdit}
          isEditingCell={isEditingCell(index, 'code')}
          handleCellClick={handleCellClick}
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
      />
      
      <UnitCell 
        unit={item.unit} 
        index={index}
        isEditing={isEditingCell(index, 'unit')}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
      />
      
      <QuantityCell 
        quantity={item.quantity} 
        index={index}
        isEditing={isEditingCell(index, 'quantity')}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
      />
      
      <PriceCell 
        price={item.price} 
        index={index}
        isEditing={isEditingCell(index, 'price')}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
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
