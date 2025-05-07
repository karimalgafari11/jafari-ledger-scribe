
import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

interface PurchaseTableHeaderProps {
  showItemCodes?: boolean;
  showItemNotes?: boolean;
}

export const PurchaseTableHeader: React.FC<PurchaseTableHeaderProps> = ({
  showItemCodes = true,
  showItemNotes = true
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-14 text-center">#</TableHead>
        {showItemCodes && <TableHead className="text-center w-28">رمز الصنف</TableHead>}
        <TableHead className="text-right">اسم الصنف</TableHead>
        <TableHead className="w-24 text-center">الوحدة</TableHead>
        <TableHead className="w-24 text-center">الكمية</TableHead>
        <TableHead className="w-28 text-center">سعر الوحدة</TableHead>
        <TableHead className="w-28 text-center">المجموع</TableHead>
        {showItemNotes && <TableHead className="text-right">ملاحظات</TableHead>}
        <TableHead className="w-24 text-center">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};
