
import React, { useState, useMemo } from "react";
import { Transaction } from "@/types/transactions";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, CreditCard, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";

interface TransactionsTableProps {
  transactions: Transaction[];
  totalBalance: number;
}

export const TransactionsTable = ({ transactions, totalBalance }: TransactionsTableProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "invoice":
        return <FileText size={16} className="text-blue-500" />;
      case "payment":
        return <CreditCard size={16} className="text-green-500" />;
      case "return":
        return <RotateCcw size={16} className="text-amber-500" />;
      default:
        return null;
    }
  };

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case "invoice":
        return <Badge variant="outline" className="bg-blue-50 text-blue-500 border-blue-200">فاتورة</Badge>;
      case "payment":
        return <Badge variant="outline" className="bg-green-50 text-green-500 border-green-200">دفعة</Badge>;
      case "return":
        return <Badge variant="outline" className="bg-amber-50 text-amber-500 border-amber-200">مرتجع</Badge>;
      default:
        return null;
    }
  };

  const totalCredit = transactions.reduce((sum, t) => sum + t.credit, 0);
  const totalDebit = transactions.reduce((sum, t) => sum + t.debit, 0);

  // تحديد الأعمدة
  const columns = useMemo<ColumnDef<Transaction>[]>(() => [
    {
      id: "expander",
      header: "",
      cell: ({ row }) => (
        <div 
          className="cursor-pointer text-center" 
          onClick={() => setExpandedRow(expandedRow === row.original.id ? null : row.original.id)}
        >
          {expandedRow === row.original.id ? (
            <ChevronUp size={16} className="text-gray-500" />
          ) : (
            <ChevronDown size={16} className="text-gray-500" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "التاريخ",
      cell: ({ row }) => {
        return formatDate(row.original.date.toISOString());
      },
    },
    {
      accessorKey: "reference",
      header: "المرجع",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("reference")}</div>;
      },
    },
    {
      accessorKey: "type",
      header: "نوع المعاملة",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return (
          <div className="flex items-center justify-end gap-1">
            {getTransactionBadge(type)}
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "الوصف",
    },
    {
      accessorKey: "debit",
      header: "الخصم",
      cell: ({ row }) => {
        const debit = row.getValue("debit") as number;
        return debit > 0 ? (
          <div className="text-red-600 font-medium">{formatCurrency(debit)}</div>
        ) : null;
      },
    },
    {
      accessorKey: "credit",
      header: "الإضافة",
      cell: ({ row }) => {
        const credit = row.getValue("credit") as number;
        return credit > 0 ? (
          <div className="text-green-600 font-medium">{formatCurrency(credit)}</div>
        ) : null;
      },
    },
    {
      accessorKey: "balance",
      header: "الرصيد",
      cell: ({ row }) => {
        return <div className="font-medium">{formatCurrency(row.getValue("balance"))}</div>;
      },
    },
  ], [expandedRow]);

  // إضافة صف الرصيد الافتتاحي (يمكن تنفيذه من خلال إضافة سجل افتتاحي إلى transactions)
  const openingBalanceRow: Transaction = {
    id: "opening-balance",
    date: new Date(),
    reference: "رصيد افتتاحي",
    type: "opening",
    description: "الرصيد الافتتاحي",
    debit: 0,
    credit: 0,
    balance: 0
  };

  const allTransactions = [openingBalanceRow, ...transactions];

  return (
    <Card>
      <CardContent>
        <DataTable
          columns={columns}
          data={allTransactions}
          hoverable={true}
          striped={true}
          bordered={true}
          searchable={false}
          enablePagination={true}
          emptyMessage="لا توجد معاملات للعرض"
          getRowId={(row) => row.id}
          enableExport={true}
          tableName="سجل_المعاملات"
        />
      </CardContent>
    </Card>
  );
}
