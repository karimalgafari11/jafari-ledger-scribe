
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { useReceivables } from "@/hooks/useReceivables";
import { Customer } from "@/types/customers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CollectionFilter } from "@/components/receivables/CollectionFilter";
import { CollectionStats } from "@/components/receivables/CollectionStats";
import { CollectionTable } from "@/components/receivables/CollectionTable";
import { CollectPaymentDialog } from "@/components/receivables/CollectPaymentDialog";
import { CustomerDetailsDialog } from "@/components/receivables/CustomerDetailsDialog";
import { CollectionActionsDialog } from "@/components/receivables/CollectionActionsDialog";
import { Download, FileText, CreditCard, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { AccountStatus } from "@/hooks/useReceivablesAccounts";

const CollectionPage = () => {
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
  const [isActionsDialogOpen, setIsActionsDialogOpen] = useState(false);
  
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsDialogOpen(true);
  };

  const handleCollectPayment = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsPaymentDialogOpen(true);
  };
  
  const handleCollectionActions = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsActionsDialogOpen(true);
  };

  const handleSendReminder = (customerId: string) => {
    toast.success("تم إرسال تذكير للعميل بنجاح");
  };

  const handleExportReport = () => {
    toast.info("جاري تصدير تقرير التحصيلات");
  };

  const handleGenerateStatement = () => {
    toast.info("جاري إنشاء كشف حساب للعملاء المحددين");
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">تحصيل الديون المستحقة</h1>

        <CollectionStats 
          totalCount={totalCount} 
          totalDue={totalReceivables}
          averageDue={averageReceivable}
          overDueCount={overDueCount}
        />

        <div className="flex flex-wrap gap-3 mb-6">
          <Button variant="outline" onClick={handleExportReport} className="gap-2">
            <Download size={16} />
            <span>تصدير التقرير</span>
          </Button>
          <Button variant="outline" onClick={handleGenerateStatement} className="gap-2">
            <FileText size={16} />
            <span>كشوفات حساب</span>
          </Button>
          <Button className="gap-2">
            <CreditCard size={16} />
            <span>حملة تحصيل</span>
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">فلترة العملاء المدينين</CardTitle>
          </CardHeader>
          <CardContent>
            <CollectionFilter
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
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">قائمة الديون المستحقة التحصيل</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CollectionTable
              customers={customers}
              onViewDetails={handleViewDetails}
              onCollectPayment={handleCollectPayment}
              onCollectionActions={handleCollectionActions}
              onSendReminder={handleSendReminder}
            />
          </CardContent>
        </Card>

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

        <CollectionActionsDialog
          isOpen={isActionsDialogOpen}
          onClose={() => setIsActionsDialogOpen(false)}
          customer={selectedCustomer}
        />
      </div>
    </Layout>
  );
};

export default CollectionPage;
