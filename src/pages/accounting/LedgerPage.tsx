
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const LedgerPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="دفتر الأستاذ">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">دفتر الأستاذ</h1>
          <p>عرض وإدارة دفتر الأستاذ.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default LedgerPage;
