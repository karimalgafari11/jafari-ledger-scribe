
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileDown, ArrowLeft, CreditCard, FileText } from "lucide-react";

const PaymentModulePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="نظام المدفوعات" 
        showBack={true}
      >
        <span className="text-sm text-gray-300">إدارة سندات الدفع والمدفوعات للموردين</span>
      </Header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* سند دفع جديد */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/payables/payment")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">سند دفع جديد</CardTitle>
              <FileDown className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إنشاء سند دفع جديد للموردين مع إمكانية تحديد طريقة الدفع وربطه بالفواتير
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/payables/payment"); }}>
                إنشاء سند <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* قائمة المدفوعات */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/payables")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">قائمة المدفوعات</CardTitle>
              <CreditCard className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة سجل المدفوعات للموردين مع إمكانية البحث والفلترة
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/payables"); }}>
                عرض المدفوعات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* حسابات الموردين */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/payables/accounts")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">حسابات الموردين</CardTitle>
              <FileText className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض حسابات الموردين والمستحقات المالية وتاريخ المدفوعات
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/payables/accounts"); }}>
                عرض الحسابات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={() => navigate("/payables/payment")}>
            <FileDown className="mr-2 h-4 w-4" /> سند دفع جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/vendors")}>
            إدارة الموردين
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentModulePage;
