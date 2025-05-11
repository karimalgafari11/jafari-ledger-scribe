import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";

const PurchaseInvoicePage = () => {
  return (
    <Layout className="h-screen overflow-hidden">
      <div className="flex flex-col h-full w-full">
        <Header title="فواتير الشراء" showBack={true} />
        <div className="flex-1 overflow-auto p-6">
          {/* محتوى الصفحة */}
        </div>
      </div>
    </Layout>
  );
};

export default PurchaseInvoicePage;
