
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const CommercialPapersPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="الأوراق التجارية" description="إدارة الشيكات والكمبيالات والأوراق التجارية">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">الأوراق التجارية</h3>
          <p className="text-muted-foreground">هنا سيظهر جدول الأوراق التجارية</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default CommercialPapersPage;
