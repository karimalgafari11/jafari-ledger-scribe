
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Share2, Printer, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { JournalHeader } from "../JournalHeader";
import { JournalEntry } from "@/types/journal";

interface JournalActionsProps {
  selectedEntries: string[];
  entries: JournalEntry[];
  onExport: (format: "pdf" | "excel") => void;
  onPrintPreview: () => void;
  onCreateEntry: () => void;
  onShareWhatsApp: () => void;
}

export const JournalActions: React.FC<JournalActionsProps> = ({
  selectedEntries,
  entries,
  onExport,
  onPrintPreview,
  onCreateEntry,
  onShareWhatsApp,
}) => {
  const hasSelectedEntries = selectedEntries.length > 0;

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">القيود اليومية</h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة وعرض القيود المحاسبية اليومية
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={onCreateEntry}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="ml-1 h-4 w-4" /> إضافة قيد جديد
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" onClick={onPrintPreview} title="طباعة">
              <Printer className="h-4 w-4" />
              <span className="hidden lg:inline mr-1">طباعة</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" title="تصدير">
                  <FileText className="h-4 w-4" />
                  <span className="hidden lg:inline mr-1">تصدير</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onExport("pdf")}>
                  <FileText className="ml-2 h-4 w-4" />
                  تصدير كـ PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport("excel")}>
                  <FileText className="ml-2 h-4 w-4" />
                  تصدير كـ Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              onClick={onShareWhatsApp}
              disabled={!hasSelectedEntries}
              title="مشاركة"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden lg:inline mr-1">مشاركة</span>
              {hasSelectedEntries && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center mr-1">
                  {selectedEntries.length}
                </span>
              )}
            </Button>
          </div>

          {/* قائمة منسدلة للشاشات الصغيرة */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onPrintPreview}>
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onExport("pdf")}>
                  <FileText className="ml-2 h-4 w-4" />
                  تصدير كـ PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport("excel")}>
                  <FileText className="ml-2 h-4 w-4" />
                  تصدير كـ Excel
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onShareWhatsApp}
                  disabled={!hasSelectedEntries}
                >
                  <Share2 className="ml-2 h-4 w-4" />
                  مشاركة عبر واتساب
                  {hasSelectedEntries && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">
                      {selectedEntries.length}
                    </span>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
