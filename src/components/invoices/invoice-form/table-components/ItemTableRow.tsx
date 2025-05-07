
import React from "react";
import { InvoiceItem } from "@/types/invoices";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ItemTableRowProps {
  item: InvoiceItem;
  index: number;
  columns: string[];
  onRowClick: (index: number) => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

export const ItemTableRow: React.FC<ItemTableRowProps> = ({
  item,
  index,
  columns,
  onRowClick,
  onEdit,
  onRemove
}) => {
  return (
    <TableRow 
      key={item.id} 
      className="cursor-pointer hover:bg-gray-50"
      onClick={() => onRowClick(index)}
    >
      {columns.includes('serial') && (
        <TableCell className="text-center border border-black">
          {index + 1}
        </TableCell>
      )}

      {columns.includes('code') && (
        <TableCell className="border border-black">
          {item.code}
        </TableCell>
      )}

      {columns.includes('name') && (
        <TableCell className="border border-black">
          {item.name}
          {item.description && (
            <div className="text-xs text-gray-500">{item.description}</div>
          )}
        </TableCell>
      )}

      {columns.includes('quantity') && (
        <TableCell className="text-center border border-black">
          {item.quantity}
        </TableCell>
      )}

      {columns.includes('price') && (
        <TableCell className="text-left border border-black">
          {item.price.toFixed(2)}
        </TableCell>
      )}

      {columns.includes('total') && (
        <TableCell className="text-left font-medium border border-black">
          {item.total.toFixed(2)}
        </TableCell>
      )}

      {columns.includes('notes') && (
        <TableCell className="border border-black">
          {item.notes}
        </TableCell>
      )}

      <TableCell className="border border-black text-center print-hide">
        <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(index);
            }}
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-red-600 hover:text-red-800 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
