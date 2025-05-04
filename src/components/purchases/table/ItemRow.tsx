import React from "react";
import { PurchaseItem } from "@/types/purchases";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { ProductSearchCell } from "./ProductSearchCell";
import { EditableCell } from "./EditableCell";

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
      <TableCell className="text-center border border-gray-300 p-2 font-bold text-lg">
        {index + 1}
      </TableCell>
      <TableCell 
        className="border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer search-cell relative"
        onClick={(e) => {
          e.stopPropagation();
          handleCellClick(index, 'name');
        }}
      >
        <ProductSearchCell 
          active={activeSearchCell === `name-${index}`}
          index={index}
          field="name"
          onSelect={handleProductSelect}
          searchInputRef={searchInputRef}
        />
        {activeSearchCell !== `name-${index}` && (
          <div className="w-full h-full min-h-[24px]">{item.name || ""}</div>
        )}
      </TableCell>
      <TableCell 
        className="text-center border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer search-cell relative" 
        onClick={(e) => {
          e.stopPropagation();
          handleCellClick(index, 'code');
        }}
      >
        <ProductSearchCell 
          active={activeSearchCell === `code-${index}`}
          index={index}
          field="code"
          onSelect={handleProductSelect}
          searchInputRef={searchInputRef}
        />
        {activeSearchCell !== `code-${index}` && (
          <div className="w-full h-full min-h-[24px]">{item.code || ""}</div>
        )}
      </TableCell>
      <TableCell className="text-center border border-gray-300 p-2">
        <EditableCell 
          active={activeSearchCell === `manufacturer-${index}`}
          value={item.manufacturer || ""}
          field="manufacturer"
          index={index}
          inputRef={searchInputRef}
          onChange={handleDirectEdit}
          onBlur={() => setActiveSearchCell(null)}
        />
        {activeSearchCell !== `manufacturer-${index}` && (
          <div 
            className="cursor-pointer w-full min-h-[24px]" 
            onClick={() => handleCellClick(index, 'manufacturer')}
          >
            {item.manufacturer || ""}
          </div>
        )}
      </TableCell>
      <TableCell className="text-center border border-gray-300 p-2">
        <EditableCell 
          active={activeSearchCell === `size-${index}`}
          value={item.size || ""}
          field="size"
          index={index}
          inputRef={searchInputRef}
          onChange={handleDirectEdit}
          onBlur={() => setActiveSearchCell(null)}
        />
        {activeSearchCell !== `size-${index}` && (
          <div 
            className="cursor-pointer w-full min-h-[24px]" 
            onClick={() => handleCellClick(index, 'size')}
          >
            {item.size || ""}
          </div>
        )}
      </TableCell>
      <TableCell className="text-center border border-gray-300 p-2">
        <EditableCell 
          active={activeSearchCell === `quantity-${index}`}
          value={item.quantity}
          type="number"
          min="1"
          field="quantity"
          index={index}
          inputRef={searchInputRef}
          onChange={handleDirectEdit}
          onBlur={() => setActiveSearchCell(null)}
        />
        {activeSearchCell !== `quantity-${index}` && (
          <div 
            className="cursor-pointer w-full min-h-[24px]" 
            onClick={() => handleCellClick(index, 'quantity')}
          >
            {item.quantity}
          </div>
        )}
      </TableCell>
      <TableCell className="text-center border border-gray-300 p-2">
        <EditableCell 
          active={activeSearchCell === `price-${index}`}
          value={item.price}
          type="number"
          min="0"
          step="0.01"
          field="price"
          index={index}
          inputRef={searchInputRef}
          onChange={handleDirectEdit}
          onBlur={() => setActiveSearchCell(null)}
        />
        {activeSearchCell !== `price-${index}` && (
          <div 
            className="cursor-pointer w-full min-h-[24px]" 
            onClick={() => handleCellClick(index, 'price')}
          >
            {item.price.toFixed(2)}
          </div>
        )}
      </TableCell>
      <TableCell className="text-center border border-gray-300 p-2">
        <EditableCell 
          active={activeSearchCell === `discount-${index}`}
          value={item.discount || 0}
          type="number"
          min="0"
          step="0.01"
          field="discount"
          index={index}
          inputRef={searchInputRef}
          onChange={handleDirectEdit}
          onBlur={() => setActiveSearchCell(null)}
          discountType={item.discountType || "percentage"}
          onDiscountTypeChange={(value) => handleDirectEdit(index, 'discountType', value)}
        />
        {activeSearchCell !== `discount-${index}` && (
          <div 
            className="cursor-pointer w-full min-h-[24px]" 
            onClick={() => handleCellClick(index, 'discount')}
          >
            {(item.discount || 0) > 0 ? `${item.discount}${item.discountType === 'percentage' ? '%' : ' ر.س'}` : ""}
          </div>
        )}
      </TableCell>
      <TableCell className="text-center border border-gray-300 p-2">
        <EditableCell 
          active={activeSearchCell === `tax-${index}`}
          value={item.tax || 0}
          type="number"
          min="0"
          step="0.01"
          field="tax"
          index={index}
          inputRef={searchInputRef}
          onChange={handleDirectEdit}
          onBlur={() => setActiveSearchCell(null)}
          showPercentageSymbol={true}
        />
        {activeSearchCell !== `tax-${index}` && (
          <div 
            className="cursor-pointer w-full min-h-[24px]" 
            onClick={() => handleCellClick(index, 'tax')}
          >
            {(item.tax || 0) > 0 ? `${item.tax}%` : ""}
          </div>
        )}
      </TableCell>
      <TableCell className="text-center border border-gray-300 p-2 font-bold">
        {item.total.toFixed(2)}
      </TableCell>
      <TableCell className="border border-gray-300 p-2">
        <EditableCell 
          active={activeSearchCell === `notes-${index}`}
          value={item.notes || ""}
          field="notes"
          index={index}
          inputRef={searchInputRef}
          onChange={handleDirectEdit}
          onBlur={() => setActiveSearchCell(null)}
        />
        {activeSearchCell !== `notes-${index}` && (
          <div 
            className="cursor-pointer w-full min-h-[24px]" 
            onClick={() => handleCellClick(index, 'notes')}
          >
            {item.notes || ""}
          </div>
        )}
      </TableCell>
      <TableCell className="text-center border border-gray-300 p-2 print:hidden">
        <div className="flex justify-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setEditingItemIndex(index)} 
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Edit size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onRemoveItem(index)} 
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
