
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Truck, ArrowLeft, FileText, CreditCard } from "lucide-react";

const VendorsModulePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="إدارة الموردين" 
        showBack={true}
      >
        <span className="text-sm text-gray-300">إدارة الموردين وحساباتهم</span>
      </Header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* قائمة الموردين */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/vendors")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">قائمة الموردين</CardTitle>
              <Truck className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة قائمة الموردين وإضافة موردين جدد
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/vendors"); }}>
                إدارة الموردين <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* تقارير الموردين */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/vendors/reports")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">تقارير الموردين</CardTitle>
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض تقارير الموردين والمشتريات والمدفوعات
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/vendors/reports"); }}>
                عرض التقارير <ArrowLeft className="mr-1 h-4 w-4" />
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
          <Button onClick={() => navigate("/vendors/new")}>
            <Truck className="mr-2 h-4 w-4" /> مورد جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/purchases/new")}>
            فاتورة شراء جديدة
          </Button>
          <Button variant="outline" onClick={() => navigate("/payables/payment")}>
            سند دفع جديد
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default VendorsModulePage;
