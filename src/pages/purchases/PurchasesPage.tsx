
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, FileText, Truck, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PurchasesPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="نظام المشتريات">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة المشتريات</h1>
          <Button onClick={() => navigate("/purchases/invoice/new")}>
            <ShoppingBag className="ml-2 h-4 w-4" /> فاتورة مشتريات جديدة
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* فاتورة مشتريات */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/purchases/purchase-invoice")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">فواتير المشتريات</CardTitle>
              <ShoppingBag className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">إدارة فواتير المشتريات والموردين</p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => {
                e.stopPropagation();
                navigate("/purchases/purchase-invoice");
              }}>عرض الفواتير</Button>
            </CardContent>
          </Card>

          {/* أوامر الشراء */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/purchases/orders")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">أوامر الشراء</CardTitle>
              <FileText className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">إدارة طلبات وأوامر الشراء</p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => {
                e.stopPropagation();
                navigate("/purchases/orders");
              }}>عرض الأوامر</Button>
            </CardContent>
          </Card>

          {/* الموردين */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/vendors")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">الموردين</CardTitle>
              <Truck className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">إدارة حسابات الموردين</p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => {
                e.stopPropagation();
                navigate("/vendors");
              }}>عرض الموردين</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* قسم الإجراءات السريعة */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">الإجراءات السريعة</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => navigate("/purchases/invoice/new")}>
              <Plus className="ml-2 h-4 w-4" /> فاتورة مشتريات
            </Button>
            <Button variant="outline" onClick={() => navigate("/purchases/orders/new")}>
              <Plus className="ml-2 h-4 w-4" /> أمر شراء
            </Button>
            <Button variant="outline" onClick={() => navigate("/vendors/new")}>
              <Plus className="ml-2 h-4 w-4" /> مورد جديد
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default PurchasesPage;
