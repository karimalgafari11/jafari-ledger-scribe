
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const AccountingDashboardPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="لوحة تحكم المحاسبة" description="عرض شامل للقوائم المالية والمؤشرات المحاسبية">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-full">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">ملخص الحسابات</h3>
              <p className="text-muted-foreground">هنا سيظهر ملخص الحسابات والتقارير المالية</p>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">قيود اليوم</h3>
            <p className="text-muted-foreground">القيود المحاسبية التي تمت إضافتها اليوم</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">المصروفات الأخيرة</h3>
            <p className="text-muted-foreground">آخر المصروفات المسجلة في النظام</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">الإيرادات الأخيرة</h3>
            <p className="text-muted-foreground">آخر الإيرادات المسجلة في النظام</p>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default AccountingDashboardPage;
