
import React from "react";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye, FileText, CreditCard, MoreVertical, Calendar } from "lucide-react";
import { Customer } from "@/types/customers";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ReceivablesAccountsTableProps {
  customers: Customer[];
  selectedCustomers: string[];
  onToggleSelection: (customerId: string) => void;
  onViewDetails: (customer: Customer) => void;
  onCollectPayment: (customer: Customer) => void;
  onSchedulePayment: (customer: Customer) => void;
  onViewStatement: (customerId: string) => void;
}

export const ReceivablesAccountsTable: React.FC<ReceivablesAccountsTableProps> = ({
  customers,
  selectedCustomers,
  onToggleSelection,
  onViewDetails,
  onCollectPayment,
  onSchedulePayment,
  onViewStatement
}) => {
  const getStatusBadge = (customer: Customer) => {
    const percentOfLimit = customer.creditLimit 
      ? (customer.balance / customer.creditLimit) * 100
      : 100;
  
    if (percentOfLimit > 100) {
      return <Badge className="bg-red-500">متأخر</Badge>;
    } else if (percentOfLimit > 90) {
      return <Badge className="bg-orange-500">حرج</Badge>;
    } else if (percentOfLimit > 75) {
      return <Badge className="bg-amber-500">وشيك</Badge>;
    } else {
      return <Badge className="bg-green-500">عادي</Badge>;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table className="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox 
                checked={selectedCustomers.length > 0 && selectedCustomers.length === customers.length}
                onCheckedChange={() => {
                  if (selectedCustomers.length === customers.length) {
                    onToggleSelection("all");
                  } else {
                    customers.forEach(c => onToggleSelection(c.id));
                  }
                }}
              />
            </TableHead>
            <TableHead>اسم العميل</TableHead>
            <TableHead>رقم الحساب</TableHead>
            <TableHead>رقم الهاتف</TableHead>
            <TableHead>الرصيد المستحق</TableHead>
            <TableHead>تاريخ آخر معاملة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                لا توجد بيانات للعرض
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedCustomers.includes(customer.id)} 
                    onCheckedChange={() => onToggleSelection(customer.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.accountNumber || "-"}</TableCell>
                <TableCell>{customer.phone}</TableCell>
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
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" title="عرض التفاصيل" onClick={() => onViewDetails(customer)}>
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" title="تحصيل دفعة" onClick={() => onCollectPayment(customer)}>
                      <CreditCard size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" title="كشف حساب" onClick={() => onViewStatement(customer.id)}>
                      <FileText size={16} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onSchedulePayment(customer)}>
                          <Calendar size={14} className="ml-2" />
                          جدولة السداد
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(`mailto:${customer.email}`)}>
                          إرسال بريد إلكتروني
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
