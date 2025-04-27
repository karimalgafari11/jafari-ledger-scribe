
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Share2, Printer } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface JournalHeaderProps {
  onCreateEntry: () => void;
  onExport: (format: "pdf" | "excel") => void;
  onShareWhatsApp: () => void;
  onPrintPreview: () => void;
}

export const JournalHeader: React.FC<JournalHeaderProps> = ({
  onCreateEntry,
  onExport,
  onShareWhatsApp,
  onPrintPreview
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">القيود اليومية</h1>
        <p className="text-gray-600">إدارة وعرض القيود المحاسبية اليومية</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button onClick={onCreateEntry} className="bg-primary hover:bg-primary/90">
          <Plus className="ml-1 h-4 w-4" /> إضافة قيد جديد
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FileText className="ml-1 h-4 w-4" /> تصدير
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onExport("pdf")}>
              تصدير كـ PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("excel")}>
              تصدير كـ Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" onClick={onShareWhatsApp}>
          <Share2 className="ml-1 h-4 w-4" /> مشاركة عبر واتساب
        </Button>
        
        <Button variant="outline" onClick={onPrintPreview}>
          <Printer className="ml-1 h-4 w-4" /> معاينة قبل الطباعة
        </Button>
      </div>
    </div>
  );
};
