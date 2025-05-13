
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const ValidationRulesPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="قواعد التحقق" description="إعداد وإدارة قواعد التحقق من القيود المحاسبية">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">قواعد التحقق</h3>
          <p className="text-muted-foreground">هنا ستظهر قواعد التحقق من القيود المحاسبية</p>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default ValidationRulesPage;
