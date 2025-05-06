
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Search, 
  FilePlus, 
  FileText, 
  Check, 
  Truck, 
  Download, 
  CalendarClock, 
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// بيانات تجريبية لأوامر البيع
const mockSalesOrders = [
  {
    id: "SO-001",
    date: new Date(2023, 3, 5),
    customer: "مؤسسة الفيصل للسيارات",
    total: 8750.00,
    status: "pending",
    items: 12,
    expectedDelivery: new Date(2023, 3, 15),
  },
  {
    id: "SO-002",
    date: new Date(2023, 3, 8),
    customer: "شركة النخبة للخدمات",
    total: 3450.75,
    status: "processing",
    items: 5,
    expectedDelivery: new Date(2023, 3, 18),
  },
  {
    id: "SO-003",
    date: new Date(2023, 3, 10),
    customer: "مؤسسة الصقر للسيارات",
    total: 17850.50,
    status: "shipped",
    items: 20,
    expectedDelivery: new Date(2023, 3, 20),
  },
  {
    id: "SO-004",
    date: new Date(2023, 3, 15),
    customer: "شركة الرياض للصيانة",
    total: 5600.25,
    status: "completed",
    items: 8,
    expectedDelivery: new Date(2023, 3, 25),
  },
  {
    id: "SO-005",
    date: new Date(2023, 3, 18),
    customer: "مجموعة الجزيرة للتجارة",
    total: 9200.00,
    status: "cancelled",
    items: 15,
    expectedDelivery: new Date(2023, 3, 28),
  },
  {
    id: "SO-006",
    date: new Date(2023, 4, 1),
    customer: "شركة المدينة للتجارة",
    total: 12750.50,
    status: "pending",
    items: 18,
    expectedDelivery: new Date(2023, 4, 10),
  },
  {
    id: "SO-007",
    date: new Date(2023, 4, 5),
    customer: "مؤسسة الخليج للخدمات",
    total: 6250.75,
    status: "processing",
    items: 9,
    expectedDelivery: new Date(2023, 4, 15),
  },
];

// إحصائيات أوامر البيع
const salesOrderStats = [
  { label: "إجمالي أوامر البيع", value: mockSalesOrders.length, color: "bg-blue-100 text-blue-800" },
  { label: "قيد الانتظار", value: mockSalesOrders.filter(order => order.status === "pending").length, color: "bg-amber-100 text-amber-800" },
  { label: "قيد التجهيز", value: mockSalesOrders.filter(order => order.status === "processing").length, color: "bg-purple-100 text-purple-800" },
  { label: "المشحونة", value: mockSalesOrders.filter(order => order.status === "shipped").length, color: "bg-indigo-100 text-indigo-800" },
  { label: "المكتملة", value: mockSalesOrders.filter(order => order.status === "completed").length, color: "bg-green-100 text-green-800" },
];

const SalesOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [salesOrders, setSalesOrders] = useState(mockSalesOrders);

  const filteredSalesOrders = salesOrders.filter(
    (order) => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    }
  );

  const handleViewOrder = (id: string) => {
    toast.info(`عرض أمر البيع ${id}`);
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة تفاصيل أمر البيع
  };

  const handleProcessOrder = (id: string) => {
    toast.success(`تم بدء تجهيز أمر البيع ${id}`);
    setSalesOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, status: "processing" } : order
      )
    );
  };

  const handleShipOrder = (id: string) => {
    toast.success(`تم شحن أمر البيع ${id}`);
    setSalesOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, status: "shipped" } : order
      )
    );
  };

  const handleCompleteOrder = (id: string) => {
    toast.success(`تم إكمال أمر البيع ${id}`);
    setSalesOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, status: "completed" } : order
      )
    );
  };

  const handleCreateOrder = () => {
    toast.info("إنشاء أمر بيع جديد");
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة إنشاء أمر بيع جديد
  };
  
  const handleExportOrders = () => {
    toast.info("جاري تصدير أوامر البيع");
    // في التطبيق الحقيقي، سيتم تصدير أوامر البيع كملف
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">قيد الانتظار</Badge>;
      case "processing":
        return <Badge variant="info" className="bg-purple-100 text-purple-800 hover:bg-purple-200">قيد التجهيز</Badge>;
      case "shipped":
        return <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">تم الشحن</Badge>;
      case "completed":
        return <Badge variant="success">مكتمل</Badge>;
      case "cancelled":
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (date: Date) => {
    return format(date, "yyyy/MM/dd");
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Header title="أوامر البيع" showBack={true} onBackClick={handleBack}>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportOrders}>
            <Download size={16} className="ml-1" />
            تصدير
          </Button>
          <Button size="sm" onClick={handleCreateOrder}>
            <FilePlus size={16} className="ml-1" />
            أمر بيع جديد
          </Button>
        </div>
      </Header>

      <main className="flex-1 overflow-hidden p-6">
        {/* إحصائيات أوامر البيع */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 rtl">
          {salesOrderStats.map((stat, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <span className={`text-3xl font-bold mb-1 ${stat.color.split(" ")[1]}`}>
                  {stat.value}
                </span>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* فلترة وبحث */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Filter size={18} className="ml-2" />
              فلترة أوامر البيع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rtl">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="بحث بالرقم، اسم العميل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="فلترة حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="processing">قيد التجهيز</SelectItem>
                  <SelectItem value="shipped">تم الشحن</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* جدول أوامر البيع */}
        <Card className="flex-1 overflow-hidden shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              قائمة أوامر البيع
            </CardTitle>
            <span className="text-sm text-gray-500">
              إجمالي النتائج: {filteredSalesOrders.length}
            </span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الأمر</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>العميل</TableHead>
                    <TableHead>عدد الأصناف</TableHead>
                    <TableHead>تاريخ التسليم المتوقع</TableHead>
                    <TableHead>الإجمالي</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSalesOrders.map((order) => (
                    <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{formatDate(order.date)}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{formatDate(order.expectedDelivery)}</TableCell>
                      <TableCell>
                        {order.total.toLocaleString("ar-SA")} ريال
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewOrder(order.id)}
                            title="عرض التفاصيل"
                          >
                            <FileText size={16} />
                          </Button>
                          
                          {order.status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleProcessOrder(order.id)}
                              title="بدء التجهيز"
                            >
                              <Truck size={16} />
                            </Button>
                          )}
                          
                          {order.status === "processing" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShipOrder(order.id)}
                              title="شحن الطلب"
                            >
                              <CalendarClock size={16} />
                            </Button>
                          )}
                          
                          {order.status === "shipped" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCompleteOrder(order.id)}
                              title="إكمال الطلب"
                            >
                              <Check size={16} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredSalesOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        لا توجد أوامر بيع مطابقة
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SalesOrdersPage;
