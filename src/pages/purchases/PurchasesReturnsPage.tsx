import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, FilePlus, FileText, Check, X, ArrowLeft, Calendar, User, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PurchaseReturn } from "@/types/purchases";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import NewPurchaseReturnDialog from "@/components/purchases/returns/NewPurchaseReturnDialog";

// بيانات تجريبية لمرتجعات الشراء
const mockReturns: PurchaseReturn[] = [
  {
    id: "RET-001",
    returnNumber: "RET-001",
    date: new Date(2023, 3, 10),
    invoiceId: "INV-001",
    invoiceNumber: "INV-001",
    vendorId: "1",
    vendorName: "شركة الأجهزة الإلكترونية",
    items: [
      {
        id: "1",
        productId: "P-001",
        code: "P-001",
        name: "لاب توب HP",
        quantity: 2,
        price: 3500,
        total: 7000,
        reason: "منتج تالف"
      }
    ],
    subtotal: 7000,
    totalAmount: 8050,
    tax: 15,
    status: "pending",
    reason: "منتجات تالفة",
    notes: "تم استلام المنتجات ولكنها كانت تالفة",
    createdBy: "أحمد محمد",
    createdAt: new Date(2023, 3, 10),
  },
  {
    id: "RET-002",
    returnNumber: "RET-002",
    date: new Date(2023, 3, 15),
    invoiceId: "INV-002",
    invoiceNumber: "INV-002",
    vendorId: "2",
    vendorName: "شركة المستلزمات المكتبية",
    items: [
      {
        id: "2",
        productId: "P-002",
        code: "P-002",
        name: "طابعة Canon",
        quantity: 1,
        price: 1200,
        total: 1200,
        reason: "منتج غير مطابق للمواصفات"
      }
    ],
    subtotal: 1200,
    totalAmount: 1380,
    tax: 15,
    status: "approved",
    reason: "منتج غير مطابق للمواصفات",
    notes: "المنتج المستلم لا يطابق المواصفات المطلوبة",
    createdBy: "سارة أحمد",
    approvedBy: "خالد محمد",
    createdAt: new Date(2023, 3, 15),
    updatedAt: new Date(2023, 3, 16),
  },
  {
    id: "RET-003",
    returnNumber: "RET-003",
    date: new Date(2023, 3, 20),
    invoiceId: "INV-003",
    invoiceNumber: "INV-003",
    vendorId: "3",
    vendorName: "شركة الأثاث المكتبي",
    items: [
      {
        id: "3",
        productId: "P-003",
        code: "P-003",
        name: "كرسي مكتبي",
        quantity: 5,
        price: 450,
        total: 2250,
        reason: "خطأ في الطلب"
      }
    ],
    subtotal: 2250,
    totalAmount: 2587.5,
    tax: 15,
    status: "rejected",
    reason: "خطأ في الطلب",
    notes: "تم طلب كمية أكبر من المطلوب",
    createdBy: "محمد علي",
    approvedBy: "خالد محمد",
    createdAt: new Date(2023, 3, 20),
    updatedAt: new Date(2023, 3, 22),
  },
  {
    id: "RET-004",
    returnNumber: "RET-004",
    date: new Date(2023, 3, 25),
    invoiceId: "INV-004",
    invoiceNumber: "INV-004",
    vendorId: "4",
    vendorName: "شركة المواد الغذائية",
    items: [
      {
        id: "4",
        productId: "P-004",
        code: "P-004",
        name: "قهوة",
        quantity: 10,
        price: 25,
        total: 250,
        reason: "منتج قارب على انتهاء الصلاحية"
      }
    ],
    subtotal: 250,
    totalAmount: 287.5,
    tax: 15,
    status: "completed",
    reason: "منتج قارب على انتهاء الصلاحية",
    notes: "المنتجات المستلمة تنتهي صلاحيتها قريبًا",
    createdBy: "فاطمة محمد",
    approvedBy: "خالد محمد",
    createdAt: new Date(2023, 3, 25),
    updatedAt: new Date(2023, 3, 28),
  },
];

const PurchasesReturnsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // آخر 30 يوم
    to: new Date()
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const [returns, setReturns] = useState(mockReturns);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // تصفية البيانات حسب البحث والتاريخ والحالة
  const filteredReturns = returns.filter(
    (returnItem) => {
      // تصفية حسب كلمة البحث
      const matchesSearch = !searchTerm || 
        returnItem.returnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (returnItem.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
      // تصفية حسب التاريخ
      const matchesDate = !dateRange?.from || !dateRange?.to || 
        (returnItem.date >= dateRange.from && returnItem.date <= dateRange.to);
      
      // تصفية حسب الحالة
      const matchesStatus = statusFilter === 'all' || returnItem.status === statusFilter;
      
      return matchesSearch && matchesDate && matchesStatus;
    }
  );

  const handleViewReturn = (id: string) => {
    toast.info(`عرض تفاصيل المرتجع ${id}`);
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة تفاصيل المرتجع
  };

  const handleApproveReturn = (id: string) => {
    setReturns(
      returns.map((item) =>
        item.id === id ? { ...item, status: "approved", approvedBy: "المستخدم الحالي", updatedAt: new Date() } : item
      )
    );
    toast.success(`تم الموافقة على المرتجع ${id}`);
  };

  const handleRejectReturn = (id: string) => {
    setReturns(
      returns.map((item) =>
        item.id === id ? { ...item, status: "rejected", approvedBy: "المستخدم الحالي", updatedAt: new Date() } : item
      )
    );
    toast.info(`تم رفض المرتجع ${id}`);
  };

  const handleCreateReturn = () => {
    setIsDialogOpen(true);
  };

  const handleAddNewReturn = (newReturn: PurchaseReturn) => {
    setReturns([...returns, newReturn]);
    setIsDialogOpen(false);
    toast.success(`تم إضافة مرتجع جديد برقم ${newReturn.returnNumber}`);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">قيد المراجعة</Badge>;
      case "approved":
        return <Badge variant="success">تمت الموافقة</Badge>;
      case "rejected":
        return <Badge variant="destructive">مرفوض</Badge>;
      case "completed":
        return <Badge variant="default">مكتمل</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // حساب إحصائيات المرتجعات
  const totalReturns = filteredReturns.length;
  const totalAmount = filteredReturns.reduce((sum, item) => sum + item.totalAmount, 0);
  const pendingReturns = filteredReturns.filter(item => item.status === 'pending').length;
  const approvedReturns = filteredReturns.filter(item => item.status === 'approved').length;

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Header title="مرتجعات المشتريات" showBack={false} />

      {/* لوحة الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-blue-600">إجمالي المرتجعات</p>
                <p className="text-2xl font-bold mt-1">{totalReturns}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500 opacity-70" />
            </div>
            <p className="text-xs text-blue-500 mt-2">في الفترة المحددة</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-green-600">إجمالي المبالغ</p>
                <p className="text-2xl font-bold mt-1">{totalAmount.toLocaleString()} ريال</p>
              </div>
              <FileText className="h-8 w-8 text-green-500 opacity-70" />
            </div>
            <p className="text-xs text-green-500 mt-2">قيمة مرتجعات الفترة</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-amber-600">بانتظار الموافقة</p>
                <p className="text-2xl font-bold mt-1">{pendingReturns}</p>
              </div>
              <Calendar className="h-8 w-8 text-amber-500 opacity-70" />
            </div>
            <p className="text-xs text-amber-500 mt-2">مرتجعات تحتاج للمراجعة</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-purple-600">تمت الموافقة</p>
                <p className="text-2xl font-bold mt-1">{approvedReturns}</p>
              </div>
              <User className="h-8 w-8 text-purple-500 opacity-70" />
            </div>
            <p className="text-xs text-purple-500 mt-2">مرتجعات تمت الموافقة عليها</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4 px-6">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث عن مرتجع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-10 w-72"
            />
          </div>
        </div>
        <Button onClick={handleCreateReturn}>
          <FilePlus className="ml-2 h-4 w-4" />
          مرتجع جديد
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4 px-6">
        <div className="flex items-center gap-4">
          <DatePickerWithRange value={dateRange} onChange={setDateRange} />
          
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-[400px]">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="pending">قيد المراجعة</TabsTrigger>
              <TabsTrigger value="approved">موافق</TabsTrigger>
              <TabsTrigger value="rejected">مرفوض</TabsTrigger>
              <TabsTrigger value="completed">مكتمل</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-6 pb-6">
        <Card className="h-full flex flex-col">
          <CardContent className="p-0 flex-1 overflow-auto">
            <div className="h-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم المرتجع</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>رقم الفاتورة</TableHead>
                    <TableHead>المورد</TableHead>
                    <TableHead>سبب الإرجاع</TableHead>
                    <TableHead>عدد الأصناف</TableHead>
                    <TableHead>الإجمالي</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReturns.length > 0 ? (
                    filteredReturns.map((returnItem) => (
                      <TableRow key={returnItem.id}>
                        <TableCell className="font-medium">{returnItem.returnNumber}</TableCell>
                        <TableCell>{format(returnItem.date, "yyyy-MM-dd")}</TableCell>
                        <TableCell>{returnItem.invoiceNumber || "-"}</TableCell>
                        <TableCell>{returnItem.vendorName}</TableCell>
                        <TableCell>{returnItem.reason}</TableCell>
                        <TableCell>{returnItem.items.length}</TableCell>
                        <TableCell>
                          {returnItem.totalAmount.toLocaleString()} ريال
                        </TableCell>
                        <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewReturn(returnItem.id)}
                            >
                              <FileText size={16} />
                            </Button>
                            {returnItem.status === "pending" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600"
                                  onClick={() => handleApproveReturn(returnItem.id)}
                                >
                                  <Check size={16} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => handleRejectReturn(returnItem.id)}
                                >
                                  <X size={16} />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <Package className="h-10 w-10 text-gray-300 mb-2" />
                          <p className="text-lg font-medium text-gray-500">لا توجد مرتجعات متاحة</p>
                          <p className="text-sm text-gray-400">قم بإنشاء مرتجع جديد أو تعديل معايير البحث</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {isDialogOpen && (
        <NewPurchaseReturnDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onAdd={handleAddNewReturn}
        />
      )}
    </div>
  );
};

export default PurchasesReturnsPage;
