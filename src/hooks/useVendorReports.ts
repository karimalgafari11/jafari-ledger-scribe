
import { useMemo } from 'react';
import { mockVendors } from '@/data/mockVendors';
import { useVendorFilters } from './vendors/reports/useVendorFilters';
import { useVendorChartData } from './vendors/reports/useVendorChartData';
import { useVendorExport } from './vendors/reports/useVendorExport';
import { useVendorStats } from './vendors/reports/useVendorStats';
import { Expense } from '@/types/expenses';

export const useVendorReports = () => {
  // بيزنس-لوجيك فلترة
  const {
    dateRange,
    setDateRange,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    filteredExpenses,
    applyFilters,
    resetFilters
  } = useVendorFilters();

  // بيزنس-لوجيك إكسبورت
  const { exportReport, printReport } = useVendorExport();

  // بيزنس-لوجيك ستاتيستك
  const { totalPurchases, avgPurchaseValue, activeVendorsCount } = useVendorStats(filteredExpenses);

  // بيزنس-لوجيك تشارت
  const { pieChartData, barChartData, lineChartData } = useVendorChartData();

  // بيزنس-لوجيك فيندور داتا
  const vendorData = useMemo(() => {
    return mockVendors;
  }, []);

  return {
    dateRange,
    setDateRange,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    vendorData,
    filteredExpenses,
    applyFilters,
    resetFilters,
    exportReport,
    printReport,
    totalPurchases,
    avgPurchaseValue,
    activeVendorsCount,
    pieChartData,
    barChartData,
    lineChartData
  };
};
