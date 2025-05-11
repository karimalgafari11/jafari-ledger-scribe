
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Filter, Download, Eye, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// مصفوفة بيانات وهمية للعملاء
const mockCustomers = [
  { id: "1", name: "شركة الأفق للتجارة", balance: 12500, lastUpdate: "2023-11-05", status: "active" },
  { id: "2", name: "مؤسسة الرياض للمقاولات", balance: 8750, lastUpdate: "2023-10-25", status: "active" },
  { id: "3", name: "شركة النور للإلكترونيات", balance: -1250, lastUpdate: "2023-11-01", status: "active" },
  { id: "4", name: "مؤسسة الإبداع للديكور", balance: 4200, lastUpdate: "2023-10-15", status: "active" },
  { id: "5", name: "شركة السلام للأغذية", balance: 0, lastUpdate: "2023-10-30", status: "inactive" },
];

const CustomerStatementListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [balanceFilter, setBalanceFilter] = useState("all");

  const filteredCustomers = mockCustomers
    .filter(customer => 
      customer.name.includes(searchTerm) || 
      customer.id.includes(searchTerm)
    )
    .filter(customer => 
      statusFilter === "all" ? true : customer.status === statusFilter
    )
    .filter(customer => {
      if (balanceFilter === "all") return true;
      if (balanceFilter === "positive") return customer.balance > 0;
      if (balanceFilter === "negative") return customer.balance < 0;
      if (balanceFilter === "zero") return customer.balance === 0;
      return true;
    });

  const handleViewStatement = (customerId: string) => {
    navigate(`/customers/statement/${customerId}`);
  };

  const handleExportStatements = () => {
    alert("جاري تصدير كشوفات الحسابات");
  };

  return (
    <PageContainer title="كشوفات حسابات العملاء">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">كشوفات حسابات العملاء</h1>
          <Button onClick={handleExportStatements}>
            <FileText className="ml-2 h-4 w-4" /> تصدير الكشوفات
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>قائمة كشوفات العملاء</CardTitle>
            <CardDescription>عرض وإدارة كشوفات حسابات العملاء</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن عميل..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="ml-2 h-4 w-4" />
                    <span>{statusFilter === "all" ? "جميع العملاء" : 
                           statusFilter === "active" ? "العملاء النشطين" : "العملاء غير النشطين"}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع العملاء</SelectItem>
                    <SelectItem value="active">العملاء النشطين</SelectItem>
                    <SelectItem value="inactive">العملاء غير النشطين</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={balanceFilter} onValueChange={setBalanceFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="ml-2 h-4 w-4" />
                    <span>{balanceFilter === "all" ? "جميع الأرصدة" : 
                           balanceFilter === "positive" ? "رصيد دائن" : 
                           balanceFilter === "negative" ? "رصيد مدين" : "رصيد صفري"}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأرصدة</SelectItem>
                    <SelectItem value="positive">رصيد دائن</SelectItem>
                    <SelectItem value="negative">رصيد مدين</SelectItem>
                    <SelectItem value="zero">رصيد صفري</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 text-right">رقم العميل</th>
                    <th className="p-2 text-right">اسم العميل</th>
                    <th className="p-2 text-right">الرصيد</th>
                    <th className="p-2 text-right">آخر تحديث</th>
                    <th className="p-2 text-right">الحالة</th>
                    <th className="p-2 text-right">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-muted/25">
                      <td className="p-2">{customer.id}</td>
                      <td className="p-2 font-medium">{customer.name}</td>
                      <td className={`p-2 ${customer.balance > 0 ? 'text-green-600' : customer.balance < 0 ? 'text-red-600' : ''}`}>
                        {customer.balance} ر.س
                      </td>
                      <td className="p-2">{new Date(customer.lastUpdate).toLocaleDateString("ar-SA")}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          customer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {customer.status === "active" ? "نشط" : "غير نشط"}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewStatement(customer.id)}>
                            <Eye className="h-4 w-4 ml-1" /> عرض
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 ml-1" /> تصدير
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Calendar className="h-4 w-4 ml-1" /> تاريخ
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-muted-foreground">
                        لا توجد نتائج مطابقة للبحث
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إحصائيات كشوفات الحسابات</CardTitle>
            <CardDescription>ملخص لأرصدة العملاء وحالة الحسابات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    إجمالي الأرصدة الدائنة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">25,450 ر.س</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    إجمالي الأرصدة المدينة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-red-600">-1,250 ر.س</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    صافي الرصيد
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">24,200 ر.س</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    عدد العملاء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{mockCustomers.length}</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default CustomerStatementListPage;
