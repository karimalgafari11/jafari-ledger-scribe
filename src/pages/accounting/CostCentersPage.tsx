
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const CostCentersPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="مراكز التكلفة" description="إدارة مراكز التكلفة وتوزيع المصروفات">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">مراكز التكلفة</h3>
          <p className="text-muted-foreground">هنا سيظهر جدول مراكز التكلفة</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default CostCentersPage;
