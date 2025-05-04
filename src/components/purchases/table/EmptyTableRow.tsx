
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

export const EmptyTableRow: React.FC = () => {
  // إنشاء 10 صفوف فارغة للجدول
  const emptyRows = Array.from({ length: 10 }, (_, index) => (
    <TableRow key={`empty-row-${index}`} className={index % 2 === 0 ? "bg-gray-50" : ""}>
      <TableCell className="text-center border border-gray-300 p-2 font-bold text-lg">
        {index + 1}
      </TableCell>
      <TableCell className="border border-gray-300 p-2">-</TableCell>
      <TableCell className="text-center border border-gray-300 p-2">-</TableCell>
      <TableCell className="text-center border border-gray-300 p-2">-</TableCell>
      <TableCell className="text-center border border-gray-300 p-2">-</TableCell>
      <TableCell className="text-center border border-gray-300 p-2">-</TableCell>
      <TableCell className="text-center border border-gray-300 p-2">-</TableCell>
      <TableCell className="text-center border border-gray-300 p-2">-</TableCell>
      <TableCell className="text-center border border-gray-300 p-2">-</TableCell>
      <TableCell className="text-center border border-gray-300 p-2 font-bold">-</TableCell>
      <TableCell className="border border-gray-300 p-2">-</TableCell>
      <TableCell className="text-center border border-gray-300 p-2 print:hidden">-</TableCell>
    </TableRow>
  ));

  return (
    <>
      {emptyRows}
      <TableRow>
        <TableCell colSpan={12} className="text-center border border-gray-300 py-[5px] bg-gray-100">
          لا توجد أصناف. قم بالضغط على زر "إضافة صنف" أو استخدم البحث السريع لإضافة صنف جديد.
        </TableCell>
      </TableRow>
    </>
  );
};
