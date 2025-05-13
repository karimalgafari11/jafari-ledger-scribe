
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockVendors } from "@/data/mockVendors";
import { VendorStatementHeader } from "@/components/vendors/statement/VendorStatementHeader";
import { VendorStatementSummary } from "@/components/vendors/statement/VendorStatementSummary";
import { VendorTransactionsTable } from "@/components/vendors/statement/VendorTransactionsTable";
import { VendorInfoCard } from "@/components/vendors/statement/VendorInfoCard";
import { VendorNotFound } from "@/components/vendors/statement/VendorNotFound";
import { useVendorStatement } from "@/hooks/vendors/useVendorStatement";

const VendorStatementPage = () => {
  const { id } = useParams<{ id: string }>();

  // البحث عن المورد بالمعرف
  const vendor = mockVendors.find(v => v.id === id);
  
  if (!vendor) {
    return <VendorNotFound />;
  }

  // Ensure vendor has balance property (default to 0 if not present)
  const vendorWithBalance = {
    ...vendor,
    balance: vendor.balance || 0
  };

  const {
    dateRange,
    setDateRange,
    vendorAsCustomer,
    filteredTransactions,
    handleResetDateRange
  } = useVendorStatement(vendorWithBalance);

  return (
    <div className="container p-6 mx-auto">
      <VendorStatementHeader vendorName={vendorWithBalance.name} />

      <VendorStatementSummary 
        balance={vendorWithBalance.balance}
        transactions={filteredTransactions}
      />

      <VendorTransactionsTable 
        transactions={filteredTransactions}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        vendorAsCustomer={vendorAsCustomer}
        onResetDateRange={handleResetDateRange}
      />

      <VendorInfoCard vendor={vendorWithBalance} />
    </div>
  );
};

export default VendorStatementPage;
