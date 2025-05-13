
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const DueNotificationsPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="إشعارات الاستحقاق" description="إدارة إشعارات استحقاق الدفعات والمستحقات">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">إشعارات الاستحقاق</h3>
          <p className="text-muted-foreground">هنا سيظهر جدول إشعارات الاستحقاق</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default DueNotificationsPage;
