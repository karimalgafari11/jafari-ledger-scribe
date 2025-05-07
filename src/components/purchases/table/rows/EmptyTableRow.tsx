
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";

interface EmptyTableRowProps {
  colSpan: number;
  isAddingItem: boolean;
}

export const EmptyTableRow: React.FC<EmptyTableRowProps> = ({
  colSpan,
  isAddingItem
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center h-24 text-muted-foreground">
        {isAddingItem ? (
          "يتم إضافة صنف جديد..."
        ) : (
          <div className="flex flex-col items-center">
            <p>لا توجد أصناف في الفاتورة</p>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};
