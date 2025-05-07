
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Database, ArrowLeft, FileText, Calculator, CreditCard, Wallet } from "lucide-react";
import { useJournalPage } from "@/hooks/useJournalPage";
import { useLedgerEntries } from "@/hooks/useLedgerEntries";

const LedgerPage = () => {
  const navigate = useNavigate();
  const { filteredEntries, accountSummary, searchEntries, filterEntriesByPeriod } = useLedgerEntries();

  return (
    <Layout>
      <Header 
        title="دفتر الأستاذ العام" 
        showBack={true}
      >
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <span className="text-sm text-gray-300">إدارة الحسابات والقيود المحاسبية</span>
        </div>
      </Header>

      <div className="container mx-auto p-4">
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">عدد الحركات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{accountSummary.entriesCount}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">إجمالي المدين</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{accountSummary.totalDebit.toLocaleString()} ر.س</p>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">إجمالي الدائن</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{accountSummary.totalCredit.toLocaleString()} ر.س</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">الرصيد الحالي</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{accountSummary.balance.toLocaleString()} ر.س</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* القيود المحاسبية */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/accounting/journals")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">القيود المحاسبية</CardTitle>
              <Database className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إدارة القيود المحاسبية وإنشاء قيود جديدة وتعديل القيود الموجودة
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/accounting/journals"); }}>
                عرض القيود <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* شجرة الحسابات */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/accounting/chart")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">شجرة الحسابات</CardTitle>
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة شجرة الحسابات المحاسبية وإضافة حسابات جديدة
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/accounting/chart"); }}>
                عرض الحسابات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* التقارير المالية */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/reports/financial")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">التقارير المالية</CardTitle>
              <Calculator className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإنشاء التقارير المالية المختلفة مثل الميزانية وقائمة الدخل
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/reports/financial"); }}>
                عرض التقارير <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* تصفية الحركات */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="text-lg font-medium mb-4">تصفية الحركات</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              onClick={() => filterEntriesByPeriod('today')}
              className="justify-start"
            >
              اليوم
            </Button>
            <Button 
              variant="outline" 
              onClick={() => filterEntriesByPeriod('this-week')}
              className="justify-start"
            >
              هذا الأسبوع
            </Button>
            <Button 
              variant="outline" 
              onClick={() => filterEntriesByPeriod('this-month')}
              className="justify-start"
            >
              هذا الشهر
            </Button>
            <Button 
              variant="outline" 
              onClick={() => filterEntriesByPeriod('this-year')}
              className="justify-start"
            >
              هذه السنة
            </Button>
          </div>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={() => navigate("/accounting/journals/new")} className="bg-primary hover:bg-primary/90">
            <Database className="mr-2 h-4 w-4" /> قيد محاسبي جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/accounting/chart")}>
            <FileText className="mr-2 h-4 w-4" /> شجرة الحسابات
          </Button>
          <Button variant="outline" onClick={() => navigate("/accounting/cashregister")}>
            <Wallet className="mr-2 h-4 w-4" /> الصندوق
          </Button>
          <Button variant="outline" onClick={() => navigate("/accounting/settings")}>
            إعدادات المحاسبة
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LedgerPage;
