
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerInfo } from "@/components/customers/CustomerInfo";
import { TransactionsTable } from "@/components/customers/TransactionsTable";
import { StatementActions } from "@/components/customers/StatementActions";
import { StatementFilter } from "@/components/customers/StatementFilter";
import { DateRangeSelector } from "@/components/customers/DateRangeSelector";
import { useCustomerStatement } from "@/hooks/useCustomerStatement";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const CustomerStatementPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    customer, 
    transactions, 
    isLoading,
    selectedTypes,
    dateRange,
    handleTypeFilterChange,
    handleDateRangeChange,
    handlePrint, 
    handleDownload, 
    handleSendEmail 
  } = useCustomerStatement(id);

  const handleBack = () => {
    navigate('/customers/manage');
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

      <main className="container mx-auto p-6">
        <CustomerInfo customer={customer} />

        <Card className="my-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span>كشف الحساب</span>
              <span className="text-base font-normal text-gray-500">
                الفترة: {format(dateRange.from, "dd/MM/yyyy", { locale: ar })} - {format(dateRange.to, "dd/MM/yyyy", { locale: ar })}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DateRangeSelector 
                dateRange={dateRange}
                onDateRangeChange={handleDateRangeChange}
              />
              <StatementFilter 
                selectedTypes={selectedTypes}
                onFilterChange={handleTypeFilterChange}
              />
            </div>
            
            {transactions.length > 0 ? (
              <TransactionsTable 
                transactions={transactions} 
                totalBalance={customer.balance}
              />
            ) : (
              <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-md">
                <p className="text-gray-600">لا توجد معاملات في الفترة المحددة</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CustomerStatementPage;
