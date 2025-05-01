
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { CashRegistersModule } from "@/components/accounting/cashregisters/CashRegistersModule";
import { CashTransactionsModule } from "@/components/accounting/cashregisters/CashTransactionsModule";

const CashRegisterPage = () => {
  return (
    <Layout>
      <div className="flex flex-col h-screen w-full overflow-hidden rtl">
        <Header title="إدارة صناديق النقدية" showBack={true} />
        
        <div className="flex-1 overflow-auto p-4 pb-16">
          <CashRegistersModule />
          <CashTransactionsModule />
        </div>
      </div>
    </Layout>
  );
};

export default CashRegisterPage;
