
import { Badge } from "@/components/ui/badge";
import { ColumnDefinition } from "./types";

interface CreateCountingColumnsProps {
  formatDate: (date: Date) => string;
}

export const createCountingColumns = ({ 
  formatDate 
}: CreateCountingColumnsProps): ColumnDefinition[] => [
  {
    id: "date",
    header: "التاريخ",
    accessorKey: "date",
    width: "150px",
    isSortable: true,
    cell: (value: Date) => formatDate(value)
  },
  {
    id: "warehouseName",
    header: "المستودع",
    accessorKey: "warehouseName",
    width: "180px",
    isSortable: true
  },
  {
    id: "status",
    header: "الحالة",
    accessorKey: "status",
    width: "120px",
    isSortable: true,
    cell: (value: 'draft' | 'completed') => {
      if (value === 'draft') {
        return <Badge className="bg-amber-500">مسودة</Badge>;
      } else {
        return <Badge className="bg-green-600">مكتمل</Badge>;
      }
    }
  },
  {
    id: "itemsCount",
    header: "عدد الأصناف",
    accessorKey: "items",
    width: "120px",
    cell: (value: any[]) => value.length
  },
  {
    id: "notes",
    header: "ملاحظات",
    accessorKey: "notes",
    width: "200px"
  }
];
