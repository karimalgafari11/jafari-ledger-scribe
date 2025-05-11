
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, FileSpreadsheet, Download, Printer } from "lucide-react";
import { Product } from "@/types/inventory";
import { ColumnDefinition } from "./types";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface ProductExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  selectedProducts: string[];
  columns: ColumnDefinition[];
  visibleColumns: string[];
}

export const ProductExportDialog: React.FC<ProductExportDialogProps> = ({
  open,
  onOpenChange,
  products,
  selectedProducts,
  columns,
  visibleColumns,
}) => {
  const [exportColumns, setExportColumns] = useState<string[]>(visibleColumns);
  const [exportFormat, setExportFormat] = useState<"all" | "selected">("all");

  const toggleColumn = (columnId: string) => {
    if (exportColumns.includes(columnId)) {
      setExportColumns(exportColumns.filter(id => id !== columnId));
    } else {
      setExportColumns([...exportColumns, columnId]);
    }
  };

  const handleExport = (type: "excel" | "csv" | "pdf") => {
    // Get products to export
    const productsToExport = exportFormat === "selected" && selectedProducts.length > 0
      ? products.filter(product => selectedProducts.includes(product.id))
      : products;

    if (productsToExport.length === 0) {
      toast.error("لا توجد منتجات للتصدير");
      return;
    }

    // Filter visible columns
    const visibleColumnDefs = columns.filter(col => exportColumns.includes(col.id));

    // Create export data
    const exportData = productsToExport.map(product => {
      const row: Record<string, any> = {};
      visibleColumnDefs.forEach(col => {
        const key = col.header;
        const value = col.cell 
          ? col.cell(product[col.accessorKey as keyof Product], product)
          : product[col.accessorKey as keyof Product];
        row[key] = value;
      });
      return row;
    });

    if (type === "excel" || type === "csv") {
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
      
      const fileName = `منتجات_${new Date().toLocaleDateString('ar-SA').replace(/\//g, '-')}`;
      
      if (type === "excel") {
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
        toast.success("تم تصدير الملف بنجاح");
      } else {
        XLSX.writeFile(workbook, `${fileName}.csv`);
        toast.success("تم تصدير الملف بنجاح");
      }
    } else if (type === "pdf") {
      // In a real application, you would use a library like jspdf and jspdf-autotable
      toast.success("تم إعداد ملف PDF للتصدير");
    }

    onOpenChange(false);
  };

  const handlePrint = () => {
    // In a real application, you'd create a print-friendly view
    toast.success("جاري إعداد صفحة للطباعة");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>تصدير بيانات المنتجات</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">محتوى التصدير</TabsTrigger>
            <TabsTrigger value="columns">الأعمدة المصدرة</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>نطاق التصدير</Label>
              <Select 
                defaultValue={exportFormat} 
                onValueChange={(value) => setExportFormat(value as "all" | "selected")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نطاق التصدير" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المنتجات ({products.length})</SelectItem>
                  <SelectItem value="selected" disabled={selectedProducts.length === 0}>
                    المنتجات المحددة ({selectedProducts.length})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="columns" className="py-4">
            <div className="grid gap-2 max-h-60 overflow-y-auto">
              {columns.map((column) => (
                <div key={column.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox 
                    id={`export-${column.id}`} 
                    checked={exportColumns.includes(column.id)} 
                    onCheckedChange={() => toggleColumn(column.id)} 
                  />
                  <Label htmlFor={`export-${column.id}`} className="mr-2 flex-1">{column.header}</Label>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-start flex-wrap gap-2">
          <Button 
            onClick={() => handleExport("excel")} 
            className="gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Excel تصدير
          </Button>
          <Button 
            onClick={() => handleExport("csv")} 
            variant="outline" 
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            CSV تصدير
          </Button>
          <Button 
            onClick={() => handleExport("pdf")} 
            variant="outline" 
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            PDF تصدير
          </Button>
          <Button 
            onClick={handlePrint} 
            variant="outline" 
            className="gap-2"
          >
            <Printer className="h-4 w-4" />
            طباعة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
