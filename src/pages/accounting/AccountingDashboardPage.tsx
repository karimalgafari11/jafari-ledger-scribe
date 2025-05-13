
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const AccountingDashboardPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="لوحة تحكم المحاسبة">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">لوحة تحكم المحاسبة</h1>
          <p>مرحباً بك في نظام المحاسبة.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default AccountingDashboardPage;
