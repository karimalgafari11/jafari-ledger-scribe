
import { useMemo } from 'react';
import { mockVendors } from '@/data/mockVendors';
import { Expense } from '@/types/expenses';

export const useVendorStats = (filteredExpenses: Expense[]) => {
  // حساب الإحصائيات
  const totalPurchases = useMemo(() => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  }, [filteredExpenses]);

  const avgPurchaseValue = useMemo(() => {
    if (filteredExpenses.length === 0) return 0;
    return Math.round(totalPurchases / filteredExpenses.length);
  }, [filteredExpenses, totalPurchases]);

  const activeVendorsCount = useMemo(() => {
    return mockVendors.filter(vendor => vendor.status === 'نشط').length;
  }, []);

  return {
    totalPurchases,
    avgPurchaseValue,
    activeVendorsCount
  };
};
