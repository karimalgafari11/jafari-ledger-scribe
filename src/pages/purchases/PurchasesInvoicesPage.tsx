
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "@/components/ui/date-picker";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Search, FileText, Receipt, Download, ShoppingBag } from "lucide-react";
import { mockPurchaseInvoices } from "@/data/mockPurchaseInvoices";
import { PurchaseInvoice } from "@/types/purchases";

const PurchasesInvoicesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // ترشيح الفواتير بناءً على المعايير المحددة
  const filteredInvoices = mockPurchaseInvoices.filter((invoice) => {
    // فلترة بالبحث
    const matchesSearch =
      searchTerm === "" ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vendorName.toLowerCase().includes(searchTerm.toLowerCase());

    // فلترة بالحالة
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;

    // فلترة بالتاريخ
    let matchesDate = true;
    if (startDate && endDate) {
      const invoiceDate = new Date(invoice.date);
      matchesDate =
        invoiceDate >= startDate && invoiceDate <= endDate;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // تنقل إلى صفحة إنشاء فاتورة جديدة
  const handleCreateNew = () => {
    navigate("/purchases/new");
  };

  // تنقل إلى صفحة تفاصيل الفاتورة
  const handleViewInvoice = (id: string) => {
    // سيتم إضافة هذه الوظيفة لاحقاً
    console.log("View invoice:", id);
  };

  // تحديد لون الحالة
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // ترجمة حالة الفاتورة
  const translateStatus = (status: string): string => {
    switch (status) {
      case "paid":
        return "مدفوعة";
      case "pending":
        return "معلقة";
      case "overdue":
        return "متأخرة";
      case "draft":
        return "مسودة";
      default:
        return status;
    }
  };

  return (
    <Layout>
      <Header
        title="فواتير الشراء"
        showBack={false}
      />
      
      <div className="p-4 space-y-4">
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الفواتير</p>
                  <p className="text-2xl font-bold">{mockPurchaseInvoices.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">فواتير مدفوعة</p>
                  <p className="text-2xl font-bold">
                    {mockPurchaseInvoices.filter(inv => inv.status === "paid").length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Receipt className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">فواتير معلقة</p>
                  <p className="text-2xl font-bold">
                    {mockPurchaseInvoices.filter(inv => inv.status === "pending").length}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي المشتريات</p>
                  <p className="text-2xl font-bold">
                    {mockPurchaseInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0).toLocaleString()} ريال
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* أدوات الفلترة والبحث */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث عن فاتورة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="paid">مدفوعة</SelectItem>
                    <SelectItem value="pending">معلقة</SelectItem>
                    <SelectItem value="overdue">متأخرة</SelectItem>
                    <SelectItem value="draft">مسودة</SelectItem>
                  </SelectContent>
                </Select>
                
                <DatePicker
                  date={startDate}
                  onDateChange={setStartDate}
                  placeholder="من تاريخ"
                />
                
                <DatePicker
                  date={endDate}
                  onDateChange={setEndDate}
                  placeholder="إلى تاريخ"
                />
                
                <Button onClick={handleCreateNew} variant="default" className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  فاتورة جديدة
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* جدول الفواتير */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة فواتير الشراء</CardTitle>
            <CardDescription>
              عرض وإدارة فواتير المشتريات والمدفوعات للموردين
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الفاتورة</TableHead>
                    <TableHead>المورد</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>المدفوع</TableHead>
                    <TableHead>المتبقي</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.vendorName}</TableCell>
                        <TableCell>{new Date(invoice.date).toLocaleDateString("ar-SA")}</TableCell>
                        <TableCell>
                          {invoice.totalAmount.toLocaleString()} ريال
                        </TableCell>
                        <TableCell>
                          {(invoice.amountPaid || 0).toLocaleString()} ريال
                        </TableCell>
                        <TableCell>
                          {((invoice.totalAmount || 0) - (invoice.amountPaid || 0)).toLocaleString()} ريال
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {translateStatus(invoice.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewInvoice(invoice.id)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            عرض
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        لا توجد فواتير مطابقة لمعايير البحث
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PurchasesInvoicesPage;
