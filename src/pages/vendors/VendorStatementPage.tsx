
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockVendors } from "@/data/mockVendors";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Download, Printer, ArrowLeft, FileText } from "lucide-react";
import { toast } from "sonner";
import { EmptyStatementNotice } from "@/components/customers/statement/EmptyStatementNotice";

// بيانات وهمية للمعاملات
const MOCK_TRANSACTIONS = [
  {
    id: "1",
    date: new Date('2023-07-15'),
    description: "فاتورة مشتريات رقم 10045",
    type: "purchase",
    amount: 1200,
    balance: 1200
  },
  {
    id: "2",
    date: new Date('2023-08-01'),
    description: "دفعة سداد",
    type: "payment",
    amount: -800,
    balance: 400
  },
  {
    id: "3",
    date: new Date('2023-08-20'),
    description: "فاتورة مشتريات رقم 10087",
    type: "purchase",
    amount: 3500,
    balance: 3900
  },
  {
    id: "4",
    date: new Date('2023-09-05'),
    description: "مرتجع بضاعة",
    type: "return",
    amount: -500,
    balance: 3400
  }
];

const VendorStatementPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    to: new Date()
  });

  // البحث عن المورد بالمعرف
  const vendor = mockVendors.find(v => v.id === id);

  // فلترة المعاملات حسب التاريخ
  const filteredTransactions = MOCK_TRANSACTIONS.filter(transaction => {
    if (!dateRange.from || !dateRange.to) return true;
    return transaction.date >= dateRange.from && transaction.date <= dateRange.to;
  });

  const handlePrint = () => {
    toast.success('جاري إعداد كشف الحساب للطباعة...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleExport = () => {
    toast.success('جاري تصدير كشف الحساب...');
    setTimeout(() => {
      toast.success('تم تصدير كشف الحساب بنجاح');
    }, 1500);
  };

  const handleResetDateRange = () => {
    setDateRange({
      from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      to: new Date()
    });
    toast.info('تم إعادة ضبط الفترة الزمنية');
  };

  if (!vendor) {
    return (
      <div className="container p-6 mx-auto">
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">لم يتم العثور على المورد</h2>
          <p className="text-gray-500 mb-6">المورد المطلوب غير موجود أو تم حذفه</p>
          <Button onClick={() => navigate('/vendors/statement')}>
            العودة إلى قائمة الموردين
          </Button>
        </div>
      </div>
    );
  }

  // تحويل بيانات المورد إلى الشكل المتوافق مع واجهة Customer
  const vendorAsCustomer = {
    id: vendor.id,
    name: vendor.name,
    email: vendor.email || "",
    phone: vendor.phone || "",
    address: vendor.address || "",
    balance: vendor.balance,
    status: vendor.status === "نشط" ? "active" : "inactive",
    type: "company" as const, // تعديل النوع ليكون متوافقًا مع النوع المتوقع
    updatedAt: new Date(),
    createdAt: new Date(vendor.createdAt)
  };

  return (
    <div className="container p-6 mx-auto">
      <Header title={`كشف حساب المورد: ${vendor.name}`} showBack={true}>
        <div className="flex gap-2 rtl">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer size={16} className="ml-1" />
            طباعة
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download size={16} className="ml-1" />
            تصدير
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/vendors/statement')}>
            <ArrowLeft size={16} className="ml-1" />
            قائمة الموردين
          </Button>
        </div>
      </Header>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 rtl">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-blue-600">الرصيد الحالي</p>
            <p className="text-3xl font-bold mt-2">{vendor.balance.toLocaleString()} ريال</p>
            <p className="text-xs text-blue-500 mt-1">آخر تحديث: اليوم</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-amber-600">إجمالي المشتريات</p>
            <p className="text-3xl font-bold mt-2">
              {MOCK_TRANSACTIONS
                .filter(t => t.type === 'purchase')
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()} ريال
            </p>
            <p className="text-xs text-amber-500 mt-1">في الفترة المحددة</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-green-600">إجمالي المدفوعات</p>
            <p className="text-3xl font-bold mt-2">
              {Math.abs(
                MOCK_TRANSACTIONS
                  .filter(t => t.type === 'payment')
                  .reduce((sum, t) => sum + t.amount, 0)
              ).toLocaleString()} ريال
            </p>
            <p className="text-xs text-green-500 mt-1">في الفترة المحددة</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-lg font-medium">كشف حساب {vendor.name}</CardTitle>
          <div className="w-64">
            <DatePickerWithRange value={dateRange} onChange={setDateRange} />
          </div>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-right">
                    <th className="p-3 border border-gray-200">التاريخ</th>
                    <th className="p-3 border border-gray-200">البيان</th>
                    <th className="p-3 border border-gray-200">نوع الحركة</th>
                    <th className="p-3 border border-gray-200">المبلغ</th>
                    <th className="p-3 border border-gray-200">الرصيد</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map(transaction => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-200">
                        {transaction.date.toLocaleDateString('ar-SA')}
                      </td>
                      <td className="p-3 border border-gray-200">{transaction.description}</td>
                      <td className="p-3 border border-gray-200">
                        {transaction.type === 'purchase' && 'فاتورة مشتريات'}
                        {transaction.type === 'payment' && 'دفعة سداد'}
                        {transaction.type === 'return' && 'مرتجع بضاعة'}
                      </td>
                      <td className={`p-3 border border-gray-200 ${
                        transaction.amount < 0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {Math.abs(transaction.amount).toLocaleString()} ريال
                        {transaction.amount < 0 ? ' (خصم)' : ''}
                      </td>
                      <td className="p-3 border border-gray-200 font-medium">
                        {transaction.balance.toLocaleString()} ريال
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyStatementNotice 
              customer={vendorAsCustomer}
              onDateRangeReset={handleResetDateRange} 
            />
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>بيانات المورد</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">اسم المورد</p>
              <p className="font-medium">{vendor.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">جهة الاتصال</p>
              <p className="font-medium">{vendor.contactPerson || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">رقم الهاتف</p>
              <p className="font-medium">{vendor.phone || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">البريد الإلكتروني</p>
              <p className="font-medium">{vendor.email || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">العنوان</p>
              <p className="font-medium">{vendor.address || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">الرقم الضريبي</p>
              <p className="font-medium">{vendor.taxNumber || '-'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorStatementPage;
