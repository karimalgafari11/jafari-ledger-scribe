
import React from "react";
import { ColumnDefinition } from "@/components/inventory/types";

export const getDefaultProductColumns = (): ColumnDefinition[] => {
  return [
    {
      id: "index",
      header: "الرقم التسلسلي",
      accessorKey: "index",
      cell: (value: any, row: any) => {
        const index = row.index || 0;
        return index + 1;
      },
      isSortable: false,
      isVisible: true,
    },
    {
      id: "name",
      header: "اسم المنتج",
      accessorKey: "name",
      isSortable: true,
      isVisible: true,
    },
    {
      id: "code",
      header: "رقم المنتج",
      accessorKey: "code",
      isSortable: true,
      isVisible: true,
    },
    {
      id: "brand",
      header: "الشركة الصانعة",
      accessorKey: "brand",
      isSortable: true,
      isVisible: true,
      cell: (value) => value || "غير محدد",
    },
    {
      id: "quantity",
      header: "الكمية المتوفرة",
      accessorKey: "quantity",
      isSortable: true,
      isVisible: true,
      cell: (value, row) => {
        if (!row) return "0";
        
        const quantity = row.quantity || 0;
        const reorderLevel = row.reorderLevel || 5;
        
        if (quantity <= 0) {
          return <span className="text-red-700 font-bold">{quantity}</span>;
        } else if (quantity < reorderLevel) {
          return <span className="text-orange-500 font-bold">{quantity}</span>;
        }
        
        return quantity;
      }
    },
    {
      id: "price",
      header: "سعر البيع",
      accessorKey: "price",
      cell: (_, row) => {
        if (row && typeof row.price === 'number') {
          return `${row.price.toFixed(2)} ر.س`;
        }
        return "غير محدد";
      },
      isSortable: true,
      isVisible: true,
    },
    {
      id: "costPrice",
      header: "سعر الشراء",
      accessorKey: "costPrice",
      cell: (_, row) => {
        if (row && typeof row.costPrice === 'number') {
          return `${row.costPrice.toFixed(2)} ر.س`;
        }
        return "غير محدد";
      },
      isSortable: true,
      isVisible: true,
    },
    {
      id: "size",
      header: "المقاس",
      accessorKey: "size",
      isSortable: true,
      isVisible: true,
      cell: (value) => value || "غير محدد",
    },
    {
      id: "notes",
      header: "الملاحظات",
      accessorKey: "description",
      isSortable: false,
      isVisible: true,
      cell: (value) => value || "-",
    },
    {
      id: "category",
      header: "التصنيف",
      accessorKey: "category",
      isSortable: true,
      isVisible: true,
    },
    {
      id: "status",
      header: "الحالة",
      accessorKey: "isActive",
      cell: (_, row) => {
        if (!row) return "";
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${row.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {row.isActive ? 'متوفر' : 'غير متوفر'}
          </span>
        );
      },
      isSortable: true,
      isVisible: true,
    },
  ];
};
