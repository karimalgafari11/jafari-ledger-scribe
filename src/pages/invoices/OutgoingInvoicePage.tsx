
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Receipt, FileText, ShoppingBag, ArrowLeft } from "lucide-react";
import DashboardShortcuts from "@/components/dashboard/DashboardShortcuts";
import { ShortcutItem } from "@/types/dashboard";

const OutgoingInvoicePage: React.FC = () => {
  const navigate = useNavigate();

  // إعداد اختصارات الفواتير الصادرة
  const invoiceShortcuts: ShortcutItem[] = [
    {
      id: "invoices-all",
      name: "الفواتير الصادرة",
      icon: Receipt,
      route: "/invoices/outgoing",
      enabled: true,
      description: "عرض وإدارة جميع الفواتير الصادرة"
    },
    {
      id: "invoice-new",
      name: "فاتورة مبيعات جديدة",
      icon: Plus,
      route: "/invoices/sales",
      enabled: true,
      description: "إنشاء فاتورة مبيعات جديدة"
    },
    {
      id: "quotes-module",
      name: "عروض الأسعار",
      icon: FileText,
      route: "/invoices/quotes-module",
      enabled: true,
      description: "إدارة عروض الأسعار"
    },
    {
      id: "sales-orders",
      name: "أوامر البيع",
      icon: ShoppingBag,
      route: "/invoices/sales-orders",
      enabled: true,
      description: "إدارة أوامر البيع"
    }
  ];

  return (
    <Layout>
      <Header 
        title="وحدة الفواتير والمبيعات" 
        showBack={true}
      >
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          <span className="text-sm text-gray-300">إدارة الفواتير وعمليات البيع</span>
        </div>
      </Header>

      <div className="container mx-auto p-4">
        {/* إحصائيات الفواتير */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">إجمالي الفواتير</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">156</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">الفواتير المدفوعة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">120</p>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">الفواتير المعلقة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">24</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">إجمالي المبيعات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">156,750 ر.س</p>
            </CardContent>
          </Card>
        </div>

        {/* اختصارات الفواتير */}
        <h2 className="text-xl font-bold mb-4">اختصارات سريعة</h2>
        <DashboardShortcuts shortcuts={invoiceShortcuts} />

        {/* بطاقات الوظائف الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {/* قائمة الفواتير الصادرة */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/invoices/outgoing")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">الفواتير الصادرة</CardTitle>
              <Receipt className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة الفواتير الصادرة وتتبع حالة الدفع
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/invoices/outgoing"); }}>
                عرض الفواتير <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* عروض الأسعار */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/invoices/quotes-module")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">عروض الأسعار</CardTitle>
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إنشاء وإدارة عروض الأسعار للعملاء
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/invoices/quotes-module"); }}>
                إدارة العروض <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* أوامر البيع */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/invoices/sales-orders")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">أوامر البيع</CardTitle>
              <ShoppingBag className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إدارة أوامر البيع والطلبيات
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/invoices/sales-orders"); }}>
                عرض الطلبيات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={() => navigate("/invoices/sales")} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> فاتورة جديدة
          </Button>
          <Button variant="outline" onClick={() => navigate("/invoices/quotes")}>
            <FileText className="mr-2 h-4 w-4" /> عرض سعر جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/invoices/sales-orders")}>
            <ShoppingBag className="mr-2 h-4 w-4" /> أمر بيع جديد
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OutgoingInvoicePage;
