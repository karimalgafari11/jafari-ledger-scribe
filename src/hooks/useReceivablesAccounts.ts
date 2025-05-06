
import { useState } from "react";
import { Customer } from "@/types/customers";
import { mockCustomers } from "@/data/mockCustomers";
import { Transaction } from "@/types/transactions";

export type AccountStatus = 'all' | 'overdue' | 'upcoming' | 'critical';

export const useReceivablesAccounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AccountStatus>("all");
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 100000]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  // استخدام البيانات المزيفة للعملاء للعرض
  const allCustomers = mockCustomers;

  // فلترة العملاء الذين لديهم رصيد مستحق
  const customersWithBalance = allCustomers.filter(customer => customer.balance > 0);

  // فلترة العملاء حسب معايير البحث
  const filteredCustomers = customersWithBalance.filter(customer => {
    // فلترة حسب البحث
    const matchesSearch = !searchTerm ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (customer.phone && customer.phone.includes(searchTerm));

    // فلترة حسب الحالة
    const percentOfLimit = customer.creditLimit ? (customer.balance / customer.creditLimit) * 100 : 100;
    
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "overdue" && percentOfLimit > 100) || 
      (statusFilter === "upcoming" && percentOfLimit > 75 && percentOfLimit <= 100) || 
      (statusFilter === "critical" && percentOfLimit > 90);

    // فلترة حسب المبلغ
    const matchesAmount = customer.balance >= amountRange[0] && 
      customer.balance <= amountRange[1];

    return matchesSearch && matchesStatus && matchesAmount;
  });

  // إحصائيات عامة
  const totalReceivables = filteredCustomers.reduce((sum, customer) => sum + customer.balance, 0);
  const averageReceivable = filteredCustomers.length > 0 
    ? totalReceivables / filteredCustomers.length 
    : 0;
  const overDueCount = filteredCustomers.filter(c => 
    c.creditLimit ? c.balance > c.creditLimit : c.balance > 5000
  ).length;

  // تبديل تحديد العميل
  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers(prev => {
      if (prev.includes(customerId)) {
        return prev.filter(id => id !== customerId);
      } else {
        return [...prev, customerId];
      }
    });
  };

  // تحديد كل العملاء
  const selectAllCustomers = () => {
    const allIds = filteredCustomers.map(customer => customer.id);
    setSelectedCustomers(allIds);
  };

  // إلغاء تحديد كل العملاء
  const unselectAllCustomers = () => {
    setSelectedCustomers([]);
  };

  // تصدير بيانات العملاء
  const exportCustomers = (format: "pdf" | "excel") => {
    console.log(`تصدير ${selectedCustomers.length || 'جميع'} العملاء بتنسيق ${format}`);
  };

  // إرسال تذكير للعملاء
  const sendReminders = (customerIds: string[]) => {
    console.log(`إرسال تذكيرات إلى ${customerIds.length} عميل`);
  };

  // جدولة الديون
  const schedulePayments = (customerIds: string[]) => {
    console.log(`جدولة مدفوعات لـ ${customerIds.length} عميل`);
  };

  return {
    customers: filteredCustomers,
    totalCount: filteredCustomers.length,
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
  };
};
