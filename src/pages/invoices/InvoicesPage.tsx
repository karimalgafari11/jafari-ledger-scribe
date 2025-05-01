
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, FilePlus, FileText, Printer, Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// بيانات تجريبية للفواتير
const mockInvoices = [
  {
    id: "INV-001",
    date: new Date(2023, 3, 15),
    customer: "مؤسسة الفيصل للسيارات",
    total: 5250.75,
    status: "paid",
    items: 8,
  },
  {
    id: "INV-002",
    date: new Date(2023, 3, 18),
    customer: "شركة النخبة للخدمات",
    total: 1875.50,
    status: "pending",
    items: 3,
  },
  {
    id: "INV-003",
    date: new Date(2023, 3, 20),
    customer: "مؤسسة الصقر للسيارات",
    total: 12450.25,
    status: "paid",
    items: 15,
  },
  {
    id: "INV-004",
    date: new Date(2023, 3, 22),
    customer: "شركة الرياض للصيانة",
    total: 3200.00,
    status: "overdue",
    items: 6,
  },
  {
    id: "INV-005",
    date: new Date(2023, 3, 25),
    customer: "مجموعة الجزيرة للتجارة",
    total: 7560.80,
    status: "draft",
    items: 12,
  },
];

const InvoicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState(mockInvoices);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewInvoice = (id: string) => {
    toast.info(`عرض الفاتورة ${id}`);
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة تفاصيل الفاتورة
  };

  const handlePrintInvoice = (id: string) => {
    toast.info(`طباعة الفاتورة ${id}`);
    // في التطبيق الحقيقي، سيتم طباعة الفاتورة
  };

  const handleCreateInvoice = () => {
    toast.info("إنشاء فاتورة جديدة");
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة إنشاء فاتورة جديدة
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="success">مدفوعة</Badge>;
      case "pending":
        return <Badge variant="warning">قيد الانتظار</Badge>;
      case "overdue":
        return <Badge variant="destructive">متأخرة</Badge>;
      case "draft":
        return <Badge variant="secondary">مسودة</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Header title="الفواتير" showBack={true} onBackClick={handleBack} />

      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث عن فاتورة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-10 w-72"
            />
          </div>
        </div>
        <Button onClick={handleCreateInvoice}>
          <FilePlus className="ml-2 h-4 w-4" />
          فاتورة جديدة
        </Button>
      </div>

      <div className="flex-1 overflow-hidden px-6 pb-6">
        <Card className="h-full flex flex-col">
          <CardContent className="p-0 flex-1 overflow-auto">
            <div className="h-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الفاتورة</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>العميل</TableHead>
                    <TableHead>عدد الأصناف</TableHead>
                    <TableHead>الإجمالي</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        {invoice.date.toLocaleDateString("ar-SA")}
                      </TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell>{invoice.items}</TableCell>
                      <TableCell>
                        {invoice.total.toLocaleString("ar-SA")} ريال
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewInvoice(invoice.id)}
                          >
                            <FileText size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePrintInvoice(invoice.id)}
                          >
                            <Printer size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toast.info(`تنزيل الفاتورة ${invoice.id}`)}
                          >
                            <Download size={16} />
                          </Button>
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

export default InvoicesPage;
