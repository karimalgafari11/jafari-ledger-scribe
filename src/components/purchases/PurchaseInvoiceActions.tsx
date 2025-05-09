
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
  FileOutput,
  Trash,
  Printer,
  ChevronDown,
  Save,
} from "lucide-react";

interface PurchaseInvoiceActionsProps {
  selectedCount?: number;
  onExport?: (format: "pdf" | "excel" | "csv" | "json") => void;
  onDelete?: () => void;
  onPrint?: () => void;
  onSelectAll?: () => void;
  onUnselectAll?: () => void;
  onSave?: () => void;
  onWhatsAppSend?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const PurchaseInvoiceActions: React.FC<PurchaseInvoiceActionsProps> = ({
  selectedCount,
  onExport,
  onDelete,
  onPrint,
  onSelectAll,
  onUnselectAll,
  onSave,
  onWhatsAppSend,
  isLoading,
  className,
}) => {
  // If it's used in invoice form (has onSave)
  if (onSave) {
    return (
      <div className={`flex justify-between items-center mt-4 ${className || ''}`}>
        <div></div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          {onWhatsAppSend && (
            <Button
              variant="outline"
              onClick={onWhatsAppSend}
              disabled={isLoading}
            >
              إرسال عبر واتساب
            </Button>
          )}
          
          {onPrint && (
            <Button
              variant="outline"
              onClick={onPrint}
              disabled={isLoading}
            >
              <Printer className="ml-1 h-4 w-4" />
              طباعة
            </Button>
          )}
          
          <Button
            onClick={onSave}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="ml-1 h-4 w-4" />
            حفظ الفاتورة
          </Button>
        </div>
      </div>
    );
  }

  // Original bulk actions view
  return (
    <div className="bg-slate-100 p-2 rounded-md mt-2 flex flex-wrap justify-between items-center">
      <div className="flex items-center">
        <span className="text-sm font-medium ml-2">
          تم تحديد {selectedCount} فاتورة
        </span>
        {onSelectAll && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 mr-1 text-xs"
            onClick={onSelectAll}
          >
            <CheckSquare className="ml-1 h-3 w-3" />
            تحديد الكل
          </Button>
        )}
        {onUnselectAll && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={onUnselectAll}
          >
            <XSquare className="ml-1 h-3 w-3" />
            إلغاء التحديد
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1 mt-2 sm:mt-0">
        {onExport && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                تصدير
                <ChevronDown className="mr-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onExport("pdf")}>
                <FileOutput className="ml-2 h-4 w-4" />
                تصدير PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport("excel")}>
                <FileOutput className="ml-2 h-4 w-4" />
                تصدير Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport("csv")}>
                <FileOutput className="ml-2 h-4 w-4" />
                تصدير CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport("json")}>
                <FileOutput className="ml-2 h-4 w-4" />
                تصدير JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        {onPrint && (
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={onPrint}
          >
            <Printer className="ml-1 h-3 w-3" />
            طباعة
          </Button>
        )}
        
        {onDelete && (
          <Button
            variant="destructive"
            size="sm"
            className="h-8"
            onClick={onDelete}
          >
            <Trash className="ml-1 h-3 w-3" />
            حذف
          </Button>
        )}
      </div>
    </div>
  );
};
