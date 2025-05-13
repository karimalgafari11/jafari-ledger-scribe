
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const AutomaticEntriesPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="القيود التلقائية">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">القيود التلقائية</h1>
          <p>عرض وإدارة القيود التلقائية.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default AutomaticEntriesPage;
