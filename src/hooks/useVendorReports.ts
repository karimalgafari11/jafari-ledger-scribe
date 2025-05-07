
import { useMemo } from 'react';
import { mockVendors } from '@/data/mockVendors';
import { useVendorFilters } from './vendors/reports/useVendorFilters';
import { useVendorChartData } from './vendors/reports/useVendorChartData';
import { useVendorExport } from './vendors/reports/useVendorExport';
import { useVendorStats } from './vendors/reports/useVendorStats';

export const useVendorReports = () => {
  // бизнес-логика фильтрации
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

  // бизнес-логика экспорта
  const { exportReport, printReport } = useVendorExport();

  // бизнес-логика статистики
  const { totalPurchases, avgPurchaseValue, activeVendorsCount } = useVendorStats(filteredExpenses);

  // бизнес-логика графиков
  const { pieChartData, barChartData, lineChartData } = useVendorChartData();

  // бизнес-логика данных о поставщиках
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
