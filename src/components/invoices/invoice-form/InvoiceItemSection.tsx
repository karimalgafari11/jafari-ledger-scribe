
import React from "react";
import { InvoiceItem } from "@/types/invoices";
import { InvoiceItemForm } from "./InvoiceItemForm";
import { Card, CardContent } from "@/components/ui/card";
import { QuickProductSearch } from "./QuickProductSearch";

interface InvoiceItemSectionProps {
  item?: InvoiceItem;
  isNewItem?: boolean;
  onSave: (item: Partial<InvoiceItem>) => void;
  onCancel: () => void;
  onProductSearch?: () => void;
}

export const InvoiceItemSection: React.FC<InvoiceItemSectionProps> = ({
  item,
  isNewItem = true,
  onSave,
  onCancel,
  onProductSearch
}) => {
  const handleSave = (updatedItem: Partial<InvoiceItem>) => {
    onSave(updatedItem);
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <InvoiceItemForm
          item={item}
          onCancel={onCancel}
          onSave={handleSave}
        />
      </CardContent>
    </Card>
  );
};
