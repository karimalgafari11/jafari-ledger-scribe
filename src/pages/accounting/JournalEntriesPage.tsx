
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const JournalEntriesPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="القيود اليومية">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">القيود اليومية</h1>
          <p>عرض وإدارة القيود اليومية.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default JournalEntriesPage;
