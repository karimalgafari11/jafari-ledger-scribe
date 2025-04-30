
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { CommercialPapersModule } from "@/components/accounting/commercialpapers/CommercialPapersModule";
import { DueNotificationsModule } from "@/components/accounting/commercialpapers/DueNotificationsModule";

const CommercialPapersPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6 rtl">
        <Header title="إدارة الأوراق التجارية" showBack={true} />
        <CommercialPapersModule />
        <DueNotificationsModule />
      </div>
    </Layout>
  );
};

export default CommercialPapersPage;
