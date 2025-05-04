
import React from "react";
import { PurchaseItem } from "@/types/purchases";
import { TableRow } from "@/components/ui/table";
import { IndexCell } from "./cells/IndexCell";
import { ItemNameCell } from "./cells/ItemNameCell";
import { ItemCodeCell } from "./cells/ItemCodeCell";
import { EditableTextCell } from "./cells/EditableTextCell";
import { EditableNumberCell } from "./cells/EditableNumberCell";
import { EditableDiscountCell } from "./cells/EditableDiscountCell";
import { TotalCell } from "./cells/TotalCell";
import { ActionCell } from "./cells/ActionCell";

interface ItemRowProps {
  item: PurchaseItem;
  index: number;
  activeSearchCell: string | null;
  handleCellClick: (index: number, field: string) => void;
  handleProductSelect: (product: any, index?: number) => void;
  handleDirectEdit: (index: number, field: any, value: any) => void;
  setActiveSearchCell: (cellId: string | null) => void;
  setEditingItemIndex: (index: number | null) => void;
  onRemoveItem: (index: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export const ItemRow: React.FC<ItemRowProps> = ({
  item,
  index,
  activeSearchCell,
  handleCellClick,
  handleProductSelect,
  handleDirectEdit,
  setActiveSearchCell,
  setEditingItemIndex,
  onRemoveItem,
  isAddingItem,
  editingItemIndex,
  searchInputRef
}) => {
  return (
    <TableRow key={item.id || index} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
      <IndexCell index={index} />
      
      <ItemNameCell 
        name={item.name}
        index={index}
        activeSearchCell={activeSearchCell}
        handleCellClick={handleCellClick}
        handleProductSelect={handleProductSelect}
        searchInputRef={searchInputRef}
      />
      
      <ItemCodeCell 
        code={item.code}
        index={index}
        activeSearchCell={activeSearchCell}
        handleCellClick={handleCellClick}
        handleProductSelect={handleProductSelect}
        searchInputRef={searchInputRef}
      />
      
      <EditableTextCell
        value={item.manufacturer || ""}
        field="manufacturer"
        index={index}
        activeSearchCell={activeSearchCell}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        setActiveSearchCell={setActiveSearchCell}
        inputRef={searchInputRef}
      />
      
      <EditableTextCell
        value={item.size || ""}
        field="size"
        index={index}
        activeSearchCell={activeSearchCell}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        setActiveSearchCell={setActiveSearchCell}
        inputRef={searchInputRef}
      />
      
      <EditableNumberCell
        value={item.quantity}
        field="quantity"
        index={index}
        activeSearchCell={activeSearchCell}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        setActiveSearchCell={setActiveSearchCell}
        inputRef={searchInputRef}
        min="1"
      />
      
      <EditableNumberCell
        value={item.price}
        field="price"
        index={index}
        activeSearchCell={activeSearchCell}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        setActiveSearchCell={setActiveSearchCell}
        inputRef={searchInputRef}
        displayValue={item.price.toFixed(2)}
      />
      
      <EditableDiscountCell
        discount={item.discount || 0}
        discountType={item.discountType || "percentage"}
        index={index}
        activeSearchCell={activeSearchCell}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        setActiveSearchCell={setActiveSearchCell}
        inputRef={searchInputRef}
        onDiscountTypeChange={(value) => handleDirectEdit(index, 'discountType', value)}
      />
      
      <EditableNumberCell
        value={item.tax || 0}
        field="tax"
        index={index}
        activeSearchCell={activeSearchCell}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        setActiveSearchCell={setActiveSearchCell}
        inputRef={searchInputRef}
        showPercentageSymbol={true}
        displayValue={(item.tax || 0) > 0 ? `${item.tax}` : ""}
        displaySuffix={(item.tax || 0) > 0 ? "%" : ""}
      />
      
      <TotalCell total={item.total} />
      
      <EditableTextCell
        value={item.notes || ""}
        field="notes"
        index={index}
        activeSearchCell={activeSearchCell}
        handleCellClick={handleCellClick}
        handleDirectEdit={handleDirectEdit}
        setActiveSearchCell={setActiveSearchCell}
        inputRef={searchInputRef}
      />
      
      <ActionCell
        index={index}
        setEditingItemIndex={setEditingItemIndex}
        onRemoveItem={onRemoveItem}
        isAddingItem={isAddingItem}
        editingItemIndex={editingItemIndex}
      />
    </TableRow>
  );
};
