
import React from "react";
import { TableHead, TableHeader as UITableHeader, TableRow } from "@/components/ui/table";

interface TableHeaderProps {
  showItemCodes?: boolean;
  showItemNotes?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  showItemCodes = true,
  showItemNotes = true
}) => {
  return (
    <UITableHeader>
      <TableRow>
        <TableHead className="w-12 text-center">#</TableHead>
        {showItemCodes && <TableHead className="w-24 text-center">الكود</TableHead>}
        <TableHead>الصنف</TableHead>
        <TableHead className="w-16 text-center">الوحدة</TableHead>
        <TableHead className="w-20 text-center">الكمية</TableHead>
        <TableHead className="w-24 text-left">السعر</TableHead>
        <TableHead className="w-24 text-left">الإجمالي</TableHead>
        {showItemNotes && <TableHead className="w-32 text-center">ملاحظات</TableHead>}
        <TableHead className="w-20 text-center">الإجراءات</TableHead>
      </TableRow>
    </UITableHeader>
  );
};
