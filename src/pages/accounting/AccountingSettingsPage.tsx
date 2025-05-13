
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';

const AccountingSettingsPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="إعدادات المحاسبة">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">إعدادات المحاسبة</h1>
          <p>إدارة إعدادات نظام المحاسبة.</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default AccountingSettingsPage;
