
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { ItemTableActions } from "./ItemTableActions";
import { InvoiceItem } from "@/types/invoices";

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
    <TableRow className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
      {columns.includes('serial') && 
        <TableCell className="border border-black text-center font-semibold py-1 text-lg">{index + 1}</TableCell>
      }
      {columns.includes('code') && 
        <TableCell 
          className="border border-black text-center py-1 text-lg cursor-pointer hover:bg-gray-200"
          onClick={() => onRowClick(index)}
        >
          {item.code}
        </TableCell>
      }
      {columns.includes('name') && 
        <TableCell 
          className="border border-black py-1 text-lg cursor-pointer hover:bg-gray-200" 
          onClick={() => onRowClick(index)}
        >
          {item.name}
        </TableCell>
      }
      {columns.includes('quantity') && 
        <TableCell className="border border-black text-center py-1 text-lg">{item.quantity}</TableCell>
      }
      {columns.includes('price') && 
        <TableCell className="border border-black text-center py-1 text-lg">{item.price.toFixed(2)}</TableCell>
      }
      {columns.includes('total') && 
        <TableCell className="border border-black text-center font-semibold py-1 text-lg">{item.total.toFixed(2)}</TableCell>
      }
      {columns.includes('notes') && 
        <TableCell className="border border-black text-center py-1 text-lg">{item.notes || '-'}</TableCell>
      }
      <TableCell className="border border-black print-hide py-1">
        <ItemTableActions 
          onEdit={() => onEdit(index)} 
          onRemove={() => onRemove(index)} 
        />
      </TableCell>
    </TableRow>
  );
};
