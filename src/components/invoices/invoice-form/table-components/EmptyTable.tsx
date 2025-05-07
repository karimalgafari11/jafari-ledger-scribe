
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

interface EmptyTableProps {
  colSpan: number;
  message?: string;
}

export const EmptyTable: React.FC<EmptyTableProps> = ({
  colSpan,
  message = "لا توجد أصناف في الفاتورة - قم بإضافة الأصناف باستخدام زر إضافة صنف"
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
          <p>{message}</p>
        </div>
      </TableCell>
    </TableRow>
  );
};
