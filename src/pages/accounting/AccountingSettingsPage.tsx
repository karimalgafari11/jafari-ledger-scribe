
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const AccountingSettingsPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="إعدادات المحاسبة" description="تخصيص الإعدادات المحاسبية للنظام">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">إعدادات المحاسبة</h3>
          <p className="text-muted-foreground">هنا ستظهر إعدادات النظام المحاسبي</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default AccountingSettingsPage;
