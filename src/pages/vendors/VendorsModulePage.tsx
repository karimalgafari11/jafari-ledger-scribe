
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Truck, ArrowLeft, FileText, CreditCard, UserPlus, BarChart3, Database } from "lucide-react";
import DashboardShortcuts from "@/components/dashboard/DashboardShortcuts";
import { ShortcutItem } from "@/types/dashboard";
import { toast } from "sonner";

const VendorsModulePage = () => {
  const navigate = useNavigate();

  // إعداد اختصارات إدارة الموردين
  const vendorShortcuts: ShortcutItem[] = [
    {
      id: "vendors-manage",
      name: "إدارة الموردين",
      icon: Truck,
      route: "/vendors/manage",
      enabled: true,
      description: "إدارة بيانات وحسابات الموردين"
    },
    {
      id: "vendor-statements",
      name: "كشوف الحسابات",
      icon: FileText,
      route: "/vendors/statement",
      enabled: true,
      description: "عرض كشوف حسابات الموردين"
    },
    {
      id: "vendor-payables",
      name: "المستحقات المالية",
      icon: CreditCard,
      route: "/payables/accounts",
      enabled: true,
      description: "عرض المستحقات المالية للموردين"
    },
    {
      id: "vendor-reports",
      name: "تقارير الموردين",
      icon: BarChart3,
      route: "/vendors/reports",
      enabled: true,
      description: "عرض تقارير أرصدة ومشتريات الموردين"
    }
  ];

  const handleAddNewVendor = () => {
    toast.success("سيتم فتح نموذج إضافة مورد جديد");
    navigate("/vendors/manage");
  };

  return (
    <Layout>
      <Header 
        title="إدارة الموردين" 
        showBack={true}
      >
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          <span className="text-sm text-gray-300">إدارة الموردين وحساباتهم</span>
        </div>
      </Header>

      <div className="container mx-auto p-4">
        {/* إحصائيات الموردين */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">إجمالي الموردين</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">85</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">الموردين النشطين</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">62</p>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">إجمالي المشتريات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">195,350 ر.س</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">المستحقات المالية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">36,420 ر.س</p>
            </CardContent>
          </Card>
        </div>

        {/* اختصارات إدارة الموردين */}
        <h2 className="text-xl font-bold mb-4">اختصارات سريعة</h2>
        <DashboardShortcuts shortcuts={vendorShortcuts} />

        {/* بطاقات الوظائف الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {/* قائمة الموردين */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/vendors/manage")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">قائمة الموردين</CardTitle>
              <Truck className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة قائمة الموردين وإضافة موردين جدد
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/vendors/manage"); }}>
                إدارة الموردين <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* كشوف حسابات الموردين */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/vendors/statement")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">كشوف حسابات الموردين</CardTitle>
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة كشوف حسابات الموردين وطباعتها
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/vendors/statement"); }}>
                عرض الكشوف <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* حسابات الموردين */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/payables/accounts")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">حسابات الموردين</CardTitle>
              <CreditCard className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض حسابات الموردين والمستحقات المالية
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/payables/accounts"); }}>
                عرض الحسابات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={handleAddNewVendor} className="bg-primary hover:bg-primary/90">
            <UserPlus className="mr-2 h-4 w-4" /> مورد جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/purchases/new")}>
            <FileText className="mr-2 h-4 w-4" /> فاتورة شراء جديدة
          </Button>
          <Button variant="outline" onClick={() => navigate("/payables/payment")}>
            <Database className="mr-2 h-4 w-4" /> سند دفع جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/vendors/reports")}>
            <BarChart3 className="mr-2 h-4 w-4" /> تقارير الموردين
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default VendorsModulePage;
