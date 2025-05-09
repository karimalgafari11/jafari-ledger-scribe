
import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

interface TableColumnsProps {
  showItemCodes: boolean;
  showItemNotes: boolean;
}

export const TableColumns: React.FC<TableColumnsProps> = ({
  showItemCodes,
  showItemNotes
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-center w-12">#</TableHead>
        {showItemCodes && <TableHead className="text-center">رمز الصنف</TableHead>}
        <TableHead>اسم الصنف</TableHead>
        <TableHead className="text-center">الكمية</TableHead>
        <TableHead className="text-center">السعر</TableHead>
        <TableHead className="text-center">الإجمالي</TableHead>
        {showItemNotes && <TableHead>ملاحظات</TableHead>}
        <TableHead className="text-center w-24">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};
