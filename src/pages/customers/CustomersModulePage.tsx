
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, ArrowLeft, FileText, CreditCard } from "lucide-react";

const CustomersModulePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="إدارة العملاء" 
        showBack={true}
      >
        <span className="text-sm text-gray-300">إدارة العملاء وحساباتهم</span>
      </Header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* قائمة العملاء */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/customers")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">قائمة العملاء</CardTitle>
              <Users className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة قائمة العملاء وإضافة عملاء جدد
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/customers"); }}>
                إدارة العملاء <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* كشوف حسابات العملاء */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/customers/statements")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">كشوف حسابات العملاء</CardTitle>
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض وإدارة كشوف حسابات العملاء وطباعتها
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/customers/statements"); }}>
                عرض الكشوف <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* حسابات العملاء */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/receivables/accounts")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">حسابات العملاء</CardTitle>
              <CreditCard className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض حسابات العملاء والمستحقات المالية
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/receivables/accounts"); }}>
                عرض الحسابات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={() => navigate("/customers/new")}>
            <Users className="mr-2 h-4 w-4" /> عميل جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/invoices/sales")}>
            فاتورة بيع جديدة
          </Button>
          <Button variant="outline" onClick={() => navigate("/receivables/collection")}>
            سند قبض جديد
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CustomersModulePage;
