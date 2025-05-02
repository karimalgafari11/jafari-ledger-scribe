
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";

interface EmptyTableProps {
  colSpan: number;
}

export const EmptyTable: React.FC<EmptyTableProps> = ({ colSpan }) => {
  return (
    <TableRow>
      <TableCell 
        colSpan={colSpan} 
        className="text-center py-2 text-muted-foreground border border-black text-lg"
      >
        لا توجد أصناف في الفاتورة
      </TableCell>
    </TableRow>
  );
};
