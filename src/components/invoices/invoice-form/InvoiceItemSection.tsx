
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceItemForm } from "@/components/invoices/InvoiceItemForm";
import { InvoiceItem } from "@/types/invoices";
import { InvoiceSettings } from "./InvoiceSettings";

interface InvoiceItemSectionProps {
  isAddingItem: boolean;
  editingItemIndex: number | null;
  editingItem?: InvoiceItem;
  handleAddItem: (item: Partial<InvoiceItem>) => void;
  handleUpdateItem: (item: Partial<InvoiceItem>) => void;
  handleCancelEdit: () => void;
  handleCancelAdd: () => void;
  settings?: InvoiceSettings['InvoiceSettings'];
}

export const InvoiceItemSection: React.FC<InvoiceItemSectionProps> = ({
  isAddingItem,
  editingItemIndex,
  editingItem,
  handleAddItem,
  handleUpdateItem,
  handleCancelEdit,
  handleCancelAdd,
  settings
}) => {
  if (!isAddingItem && editingItemIndex === null) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-4">
          {editingItemIndex !== null ? "تعديل صنف" : "إضافة صنف جديد"}
        </h3>
        <InvoiceItemForm
          item={editingItem}
          onSubmit={editingItemIndex !== null ? handleUpdateItem : handleAddItem}
          onCancel={editingItemIndex !== null ? handleCancelEdit : handleCancelAdd}
          includeNotes={settings?.showItemNotes !== false}
        />
      </CardContent>
    </Card>
  );
};
