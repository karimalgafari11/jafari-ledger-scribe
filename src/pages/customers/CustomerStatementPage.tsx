
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { CustomerInfo } from "@/components/customers/CustomerInfo";
import { StatementActions } from "@/components/customers/StatementActions";
import { useCustomerStatement } from "@/hooks/useCustomerStatement";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { StatementTabs } from "@/components/customers/statement/StatementTabs";

const CustomerStatementPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("statement");
  const { toast } = useToast();
  
  const { 
    customer, 
    transactions, 
    isLoading,
    selectedTypes,
    dateRange,
    currentPage,
    totalPages,
    handleTypeFilterChange,
    handleDateRangeChange,
    handleDateRangeReset,
    handlePageChange,
    handlePrint, 
    handleDownload, 
    handleSendEmail 
  } = useCustomerStatement(id);

  const handleBack = () => {
    navigate('/customers/statement');
  };

  const handleShare = () => {
    toast({
      title: "تمت مشاركة كشف الحساب",
      description: "تم إرسال رابط كشف الحساب عبر الواتساب",
    });
  };

  if (isLoading || !customer) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-t-blue-600 border-blue-200 animate-spin"></div>
          <p className="text-gray-600 font-medium">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50" dir="rtl">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="كشف حساب العميل" showBack={true} onBackClick={handleBack}>
          <StatementActions 
            onPrint={handlePrint}
            onDownload={handleDownload}
            onSendEmail={handleSendEmail}
            hasEmail={Boolean(customer.email)}
          />
        </Header>
      </div>

      <main className="container mx-auto px-4 py-6">
        <CustomerInfo customer={customer} />

        <StatementTabs
          customer={customer}
          transactions={transactions}
          dateRange={dateRange}
          selectedTypes={selectedTypes}
          handleTypeFilterChange={handleTypeFilterChange}
          handleDateRangeChange={handleDateRangeChange}
          handleDateRangeReset={handleDateRangeReset}
          handlePrint={handlePrint}
          handleDownload={handleDownload}
          handleShare={handleShare}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default CustomerStatementPage;
