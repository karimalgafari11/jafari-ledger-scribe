
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const AccountsPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="دليل الحسابات" description="إدارة دليل الحسابات والهيكل المحاسبي">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">دليل الحسابات</h3>
          <p className="text-muted-foreground">هنا سيظهر جدول دليل الحسابات</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default AccountsPage;
