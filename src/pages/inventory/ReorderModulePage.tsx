
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Package, ArrowLeft, FileText, ShoppingBag } from "lucide-react";

const ReorderModulePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="مراقبة المخزون" 
        showBack={true}
      >
        <span className="text-sm text-gray-300">إدارة نقاط إعادة الطلب والمخزون</span>
      </Header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* المنتجات تحت الحد الأدنى */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/inventory/reorder")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">المنتجات تحت الحد الأدنى</CardTitle>
              <Package className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض المنتجات التي وصلت إلى الحد الأدنى وتحتاج إعادة طلب
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/inventory/reorder"); }}>
                عرض المنتجات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* طلبات الشراء التلقائية */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/purchases/orders/auto")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">طلبات الشراء التلقائية</CardTitle>
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إنشاء طلبات شراء تلقائية للمنتجات التي وصلت للحد الأدنى
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/purchases/orders/auto"); }}>
                إنشاء طلبات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* مستويات المخزون */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/inventory/levels")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">مستويات المخزون</CardTitle>
              <FileText className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إدارة مستويات المخزون وتحديد نقاط إعادة الطلب
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/inventory/levels"); }}>
                عرض المستويات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={() => navigate("/purchases/orders/new")}>
            <ShoppingBag className="mr-2 h-4 w-4" /> أمر شراء جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/inventory/products")}>
            إدارة المنتجات
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ReorderModulePage;
