
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Printer, SendHorizontal, FileText } from "lucide-react";

interface InvoiceActionsProps {
  notes: string | undefined;
  onNotesChange: (notes: string) => void;
  handlePrint: () => void;
  handleWhatsAppShare: () => void;
  handleCreatePDF: () => void;
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({
  notes,
  onNotesChange,
  handlePrint,
  handleWhatsAppShare,
  handleCreatePDF
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="notes" className="block text-xs font-medium mb-0.5">ملاحظات</label>
      <Textarea
        id="notes"
        placeholder="أدخل أي ملاحظات إضافية هنا..."
        value={notes || ""}
        onChange={(e) => onNotesChange(e.target.value)}
        className="min-h-[80px] h-24 text-sm"
      />
      
      <div className="flex space-x-2 rtl space-x-reverse print-hide">
        <Button 
          variant="outline" 
          className="flex-1 h-7 text-xs"
          onClick={handlePrint}
        >
          <Printer className="ml-1 h-3 w-3" />
          طباعة
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 h-7 text-xs"
          onClick={handleWhatsAppShare}
        >
          <SendHorizontal className="ml-1 h-3 w-3" />
          واتساب
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 h-7 text-xs"
          onClick={handleCreatePDF}
        >
          <FileText className="ml-1 h-3 w-3" />
          PDF
        </Button>
      </div>
    </div>
  );
};
