
import React from "react";
import { InvoiceItem } from "@/types/invoices";
import { InvoiceItemForm } from "../../InvoiceItemForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface ItemFormDialogProps {
  open: boolean;
  currentEditItem: InvoiceItem | null;
  onClose: () => void;
  onSubmit: (item: Partial<InvoiceItem>) => void;
  includeNotes: boolean;
}

export const ItemFormDialog: React.FC<ItemFormDialogProps> = ({
  open,
  currentEditItem,
  onClose,
  onSubmit,
  includeNotes
}) => {
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentEditItem ? "تعديل صنف" : "إضافة صنف"}</DialogTitle>
        </DialogHeader>
        <InvoiceItemForm
          item={currentEditItem || undefined}
          onSubmit={onSubmit}
          onCancel={onClose}
          includeNotes={includeNotes}
        />
      </DialogContent>
    </Dialog>
  );
};
