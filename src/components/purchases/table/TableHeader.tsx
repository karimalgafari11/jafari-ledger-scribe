
import React from "react";
import { TableActionButtons } from "./TableActionButtons";
import { TableHead, TableRow, TableHeader as UITableHeader, TableCell } from "@/components/ui/table";

interface TableHeaderProps {
  showItemCodes?: boolean;
  showItemNotes?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  showItemCodes = true,
  showItemNotes = true
}) => {
  return (
    <TableHead>
      <TableRow className="bg-muted/50">
        <TableCell className="font-medium text-center w-[80px]">الإجراء</TableCell>
        {showItemNotes && <TableCell className="font-medium">ملاحظات</TableCell>}
        <TableCell className="font-medium text-left">الإجمالي</TableCell>
        <TableCell className="font-medium">السعر</TableCell>
        <TableCell className="font-medium text-center">الكمية</TableCell>
        <TableCell className="font-medium text-right">اسم الصنف</TableCell>
        {showItemCodes && <TableCell className="font-medium text-center">الرمز</TableCell>}
        <TableCell className="font-medium text-center w-[50px]">#</TableCell>
      </TableRow>
    </TableHead>
  );
};
