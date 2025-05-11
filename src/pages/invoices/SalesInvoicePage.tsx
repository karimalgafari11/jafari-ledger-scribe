
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";

const SalesInvoicePage = () => {
  return (
    <Layout className="h-screen overflow-hidden p-0">
      <div className="flex flex-col h-full">
        <Header title="فاتورة مبيعات جديدة" showBack={true} />
        <div className="flex-1 overflow-auto">
          <InvoiceForm />
        </div>
      </div>
    </Layout>
  );
};

export default SalesInvoicePage;
