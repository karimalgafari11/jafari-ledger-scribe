
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, FilePlus, FileText, Send, Download } from "lucide-react";

// بيانات تجريبية لعروض الأسعار
const mockQuotes = [
  {
    id: "QTE-001",
    date: new Date(2023, 3, 10),
    customer: "مؤسسة الفيصل للسيارات",
    total: 6500.00,
    status: "sent",
    validUntil: new Date(2023, 4, 10),
  },
  {
    id: "QTE-002",
    date: new Date(2023, 3, 12),
    customer: "شركة النخبة للخدمات",
    total: 2300.50,
    status: "accepted",
    validUntil: new Date(2023, 4, 12),
  },
  {
    id: "QTE-003",
    date: new Date(2023, 3, 15),
    customer: "مؤسسة الصقر للسيارات",
    total: 15750.75,
    status: "rejected",
    validUntil: new Date(2023, 4, 15),
  },
  {
    id: "QTE-004",
    date: new Date(2023, 3, 17),
    customer: "شركة الرياض للصيانة",
    total: 4200.00,
    status: "draft",
    validUntil: new Date(2023, 4, 17),
  },
  {
    id: "QTE-005",
    date: new Date(2023, 3, 20),
    customer: "مجموعة الجزيرة للتجارة",
    total: 8900.25,
    status: "expired",
    validUntil: new Date(2023, 3, 25),
  },
];

const QuotesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quotes, setQuotes] = useState(mockQuotes);

  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewQuote = (id: string) => {
    toast.info(`عرض عرض السعر ${id}`);
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة تفاصيل عرض السعر
  };

  const handleSendQuote = (id: string) => {
    toast.info(`إرسال عرض السعر ${id}`);
    // في التطبيق الحقيقي، سيتم فتح نافذة لإرسال عرض السعر
  };

  const handleCreateQuote = () => {
    toast.info("إنشاء عرض سعر جديد");
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة إنشاء عرض سعر جديد
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-blue-500">مرسل</Badge>;
      case "accepted":
        return <Badge className="bg-green-500">مقبول</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">مرفوض</Badge>;
      case "draft":
        return <Badge className="bg-gray-500">مسودة</Badge>;
      case "expired":
        return <Badge className="bg-yellow-500">منتهي الصلاحية</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="عروض الأسعار" showBack={true} />

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث عن عرض سعر..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-10 w-72"
            />
          </div>
        </div>
        <Button onClick={handleCreateQuote}>
          <FilePlus className="ml-2 h-4 w-4" />
          عرض سعر جديد
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم العرض</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>الإجمالي</TableHead>
                  <TableHead>صالح حتى</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">{quote.id}</TableCell>
                    <TableCell>
                      {quote.date.toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell>{quote.customer}</TableCell>
                    <TableCell>
                      {quote.total.toLocaleString("ar-SA")} ريال
                    </TableCell>
                    <TableCell>
                      {quote.validUntil.toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell>{getStatusBadge(quote.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewQuote(quote.id)}
                        >
                          <FileText size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSendQuote(quote.id)}
                          disabled={quote.status === "expired" || quote.status === "rejected"}
                        >
                          <Send size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.info(`تنزيل العرض ${quote.id}`)}
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
  );
};

export default QuotesPage;
