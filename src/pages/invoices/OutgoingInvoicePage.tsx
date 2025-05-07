
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";

const OutgoingInvoicePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="فواتير البيع" 
        showBack={true}
      >
        <span className="text-sm text-gray-300">إدارة وإنشاء فواتير البيع للعملاء</span>
      </Header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* فاتورة بيع جديدة */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/invoices/sales")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">فاتورة بيع جديدة</CardTitle>
              <FileText className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إنشاء فاتورة بيع جديدة مع إمكانية تحديد العميل والمنتجات والأسعار وإضافة الخصومات
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/invoices/sales"); }}>
                إنشاء فاتورة <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* قائمة فواتير البيع */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/invoices/outgoing")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">قائمة فواتير البيع</CardTitle>
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة فواتير البيع السابقة مع إمكانية البحث والفلترة حسب العميل والتاريخ والحالة
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/invoices/outgoing"); }}>
                عرض الفواتير <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* عروض الأسعار */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/invoices/quotes")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">عروض الأسعار</CardTitle>
              <FileText className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إنشاء وإدارة عروض الأسعار للعملاء مع إمكانية تحويلها إلى فواتير بيع
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/invoices/quotes"); }}>
                عروض الأسعار <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={() => navigate("/invoices/sales")}>
            <FileText className="mr-2 h-4 w-4" /> فاتورة بيع جديدة
          </Button>
          <Button variant="outline" onClick={() => navigate("/invoices/quotes/new")}>
            عرض أسعار جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/customers")}>
            إدارة العملاء
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OutgoingInvoicePage;
