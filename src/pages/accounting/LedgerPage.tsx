
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const LedgerPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="دفتر الأستاذ" description="عرض وتحليل حركات الحسابات">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">دفتر الأستاذ</h3>
          <p className="text-muted-foreground">هنا سيظهر جدول دفتر الأستاذ والحركات المحاسبية</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default LedgerPage;
