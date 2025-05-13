
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Layout } from '@/components/Layout';

const BankAccountsPage = () => {
  return (
    <Layout>
      <PageContainer title="حسابات البنوك">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">إدارة حسابات البنوك</h1>
          <p className="text-gray-500 mb-4">
            صفحة إدارة الحسابات البنكية والتسويات والتحويلات البنكية
          </p>
          <div className="p-8 text-center border rounded-lg">
            <p className="text-gray-500">محتوى صفحة حسابات البنوك قيد الإنشاء</p>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default BankAccountsPage;
