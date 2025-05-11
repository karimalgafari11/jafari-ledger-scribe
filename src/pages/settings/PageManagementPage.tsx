
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import PageManagementTabs from "@/components/settings/page-management/PageManagementTabs";
import { PageManagementProvider } from "@/hooks/usePageManagement";

const PageManagementPage = () => {
  return (
    <Layout className="h-screen overflow-hidden p-0">
      <div className="flex flex-col h-full w-full">
        <Header title="إدارة الصفحات" showBack={true} />
        <div className="flex-1 overflow-hidden">
          <PageManagementProvider>
            <PageManagementTabs />
          </PageManagementProvider>
        </div>
      </div>
    </Layout>
  );
};

export default PageManagementPage;
