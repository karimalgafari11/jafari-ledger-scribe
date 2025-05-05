
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { usePayablesAccounts } from "@/hooks/usePayablesAccounts";
import { PayablesFilter } from "@/components/payables/PayablesFilter";
import { PayablesStats } from "@/components/payables/PayablesStats";
import { PayablesTable } from "@/components/payables/PayablesTable";
import { VendorDetailsDialog } from "@/components/payables/VendorDetailsDialog";
import { MakePaymentDialog } from "@/components/payables/MakePaymentDialog";
import { Button } from "@/components/ui/button";
import { Download, FileText, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PayablesAccountsPage = () => {
  const navigate = useNavigate();
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
    setAmountRange
  } = usePayablesAccounts();

  const [selectedVendor, setSelectedVendor] = useState<any | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const handleViewDetails = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsDetailsDialogOpen(true);
  };

  const handleMakePayment = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsPaymentDialogOpen(true);
  };

  const handleViewStatement = (vendor: any) => {
    // يمكن تنفيذ التنقل إلى صفحة كشف الحساب
    navigate(`/vendors/statement/${vendor.id}`);
  };

  const handleExportReport = () => {
    toast.info("جاري تصدير تقرير الحسابات المستحقة");
  };

  const handleBulkPayment = () => {
    toast.info("جاري فتح نافذة سداد المدفوعات بالجملة");
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
            <Button size="sm" onClick={handleBulkPayment}>
              <CreditCard size={16} className="ml-1" />
              سداد دفعات
            </Button>
          </div>
        </Header>
      </div>

      <main className="container mx-auto p-6">
        <PayablesStats 
          totalCount={totalCount} 
          totalPayables={totalPayables}
          averagePayable={averagePayable}
          overDueCount={overDueCount}
        />

        <Card className="mb-6">
          <CardHeader className="py-4 px-6">
            <CardTitle className="text-lg font-medium">فلترة الحسابات المستحقة</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <PayablesFilter
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
            <CardTitle className="text-lg font-medium">قائمة الموردين الدائنين</CardTitle>
            <span className="text-sm text-gray-500">
              إجمالي النتائج: {vendors.length}
            </span>
          </CardHeader>
          <CardContent className="p-0">
            <PayablesTable
              vendors={vendors}
              onViewDetails={handleViewDetails}
              onMakePayment={handleMakePayment}
              onViewStatement={handleViewStatement}
            />
          </CardContent>
        </Card>
      </main>

      <VendorDetailsDialog 
        open={isDetailsDialogOpen} 
        onClose={() => setIsDetailsDialogOpen(false)}
        vendor={selectedVendor}
        onMakePayment={handleMakePayment}
      />

      <MakePaymentDialog 
        open={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        vendor={selectedVendor}
      />
    </div>
  );
};

export default PayablesAccountsPage;
