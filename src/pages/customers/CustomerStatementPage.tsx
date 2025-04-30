
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
      <div className="h-screen flex items-center justify-center">
        <p>جاري تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-gray-50" dir="rtl">
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

        <Card>
          <CardHeader>
            <CardTitle>كشف الحساب</CardTitle>
            <p className="text-gray-500">
              الفترة: {format(dateRange.from, "dd/MM/yyyy", { locale: ar })} - {format(dateRange.to, "dd/MM/yyyy", { locale: ar })}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateRangeSelector 
                dateRange={dateRange}
                onDateRangeChange={handleDateRangeChange}
              />
              <StatementFilter 
                selectedTypes={selectedTypes}
                onFilterChange={handleTypeFilterChange}
              />
            </div>
          </CardHeader>
          <CardContent>
            <TransactionsTable 
              transactions={transactions} 
              totalBalance={customer.balance}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CustomerStatementPage;
