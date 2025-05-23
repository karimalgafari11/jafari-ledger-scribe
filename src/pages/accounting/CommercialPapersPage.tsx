
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { CommercialPapersModule } from "@/components/accounting/commercialpapers/CommercialPapersModule";
import { DueNotificationsModule } from "@/components/accounting/commercialpapers/DueNotificationsModule";

const CommercialPapersPage = () => {
  return (
    <Layout className="h-screen overflow-hidden p-0">
      <div className="flex flex-col h-full w-full overflow-hidden rtl">
        <Header title="إدارة الأوراق التجارية" showBack={true} />
        
        <div className="flex-1 overflow-auto p-4 pb-16">
          <CommercialPapersModule />
          <DueNotificationsModule />
        </div>
      </div>
    </Layout>
  );
};

export default CommercialPapersPage;
