
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Invoice {
  id: string;
  customer: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
}

interface RecentInvoicesProps {
  invoices: Invoice[];
}

export const RecentInvoices: React.FC<RecentInvoicesProps> = ({ invoices }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'مدفوع';
      case 'pending':
        return 'قيد الانتظار';
      case 'overdue':
        return 'متأخر';
      default:
        return status;
    }
  };

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">الزبون</TableHead>
            <TableHead className="text-left">المبلغ</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="text-left w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.customer}</TableCell>
                <TableCell className="text-left">{invoice.amount}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <Badge className={getStatusClass(invoice.status)} variant="outline">
                    {getStatusText(invoice.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-left">
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                لا توجد فواتير حديثة
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
