
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const CashRegistersPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="صناديق النقدية">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">صناديق النقدية</h1>
          <p>عرض وإدارة صناديق النقدية.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default CashRegistersPage;
