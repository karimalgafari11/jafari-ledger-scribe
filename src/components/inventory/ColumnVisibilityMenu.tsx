
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, Copy } from "lucide-react";
import { ColumnDefinition } from "./types";

interface ColumnVisibilityMenuProps {
  columns: ColumnDefinition[];
  onColumnVisibilityChange: (columnId: string, isVisible: boolean) => void;
  onResetColumns: () => void;
  onAutoSizeColumns: () => void;
  onCopyToClipboard: () => void;
}

export function ColumnVisibilityMenu({
  columns,
  onColumnVisibilityChange,
  onResetColumns,
  onAutoSizeColumns,
  onCopyToClipboard
}: ColumnVisibilityMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Settings className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rtl">
        <DropdownMenuItem onClick={onCopyToClipboard}>
          <Copy className="mr-2 h-4 w-4" />
          نسخ البيانات
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onAutoSizeColumns}>
          تلقائي العرض
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onResetColumns}>
          إعادة ترتيب الأعمدة
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {columns.map(column => (
          <DropdownMenuItem 
            key={column.id}
            onClick={() => onColumnVisibilityChange(
              column.id, 
              !column.isVisible
            )}
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={column.isVisible !== false}
              readOnly
            />
            {column.header}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
