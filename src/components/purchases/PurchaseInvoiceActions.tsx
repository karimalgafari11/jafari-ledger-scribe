
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
} from "lucide-react";

interface PurchaseInvoiceActionsProps {
  selectedCount: number;
  onExport: (format: "pdf" | "excel" | "csv" | "json") => void;
  onDelete: () => void;
  onPrint: () => void;
  onSelectAll: () => void;
  onUnselectAll: () => void;
}

export const PurchaseInvoiceActions: React.FC<PurchaseInvoiceActionsProps> = ({
  selectedCount,
  onExport,
  onDelete,
  onPrint,
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
