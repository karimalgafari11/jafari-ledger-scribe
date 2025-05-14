
import React from "react";
import { TableHeader as UITableHeader, TableRow, TableHead } from "@/components/ui/table";

interface TableHeaderProps {
  showItemCodes?: boolean;
  showItemNotes?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  showItemCodes = true,
  showItemNotes = true
}) => {
  return (
    <UITableHeader className="bg-primary-50" dir="rtl">
      <TableRow>
        <TableHead className="text-center border border-gray-300 p-2 font-bold">#</TableHead>
        
        {showItemCodes && (
          <TableHead className="text-center border border-gray-300 p-2 font-bold">رمز الصنف</TableHead>
        )}
        
        <TableHead className="text-center border border-gray-300 p-2 font-bold">اسم الصنف</TableHead>
        <TableHead className="text-center border border-gray-300 p-2 font-bold">الوحدة</TableHead>
        <TableHead className="text-center border border-gray-300 p-2 font-bold">الكمية</TableHead>
        <TableHead className="text-center border border-gray-300 p-2 font-bold">السعر</TableHead>
        <TableHead className="text-center border border-gray-300 p-2 font-bold">الإجمالي</TableHead>
        
        {showItemNotes && (
          <TableHead className="text-center border border-gray-300 p-2 font-bold">ملاحظات</TableHead>
        )}
        
        <TableHead className="text-center border border-gray-300 p-2 font-bold">إجراءات</TableHead>
      </TableRow>
    </UITableHeader>
  );
};
