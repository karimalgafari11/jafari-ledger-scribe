
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckSquare,
  XSquare,
  Download,
  Trash,
  Printer,
  ChevronDown,
  MessageSquare,
} from "lucide-react";

interface InvoicesActionsProps {
  selectedCount: number;
  onExport: (format: "pdf" | "excel") => void;
  onDelete: () => void;
  onPrint: () => void;
  onWhatsApp: () => void;
  onSelectAll: () => void;
  onUnselectAll: () => void;
}

export const InvoicesActions: React.FC<InvoicesActionsProps> = ({
  selectedCount,
  onExport,
  onDelete,
  onPrint,
  onWhatsApp,
  onSelectAll,
  onUnselectAll,
}) => {
  return (
    <div className="bg-slate-100 p-2 rounded-md mt-2 flex flex-wrap justify-between items-center">
      <div className="flex items-center">
        <span className="text-sm font-medium ml-2">
          تم تحديد {selectedCount} فاتورة
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 mr-1 text-xs"
          onClick={onSelectAll}
        >
          <CheckSquare className="ml-1 h-3 w-3" />
          تحديد الكل
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs"
          onClick={onUnselectAll}
        >
          <XSquare className="ml-1 h-3 w-3" />
          إلغاء التحديد
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-1 mt-2 sm:mt-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              تصدير
              <ChevronDown className="mr-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onExport("pdf")}>
              <Download className="ml-2 h-4 w-4" />
              تصدير PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("excel")}>
              <Download className="ml-2 h-4 w-4" />
              تصدير Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={onPrint}
        >
          <Printer className="ml-1 h-3 w-3" />
          طباعة
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={onWhatsApp}
        >
          <MessageSquare className="ml-1 h-3 w-3" />
          إرسال واتساب
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          className="h-8"
          onClick={onDelete}
        >
          <Trash className="ml-1 h-3 w-3" />
          حذف
        </Button>
      </div>
    </div>
  );
};
