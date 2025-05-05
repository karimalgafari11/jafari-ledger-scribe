
import React from "react";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Eye, CreditCard, Calendar } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";

interface PayablesTableProps {
  vendors: any[];
  onViewDetails: (vendor: any) => void;
  onMakePayment: (vendor: any) => void;
  onViewStatement: (vendor: any) => void;
}

export const PayablesTable: React.FC<PayablesTableProps> = ({
  vendors,
  onViewDetails,
  onMakePayment,
  onViewStatement
}) => {
  // تنسيق التاريخ
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA').format(date);
  };
  
  // تحديد حالة المورد بناءً على تاريخ الاستحقاق
  const getStatusBadge = (vendor: any) => {
    if (!vendor.dueDate) return null;
    
    const today = new Date();
    const dueDate = new Date(vendor.dueDate);
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff < 0) {
      return (
        <Badge className="bg-red-500">
          متأخر {Math.abs(daysDiff)} يوم
        </Badge>
      );
    } else if (daysDiff <= 7) {
      return (
        <Badge className="bg-amber-500">
          خلال {daysDiff} أيام
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-green-500">
          خلال {daysDiff} يوم
        </Badge>
      );
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table className="rtl">
        <TableHeader>
          <TableRow>
            <TableHead>اسم المورد</TableHead>
            <TableHead>رقم الحساب</TableHead>
            <TableHead>رقم الهاتف</TableHead>
            <TableHead>الرصيد المستحق</TableHead>
            <TableHead>حد الإئتمان</TableHead>
            <TableHead>تاريخ الاستحقاق</TableHead>
            <TableHead>حالة السداد</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                لا توجد بيانات للعرض
              </TableCell>
            </TableRow>
          ) : (
            vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell>{vendor.accountNumber || vendor.taxNumber || "-"}</TableCell>
                <TableCell>{vendor.phone || "-"}</TableCell>
                <TableCell>
                  <span className="font-medium text-purple-600">
                    {formatCurrency(vendor.balance)}
                  </span>
                </TableCell>
                <TableCell>{formatCurrency(vendor.creditLimit || 0)}</TableCell>
                <TableCell>{formatDate(vendor.dueDate)}</TableCell>
                <TableCell>
                  {getStatusBadge(vendor)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" title="عرض التفاصيل" onClick={() => onViewDetails(vendor)}>
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" title="سداد مستحقات" onClick={() => onMakePayment(vendor)}>
                      <CreditCard size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" title="كشف حساب" onClick={() => onViewStatement(vendor)}>
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
