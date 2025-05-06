
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerInfo } from "@/components/customers/CustomerInfo";
import { TransactionsTable } from "@/components/customers/TransactionsTable";
import { StatementActions } from "@/components/customers/StatementActions";
import { StatementFilter } from "@/components/customers/StatementFilter";
import { DateRangeSelector } from "@/components/customers/DateRangeSelector";
import { useCustomerStatement } from "@/hooks/useCustomerStatement";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { AlertCircle, FileText, Printer } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/utils/formatters";

const CustomerStatementPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("statement");
  const { toast } = useToast();
  
  const { 
    customer, 
    transactions, 
    isLoading,
    selectedTypes,
    dateRange,
    handleTypeFilterChange,
    handleDateRangeChange,
    handlePrint, 
    handleDownload, 
    handleSendEmail 
  } = useCustomerStatement(id);

  const handleBack = () => {
    navigate('/customers/manage');
  };

  const handleShare = () => {
    toast({
      title: "تمت مشاركة كشف الحساب",
      description: "تم إرسال رابط كشف الحساب عبر الواتساب",
    });
  };

  if (isLoading || !customer) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-t-blue-600 border-blue-200 animate-spin"></div>
          <p className="text-gray-600 font-medium">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50" dir="rtl">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="كشف حساب العميل" showBack={true} onBackClick={handleBack}>
          <StatementActions 
            onPrint={handlePrint}
            onDownload={handleDownload}
            onSendEmail={handleSendEmail}
            hasEmail={Boolean(customer.email)}
          />
        </Header>
      </div>

      <main className="container mx-auto px-4 py-6">
        <CustomerInfo customer={customer} />

        <Tabs defaultValue="statement" className="mt-6" onValueChange={setActiveTab} value={activeTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-white">
              <TabsTrigger value="statement" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                كشف الحساب
              </TabsTrigger>
              <TabsTrigger value="summary" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                الملخص
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                إعدادات
              </TabsTrigger>
            </TabsList>
            
            <div className="text-sm text-gray-500">
              الفترة: {format(dateRange.from, "dd/MM/yyyy", { locale: ar })} - {format(dateRange.to, "dd/MM/yyyy", { locale: ar })}
            </div>
          </div>
            
          <TabsContent value="statement" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="space-y-6 sticky top-24">
                  <DateRangeSelector 
                    dateRange={dateRange}
                    onDateRangeChange={handleDateRangeChange}
                  />
                  <StatementFilter 
                    selectedTypes={selectedTypes}
                    onFilterChange={handleTypeFilterChange}
                  />
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full flex justify-start gap-2" onClick={handlePrint}>
                        <Printer size={16} />
                        طباعة الكشف
                      </Button>
                      <Button variant="outline" className="w-full flex justify-start gap-2" onClick={handleDownload}>
                        <FileText size={16} />
                        تصدير PDF
                      </Button>
                      <Button variant="outline" className="w-full flex justify-start gap-2" onClick={handleShare}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37069C15.0227 5.37069 15.0227 5.37069 15.0227 5.37069L9.08261 8.36066C8.54305 7.54129 7.6582 7 6.66667 7C5.19391 7 4 8.19391 4 9.66667C4 11.1394 5.19391 12.3333 6.66667 12.3333C7.6582 12.3333 8.54305 11.792 9.08261 10.9727L15.0227 13.9626C15.0077 14.0842 15 14.2078 15 14.3333C15 15.9902 16.3431 17.3333 18 17.3333C19.6569 17.3333 21 15.9902 21 14.3333C21 12.6765 19.6569 11.3333 18 11.3333C17.0116 11.3333 16.1267 11.8872 15.5871 12.7066L9.64709 9.7167C9.64709 9.7167 9.64709 9.7167 9.64709 9.7167C9.6621 9.5952 9.66667 9.47149 9.66667 9.34717C9.66667 9.22285 9.6621 9.09913 9.64709 8.97762C9.64709 8.97762 9.64709 8.97762 9.64709 8.97762L15.5871 5.98765C16.1267 6.80712 17.0116 7.36095 18 7.36095C18 7.36095 18 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        مشاركة عبر واتساب
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {customer.balance > 0 && (
                    <Card className="bg-amber-50 border border-amber-200">
                      <CardContent className="pt-4 pb-3">
                        <div className="flex gap-2 items-start">
                          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-amber-700">يوجد رصيد مستحق</h3>
                            <p className="text-sm text-amber-600 mt-1">
                              يرجى متابعة تحصيل المبلغ المستحق وقدره {formatCurrency(customer.balance)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2">
                {transactions.length > 0 ? (
                  <TransactionsTable 
                    transactions={transactions} 
                    totalBalance={customer.balance}
                  />
                ) : (
                  <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-md">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">لا توجد معاملات في الفترة المحددة</p>
                    <p className="text-gray-500 text-sm mt-1">يمكنك تغيير نطاق البحث لعرض المزيد من المعاملات</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الحساب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-blue-700 font-medium mb-1">إجمالي الفواتير</h3>
                    <p className="text-2xl font-bold text-blue-900">
                      {formatCurrency(transactions.filter(t => t.type === "invoice").reduce((sum, t) => sum + t.debit, 0))}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      {transactions.filter(t => t.type === "invoice").length} فاتورة
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-green-700 font-medium mb-1">إجمالي الدفعات</h3>
                    <p className="text-2xl font-bold text-green-900">
                      {formatCurrency(transactions.filter(t => t.type === "payment").reduce((sum, t) => sum + t.credit, 0))}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {transactions.filter(t => t.type === "payment").length} دفعة
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h3 className="text-amber-700 font-medium mb-1">إجمالي المرتجعات</h3>
                    <p className="text-2xl font-bold text-amber-900">
                      {formatCurrency(transactions.filter(t => t.type === "return").reduce((sum, t) => sum + t.credit, 0))}
                    </p>
                    <p className="text-sm text-amber-600 mt-1">
                      {transactions.filter(t => t.type === "return").length} مرتجع
                    </p>
                  </div>
                  
                  <div className="md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-medium mb-2">حركات الحساب حسب النوع</h3>
                    <div className="bg-white p-4 border rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ 
                            width: `${Math.round(transactions.filter(t => t.type === "invoice").length / transactions.length * 100)}%` 
                          }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-20 text-left pl-2">فواتير</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ 
                            width: `${Math.round(transactions.filter(t => t.type === "payment").length / transactions.length * 100)}%` 
                          }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-20 text-left pl-2">دفعات</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-amber-500 h-2.5 rounded-full" style={{ 
                            width: `${Math.round(transactions.filter(t => t.type === "return").length / transactions.length * 100)}%` 
                          }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-20 text-left pl-2">مرتجعات</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات كشف الحساب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ترتيب العمليات</label>
                      <select className="w-full border border-gray-300 rounded p-2 text-sm">
                        <option value="newest">الأحدث أولاً</option>
                        <option value="oldest">الأقدم أولاً</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">عرض تفاصيل إضافية</label>
                      <div className="flex items-center">
                        <input type="checkbox" id="show-details" className="mr-2" />
                        <label htmlFor="show-details" className="text-sm">إظهار تفاصيل إضافية للمعاملات</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">تنسيق طباعة كشف الحساب</h3>
                    <div className="border rounded p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">حجم الورق</label>
                        <select className="w-full border border-gray-300 rounded p-2 text-sm">
                          <option value="A4">A4</option>
                          <option value="letter">Letter</option>
                          <option value="legal">Legal</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">اتجاه الطباعة</label>
                        <select className="w-full border border-gray-300 rounded p-2 text-sm">
                          <option value="portrait">عمودي</option>
                          <option value="landscape">أفقي</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">لون العناوين</label>
                        <select className="w-full border border-gray-300 rounded p-2 text-sm">
                          <option value="default">افتراضي</option>
                          <option value="blue">أزرق</option>
                          <option value="green">أخضر</option>
                          <option value="gray">رمادي</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" className="ml-2">إعادة تعيين</Button>
                    <Button>حفظ الإعدادات</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CustomerStatementPage;
