
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { useReceivablesAccounts, AccountStatus } from "@/hooks/useReceivablesAccounts";
import { ReceivablesFilter } from "@/components/receivables/ReceivablesFilter";
import { ReceivablesStats } from "@/components/receivables/ReceivablesStats";
import { ReceivablesAccountsTable } from "@/components/receivables/ReceivablesAccountsTable";
import { ReceivablesAccountsActions } from "@/components/receivables/ReceivablesAccountsActions";
import { CustomerDetailsDialog } from "@/components/receivables/CustomerDetailsDialog";
import { CollectPaymentDialog } from "@/components/receivables/CollectPaymentDialog";
import { Button } from "@/components/ui/button";
import { Download, CreditCard } from "lucide-react";
import { Customer } from "@/types/customers";
import { toast } from "sonner";
import { SchedulePaymentDialog } from "@/components/receivables/SchedulePaymentDialog";

const ReceivablesAccountsPage = () => {
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
    setAmountRange,
    selectedCustomers,
    toggleCustomerSelection,
    selectAllCustomers,
    unselectAllCustomers,
    exportCustomers,
    sendReminders,
    schedulePayments
  } = useReceivablesAccounts();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsDialogOpen(true);
  };

  const handleCollectPayment = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsPaymentDialogOpen(true);
  };

  const handleSchedulePayment = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsScheduleDialogOpen(true);
  };

  const handleViewStatement = (customerId: string) => {
    toast.info("جاري تحميل كشف الحساب...");
    // هنا يمكن تنفيذ التنقل إلى صفحة كشف الحساب
    console.log(`عرض كشف حساب للعميل: ${customerId}`);
  };

  const handleExportReport = () => {
    toast.info("جاري تصدير تقرير الحسابات المستحقة");
  };

  const handleBulkCollection = () => {
    toast.info("جاري فتح نافذة تحصيل الدفعات بالجملة");
  };

  const handlePrint = () => {
    toast.info("جاري إعداد الصفحة للطباعة...");
  };

  const handleSendReminders = () => {
    if (selectedCustomers.length === 0) {
      toast.error("يرجى تحديد عميل واحد على الأقل");
      return;
    }
    
    sendReminders(selectedCustomers);
    toast.success(`تم إرسال تذكيرات إلى ${selectedCustomers.length} عميل`);
  };

  const handleSchedulePayments = () => {
    if (selectedCustomers.length === 0) {
      toast.error("يرجى تحديد عميل واحد على الأقل");
      return;
    }
    
    schedulePayments(selectedCustomers);
    toast.success(`تمت جدولة المدفوعات لـ ${selectedCustomers.length} عميل`);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="الحسابات المستحقة" showBack={true}>
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
            <CardTitle className="text-lg font-medium">فلترة الحسابات المستحقة</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <ReceivablesFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              amountRange={amountRange}
              onAmountRangeChange={setAmountRange}
              maxAmount={100000}
            />
          </CardContent>
        </Card>

        <ReceivablesAccountsActions
          selectedCount={selectedCustomers.length}
          onExport={(format) => exportCustomers(format)}
          onPrint={handlePrint}
          onSendReminders={handleSendReminders}
          onSchedulePayments={handleSchedulePayments}
          onSelectAll={selectAllCustomers}
          onUnselectAll={unselectAllCustomers}
        />

        <Card className="mt-4">
          <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
            <CardTitle className="text-lg font-medium">قائمة العملاء المدينين</CardTitle>
            <span className="text-sm text-gray-500">
              إجمالي النتائج: {customers.length}
            </span>
          </CardHeader>
          <CardContent className="p-0">
            <ReceivablesAccountsTable
              customers={customers}
              selectedCustomers={selectedCustomers}
              onToggleSelection={toggleCustomerSelection}
              onViewDetails={handleViewDetails}
              onCollectPayment={handleCollectPayment}
              onSchedulePayment={handleSchedulePayment}
              onViewStatement={handleViewStatement}
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

      <SchedulePaymentDialog 
        isOpen={isScheduleDialogOpen}
        onClose={() => setIsScheduleDialogOpen(false)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default ReceivablesAccountsPage;
