
import React from "react";
import { TableHead, TableRow, TableHeader } from "@/components/ui/table";

export const PurchaseTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow className="rtl">
        <TableHead className="text-center">الإجراءات</TableHead>
        <TableHead className="text-center">ملاحظات</TableHead>
        <TableHead className="text-center">الإجمالي</TableHead>
        <TableHead className="text-center">السعر</TableHead>
        <TableHead className="text-center">الكمية</TableHead>
        <TableHead className="text-center">اسم الصنف</TableHead>
        <TableHead className="text-center">رمز الصنف</TableHead>
        <TableHead className="text-center">#</TableHead>
      </TableRow>
    </TableHeader>
  );
};
