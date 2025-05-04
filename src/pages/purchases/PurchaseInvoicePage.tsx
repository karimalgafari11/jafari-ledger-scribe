
import React from "react";
import { Layout } from "@/components/Layout";
import { PurchaseInvoiceForm } from "@/components/purchases/PurchaseInvoiceForm";

const PurchaseInvoicePage = () => {
  return (
    <Layout className="p-0">
      <PurchaseInvoiceForm />
    </Layout>
  );
};

export default PurchaseInvoicePage;
