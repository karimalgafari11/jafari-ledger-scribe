
import React from "react";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Eye, CreditCard } from "lucide-react";
import { Customer } from "@/types/customers";
import { formatCurrency } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ReceivablesTableProps {
  customers: Customer[];
  onViewDetails: (customer: Customer) => void;
  onCollectPayment: (customer: Customer) => void;
}

export const ReceivablesTable: React.FC<ReceivablesTableProps> = ({
  customers,
  onViewDetails,
  onCollectPayment
}) => {
  const navigate = useNavigate();
  
  const handleViewStatement = (customer: Customer) => {
    navigate(`/customers/statement/${customer.id}`);
  };

  // إذا لم تكن هناك بيانات عملاء، سنقوم بإنشاء بيانات وهمية للعرض
  const demoCustomers = customers.length > 0 ? customers : [
    {
      id: "c1",
      name: "شركة الأمل للتجارة",
      accountNumber: "CU-1001",
      phone: "0512345678",
      email: "alamal@example.com",
      balance: 12500,
      creditLimit: 20000,
      status: "active",
      type: "company"
    },
    {
      id: "c2",
      name: "مؤسسة السلام",
      accountNumber: "CU-1002",
      phone: "0598765432",
      email: "salam@example.com",
      balance: 8200,
      creditLimit: 10000,
      status: "active",
      type: "company"
    },
    {
      id: "c3",
      name: "محمد عبدالله",
      accountNumber: "CU-1003",
      phone: "0554321678",
      email: "mohammed@example.com",
      balance: 3800,
      creditLimit: 5000,
      status: "active",
      type: "individual"
    }
  ];

  return (
    <div className="rounded-md border overflow-hidden">
      <Table className="rtl">
        <TableHeader>
          <TableRow>
            <TableHead>اسم العميل</TableHead>
            <TableHead>رقم الحساب</TableHead>
            <TableHead>رقم الهاتف</TableHead>
            <TableHead>الرصيد المستحق</TableHead>
            <TableHead>حد الائتمان</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demoCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                لا توجد بيانات للعرض
              </TableCell>
            </TableRow>
          ) : (
            demoCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.accountNumber || "-"}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <span className="font-medium text-red-600">
                    {formatCurrency(customer.balance)}
                  </span>
                </TableCell>
                <TableCell>{formatCurrency(customer.creditLimit || 0)}</TableCell>
                <TableCell>
                  <Badge 
                    className={
                      customer.balance > (customer.creditLimit || 5000) ? 'bg-red-500' : 
                      customer.balance > (customer.creditLimit || 5000) * 0.7 ? 'bg-amber-500' : 'bg-green-500'
                    }
                  >
                    {customer.balance > (customer.creditLimit || 5000) ? 'متجاوز' : 
                     customer.balance > (customer.creditLimit || 5000) * 0.7 ? 'مقترب' : 'طبيعي'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" title="عرض التفاصيل" onClick={() => onViewDetails(customer)}>
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" title="كشف حساب" onClick={() => handleViewStatement(customer)}>
                      <FileText size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" title="تحصيل دفعة" onClick={() => onCollectPayment(customer)}>
                      <CreditCard size={16} />
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
