
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Printer, Download, Share2, FileText, MessageSquare, Link, Database, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InvoiceActionsProps {
  notes: string | undefined;
  onNotesChange: (notes: string) => void;
  handlePrint: () => void;
  handleWhatsAppShare: () => void;
  handleCreatePDF: () => void;
  handleShare: () => void;
  invoiceId?: string;
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({
  notes,
  onNotesChange,
  handlePrint,
  handleWhatsAppShare,
  handleCreatePDF,
  handleShare,
  invoiceId
}) => {
  const navigate = useNavigate();

  const handleDownload = () => {
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
  };

  const navigateToInventory = () => {
    navigate("/inventory/products");
  };

  const navigateToCustomers = () => {
    navigate("/customers");
  };

  const navigateToAccounts = () => {
    navigate("/accounting/journal-entries");
  };

  const navigateToReports = () => {
    navigate("/reports");
  };

  return (
    <div className="space-y-2 mt-3">
      <div className="flex flex-wrap gap-2 print-hide">
        <Button 
          variant="outline" 
          className="h-9 text-base"
          onClick={handlePrint}
        >
          <Printer className="ml-2 h-4 w-4" />
          طباعة
        </Button>
        <Button 
          variant="outline" 
          className="h-9 text-base"
          onClick={handleDownload}
        >
          <Download className="ml-2 h-4 w-4" />
          تنزيل
        </Button>
        <Button 
          variant="outline" 
          className="h-9 text-base"
          onClick={handleShare}
        >
          <Share2 className="ml-2 h-4 w-4" />
          مشاركة
        </Button>
        <Button 
          variant="outline" 
          className="h-9 text-base"
          onClick={handleWhatsAppShare}
        >
          <MessageSquare className="ml-2 h-4 w-4" />
          واتساب
        </Button>
        <Button 
          variant="outline" 
          className="h-9 text-base"
          onClick={handleCreatePDF}
        >
          <FileText className="ml-2 h-4 w-4" />
          PDF
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 print-hide">
        <Button 
          variant="default" 
          className="h-9 text-base"
          onClick={navigateToInventory}
        >
          <Database className="ml-2 h-4 w-4" />
          المخزون
        </Button>
        <Button 
          variant="default" 
          className="h-9 text-base"
          onClick={navigateToCustomers}
        >
          <Link className="ml-2 h-4 w-4" />
          العملاء
        </Button>
        <Button 
          variant="default" 
          className="h-9 text-base"
          onClick={navigateToAccounts}
        >
          <Database className="ml-2 h-4 w-4" />
          الحسابات
        </Button>
        <Button 
          variant="default" 
          className="h-9 text-base"
          onClick={navigateToReports}
        >
          <FileText className="ml-2 h-4 w-4" />
          التقارير
        </Button>
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-base font-medium mb-1">ملاحظات</label>
        <Textarea
          id="notes"
          placeholder="أدخل أي ملاحظات إضافية هنا..."
          value={notes || ""}
          onChange={(e) => onNotesChange(e.target.value)}
          className="min-h-[60px] h-24 text-base"
        />
      </div>
    </div>
  );
};
