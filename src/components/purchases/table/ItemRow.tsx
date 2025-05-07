
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { PurchaseItem } from "@/types/purchases";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EditableCell } from "./EditableCell";
import { ProductSearchCell } from "./ProductSearchCell";

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
  // Helper to determine if this cell is currently being edited
  const isCellActive = (field: string) => activeSearchCell === `${field}-${index}`;
  
  return (
    <TableRow 
      className={`border-b border-gray-200 ${editingItemIndex === index ? 'bg-blue-50' : ''} hover:bg-gray-50`}
    >
      {/* Actions Column */}
      <TableCell className="px-3 py-2 text-center">
        <div className="flex space-x-1 rtl:space-x-reverse justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setEditingItemIndex(index)}
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-red-600"
            onClick={() => onRemoveItem(index)}
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
      
      {/* Notes Column */}
      <TableCell className="px-3 py-2">
        <EditableCell
          value={item.notes || ""}
          isActive={isCellActive("notes")}
          onActivate={() => handleCellClick(index, "notes")}
          onChange={(value) => handleDirectEdit(index, "notes", value)}
          inputRef={isCellActive("notes") ? searchInputRef : undefined}
          placeholder="ملاحظات"
        />
      </TableCell>
      
      {/* Total Column */}
      <TableCell className="px-3 py-2 text-left">
        {item.total.toFixed(2)}
      </TableCell>
      
      {/* Price Column */}
      <TableCell className="px-3 py-2">
        <EditableCell
          value={item.price.toString()}
          isActive={isCellActive("price")}
          onActivate={() => handleCellClick(index, "price")}
          onChange={(value) => handleDirectEdit(index, "price", parseFloat(value) || 0)}
          inputRef={isCellActive("price") ? searchInputRef : undefined}
          type="number"
          className="text-left"
        />
      </TableCell>
      
      {/* Quantity Column */}
      <TableCell className="px-3 py-2">
        <EditableCell
          value={item.quantity.toString()}
          isActive={isCellActive("quantity")}
          onActivate={() => handleCellClick(index, "quantity")}
          onChange={(value) => handleDirectEdit(index, "quantity", parseFloat(value) || 0)}
          inputRef={isCellActive("quantity") ? searchInputRef : undefined}
          type="number"
          className="text-center"
        />
      </TableCell>
      
      {/* Name Column */}
      <TableCell className="px-3 py-2">
        <ProductSearchCell
          value={item.name}
          code={item.code}
          isActive={isCellActive("name")}
          onActivate={() => handleCellClick(index, "name")}
          onProductSelect={(product) => handleProductSelect(product, index)}
          inputRef={isCellActive("name") ? searchInputRef : undefined}
          className="text-right"
        />
      </TableCell>
      
      {/* Code Column */}
      <TableCell className="px-3 py-2">
        <EditableCell
          value={item.code}
          isActive={isCellActive("code")}
          onActivate={() => handleCellClick(index, "code")}
          onChange={(value) => handleDirectEdit(index, "code", value)}
          inputRef={isCellActive("code") ? searchInputRef : undefined}
          className="text-center"
        />
      </TableCell>
      
      {/* Serial Number Column */}
      <TableCell className="px-3 py-2 text-center">
        {index + 1}
      </TableCell>
    </TableRow>
  );
};
