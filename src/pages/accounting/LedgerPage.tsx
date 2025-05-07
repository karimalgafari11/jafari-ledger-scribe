
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Database, ArrowLeft, FileText } from "lucide-react";

const LedgerPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="دفتر الأستاذ العام" 
        showBack={true}
      >
        <span className="text-sm text-gray-300">إدارة الحسابات والقيود المحاسبية</span>
      </Header>

      <div className="container mx-auto p-4">
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
              <FileText className="h-6 w-6 text-green-500" />
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

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={() => navigate("/accounting/journals/new")}>
            <Database className="mr-2 h-4 w-4" /> قيد محاسبي جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/accounting/chart")}>
            شجرة الحسابات
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
