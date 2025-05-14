
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Printer, 
  Share2, 
  Download, 
  ClipboardCopy, 
  ExternalLink, 
  Send
} from "lucide-react";

interface InvoiceActionsProps {
  notes: string | undefined;
  onNotesChange: (notes: string) => void;
  invoiceId: string;
  handlePrint: () => void;
  handleWhatsAppShare: () => void;
  handleCreatePDF: () => void;
  handleShare: () => void;
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({
  notes,
  onNotesChange,
  invoiceId,
  handlePrint,
  handleWhatsAppShare,
  handleCreatePDF,
  handleShare
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 print-hide">
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-4">
            <Label htmlFor="notes">ملاحظات الفاتورة</Label>
            <Textarea
              id="notes"
              placeholder="أدخل أي ملاحظات إضافية هنا..."
              value={notes || ""}
              onChange={(e) => onNotesChange(e.target.value)}
              className="h-24 resize-none"
            />
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardContent className="p-4 flex flex-col gap-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handlePrint}
            >
              <Printer className="ml-2 h-4 w-4" />
              طباعة الفاتورة
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleCreatePDF}
            >
              <Download className="ml-2 h-4 w-4" />
              تنزيل PDF
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleWhatsAppShare}
            >
              <Send className="ml-2 h-4 w-4" />
              إرسال عبر واتساب
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Share2 className="ml-2 h-4 w-4" />
                  مشاركة الفاتورة
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/invoice/${invoiceId}`);
                }}>
                  <ClipboardCopy className="h-4 w-4 ml-2" />
                  نسخ رابط الفاتورة
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  window.open(`${window.location.origin}/invoice/${invoiceId}?preview=true`, '_blank');
                }}>
                  <ExternalLink className="h-4 w-4 ml-2" />
                  فتح في نافذة جديدة
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="h-4 w-4 ml-2" />
                  مشاركة أخرى
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
