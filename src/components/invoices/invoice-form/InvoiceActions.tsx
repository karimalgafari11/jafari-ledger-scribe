
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
    <div className="space-y-4">
      <label htmlFor="notes" className="block text-sm font-medium mb-1">ملاحظات</label>
      <Textarea
        id="notes"
        placeholder="أدخل أي ملاحظات إضافية هنا..."
        value={notes || ""}
        onChange={(e) => onNotesChange(e.target.value)}
        className="min-h-[120px]"
      />
      
      <div className="flex space-x-2 rtl space-x-reverse print-hide">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handlePrint}
        >
          <Printer className="ml-2 h-4 w-4" />
          طباعة
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleWhatsAppShare}
        >
          <SendHorizontal className="ml-2 h-4 w-4" />
          واتساب
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleCreatePDF}
        >
          <FileText className="ml-2 h-4 w-4" />
          PDF
        </Button>
      </div>
    </div>
  );
};
