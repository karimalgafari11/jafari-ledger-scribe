
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const PurchaseTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50">
        <TableHead className="text-center border border-gray-300 p-2 w-16 font-bold text-lg">#</TableHead>
        <TableHead className="text-center border border-gray-300 p-2">اسم الصنف</TableHead>
        <TableHead className="text-center border border-gray-300 p-2">رقم الصنف</TableHead>
        <TableHead className="text-center border border-gray-300 p-2">الشركة المصنعة</TableHead>
        <TableHead className="text-center border border-gray-300 p-2">المقاس</TableHead>
        <TableHead className="text-center border border-gray-300 p-2">الكميه</TableHead>
        <TableHead className="text-center border border-gray-300 p-2">السعر</TableHead>
        <TableHead className="text-center border border-gray-300 p-2">الخصم</TableHead>
        <TableHead className="text-center border border-gray-300 p-2">الضريبة</TableHead>
        <TableHead className="text-center border border-gray-300 p-2">الاجمالي</TableHead>
        <TableHead className="text-center border border-gray-300 p-2">ملاحظات</TableHead>
        <TableHead className="text-center border border-gray-300 p-2 w-20 print:hidden">إجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};
