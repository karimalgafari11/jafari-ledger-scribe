
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { useReceivables } from "@/hooks/useReceivables";
import { ReceivablesFilter } from "@/components/receivables/ReceivablesFilter";
import { ReceivablesStats } from "@/components/receivables/ReceivablesStats";
import { ReceivablesTable } from "@/components/receivables/ReceivablesTable";
import { CustomerDetailsDialog } from "@/components/receivables/CustomerDetailsDialog";
import { CollectPaymentDialog } from "@/components/receivables/CollectPaymentDialog";
import { Customer } from "@/types/customers";
import { Button } from "@/components/ui/button";
import { FileText, Download, CreditCard } from "lucide-react";
import { AccountStatus } from "@/hooks/useReceivablesAccounts";

const ReceivablesPage = () => {
  const {
    customers,
    totalCount,
    totalReceivables,
    averageReceivable,
    overDueCount,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    amountRange,
    setAmountRange
  } = useReceivables();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsDialogOpen(true);
  };

  const handleCollectPayment = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsPaymentDialogOpen(true);
  };

  const handleExportReport = () => {
    // محاكاة تصدير التقرير
    console.log("Exporting receivables report");
  };

  const handleBulkCollection = () => {
    // محاكاة فتح نافذة تحصيل الدفعات بالجملة
    console.log("Opening bulk collection dialog");
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="الذمم المدينة" showBack={true}>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportReport}>
              <Download size={16} className="ml-1" />
              تصدير
            </Button>
            <Button size="sm" onClick={handleBulkCollection}>
              <CreditCard size={16} className="ml-1" />
              تحصيل دفعات
            </Button>
          </div>
        </Header>
      </div>

      <main className="container mx-auto p-6">
        <ReceivablesStats 
          totalCount={totalCount} 
          totalReceivables={totalReceivables}
          averageReceivable={averageReceivable}
          overDueCount={overDueCount}
        />

        <Card className="mb-6">
          <CardHeader className="py-4 px-6">
            <CardTitle className="text-lg font-medium">فلترة الذمم المدينة</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <ReceivablesFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter as AccountStatus}
              onStatusFilterChange={(value: AccountStatus) => setStatusFilter(value)}
              amountRange={amountRange}
              onAmountRangeChange={setAmountRange}
              maxAmount={100000}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
            <CardTitle className="text-lg font-medium">قائمة العملاء المدينين</CardTitle>
            <span className="text-sm text-gray-500">
              إجمالي النتائج: {customers.length}
            </span>
          </CardHeader>
          <CardContent className="p-0">
            <ReceivablesTable
              customers={customers}
              onViewDetails={handleViewDetails}
              onCollectPayment={handleCollectPayment}
            />
          </CardContent>
        </Card>
      </main>

      <CustomerDetailsDialog 
        isOpen={isDetailsDialogOpen} 
        onClose={() => setIsDetailsDialogOpen(false)}
        customer={selectedCustomer}
      />

      <CollectPaymentDialog 
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default ReceivablesPage;
