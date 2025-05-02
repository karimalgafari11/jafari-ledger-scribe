
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceItemForm } from "@/components/invoices/InvoiceItemForm";
import { InvoiceItem } from "@/types/invoices";

interface InvoiceItemSectionProps {
  isAddingItem: boolean;
  editingItemIndex: number | null;
  editingItem: InvoiceItem | undefined;
  handleAddItem: (item: Partial<InvoiceItem>) => void;
  handleCancelAdd: () => void;
  handleUpdateItem: (item: Partial<InvoiceItem>) => void;
  handleCancelEdit: () => void;
}

export const InvoiceItemSection: React.FC<InvoiceItemSectionProps> = ({
  isAddingItem,
  editingItemIndex,
  editingItem,
  handleAddItem,
  handleCancelAdd,
  handleUpdateItem,
  handleCancelEdit
}) => {
  return (
    <>
      {isAddingItem && (
        <Card className="mb-4 border-2 border-black">
          <CardContent className="p-4">
            <h4 className="text-md font-bold mb-2">إضافة صنف جديد</h4>
            <InvoiceItemForm 
              onSubmit={handleAddItem}
              onCancel={handleCancelAdd}
              includeNotes={true}
            />
          </CardContent>
        </Card>
      )}

      {editingItemIndex !== null && editingItem && (
        <Card className="mb-4 border-2 border-black">
          <CardContent className="p-4">
            <h4 className="text-md font-bold mb-2">تعديل الصنف</h4>
            <InvoiceItemForm 
              item={editingItem}
              onSubmit={handleUpdateItem}
              onCancel={handleCancelEdit}
              includeNotes={true}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
};
