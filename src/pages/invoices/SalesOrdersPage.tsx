
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, FilePlus, FileText, Check, Truck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// بيانات تجريبية لأوامر البيع
const mockSalesOrders = [
  {
    id: "SO-001",
    date: new Date(2023, 3, 5),
    customer: "مؤسسة الفيصل للسيارات",
    total: 8750.00,
    status: "pending",
    items: 12,
  },
  {
    id: "SO-002",
    date: new Date(2023, 3, 8),
    customer: "شركة النخبة للخدمات",
    total: 3450.75,
    status: "processing",
    items: 5,
  },
  {
    id: "SO-003",
    date: new Date(2023, 3, 10),
    customer: "مؤسسة الصقر للسيارات",
    total: 17850.50,
    status: "shipped",
    items: 20,
  },
  {
    id: "SO-004",
    date: new Date(2023, 3, 15),
    customer: "شركة الرياض للصيانة",
    total: 5600.25,
    status: "completed",
    items: 8,
  },
  {
    id: "SO-005",
    date: new Date(2023, 3, 18),
    customer: "مجموعة الجزيرة للتجارة",
    total: 9200.00,
    status: "cancelled",
    items: 15,
  },
];

const SalesOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [salesOrders, setSalesOrders] = useState(mockSalesOrders);

  const filteredSalesOrders = salesOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewOrder = (id: string) => {
    toast.info(`عرض أمر البيع ${id}`);
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة تفاصيل أمر البيع
  };

  const handleProcessOrder = (id: string) => {
    toast.info(`تجهيز أمر البيع ${id}`);
    // في التطبيق الحقيقي، سيتم تحديث حالة أمر البيع وتوجيه المستخدم إلى صفحة التجهيز
  };

  const handleCompleteOrder = (id: string) => {
    toast.info(`إكمال أمر البيع ${id}`);
    // في التطبيق الحقيقي، سيتم تحديث حالة أمر البيع وتوجيه المستخدم إلى صفحة التجهيز
  };

  const handleCreateOrder = () => {
    toast.info("إنشاء أمر بيع جديد");
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة إنشاء أمر بيع جديد
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">قيد الانتظار</Badge>;
      case "processing":
        return <Badge variant="info">قيد التجهيز</Badge>;
      case "shipped":
        return <Badge variant="secondary">تم الشحن</Badge>;
      case "completed":
        return <Badge variant="success">مكتمل</Badge>;
      case "cancelled":
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Header title="أوامر البيع" showBack={true} onBackClick={handleBack} />

      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث عن أمر بيع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-10 w-72"
            />
          </div>
        </div>
        <Button onClick={handleCreateOrder}>
          <FilePlus className="ml-2 h-4 w-4" />
          أمر بيع جديد
        </Button>
      </div>

      <div className="flex-1 overflow-hidden px-6 pb-6">
        <Card className="h-full flex flex-col">
          <CardContent className="p-0 flex-1 overflow-auto">
            <div className="h-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الأمر</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>العميل</TableHead>
                    <TableHead>عدد الأصناف</TableHead>
                    <TableHead>الإجمالي</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSalesOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        {order.date.toLocaleDateString("ar-SA")}
                      </TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>
                        {order.total.toLocaleString("ar-SA")} ريال
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewOrder(order.id)}
                          >
                            <FileText size={16} />
                          </Button>
                          {order.status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleProcessOrder(order.id)}
                            >
                              <Truck size={16} />
                            </Button>
                          )}
                          {order.status === "processing" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCompleteOrder(order.id)}
                            >
                              <Check size={16} />
                            </Button>
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
    </div>
  );
};

export default SalesOrdersPage;
