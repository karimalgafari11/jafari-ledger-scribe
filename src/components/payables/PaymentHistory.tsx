import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatters";
import { Eye, FileText, Printer, Check, X, Search, CreditCard, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentReceiptDialog } from "./PaymentReceiptDialog";
import { cn } from "@/lib/utils";

interface PaymentHistoryProps {
  payments: {
    id: string;
    vendorName: string;
    amount: number;
    date: string;
    paymentMethod: string;
    reference?: string;
    status: "completed" | "pending" | "failed";
    invoiceNumber?: string;
  }[];
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateSort, setDateSort] = useState<"asc" | "desc">("desc");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  
  // تنسيق التاريخ إلى اللغة العربية
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA");
  };

  // ترجمة طرق الدفع
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

  // الحصول على شارة الحالة
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">مكتمل</Badge>;
      case "pending":
        return <Badge className="bg-amber-500 hover:bg-amber-600">قيد المعالجة</Badge>;
      case "failed":
        return <Badge className="bg-red-500 hover:bg-red-600">فشل</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // فلترة وترتيب المدفوعات
  const filteredPayments = payments
    .filter(payment => 
      (searchTerm === "" || 
       payment.vendorName.includes(searchTerm) || 
       payment.id.includes(searchTerm) ||
       (payment.reference && payment.reference.includes(searchTerm)) ||
       (payment.invoiceNumber && payment.invoiceNumber.includes(searchTerm))
      ) && 
      (statusFilter === "all" || payment.status === statusFilter) &&
      (methodFilter === "all" || payment.paymentMethod === methodFilter)
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateSort === "asc" ? dateA - dateB : dateB - dateA;
    });
    
  // عرض تفاصيل السداد
  const handleViewReceipt = (payment: any) => {
    setSelectedPayment(payment);
    setIsReceiptDialogOpen(true);
  };
  
  // عرض إحصائيات الفلترة
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedCount = filteredPayments.filter(p => p.status === "completed").length;
  const pendingCount = filteredPayments.filter(p => p.status === "pending").length;
  
  return (
    <div className="rtl">
      {/* أدوات البحث والفلترة */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث عن مورد، رقم سند، مرجع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="حالة السداد" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="completed">مكتمل</SelectItem>
            <SelectItem value="pending">قيد المعالجة</SelectItem>
            <SelectItem value="failed">فشل</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="طريقة الدفع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الطرق</SelectItem>
            <SelectItem value="cash">نقدي</SelectItem>
            <SelectItem value="bank">تحويل بنكي</SelectItem>
            <SelectItem value="check">شيك</SelectItem>
            <SelectItem value="card">بطاقة ائتمانية</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDateSort(dateSort === "asc" ? "desc" : "asc")}
          title="ترتيب حسب التاريخ"
        >
          <Calendar className={cn(
            "h-4 w-4 transition-transform",
            dateSort === "asc" ? "rotate-0" : "rotate-180"
          )} />
        </Button>
      </div>
      
      {/* ملخص نتائج الفلترة */}
      {filteredPayments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">إجمالي المدفوعات</p>
                <p className="text-xl font-bold">{formatCurrency(totalAmount)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-400" />
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">عمليات مكتملة</p>
                <p className="text-xl font-bold">{completedCount} عملية</p>
              </div>
              <Check className="h-8 w-8 text-green-400" />
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">عمليات قيد المعالجة</p>
                <p className="text-xl font-bold">{pendingCount} عملية</p>
              </div>
              <span className="relative">
                <CreditCard className="h-8 w-8 text-amber-400" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-amber-500 rounded-full animate-pulse" />
              </span>
            </CardContent>
          </Card>
        </div>
      )}

      {/* جدول المدفوعات */}
      {filteredPayments.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-gray-50">
          <CreditCard size={48} className="mx-auto text-gray-300 mb-2" />
          <p className="text-gray-500">لا توجد مدفوعات لعرضها</p>
          <p className="text-gray-400 text-sm mt-1">حاول تغيير معايير البحث أو إضافة مدفوعات جديدة</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>رقم السند</TableHead>
                <TableHead>اسم المورد</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>تاريخ السداد</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>المرجع</TableHead>
                <TableHead>الفاتورة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id} className="border-b hover:bg-muted/20 transition-colors">
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
                  <TableCell>{payment.invoiceNumber || "-"}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="عرض التفاصيل"
                        onClick={() => handleViewReceipt(payment)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="طباعة الإيصال"
                        onClick={() => handleViewReceipt(payment)}
                      >
                        <Printer size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* نافذة عرض وطباعة الإيصال */}
      <PaymentReceiptDialog
        isOpen={isReceiptDialogOpen}
        onClose={() => setIsReceiptDialogOpen(false)}
        payment={selectedPayment}
      />
    </div>
  );
};
