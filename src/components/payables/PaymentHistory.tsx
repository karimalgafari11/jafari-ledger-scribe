
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatters";
import { Eye, FileText, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PaymentHistoryProps {
  payments: {
    id: string;
    vendorName: string;
    amount: number;
    date: string;
    paymentMethod: string;
    reference?: string;
    status: "completed" | "pending" | "failed";
  }[];
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  // Format date to Arabic locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA");
  };

  // Translate payment method
  const translatePaymentMethod = (method: string) => {
    switch (method) {
      case "cash":
        return "نقدي";
      case "bank":
        return "تحويل بنكي";
      case "check":
        return "شيك";
      case "card":
        return "بطاقة ائتمانية";
      default:
        return method;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">مكتمل</Badge>;
      case "pending":
        return <Badge className="bg-amber-500">قيد المعالجة</Badge>;
      case "failed":
        return <Badge className="bg-red-500">فشل</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="rtl">
      {payments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">لا توجد مدفوعات لعرضها</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم العملية</TableHead>
                <TableHead>اسم المورد</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>تاريخ السداد</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>المرجع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.vendorName}</TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">
                      {formatCurrency(payment.amount)}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(payment.date)}</TableCell>
                  <TableCell>{translatePaymentMethod(payment.paymentMethod)}</TableCell>
                  <TableCell>{payment.reference || "-"}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" title="عرض التفاصيل">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" title="طباعة الإيصال">
                        <FileText size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
