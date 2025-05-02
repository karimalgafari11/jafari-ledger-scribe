
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Printer, Download, Share2, FileText, MessageSquare } from "lucide-react";

interface InvoiceActionsProps {
  notes: string | undefined;
  onNotesChange: (notes: string) => void;
  handlePrint: () => void;
  handleWhatsAppShare: () => void;
  handleCreatePDF: () => void;
  handleShare: () => void;
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({
  notes,
  onNotesChange,
  handlePrint,
  handleWhatsAppShare,
  handleCreatePDF,
  handleShare
}) => {
  return (
    <div className="space-y-1 mt-2">
      <div className="flex flex-wrap gap-1 print-hide">
        <Button 
          variant="outline" 
          className="h-6 text-xs"
          onClick={handlePrint}
        >
          <Printer className="ml-1 h-3 w-3" />
          طباعة
        </Button>
        <Button 
          variant="outline" 
          className="h-6 text-xs"
          onClick={handleDownload}
        >
          <Download className="ml-1 h-3 w-3" />
          تنزيل
        </Button>
        <Button 
          variant="outline" 
          className="h-6 text-xs"
          onClick={handleShare}
        >
          <Share2 className="ml-1 h-3 w-3" />
          مشاركة
        </Button>
        <Button 
          variant="outline" 
          className="h-6 text-xs"
          onClick={handleWhatsAppShare}
        >
          <MessageSquare className="ml-1 h-3 w-3" />
          واتساب
        </Button>
        <Button 
          variant="outline" 
          className="h-6 text-xs"
          onClick={handleCreatePDF}
        >
          <FileText className="ml-1 h-3 w-3" />
          PDF
        </Button>
      </div>
      
      <label htmlFor="notes" className="block text-xs font-medium mb-0.5">ملاحظات</label>
      <Textarea
        id="notes"
        placeholder="أدخل أي ملاحظات إضافية هنا..."
        value={notes || ""}
        onChange={(e) => onNotesChange(e.target.value)}
        className="min-h-[40px] h-16 text-xs"
      />
    </div>
  );
};

// Function to handle download
function handleDownload() {
  // Create a filename with timestamp
  const date = new Date();
  const filename = `invoice_${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}.txt`;
  
  // In a real implementation, this would create an actual file
  // This is a simple placeholder implementation
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('Invoice data would go here'));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
