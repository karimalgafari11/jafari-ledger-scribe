
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, CreditCard, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReceivablesPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="المستحقات المالية">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة المستحقات المالية</h1>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/receivables/collection")}>
              <FileUp className="ml-2 h-4 w-4" /> سند قبض جديد
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* سند قبض جديد */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/receivables/collection")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">سندات القبض</CardTitle>
              <FileUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">إنشاء وإدارة سندات القبض</p>
              <Button variant="link" className="p-0 mt-2 h-auto">إضافة سند</Button>
            </CardContent>
          </Card>

          {/* الحسابات المستحقة */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/receivables/accounts")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">الحسابات المستحقة</CardTitle>
              <CreditCard className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">إدارة حسابات العملاء المستحقة</p>
              <Button variant="link" className="p-0 mt-2 h-auto">عرض الحسابات</Button>
            </CardContent>
          </Card>

          {/* التقارير المالية */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/receivables/reports")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">التقارير المالية</CardTitle>
              <FileText className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">عرض تقارير المستحقات المالية</p>
              <Button variant="link" className="p-0 mt-2 h-auto">عرض التقارير</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default ReceivablesPage;
