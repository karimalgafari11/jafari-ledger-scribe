
import React from "react";
import { TableHead, TableHeader as UITableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";

interface TableHeaderProps {
  showItemCodes?: boolean;
  showItemNotes?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  showItemCodes = true,
  showItemNotes = true
}) => {
  const { language } = useTranslation();
  
  // الترجمات للعناوين
  const translations = {
    ar: {
      code: "الكود",
      item: "الصنف",
      unit: "الوحدة",
      quantity: "الكمية",
      price: "السعر",
      total: "الإجمالي",
      notes: "ملاحظات",
      actions: "الإجراءات"
    },
    en: {
      code: "Code",
      item: "Item",
      unit: "Unit",
      quantity: "Quantity",
      price: "Price",
      total: "Total",
      notes: "Notes",
      actions: "Actions"
    }
  };
  
  const t = translations[language];
  
  return (
    <UITableHeader>
      <TableRow>
        <TableHead className="w-12 text-center">#</TableHead>
        {showItemCodes && <TableHead className="w-24 text-center">{t.code}</TableHead>}
        <TableHead>{t.item}</TableHead>
        <TableHead className="w-16 text-center">{t.unit}</TableHead>
        <TableHead className="w-20 text-center">{t.quantity}</TableHead>
        <TableHead className={`w-24 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{t.price}</TableHead>
        <TableHead className={`w-24 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{t.total}</TableHead>
        {showItemNotes && <TableHead className="w-32 text-center">{t.notes}</TableHead>}
        <TableHead className="w-20 text-center">{t.actions}</TableHead>
      </TableRow>
    </UITableHeader>
  );
};
