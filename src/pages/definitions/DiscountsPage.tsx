
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { DiscountsModule } from "@/components/definitions/discounts/DiscountsModule";

const DiscountsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6 rtl">
        <Header title="إدارة الخصومات" showBack={true} />
        <DiscountsModule />
      </div>
    </Layout>
  );
};

export default DiscountsPage;
