
import React from "react";
import { Layout } from "@/components/Layout";
import { AccountChartContainer } from "@/components/accounting/AccountChartContainer";
import { Header } from "@/components/Header";

const AccountChartPage: React.FC = () => {
  return (
    <div className="page-container h-screen overflow-hidden flex flex-col">
      <Header title="مخطط الحسابات" showBack={true} className="w-full" />
      <div className="flex-1 overflow-auto">
        <AccountChartContainer />
      </div>
    </div>
  );
};

export default AccountChartPage;
