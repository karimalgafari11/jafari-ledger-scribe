
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { CashRegistersModule } from "@/components/accounting/cashregisters/CashRegistersModule";
import { CashTransactionsModule } from "@/components/accounting/cashregisters/CashTransactionsModule";

const CashRegisterPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6 rtl">
        <Header title="إدارة صناديق النقدية" showBack={true} />
        <CashRegistersModule />
        <CashTransactionsModule />
      </div>
    </Layout>
  );
};

export default CashRegisterPage;
