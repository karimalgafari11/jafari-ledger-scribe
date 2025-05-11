
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { VendorStatementFilters } from "@/components/vendors/statement/VendorStatementFilters";
import { VendorStatementList } from "@/components/vendors/statement/VendorStatementList";
import { VendorStatementStats } from "@/components/vendors/statement/VendorStatementStats";
import { useVendorStatementList } from "@/hooks/vendors/useVendorStatementList";
import { Card, CardContent } from "@/components/ui/card";

const VendorStatementListPage = () => {
  const {
    vendors,
    filteredVendors,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    balanceFilter,
    setBalanceFilter,
    totalVendors,
    totalBalance,
    overDueVendors
  } = useVendorStatementList();

  return (
    <Layout className="h-screen overflow-hidden bg-gray-50">
      <div className="flex flex-col h-full w-full">
        <Header title="كشوفات حسابات الموردين" showBack={true} />
        <div className="flex-1 overflow-auto p-6">
          <VendorStatementStats 
            totalVendors={totalVendors}
            totalBalance={totalBalance}
            overDueVendors={overDueVendors}
          />
          
          <Card className="mb-6 mt-6">
            <CardContent className="p-6">
              <VendorStatementFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                balanceFilter={balanceFilter}
                setBalanceFilter={setBalanceFilter}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <VendorStatementList vendors={filteredVendors} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default VendorStatementListPage;
