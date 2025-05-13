
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const DueNotificationsPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="إشعارات الاستحقاق">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">إشعارات الاستحقاق</h1>
          <p>عرض وإدارة إشعارات الاستحقاق.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default DueNotificationsPage;
