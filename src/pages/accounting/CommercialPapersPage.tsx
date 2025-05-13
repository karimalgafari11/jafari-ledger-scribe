
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const CommercialPapersPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="الأوراق التجارية">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">الأوراق التجارية</h1>
          <p>عرض وإدارة الأوراق التجارية.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default CommercialPapersPage;
