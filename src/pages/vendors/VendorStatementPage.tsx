
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockVendors } from "@/data/mockVendors";
import { VendorStatementHeader } from "@/components/vendors/statement/VendorStatementHeader";
import { VendorStatementSummary } from "@/components/vendors/statement/VendorStatementSummary";
import { VendorTransactionsTable } from "@/components/vendors/statement/VendorTransactionsTable";
import { VendorInfoCard } from "@/components/vendors/statement/VendorInfoCard";
import { VendorNotFound } from "@/components/vendors/statement/VendorNotFound";
import { useVendorStatement } from "@/hooks/vendors/useVendorStatement";
import { Vendor } from "@/types/vendor";

const VendorStatementPage = () => {
  const { id } = useParams<{ id: string }>();

  // البحث عن المورد بالمعرف
  const vendor = mockVendors.find(v => v.id === id);
  
  if (!vendor) {
    return <VendorNotFound />;
  }

  const {
    dateRange,
    setDateRange,
    vendorAsCustomer,
    filteredTransactions,
    handleResetDateRange
  } = useVendorStatement(vendor);

  return (
    <div className="container p-6 mx-auto">
      <VendorStatementHeader vendorName={vendor.name} />

      <VendorStatementSummary 
        balance={vendor.balance}
        transactions={filteredTransactions}
      />

      <VendorTransactionsTable 
        transactions={filteredTransactions}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        vendorAsCustomer={vendorAsCustomer}
        onResetDateRange={handleResetDateRange}
      />

      <VendorInfoCard vendor={vendor} />
    </div>
  );
};

export default VendorStatementPage;
