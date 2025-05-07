
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ColumnDefinition } from "@/components/inventory/DataGrid";

interface CreateColumnsOptions {
  formatDate: (date: Date) => string;
}

export const createStockMovementColumns = ({ formatDate }: CreateColumnsOptions): ColumnDefinition[] => {
  return [
    {
      id: "date",
      header: "التاريخ",
      accessorKey: "date",
      width: "150px",
      isSortable: true,
      cell: (value: Date) => formatDate(value)
    },
    {
      id: "type",
      header: "نوع الحركة",
      accessorKey: "type",
      width: "120px",
      isSortable: true,
      cell: (value: 'purchase' | 'sale' | 'return' | 'transfer' | 'adjustment' | 'damaged' | 'inbound' | 'outbound') => {
        let color;
        let label;
        
        switch(value) {
          case 'purchase':
          case 'inbound':
            color = "bg-green-600";
            label = "وارد";
            break;
          case 'sale':
          case 'outbound':
            color = "bg-red-600";
            label = "صادر";
            break;
          case 'transfer':
            color = "bg-blue-600";
            label = "نقل";
            break;
          case 'return':
            color = "bg-yellow-600";
            label = "إرجاع";
            break;
          case 'adjustment':
            color = "bg-purple-600";
            label = "تعديل";
            break;
          case 'damaged':
            color = "bg-red-800";
            label = "تالف";
            break;
          default:
            color = "bg-gray-600";
            label = "غير معروف";
        }
        
        return <Badge className={color}>{label}</Badge>;
      }
    },
    {
      id: "itemName",
      header: "الصنف",
      accessorKey: "itemName",
      width: "200px",
      isSortable: true
    },
    {
      id: "quantity",
      header: "الكمية",
      accessorKey: "quantity",
      width: "100px",
      isSortable: true
    },
    {
      id: "sourceWarehouse",
      header: "المصدر",
      accessorKey: "sourceWarehouse",
      width: "150px",
      isSortable: true
    },
    {
      id: "destinationWarehouse",
      header: "الوجهة",
      accessorKey: "destinationWarehouse",
      width: "150px",
      isSortable: true
    },
    {
      id: "notes",
      header: "ملاحظات",
      accessorKey: "notes",
      width: "200px"
    }
  ];
};
