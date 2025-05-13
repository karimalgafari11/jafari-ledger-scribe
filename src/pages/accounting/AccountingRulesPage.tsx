
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const AccountingRulesPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="القواعد المحاسبية">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">القواعد المحاسبية</h1>
          <p>عرض وإدارة القواعد المحاسبية.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default AccountingRulesPage;
