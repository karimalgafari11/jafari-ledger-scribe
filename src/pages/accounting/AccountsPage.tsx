
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const AccountsPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="دليل الحسابات">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">دليل الحسابات</h1>
          <p>عرض وإدارة دليل الحسابات.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default AccountsPage;
