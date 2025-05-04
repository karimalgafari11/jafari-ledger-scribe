
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
      <div className="flex-1 overflow-auto p-4">
        <PurchaseInvoiceForm />
      </div>
    </Layout>
  );
};

export default PurchaseInvoicePage;
