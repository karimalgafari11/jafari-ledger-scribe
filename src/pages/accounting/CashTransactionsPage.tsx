
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const CashTransactionsPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="حركات النقدية" description="عرض وإدارة حركات القبض والصرف">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">حركات النقدية</h3>
          <p className="text-muted-foreground">هنا سيظهر جدول حركات النقدية</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default CashTransactionsPage;
