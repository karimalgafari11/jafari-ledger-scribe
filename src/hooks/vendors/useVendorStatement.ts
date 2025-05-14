
import { useState } from "react";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { Customer } from "@/types/customers";
import { Vendor } from "@/types/vendor";

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

export const useVendorStatement = (vendor: Vendor) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    to: new Date()
  });

  // تحويل بيانات المورد إلى الشكل المتوافق مع واجهة Customer
  const vendorAsCustomer: Customer = {
    id: vendor.id,
    name: vendor.name,
    email: vendor.email || "",
    phone: vendor.phone || "",
    address: vendor.address || "",
    balance: vendor.balance,
    status: vendor.status === "نشط" ? "active" as const : "inactive" as const,
    type: "company" as const,
    updatedAt: new Date(),
    createdAt: new Date(vendor.createdAt)
  };

  // فلترة المعاملات حسب التاريخ
  const filteredTransactions = MOCK_TRANSACTIONS.filter(transaction => {
    if (!dateRange.from || !dateRange.to) return true;
    return transaction.date >= dateRange.from && transaction.date <= dateRange.to;
  });

  const handleResetDateRange = () => {
    setDateRange({
      from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      to: new Date()
    });
    toast.info('تم إعادة ضبط الفترة الزمنية');
  };

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

  return {
    dateRange,
    setDateRange,
    vendorAsCustomer,
    filteredTransactions,
    handleResetDateRange,
    handlePrint,
    handleExport
  };
};
