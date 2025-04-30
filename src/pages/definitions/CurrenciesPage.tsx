
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { CurrenciesModule } from "@/components/definitions/currencies/CurrenciesModule";
import { ExchangeRatesModule } from "@/components/definitions/currencies/ExchangeRatesModule";

const CurrenciesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6 rtl">
        <Header title="إدارة العملات وأسعار الصرف" showBack={true} />
        <CurrenciesModule />
        <ExchangeRatesModule />
      </div>
    </Layout>
  );
};

export default CurrenciesPage;
