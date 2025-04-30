
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye, FileText } from "lucide-react";
import { Customer } from "@/types/customers";
import { formatCurrency } from "@/utils/formatters";
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
  return (
    <div className="rounded-md border">
      <Table className="rtl">
        <TableHeader>
          <TableRow>
            <TableHead>اسم العميل</TableHead>
            <TableHead>نوع العميل</TableHead>
            <TableHead>رقم الهاتف</TableHead>
            <TableHead>البريد الإلكتروني</TableHead>
            <TableHead>الرصيد</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                لا توجد بيانات للعرض
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>
                  {customer.type === 'company' ? 'شركة' : 'فرد'}
                </TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{formatCurrency(customer.balance)}</TableCell>
                <TableCell>
                  <Badge 
                    className={customer.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
                  >
                    {customer.status === 'active' ? 'نشط' : 'غير نشط'}
                  </Badge>
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
