
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileUp, ArrowLeft, CreditCard, FileText, History } from "lucide-react";

const ReceiptModulePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="نظام المقبوضات" 
        showBack={true}
      >
        <span className="text-sm text-gray-300">إدارة سندات القبض والتحصيلات من العملاء</span>
      </Header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* سند قبض جديد */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/receivables/collection")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">سند قبض جديد</CardTitle>
              <FileUp className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إنشاء سند قبض جديد للعملاء مع إمكانية ربط السند بالفواتير المستحقة
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/receivables/collection"); }}>
                إنشاء سند <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* سجل المقبوضات */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/receivables/receipts-history")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">سجل المقبوضات</CardTitle>
              <History className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة سجل المدفوعات المحصلة من العملاء مع إمكانية البحث والفلترة
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/receivables/receipts-history"); }}>
                عرض السجل <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* حسابات العملاء */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/receivables/accounts")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">حسابات العملاء</CardTitle>
              <FileText className="h-6 w-6 text-purple-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض حسابات العملاء والمستحقات المالية وتاريخ المدفوعات
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/receivables/accounts"); }}>
                عرض الحسابات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={() => navigate("/receivables/collection")}>
            <FileUp className="mr-2 h-4 w-4" /> سند قبض جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/customers")}>
            إدارة العملاء
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ReceiptModulePage;
