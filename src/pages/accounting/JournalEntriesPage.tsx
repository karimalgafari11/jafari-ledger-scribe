
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const JournalEntriesPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="القيود المحاسبية" description="إدارة القيود المحاسبية اليومية">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">القيود المحاسبية</h3>
          <p className="text-muted-foreground">هنا سيظهر جدول القيود المحاسبية</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default JournalEntriesPage;
