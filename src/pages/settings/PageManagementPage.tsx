
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from "@/components/ui/card";
import PageManagementTabs from '@/components/settings/page-management/PageManagementTabs';
import { toast } from 'sonner';
import { PageManagementProvider } from '@/hooks/usePageManagement';

const PageManagementPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6 rtl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">إدارة الصفحات</h1>
        </div>
        
        <Card>
          <PageManagementProvider>
            <PageManagementTabs />
          </PageManagementProvider>
        </Card>
      </div>
    </Layout>
  );
};

export default PageManagementPage;
