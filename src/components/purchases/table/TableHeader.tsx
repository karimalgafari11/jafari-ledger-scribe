
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
        <TableHead className="w-16 text-center">#</TableHead>
        {showItemCodes && <TableHead>الكود</TableHead>}
        <TableHead className="min-w-[200px]">الصنف</TableHead>
        <TableHead className="min-w-[80px] text-center">الوحدة</TableHead>
        <TableHead className="min-w-[80px] text-center">الكمية</TableHead>
        <TableHead className="min-w-[100px] text-center">سعر الوحدة</TableHead>
        <TableHead className="min-w-[100px] text-center">الضريبة</TableHead>
        <TableHead className="min-w-[100px] text-center">الخصم</TableHead>
        <TableHead className="min-w-[120px] text-center">الإجمالي</TableHead>
        {showItemNotes && <TableHead className="min-w-[200px]">ملاحظات</TableHead>}
        <TableHead className="w-16 text-center">حذف</TableHead>
      </TableRow>
    </TableHeader>
  );
};
