
import React from "react";
import { Layout } from "@/components/Layout";
import { AccountChartContainer } from "@/components/accounting/AccountChartContainer";

const AccountChartPage: React.FC = () => {
  return (
    <Layout className="min-h-screen w-full p-0 md:p-4">
      <AccountChartContainer />
    </Layout>
  );
};

export default AccountChartPage;
