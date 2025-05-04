
import React from "react";
import { Layout } from "@/components/Layout";
import { PurchaseInvoiceForm } from "@/components/purchases/PurchaseInvoiceForm";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const PurchaseInvoicePage = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/purchases/invoices');
  };

  return (
    <Layout>
      <Header 
        title="فاتورة شراء جديدة" 
        showBack={true}
        onBackClick={handleBack}
      />
      <PurchaseInvoiceForm />
    </Layout>
  );
};

export default PurchaseInvoicePage;
