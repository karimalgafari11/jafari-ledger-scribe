
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Layout } from '@/components/Layout';

const BudgetsPage = () => {
  return (
    <Layout>
      <PageContainer title="الموازنات والميزانيات">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">إدارة الموازنات والميزانيات</h1>
          <p className="text-gray-500 mb-4">
            صفحة إدارة الموازنات والميزانيات التقديرية ومراقبة الأداء المالي
          </p>
          <div className="p-8 text-center border rounded-lg">
            <p className="text-gray-500">محتوى صفحة الموازنات قيد الإنشاء</p>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default BudgetsPage;
