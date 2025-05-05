
import React from "react";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, Send, MoreVertical, EyeIcon } from "lucide-react";
import { Customer } from "@/types/customers";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface CollectionTableProps {
  customers: Customer[];
  onViewDetails: (customer: Customer) => void;
  onCollectPayment: (customer: Customer) => void;
  onCollectionActions: (customer: Customer) => void;
  onSendReminder: (customerId: string) => void;
}

export const CollectionTable: React.FC<CollectionTableProps> = ({
  customers,
  onViewDetails,
  onCollectPayment,
  onCollectionActions,
  onSendReminder
}) => {
  const getStatusBadge = (customer: Customer) => {
    const percentOfLimit = customer.creditLimit 
      ? (customer.balance / customer.creditLimit) * 100
      : 100;
  
    if (percentOfLimit > 100) {
      return <Badge className="bg-red-500">متأخر جدًا</Badge>;
    } else if (percentOfLimit > 75) {
      return <Badge className="bg-orange-500">متأخر</Badge>;
    } else if (percentOfLimit > 50) {
      return <Badge className="bg-amber-500">مستحق قريبًا</Badge>;
    } else {
      return <Badge className="bg-green-500">عادي</Badge>;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table className="rtl">
        <TableHeader>
          <TableRow>
            <TableHead>اسم العميل</TableHead>
            <TableHead>رقم الحساب</TableHead>
            <TableHead>المبلغ المستحق</TableHead>
            <TableHead>تاريخ آخر معاملة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                لا توجد بيانات للعرض
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.accountNumber || "-"}</TableCell>
                <TableCell>
                  <span className="font-medium text-red-600">
                    {formatCurrency(customer.balance)}
                  </span>
                </TableCell>
                <TableCell>
                  {formatDate(customer.updatedAt.toISOString())}
                </TableCell>
                <TableCell>
                  {getStatusBadge(customer)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" title="عرض التفاصيل" onClick={() => onViewDetails(customer)}>
                      <EyeIcon size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" title="تحصيل دفعة" onClick={() => onCollectPayment(customer)}>
                      <CreditCard size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" title="إرسال تذكير" onClick={() => onSendReminder(customer.id)}>
                      <Send size={16} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onCollectionActions(customer)}>
                          إجراءات التحصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          كشف حساب تفصيلي
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          جدولة المديونية
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
