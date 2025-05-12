
import React, { useMemo } from "react";
import { Customer } from "@/types/customers";
import { formatCurrency } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CustomersTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onViewStatement: (customer: Customer) => void;
}

export const CustomersTable = ({
  customers,
  onEdit,
  onDelete,
  onViewStatement,
}: CustomersTableProps) => {
  // تعريف أعمدة الجدول
  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "name",
        header: "اسم العميل",
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
      },
      {
        accessorKey: "type",
        header: "نوع العميل",
        cell: ({ row }) => (
          <div>
            {row.getValue("type") === "company" ? "شركة" : "فرد"}
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "رقم الهاتف",
      },
      {
        accessorKey: "email",
        header: "البريد الإلكتروني",
      },
      {
        accessorKey: "balance",
        header: "الرصيد",
        cell: ({ row }) => {
          return formatCurrency(row.getValue("balance"));
        },
      },
      {
        accessorKey: "status",
        header: "الحالة",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <Badge 
              className={status === "active" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
            >
              {status === "active" ? "نشط" : "غير نشط"}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "الإجراءات",
        cell: ({ row }) => {
          const customer = row.original;
          return (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(customer)}>
                <Edit size={16} />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(customer)}>
                <Trash size={16} />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onViewStatement(customer)}>
                <FileText size={16} />
              </Button>
            </div>
          );
        },
      },
    ],
    [onEdit, onDelete, onViewStatement]
  );
  
  return (
    <div className="rtl">
      <DataTable 
        columns={columns} 
        data={customers} 
        searchable={true}
        searchKey="name"
        enablePagination={true}
        emptyMessage="لا توجد بيانات للعرض"
        striped={true}
        hoverable={true}
        bordered={true}
      />
    </div>
  );
};
