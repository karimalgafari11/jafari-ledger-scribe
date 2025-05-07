
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, ArrowLeft, FileText } from "lucide-react";

const TransferModulePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="تحويل المخزون" 
        showBack={true}
      >
        <span className="text-sm text-gray-300">إدارة عمليات نقل المخزون بين المستودعات</span>
      </Header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* تحويل مخزون جديد */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/inventory-control/transfer")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">تحويل مخزون جديد</CardTitle>
              <ArrowLeftRight className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إنشاء أمر تحويل مخزون جديد بين المستودعات
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/inventory-control/transfer"); }}>
                إنشاء تحويل <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* تاريخ التحويلات */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/inventory-control/transfer-history")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">تاريخ التحويلات</CardTitle>
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض تاريخ عمليات تحويل المخزون بين المستودعات
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/inventory-control/transfer-history"); }}>
                عرض التاريخ <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* المستودعات */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/inventory-control/locations")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">المستودعات</CardTitle>
              <FileText className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                إدارة المستودعات ومواقع التخزين
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/inventory-control/locations"); }}>
                إدارة المستودعات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={() => navigate("/inventory-control/transfer")}>
            <ArrowLeftRight className="mr-2 h-4 w-4" /> تحويل مخزون جديد
          </Button>
          <Button variant="outline" onClick={() => navigate("/inventory/products")}>
            إدارة المنتجات
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TransferModulePage;
