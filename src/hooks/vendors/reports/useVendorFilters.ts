
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { MOCK_EXPENSES } from '@/data/mockPurchaseExpenses';
import { Expense } from '@/types/expenses';

export const useVendorFilters = () => {
  // إعدادات الفلترة
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 يوم للخلف
    to: new Date()
  });
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // فلترة البيانات
  const filteredExpenses = useMemo(() => {
    return MOCK_EXPENSES.filter(expense => {
      const matchesDate = expense.date >= dateRange.from && expense.date <= dateRange.to;
      const matchesCategory = category === 'all' || expense.category === category;
      const matchesSearch = !searchQuery || 
        expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (expense.vendor && expense.vendor.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesDate && matchesCategory && matchesSearch;
    });
  }, [dateRange, category, searchQuery]);

  // وظائف التفاعل
  const applyFilters = () => {
    toast.success('تم تطبيق الفلترة');
  };

  const resetFilters = () => {
    setDateRange({
      from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      to: new Date()
    });
    setCategory('all');
    setSearchQuery('');
    toast.success('تم إعادة ضبط الفلترة');
  };

  return {
    dateRange,
    setDateRange,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    filteredExpenses,
    applyFilters,
    resetFilters
  };
};
