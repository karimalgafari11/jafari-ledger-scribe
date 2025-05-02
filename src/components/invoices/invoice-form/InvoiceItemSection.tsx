
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceItemForm } from "@/components/invoices/InvoiceItemForm";
import { InvoiceItem } from "@/types/invoices";
import { InvoiceSettingsType } from "./InvoiceSettings";

interface InvoiceItemSectionProps {
  isAddingItem: boolean;
  editingItemIndex: number | null;
  editingItem?: InvoiceItem;
  handleAddItem: (item: Partial<InvoiceItem>) => void;
  handleUpdateItem: (item: Partial<InvoiceItem>) => void;
  handleCancelEdit: () => void;
  handleCancelAdd: () => void;
  settings?: InvoiceSettingsType;
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
    <Card className="mb-4">
      <CardContent className="p-3">
        <h3 className="text-md font-bold mb-2">
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
