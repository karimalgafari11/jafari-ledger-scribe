
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const ValidationRulesPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="قواعد التحقق">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">قواعد التحقق</h1>
          <p>عرض وإدارة قواعد التحقق.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default ValidationRulesPage;
