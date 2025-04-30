
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerInfo } from "@/components/customers/CustomerInfo";
import { TransactionsTable } from "@/components/customers/TransactionsTable";
import { StatementActions } from "@/components/customers/StatementActions";
import { useCustomerStatement } from "@/hooks/useCustomerStatement";

const CustomerStatementPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    customer, 
    transactions, 
    isLoading,
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
    <div className="h-screen overflow-y-auto bg-gray-50">
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
          <CardHeader className="rtl">
            <CardTitle>كشف الحساب</CardTitle>
            <p className="text-gray-500">الفترة: 01/10/2023 - 01/11/2023</p>
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
