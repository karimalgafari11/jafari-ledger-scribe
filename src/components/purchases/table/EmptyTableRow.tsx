
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";

interface EmptyTableRowProps {
  messageAr?: string;
  messageEn?: string;
}

export const EmptyTableRow: React.FC<EmptyTableRowProps> = ({
  messageAr = "لا توجد أصناف في الفاتورة. اضغط على زر 'إضافة صنف جديد' لإضافة منتجات.",
  messageEn = "No items in the invoice. Click 'Add New Item' to add products."
}) => {
  const { language } = useTranslation();
  const message = language === 'ar' ? messageAr : messageEn;
  
  return (
    <TableRow>
      <TableCell colSpan={8} className="py-10 text-center">
        <div className="text-gray-500">
          {message}
        </div>
      </TableCell>
    </TableRow>
  );
};
