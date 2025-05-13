
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const CashTransactionsPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="حركات النقدية">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">حركات النقدية</h1>
          <p>عرض وإدارة حركات النقدية.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default CashTransactionsPage;
