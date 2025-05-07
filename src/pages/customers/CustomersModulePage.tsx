
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, ArrowLeft, FileText, CreditCard, UserPlus, BarChart3, Database } from "lucide-react";
import DashboardShortcuts from "@/components/dashboard/DashboardShortcuts";
import { ShortcutItem } from "@/types/dashboard";
import { toast } from "sonner";

const CustomersModulePage = () => {
  const navigate = useNavigate();

  // إعداد اختصارات إدارة العملاء
  const customerShortcuts: ShortcutItem[] = [
    {
      id: "customers-manage",
      name: "إدارة العملاء",
      icon: Users,
      route: "/customers/manage",
      enabled: true,
      description: "إدارة بيانات وحسابات العملاء"
    },
    {
      id: "customer-statements",
      name: "كشوف الحسابات",
      icon: FileText,
      route: "/customers/statement",
      enabled: true,
      description: "عرض كشوف حسابات العملاء"
    },
    {
      id: "customer-receivables",
      name: "المستحقات المالية",
      icon: CreditCard,
      route: "/receivables/accounts",
      enabled: true,
      description: "عرض المستحقات المالية للعملاء"
    },
    {
      id: "customer-reports",
      name: "تقارير العملاء",
      icon: BarChart3,
      route: "/customers/reports",
      enabled: true,
      description: "عرض تقارير أرصدة ومبيعات العملاء"
    }
  ];

  const handleAddNewCustomer = () => {
    toast.success("سيتم فتح نموذج إضافة عميل جديد");
    navigate("/customers/manage");
  };

  return (
    <Layout>
      <Header 
        title="إدارة العملاء" 
        showBack={true}
      >
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="text-sm text-gray-300">إدارة العملاء وحساباتهم</span>
        </div>
      </Header>

      <div className="container mx-auto p-4">
        {/* إحصائيات العملاء */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">إجمالي العملاء</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">127</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">العملاء النشطين</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">98</p>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">إجمالي المبيعات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">245,780 ر.س</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">المستحقات المالية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">42,150 ر.س</p>
            </CardContent>
          </Card>
        </div>

        {/* اختصارات إدارة العملاء */}
        <h2 className="text-xl font-bold mb-4">اختصارات سريعة</h2>
        <DashboardShortcuts shortcuts={customerShortcuts} />

        {/* بطاقات الوظائف الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {/* قائمة العملاء */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/customers/manage")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">قائمة العملاء</CardTitle>
              <Users className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة قائمة العملاء وإضافة عملاء جدد
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/customers/manage"); }}>
                إدارة العملاء <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* كشوف حسابات العملاء */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/customers/statement")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">كشوف حسابات العملاء</CardTitle>
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة كشوف حسابات العملاء وطباعتها
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/customers/statement"); }}>
                عرض الكشوف <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* حسابات العملاء */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/receivables/accounts")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">حسابات العملاء</CardTitle>
              <CreditCard className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض حسابات العملاء والمستحقات المالية
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/receivables/accounts"); }}>
                عرض الحسابات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={handleAddNewCustomer} className="bg-primary hover:bg-primary/90">
            <UserPlus className="mr-2 h-4 w-4" /> عميل جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/invoices/sales")}>
            <FileText className="mr-2 h-4 w-4" /> فاتورة بيع جديدة
          </Button>
          <Button variant="outline" onClick={() => navigate("/receivables/collection")}>
            <Database className="mr-2 h-4 w-4" /> سند قبض جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/customers/reports")}>
            <BarChart3 className="mr-2 h-4 w-4" /> تقارير العملاء
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CustomersModulePage;
