
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Printer, Send } from "lucide-react";

interface PurchaseInvoiceActionsProps {
  onSave: () => void;
  onPrint: () => void;
  onWhatsAppSend: () => void;
  className?: string;
}

export const PurchaseInvoiceActions: React.FC<PurchaseInvoiceActionsProps> = ({
  onSave,
  onPrint,
  onWhatsAppSend,
  className
}) => {
  return (
    <div className={`flex justify-end gap-2 ${className}`}>
      <Button 
        variant="outline"
        onClick={onWhatsAppSend}
        className="flex items-center gap-1"
      >
        <Send size={18} />
        إرسال عبر واتساب
      </Button>
      
      <Button
        variant="outline"
        onClick={onPrint}
        className="flex items-center gap-1"
      >
        <Printer size={18} />
        طباعة
      </Button>
      
      <Button
        onClick={onSave}
        className="flex items-center gap-1"
      >
        <Save size={18} />
        حفظ الفاتورة
      </Button>
    </div>
  );
};
