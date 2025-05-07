
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FileText, ShoppingBag, Receipt, FileDown, ArrowLeft } from "lucide-react";

const PurchasesPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="نظام المشتريات" 
        subtitle="إدارة عمليات الشراء والموردين والمخزون"
        showBack={false}
      />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* فاتورة شراء جديدة */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/purchases/new")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">فاتورة شراء جديدة</CardTitle>
              <Receipt className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إنشاء فاتورة شراء جديدة مع إمكانية تحديد المورد والمنتجات والأسعار والخصومات
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/purchases/new"); }}>
                إنشاء فاتورة <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* فواتير الشراء */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/purchases/invoices")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">فواتير الشراء</CardTitle>
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة فواتير الشراء السابقة مع إمكانية البحث والفلترة حسب المورد والتاريخ والحالة
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/purchases/invoices"); }}>
                عرض الفواتير <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* أوامر الشراء */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/purchases/orders")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">أوامر الشراء</CardTitle>
              <ShoppingBag className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إدارة وإنشاء أوامر الشراء للموردين مع إمكانية تحويلها إلى فواتير شراء لاحقًا
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/purchases/orders"); }}>
                إدارة أوامر الشراء <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* مرتجعات المشتريات */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/purchases/returns")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">مرتجعات المشتريات</CardTitle>
              <FileDown className="h-6 w-6 text-red-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إدارة مرتجعات المشتريات للموردين وتسجيل الأسباب وحالة الاسترداد
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/purchases/returns"); }}>
                إدارة المرتجعات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* إحصائيات سريعة */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>الإحصائيات السريعة للمشتريات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">إجمالي المشتريات (هذا الشهر)</span>
                <span className="text-2xl font-bold">١٢٥,٧٥٠ ريال</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">عدد الفواتير</span>
                <span className="text-2xl font-bold">٤٨</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">فواتير غير مدفوعة</span>
                <span className="text-2xl font-bold text-amber-600">١٢</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">عدد الموردين النشطين</span>
                <span className="text-2xl font-bold">١٥</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate("/purchases/new")}>
            <Receipt className="mr-2 h-4 w-4" /> فاتورة شراء جديدة
          </Button>
          <Button variant="outline" onClick={() => navigate("/purchases/orders/new")}>
            <ShoppingBag className="mr-2 h-4 w-4" /> أمر شراء جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/vendors")}>
            إدارة الموردين
          </Button>
          <Button variant="outline" onClick={() => navigate("/inventory/reorder")}>
            مراقبة المخزون
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PurchasesPage;
