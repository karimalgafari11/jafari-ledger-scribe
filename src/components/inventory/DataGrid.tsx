
import React from "react";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ColumnDefinition } from "@/components/inventory/types";
import { ActionDefinition } from "@/components/inventory/types";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";

interface DataGridProps {
  data: any[];
  columns: ColumnDefinition[];
  actions?: ActionDefinition[];
  selectable?: boolean;
  selectedRows?: string[];
  onToggleSelection?: (id: string) => void;
  onSelectAll?: (selected: boolean) => void;
  emptyMessage?: string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const DataGrid = ({
  data,
  columns,
  actions = [],
  selectable = false,
  selectedRows = [],
  onToggleSelection,
  onSelectAll,
  emptyMessage = "لا توجد بيانات",
  isLoading = false,
  error = null,
  onRetry
}: DataGridProps) => {
  // تحديد ما إذا كانت جميع الصفوف محددة
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;

  // التعامل مع تحديد/إلغاء تحديد جميع الصفوف
  const handleSelectAll = () => {
    if (onSelectAll) {
      onSelectAll(!isAllSelected);
    }
  };

  // عرض حالة التحميل
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">جاري تحميل البيانات...</p>
        </CardContent>
      </Card>
    );
  }

  // عرض حالة الخطأ
  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-lg font-medium">حدث خطأ أثناء تحميل البيانات</p>
          <p className="text-muted-foreground mt-2">{error}</p>
          {onRetry && (
            <Button 
              className="mt-4" 
              onClick={onRetry}
              variant="outline"
            >
              إعادة المحاولة
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  // عرض حالة البيانات الفارغة
  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-12 text-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    onChange={handleSelectAll}
                    checked={isAllSelected}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead 
                  key={column.id} 
                  className="text-right" 
                  style={{ width: column.width }}
                >
                  {column.header}
                </TableHead>
              ))}
              {actions.length > 0 && (
                <TableHead className="text-center">الإجراءات</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={row.id || rowIndex} className="hover:bg-muted/25">
                {selectable && (
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => onToggleSelection && onToggleSelection(row.id)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={`${row.id || rowIndex}-${column.id}`} className="text-right">
                    {column.cell 
                      ? column.cell(row[column.accessorKey], row)
                      : row[column.accessorKey]
                    }
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-1 rtl:space-x-reverse">
                      {actions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          variant={action.variant || "ghost"}
                          size="icon"
                          onClick={() => action.onClick(row)}
                          className={action.className}
                          title={action.label}
                        >
                          {action.icon}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
