
import React from "react";
import { Header } from "@/components/Header";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardWelcomeBanner from "@/components/dashboard/DashboardWelcomeBanner";
import DisplayOptionsForm from "@/components/dashboard/DisplayOptionsForm";
import { useDashboard } from "@/hooks/useDashboard";

const Dashboard = () => {
  const {
    displayOptions,
    setDisplayOptions,
    shortcuts,
    salesData,
    profitData,
    customerDebtData,
    supplierCreditData,
    costCenterData,
    dailySalesData,
    totalSales,
    totalExpenses,
    netProfit,
    profitMargin,
    overdueInvoices,
    overdueTotalAmount,
    dashboardKpis,
    alerts
  } = useDashboard();

  return (
    <div className="page-container">
      <Header title="لوحة التحكم" showBack={false} className="w-full" />

      <div className="page-content">
        <DashboardWelcomeBanner />

        <DashboardContent
          totalSales={totalSales}
          totalExpenses={totalExpenses}
          netProfit={netProfit}
          profitMargin={profitMargin}
          overdueInvoices={overdueInvoices}
          overdueTotalAmount={overdueTotalAmount}
          kpis={dashboardKpis}
          salesData={salesData}
          profitData={profitData}
          customerDebtData={customerDebtData}
          supplierCreditData={supplierCreditData}
          costCenterData={costCenterData}
          dailySalesData={dailySalesData}
          systemAlerts={alerts}
          interactiveMode={false}
          displayOptions={displayOptions}
          shortcuts={shortcuts}
        />

        <DisplayOptionsForm 
          displayOptions={displayOptions} 
          setDisplayOptions={setDisplayOptions} 
          className="mb-6"
        />
      </div>
    </div>
  );
};

export default Dashboard;
