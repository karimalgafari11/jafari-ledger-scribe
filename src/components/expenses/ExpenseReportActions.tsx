
import React from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, FileText, ArrowDown } from "lucide-react";
import { toast } from "sonner";

interface ExpenseReportActionsProps {
  onExport: (format: "excel" | "pdf") => void;
  onShare: () => void;
}

export const ExpenseReportActions: React.FC<ExpenseReportActionsProps> = ({
  onExport,
  onShare,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">نتائج التقرير</h2>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير التقرير
              <ArrowDown className="mr-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onExport("excel")}>
              <FileText className="ml-2 h-4 w-4" />
              تصدير كملف Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("pdf")}>
              <FileText className="ml-2 h-4 w-4" />
              تصدير كملف PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onShare}>
              <FileText className="ml-2 h-4 w-4" />
              مشاركة عبر WhatsApp
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
