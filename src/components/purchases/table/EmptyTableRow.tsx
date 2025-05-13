
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

interface EmptyTableRowProps {
  message?: string;
}

export const EmptyTableRow: React.FC<EmptyTableRowProps> = ({
  message = "لا توجد أصناف في الفاتورة. اضغط على زر 'إضافة صنف جديد' لإضافة منتجات."
}) => {
  return (
    <TableRow>
      <TableCell colSpan={8} className="py-10 text-center">
        <div className="text-gray-500">
          {message}
        </div>
      </TableCell>
    </TableRow>
  );
};
