
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import PageManagementTabs from "@/components/settings/page-management/PageManagementTabs";

const PageManagementPage = () => {
  return (
    <Layout className="h-screen overflow-hidden p-0">
      <div className="flex flex-col h-full w-full">
        <Header title="إدارة الصفحات" showBack={true} />
        <div className="flex-1 overflow-hidden">
          <PageManagementTabs />
        </div>
      </div>
    </Layout>
  );
};

export default PageManagementPage;
