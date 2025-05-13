
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
  handleUpdateItem: (index: number, item: Partial<InvoiceItem>) => void;
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

  const onSubmit = (item: Partial<InvoiceItem>) => {
    if (editingItemIndex !== null && editingItem) {
      handleUpdateItem(editingItemIndex, item);
    } else {
      handleAddItem(item);
    }
  };

  const onCancel = editingItemIndex !== null ? handleCancelEdit : handleCancelAdd;

  return (
    <Card className="mb-2 shadow-sm">
      <CardContent className="p-4">
        <InvoiceItemForm
          item={editingItem}
          onSubmit={onSubmit}
          onCancel={onCancel}
          includeNotes={settings?.showItemNotes !== false}
        />
      </CardContent>
    </Card>
  );
};
