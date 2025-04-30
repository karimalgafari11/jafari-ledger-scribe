
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ColumnDefinition } from "@/components/inventory/types";

interface CreateColumnsOptions {
  formatDate: (date: Date) => string;
  currency: string;
}

export const createDamagedItemColumns = ({ formatDate, currency }: CreateColumnsOptions): ColumnDefinition[] => {
  const getCurrencySymbol = (currencyCode: string) => {
    switch (currencyCode) {
      case "SAR": return "ر.س";
      case "USD": return "$";
      case "EUR": return "€";
      case "AED": return "د.إ";
      default: return currencyCode;
    }
  };

  return [
    {
      id: "serialNumber",
      header: "م",
      accessorKey: "",
      width: "50px",
      cell: (_, row) => row.index + 1
    },
    {
      id: "productCode",
      header: "رقم المادة",
      accessorKey: "productCode",
      width: "120px",
      isSortable: true
    },
    {
      id: "productName",
      header: "اسم المادة",
      accessorKey: "productName",
      width: "180px",
      isSortable: true
    },
    {
      id: "manufacturer",
      header: "الشركة المصنعة",
      accessorKey: "manufacturer",
      width: "150px",
      isSortable: true
    },
    {
      id: "purchasePrice",
      header: "سعر الشراء",
      accessorKey: "purchasePrice",
      width: "120px",
      isSortable: true,
      cell: (value: number) => `${value.toFixed(2)} ${getCurrencySymbol(currency)}`
    },
    {
      id: "sellingPrice",
      header: "سعر البيع",
      accessorKey: "sellingPrice",
      width: "120px",
      isSortable: true,
      cell: (value: number) => `${value.toFixed(2)} ${getCurrencySymbol(currency)}`
    },
    {
      id: "quantity",
      header: "الكمية",
      accessorKey: "quantity",
      width: "100px",
      isSortable: true
    },
    {
      id: "reason",
      header: "سبب التلف",
      accessorKey: "reason",
      width: "120px",
      isSortable: true,
      cell: (value: string) => {
        let color;
        let label;
        
        switch(value) {
          case 'expired':
            color = "bg-amber-600";
            label = "منتهي الصلاحية";
            break;
          case 'damaged':
            color = "bg-red-600";
            label = "تالف";
            break;
          case 'broken':
            color = "bg-orange-600";
            label = "مكسور";
            break;
          case 'quality':
            color = "bg-blue-600";
            label = "مشاكل جودة";
            break;
          default:
            color = "bg-gray-600";
            label = "أخرى";
        }
        
        return <Badge className={color}>{label}</Badge>;
      }
    },
    {
      id: "warehouseName",
      header: "المستودع",
      accessorKey: "warehouseName",
      width: "140px",
      isSortable: true
    },
    {
      id: "date",
      header: "تاريخ التسجيل",
      accessorKey: "date",
      width: "140px",
      isSortable: true,
      cell: (value: Date) => formatDate(value)
    },
    {
      id: "notes",
      header: "ملاحظات",
      accessorKey: "notes",
      width: "200px"
    }
  ];
};
