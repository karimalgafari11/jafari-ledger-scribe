
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { PayablesStats } from "@/components/payables/PayablesStats";
import { PayablesFilter } from "@/components/payables/PayablesFilter";
import { PayablesTable } from "@/components/payables/PayablesTable";
import { VendorDetailsDialog } from "@/components/payables/VendorDetailsDialog";
import { MakePaymentDialog } from "@/components/payables/MakePaymentDialog";
import { usePayables } from "@/hooks/usePayables";

const PayablesPage = () => {
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const {
    vendors,
    totalCount,
    totalPayables,
    averagePayable,
    overDueCount,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    amountRange,
    setAmountRange,
    maxAmount,
    handleViewStatement
  } = usePayables();

  const handleViewDetails = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsDetailsOpen(true);
  };

  const handleMakePayment = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsPaymentOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const handleClosePayment = () => {
    setIsPaymentOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">إدارة الذمم الدائنة (الموردين)</h1>

        <PayablesStats
          totalCount={totalCount}
          totalPayables={totalPayables}
          averagePayable={averagePayable}
          overDueCount={overDueCount}
        />

        <PayablesFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          amountRange={amountRange}
          onAmountRangeChange={setAmountRange}
          maxAmount={maxAmount}
        />

        <PayablesTable
          vendors={vendors}
          onViewDetails={handleViewDetails}
          onMakePayment={handleMakePayment}
          onViewStatement={handleViewStatement}
        />

        <VendorDetailsDialog
          vendor={selectedVendor}
          open={isDetailsOpen}
          onClose={handleCloseDetails}
          onMakePayment={handleMakePayment}
        />

        <MakePaymentDialog
          vendor={selectedVendor}
          open={isPaymentOpen}
          onClose={handleClosePayment}
        />
      </div>
    </Layout>
  );
};

export default PayablesPage;
