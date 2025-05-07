
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CreditCard, ArrowLeft, FileText } from "lucide-react";

const CashRegisterModulePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="إدارة الصناديق" 
        showBack={true}
      >
        <span className="text-sm text-gray-300">إدارة صناديق النقدية والحسابات البنكية</span>
      </Header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* صناديق النقدية */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/accounting/cashregister")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">صناديق النقدية</CardTitle>
              <CreditCard className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إدارة صناديق النقدية وتسجيل عمليات الإيداع والسحب وتتبع الأرصدة
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/accounting/cashregister"); }}>
                عرض الصناديق <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* الحسابات البنكية */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/accounting/bank-accounts")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">الحسابات البنكية</CardTitle>
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إدارة الحسابات البنكية وتتبع الإيداعات والسحوبات والأرصدة
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/accounting/bank-accounts"); }}>
                عرض الحسابات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* الأوراق التجارية */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/accounting/commercial-papers")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">الأوراق التجارية</CardTitle>
              <FileText className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إدارة الشيكات والكمبيالات وغيرها من الأوراق التجارية
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/accounting/commercial-papers"); }}>
                عرض الأوراق التجارية <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={() => navigate("/accounting/cashregister/transaction/new")}>
            <CreditCard className="mr-2 h-4 w-4" /> عملية صندوق جديدة
          </Button>
          <Button variant="outline" onClick={() => navigate("/accounting/bank-accounts/transaction/new")}>
            عملية بنكية جديدة
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CashRegisterModulePage;
