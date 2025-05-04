
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Printer, Send, Loader2 } from "lucide-react";

interface PurchaseInvoiceActionsProps {
  onSave: () => void;
  onPrint: () => void;
  onWhatsAppSend: () => void;
  isLoading?: boolean;
  className?: string;
}

export const PurchaseInvoiceActions: React.FC<PurchaseInvoiceActionsProps> = ({
  onSave,
  onPrint,
  onWhatsAppSend,
  isLoading = false,
  className
}) => {
  return (
    <div className={`flex justify-end gap-2 ${className}`}>
      <Button 
        variant="outline"
        onClick={onWhatsAppSend}
        className="flex items-center gap-1"
        disabled={isLoading}
      >
        <Send size={18} />
        إرسال عبر واتساب
      </Button>
      
      <Button
        variant="outline"
        onClick={onPrint}
        className="flex items-center gap-1"
        disabled={isLoading}
      >
        <Printer size={18} />
        طباعة
      </Button>
      
      <Button
        onClick={onSave}
        className="flex items-center gap-1 bg-green-500 hover:bg-green-600"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            جاري الحفظ...
          </>
        ) : (
          <>
            <Save size={18} />
            حفظ الفاتورة
          </>
        )}
      </Button>
    </div>
  );
};
