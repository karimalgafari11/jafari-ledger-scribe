
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Eye, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Payment {
  id: string;
  vendorName: string;
  amount: number;
  date: string;
  paymentMethod: string;
  reference?: string;
  status: 'completed' | 'pending' | 'failed';
  invoiceNumber?: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
  onViewAccounting?: (paymentId: string) => void;
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments, onViewAccounting }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.invoiceNumber && payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (payment.reference && payment.reference.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  };
  
  const getStatusBadge = (status: 'completed' | 'pending' | 'failed') => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">مكتملة</Badge>;
      case 'pending':
        return <Badge variant="warning">معلقة</Badge>;
      case 'failed':
        return <Badge variant="destructive">فشلت</Badge>;
      default:
        return null;
    }
  };
  
  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'cash':
        return 'نقدي';
      case 'bank':
        return 'تحويل بنكي';
      case 'check':
        return 'شيك';
      case 'card':
        return 'بطاقة ائتمان';
      default:
        return method;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث باسم المورد أو رقم الفاتورة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="جميع الحالات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="completed">مكتملة</SelectItem>
            <SelectItem value="pending">معلقة</SelectItem>
            <SelectItem value="failed">فشلت</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>المورد</TableHead>
              <TableHead>تاريخ الدفعة</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>طريقة الدفع</TableHead>
              <TableHead>رقم الفاتورة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.vendorName}</TableCell>
                  <TableCell>{formatDate(payment.date)}</TableCell>
                  <TableCell>{payment.amount.toLocaleString()} ريال</TableCell>
                  <TableCell>{getPaymentMethodText(payment.paymentMethod)}</TableCell>
                  <TableCell>{payment.invoiceNumber || "-"}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {payment.status === 'completed' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => onViewAccounting && onViewAccounting(payment.id)}
                        >
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  {searchTerm || statusFilter !== "all"
                    ? "لا توجد نتائج تطابق معايير البحث"
                    : "لا توجد دفعات مسجلة بعد"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
