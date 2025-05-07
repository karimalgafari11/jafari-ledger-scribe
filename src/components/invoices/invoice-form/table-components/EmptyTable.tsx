
import React from "react";
import { Plus } from "lucide-react";

interface EmptyTableProps {
  colSpan: number;
}

export const EmptyTable: React.FC<EmptyTableProps> = ({ colSpan }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="h-32 text-center align-middle border border-black">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <Plus className="h-8 w-8 mb-2 opacity-30" />
          <p className="text-sm">لا توجد أصناف في الفاتورة</p>
          <p className="text-xs mt-1">قم بإضافة أصناف باستخدام زر "إضافة صنف"</p>
        </div>
      </td>
    </tr>
  );
};
