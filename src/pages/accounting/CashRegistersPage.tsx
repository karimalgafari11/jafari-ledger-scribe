
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const CashRegistersPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="صناديق النقدية" description="إدارة صناديق النقدية وعمليات القبض والصرف">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">صناديق النقدية</h3>
          <p className="text-muted-foreground">هنا سيظهر جدول صناديق النقدية</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default CashRegistersPage;
