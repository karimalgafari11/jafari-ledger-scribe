
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { InvoiceItem } from "@/types/invoices";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ItemTableRowProps {
  item: InvoiceItem;
  index: number;
  columns: string[];
  onRowClick: () => void;
  onEdit: () => void;
  onRemove: () => void;
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
      onClick={(e) => {
        // Prevent click if action buttons are clicked
        if ((e.target as HTMLElement).closest('button')) return;
        onRowClick();
      }}
    >
      {columns.includes('serial') && 
        <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
      }
      {columns.includes('code') && 
        <TableCell className="border border-gray-300 text-center">{item.code}</TableCell>
      }
      {columns.includes('name') && 
        <TableCell className="border border-gray-300 text-right">{item.name}</TableCell>
      }
      {columns.includes('quantity') && 
        <TableCell className="border border-gray-300 text-center">{item.quantity}</TableCell>
      }
      {columns.includes('price') && 
        <TableCell className="border border-gray-300 text-left">{item.price.toFixed(2)}</TableCell>
      }
      {columns.includes('total') && 
        <TableCell className="border border-gray-300 text-left">{item.total.toFixed(2)}</TableCell>
      }
      {columns.includes('notes') && 
        <TableCell className="border border-gray-300 text-right">{item.notes || '-'}</TableCell>
      }
      <TableCell className="border border-gray-300 text-center print-hide">
        <div className="flex justify-center space-x-1 rtl:space-x-reverse">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-gray-500 hover:text-blue-600" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-gray-500 hover:text-red-600" 
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
