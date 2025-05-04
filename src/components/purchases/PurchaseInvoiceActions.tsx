
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Printer, Send } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className={cn("flex justify-end gap-2", className)}>
      <Button 
        variant="outline" 
        onClick={onSave}
        className="flex items-center gap-1"
      >
        <Save size={16} /> حفظ
      </Button>
      <Button 
        variant="outline" 
        onClick={onPrint}
        className="flex items-center gap-1"
      >
        <Printer size={16} /> طباعة
      </Button>
      <Button 
        onClick={onWhatsAppSend}
        className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
      >
        <Send size={16} /> إرسال للواتس
      </Button>
    </div>
  );
};
