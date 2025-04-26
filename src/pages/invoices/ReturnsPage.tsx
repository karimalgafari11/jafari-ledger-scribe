
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, FilePlus, FileText, Check, X } from "lucide-react";

// بيانات تجريبية لمرتجعات المبيعات
const mockReturns = [
  {
    id: "RET-001",
    date: new Date(2023, 3, 10),
    customer: "مؤسسة الفيصل للسيارات",
    total: 1250.00,
    status: "pending",
    invoiceId: "INV-001",
    reason: "قطع تالفة",
  },
  {
    id: "RET-002",
    date: new Date(2023, 3, 12),
    customer: "شركة النخبة للخدمات",
    total: 750.50,
    status: "approved",
    invoiceId: "INV-002",
    reason: "خطأ في الطلب",
  },
  {
    id: "RET-003",
    date: new Date(2023, 3, 15),
    customer: "مؤسسة الصقر للسيارات",
    total: 3200.75,
    status: "rejected",
    invoiceId: "INV-003",
    reason: "تأخر في التسليم",
  },
  {
    id: "RET-004",
    date: new Date(2023, 3, 18),
    customer: "شركة الرياض للصيانة",
    total: 900.25,
    status: "completed",
    invoiceId: "INV-004",
    reason: "قطع غير مناسبة",
  },
  {
    id: "RET-005",
    date: new Date(2023, 3, 20),
    customer: "مجموعة الجزيرة للتجارة",
    total: 1800.00,
    status: "pending",
    invoiceId: "INV-005",
    reason: "طلب خاطئ",
  },
];

const ReturnsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [returns, setReturns] = useState(mockReturns);

  const filteredReturns = returns.filter(
    (returnItem) =>
      returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewReturn = (id: string) => {
    toast.info(`عرض المرتجع ${id}`);
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة تفاصيل المرتجع
  };

  const handleApproveReturn = (id: string) => {
    toast.success(`تم الموافقة على المرتجع ${id}`);
    // في التطبيق الحقيقي، سيتم تحديث حالة المرتجع
    setReturns(
      returns.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item
      )
    );
  };

  const handleRejectReturn = (id: string) => {
    toast.info(`تم رفض المرتجع ${id}`);
    // في التطبيق الحقيقي، سيتم تحديث حالة المرتجع
    setReturns(
      returns.map((item) =>
        item.id === id ? { ...item, status: "rejected" } : item
      )
    );
  };

  const handleCreateReturn = () => {
    toast.info("إنشاء مرتجع جديد");
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة إنشاء مرتجع جديد
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">قيد المراجعة</Badge>;
      case "approved":
        return <Badge className="bg-green-500">تمت الموافقة</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">مرفوض</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">مكتمل</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="مرتجعات المبيعات" showBack={true} />

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
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

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم المرتجع</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الفاتورة</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>السبب</TableHead>
                  <TableHead>الإجمالي</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReturns.map((returnItem) => (
                  <TableRow key={returnItem.id}>
                    <TableCell className="font-medium">{returnItem.id}</TableCell>
                    <TableCell>
                      {returnItem.date.toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell>{returnItem.invoiceId}</TableCell>
                    <TableCell>{returnItem.customer}</TableCell>
                    <TableCell>{returnItem.reason}</TableCell>
                    <TableCell>
                      {returnItem.total.toLocaleString("ar-SA")} ريال
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnsPage;
