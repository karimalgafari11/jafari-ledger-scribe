
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
        <TableHead className="w-[50px] text-center">#</TableHead>
        {showItemCodes && <TableHead className="text-center">الرمز</TableHead>}
        <TableHead>اسم الصنف</TableHead>
        <TableHead className="text-center">الوحدة</TableHead>
        <TableHead className="text-center">الكمية</TableHead>
        <TableHead className="text-center">السعر</TableHead>
        <TableHead className="text-center">المجموع</TableHead>
        {showItemNotes && <TableHead>ملاحظات</TableHead>}
        <TableHead className="text-center w-[100px]">الإجراءات</TableHead>
      </TableRow>
    </UITableHeader>
  );
};
