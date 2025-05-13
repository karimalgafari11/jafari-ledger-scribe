
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const AccountingRulesPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="القواعد المحاسبية" description="إدارة القواعد المحاسبية والسياسات المالية">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">القواعد المحاسبية</h3>
          <p className="text-muted-foreground">هنا ستظهر القواعد المحاسبية المعرفة في النظام</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default AccountingRulesPage;
