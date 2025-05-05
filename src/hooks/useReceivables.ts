
import { useState } from "react";
import { Customer } from "@/types/customers";
import { mockCustomers } from "@/data/mockCustomers";

export const useReceivables = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, overdue, upcoming
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 100000]);

  // استخدام البيانات المزيفة للعملاء للعرض
  const allCustomers = mockCustomers;

  // فلترة العملاء الذين لديهم رصيد مستحق
  const customersWithBalance = allCustomers.filter(customer => customer.balance > 0);

  // فلترة العملاء حسب معايير البحث
  const filteredCustomers = customersWithBalance.filter(customer => {
    // فلترة حسب البحث
    const matchesSearch = !searchTerm ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    // فلترة حسب الحالة (افتراضية حتى نضيف خصائص مثل تاريخ الاستحقاق)
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "overdue" && customer.balance > 2000) || 
      (statusFilter === "upcoming" && customer.balance <= 2000);

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
  const overDueCount = filteredCustomers.filter(c => c.balance > 2000).length;

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
    setAmountRange
  };
};
