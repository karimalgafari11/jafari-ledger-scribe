
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCustomers } from "@/data/mockCustomers";
import { Customer } from "@/types/customers";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { ChevronRight, Download, Printer, Mail } from "lucide-react";

// نموذج لبيانات المعاملات
interface Transaction {
  id: string;
  date: Date;
  type: 'invoice' | 'payment' | 'return';
  reference: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2023-10-01'),
    type: 'invoice',
    reference: 'INV-001',
    description: 'فاتورة مبيعات',
    debit: 5000,
    credit: 0,
    balance: 5000
  },
  {
    id: '2',
    date: new Date('2023-10-10'),
    type: 'payment',
    reference: 'PAY-001',
    description: 'دفعة نقدية',
    debit: 0,
    credit: 3000,
    balance: 2000
  },
  {
    id: '3',
    date: new Date('2023-10-15'),
    type: 'invoice',
    reference: 'INV-002',
    description: 'فاتورة مبيعات',
    debit: 3500,
    credit: 0,
    balance: 5500
  },
  {
    id: '4',
    date: new Date('2023-10-20'),
    type: 'return',
    reference: 'RTN-001',
    description: 'مرتجع مبيعات',
    debit: 0,
    credit: 500,
    balance: 5000
  },
  {
    id: '5',
    date: new Date('2023-11-01'),
    type: 'payment',
    reference: 'PAY-002',
    description: 'دفعة نقدية',
    debit: 0,
    credit: 1000,
    balance: 4000
  }
];

const CustomerStatementPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // البحث عن العميل بواسطة المعرف
    const foundCustomer = mockCustomers.find(c => c.id === id);
    if (foundCustomer) {
      setCustomer(foundCustomer);
      setTransactions(mockTransactions);
    }
  }, [id]);

  const handleBack = () => {
    navigate('/customers/manage');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('سيتم تنزيل كشف الحساب كملف PDF');
  };

  const handleSendEmail = () => {
    alert(`سيتم إرسال كشف الحساب إلى ${customer?.email}`);
  };

  if (!customer) {
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
          <div className="flex items-center gap-2 rtl">
            <Button variant="outline" onClick={handlePrint}>
              <Printer size={16} className="ml-2" />
              طباعة
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download size={16} className="ml-2" />
              تنزيل PDF
            </Button>
            {customer.email && (
              <Button variant="outline" onClick={handleSendEmail}>
                <Mail size={16} className="ml-2" />
                إرسال بالبريد
              </Button>
            )}
          </div>
        </Header>
      </div>

      <main className="container mx-auto p-6">
        <Card className="mb-6">
          <CardHeader className="rtl">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl mb-2">معلومات العميل</CardTitle>
                <h2 className="text-2xl font-bold">{customer.name}</h2>
              </div>
              <div className="text-left">
                <p className="text-gray-500">رقم العميل: {customer.id.substring(0, 8)}</p>
                {customer.vatNumber && <p className="text-gray-500">الرقم الضريبي: {customer.vatNumber}</p>}
              </div>
            </div>
          </CardHeader>
          <CardContent className="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-1"><strong>رقم الهاتف:</strong> {customer.phone}</p>
                <p className="mb-1"><strong>البريد الإلكتروني:</strong> {customer.email || 'غير متوفر'}</p>
                <p className="mb-1"><strong>العنوان:</strong> {customer.address || 'غير متوفر'}</p>
              </div>
              <div>
                <p className="mb-1"><strong>نوع العميل:</strong> {customer.type === 'company' ? 'شركة' : 'فرد'}</p>
                <p className="mb-1"><strong>الرصيد الحالي:</strong> <span className="text-red-600 font-bold">{formatCurrency(customer.balance)}</span></p>
                <p className="mb-1"><strong>حد الائتمان:</strong> {formatCurrency(customer.creditLimit || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="rtl">
            <CardTitle>كشف الحساب</CardTitle>
            <p className="text-gray-500">الفترة: 01/10/2023 - 01/11/2023</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rtl">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-right">التاريخ</th>
                    <th className="border p-2 text-right">المرجع</th>
                    <th className="border p-2 text-right">الوصف</th>
                    <th className="border p-2 text-right">الخصم</th>
                    <th className="border p-2 text-right">الإضافة</th>
                    <th className="border p-2 text-right">الرصيد</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border p-2" colSpan={5}>الرصيد الافتتاحي</td>
                    <td className="border p-2 font-bold">0.00</td>
                  </tr>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="border p-2">{formatDate(transaction.date)}</td>
                      <td className="border p-2">{transaction.reference}</td>
                      <td className="border p-2">{transaction.description}</td>
                      <td className="border p-2 text-red-600">
                        {transaction.debit > 0 ? formatCurrency(transaction.debit) : ''}
                      </td>
                      <td className="border p-2 text-green-600">
                        {transaction.credit > 0 ? formatCurrency(transaction.credit) : ''}
                      </td>
                      <td className="border p-2 font-medium">{formatCurrency(transaction.balance)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td className="border p-2" colSpan={3}>الإجمالي</td>
                    <td className="border p-2 text-red-600">{formatCurrency(transactions.reduce((sum, t) => sum + t.debit, 0))}</td>
                    <td className="border p-2 text-green-600">{formatCurrency(transactions.reduce((sum, t) => sum + t.credit, 0))}</td>
                    <td className="border p-2">{formatCurrency(customer.balance)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CustomerStatementPage;
