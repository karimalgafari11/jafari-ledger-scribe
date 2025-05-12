
import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/inventory";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductsTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onViewDetails: (id: string) => void;
  selectedProducts: string[];
  onToggleSelection: (id: string) => void;
}

export function ProductsTable({ 
  products, 
  onDelete, 
  onEdit, 
  onViewDetails,
  selectedProducts,
  onToggleSelection
}: ProductsTableProps) {
  // تخزين إعدادات الجدول
  const [tableConfig, setTableConfig] = useState({
    gridLines: true,
    striped: true,
    dense: false,
    bordered: true
  });

  // تحديد الأعمدة
  const columns = useMemo<ColumnDef<Product>[]>(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            // تحديث القائمة الرئيسية للمنتجات المحددة
            const selectedIds = value 
              ? products.map(product => product.id)
              : [];
            selectedIds.forEach(id => onToggleSelection(id));
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedProducts.includes(row.original.id)}
          onCheckedChange={(value) => {
            onToggleSelection(row.original.id);
            row.toggleSelected(!!value);
          }}
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "code",
      header: "رقم القطعة",
    },
    {
      accessorKey: "name",
      header: "اسم القطعة",
    },
    {
      accessorKey: "price",
      header: "السعر",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        return <div>{price.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "category",
      header: "التصنيف",
    },
    {
      accessorKey: "quantity",
      header: "الكمية المتاحة",
      cell: ({ row }) => {
        const quantity = parseInt(row.getValue("quantity"));
        const reorderLevel = row.original.reorderLevel;
        const className = quantity <= 0 
          ? "text-red-700 font-bold" 
          : quantity < reorderLevel 
          ? "text-orange-500 font-bold" 
          : "";
        return <div className={className}>{quantity}</div>;
      },
    },
    {
      accessorKey: "isActive",
      header: "الحالة",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return (
          <Badge 
            className={isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
          >
            {isActive ? 'متوفر' : 'غير متوفر'}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "الإجراءات",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(row.original.id);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(row.original.id);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(row.original.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ], [products, selectedProducts, onToggleSelection, onViewDetails, onEdit, onDelete]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTableConfig(prev => ({...prev, gridLines: !prev.gridLines}))}
          className="text-xs"
        >
          {tableConfig.gridLines ? "خطوط أفقية فقط" : "خطوط أفقية وعمودية"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTableConfig(prev => ({...prev, striped: !prev.striped}))}
          className="text-xs"
        >
          {tableConfig.striped ? "إيقاف التظليل" : "تفعيل التظليل"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTableConfig(prev => ({...prev, dense: !prev.dense}))}
          className="text-xs"
        >
          {tableConfig.dense ? "عرض موسع" : "عرض مضغوط"}
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden rtl">
        <DataTable 
          columns={columns}
          data={products}
          gridLines={tableConfig.gridLines}
          striped={tableConfig.striped}
          dense={tableConfig.dense}
          bordered={tableConfig.bordered}
          stickyHeader={true}
          searchable={true}
          searchKey="name"
          onRowClick={(product: Product) => onViewDetails(product.id)}
          emptyMessage="لا توجد قطع غيار متاحة"
        />
      </div>
    </div>
  );
}
