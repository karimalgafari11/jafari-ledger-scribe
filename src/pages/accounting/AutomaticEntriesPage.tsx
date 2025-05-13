
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const AutomaticEntriesPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="القيود التلقائية" description="إعداد وإدارة القيود المحاسبية التلقائية">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">القيود التلقائية</h3>
          <p className="text-muted-foreground">هنا سيظهر جدول القيود التلقائية وإعداداتها</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default AutomaticEntriesPage;
