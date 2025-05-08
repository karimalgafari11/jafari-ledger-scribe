
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Percent, FileText, ArrowLeft, ChevronLeft, Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Sample data for price quotes
const sampleQuotes = [
  {
    id: "q1001",
    quoteNumber: "QT-1001",
    date: "2023-05-10",
    customerName: "شركة التقدم التجارية",
    validUntil: "2023-05-25",
    totalAmount: 12500,
    status: "active",
    items: 8,
  },
  {
    id: "q1002",
    quoteNumber: "QT-1002",
    date: "2023-05-12",
    customerName: "مؤسسة الأفق",
    validUntil: "2023-05-27",
    totalAmount: 8750,
    status: "expired",
    items: 5,
  },
  {
    id: "q1003",
    quoteNumber: "QT-1003",
    date: "2023-05-15",
    customerName: "شركة الإبداع للمقاولات",
    validUntil: "2023-05-30",
    totalAmount: 15800,
    status: "converted",
    items: 12,
  },
  {
    id: "q1004",
    quoteNumber: "QT-1004",
    date: "2023-05-18",
    customerName: "مؤسسة النور للتجارة",
    validUntil: "2023-06-02",
    totalAmount: 6300,
    status: "active",
    items: 4,
  },
  {
    id: "q1005",
    quoteNumber: "QT-1005",
    date: "2023-05-20",
    customerName: "شركة الريادة",
    validUntil: "2023-06-04",
    totalAmount: 9200,
    status: "draft",
    items: 7,
  }
];

const PriceQuotesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredQuotes = sampleQuotes.filter(quote => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        quote.quoteNumber.toLowerCase().includes(query) || 
        quote.customerName.toLowerCase().includes(query)
      );
    }
    
    // Apply tab filter
    if (activeTab !== 'all') {
      return quote.status === activeTab;
    }
    
    return true;
  });
  
  const handleNewQuote = () => {
    navigate("/invoices/quotes/new");
  };
  
  const handleViewQuote = (id: string) => {
    navigate(`/invoices/quotes/view/${id}`);
  };
  
  const handleEditQuote = (id: string) => {
    navigate(`/invoices/quotes/edit/${id}`);
  };
  
  const handleConvertToInvoice = (id: string) => {
    navigate(`/invoices/new?fromQuote=${id}`);
    toast.success("تم تحويل عرض السعر إلى فاتورة بنجاح");
  };
  
  const handleDeleteQuote = (id: string) => {
    toast.success("تم حذف عرض السعر بنجاح");
  };
  
  const handleExport = (format: "pdf" | "excel") => {
    toast.success(`تم تصدير عروض الأسعار بنجاح بتنسيق ${format}`);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">ساري</Badge>;
      case "expired":
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">منتهي</Badge>;
      case "converted":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">تم تحويله</Badge>;
      case "draft":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">مسودة</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <Header title="عروض الأسعار" showBack={true}>
        <div className="flex items-center gap-2">
          <Percent className="h-5 w-5 text-primary" />
          <span className="text-sm text-gray-300">إدارة عروض الأسعار للعملاء</span>
        </div>
      </Header>

      <div className="container mx-auto p-4">
        {/* إحصائيات عروض الأسعار */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">إجمالي عروض الأسعار</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{sampleQuotes.length}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">عروض سارية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{sampleQuotes.filter(q => q.status === 'active').length}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">عروض محولة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{sampleQuotes.filter(q => q.status === 'converted').length}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">إجمالي القيمة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{sampleQuotes.reduce((sum, q) => sum + q.totalAmount, 0).toLocaleString()} ر.س</p>
            </CardContent>
          </Card>
        </div>

        {/* أدوات عروض الأسعار */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-2">
              <Button onClick={handleNewQuote} className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> عرض سعر جديد
              </Button>
              <Button variant="outline" onClick={() => handleExport("pdf")}>
                <Download className="mr-2 h-4 w-4" /> تصدير PDF
              </Button>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="بحث في عروض الأسعار..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-8"
              />
              <button 
                className="absolute left-2.5 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchQuery("")}
              >
                {searchQuery && <ChevronLeft className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* قائمة عروض الأسعار */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full md:w-auto mb-4">
                <TabsTrigger value="all">الكل</TabsTrigger>
                <TabsTrigger value="active">ساري</TabsTrigger>
                <TabsTrigger value="converted">محول</TabsTrigger>
                <TabsTrigger value="expired">منتهي</TabsTrigger>
              </TabsList>
              
              <CardTitle className="text-xl font-bold">عروض الأسعار</CardTitle>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-right text-sm text-gray-500 border-b">
                    <th className="pb-2 font-medium">رقم العرض</th>
                    <th className="pb-2 font-medium">العميل</th>
                    <th className="pb-2 font-medium">التاريخ</th>
                    <th className="pb-2 font-medium">صالح حتى</th>
                    <th className="pb-2 font-medium">القيمة</th>
                    <th className="pb-2 font-medium">الحالة</th>
                    <th className="pb-2 font-medium">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredQuotes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-500">
                        لا توجد عروض أسعار مطابقة لبحثك
                      </td>
                    </tr>
                  ) : (
                    filteredQuotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-gray-50">
                        <td className="py-3 font-medium">{quote.quoteNumber}</td>
                        <td className="py-3">{quote.customerName}</td>
                        <td className="py-3">{quote.date}</td>
                        <td className="py-3">{quote.validUntil}</td>
                        <td className="py-3">{quote.totalAmount.toLocaleString()} ر.س</td>
                        <td className="py-3">{getStatusBadge(quote.status)}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2"
                              onClick={() => handleViewQuote(quote.id)}
                            >
                              عرض
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => handleEditQuote(quote.id)}
                            >
                              تعديل
                            </Button>
                            {quote.status !== 'converted' && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={() => handleConvertToInvoice(quote.id)}
                              >
                                تحويل لفاتورة
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-6">
          <Button onClick={handleNewQuote} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> عرض سعر جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/invoices/quotes-templates")}>
            <FileText className="mr-2 h-4 w-4" /> قوالب عروض الأسعار
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PriceQuotesPage;
