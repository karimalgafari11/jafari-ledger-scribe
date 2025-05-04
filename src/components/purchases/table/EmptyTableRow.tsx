
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

export const EmptyTableRow: React.FC = () => {
  return (
    <TableRow>
      <TableCell colSpan={12} className="text-center border border-gray-300 py-[5px]">
        لا توجد أصناف. قم بالضغط على زر "إضافة صنف" أو استخدم البحث السريع لإضافة صنف جديد.
      </TableCell>
    </TableRow>
  );
};
