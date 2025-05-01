
import { useState, useMemo } from "react";
import { salesData, profitData, customerDebtData, supplierCreditData, dailySalesData, costCenterData } from "@/data/dashboardData";
import { useAiAssistant } from "./useAiAssistant";

export const useDashboardMetrics = () => {
  // Import system alerts from useAiAssistant hook
  const { systemAlerts } = useAiAssistant();
  
  // حساب إجماليات الدخل والمصروفات والربح
  const totalSales = useMemo(() => salesData.reduce((sum, item) => sum + item.sales, 0), []);
  const totalExpenses = useMemo(() => salesData.reduce((sum, item) => sum + item.expenses, 0), []);
  const netProfit = useMemo(() => totalSales - totalExpenses, [totalSales, totalExpenses]);
  const profitMargin = useMemo(() => (netProfit / totalSales * 100).toFixed(1), [netProfit, totalSales]);

  // حساب الفواتير المتأخرة (مثال)
  const overdueInvoices = 12;
  const overdueTotalAmount = 48250;
  
  // مؤشرات الأداء الرئيسية
  const kpis = [
    {
      title: "نمو المبيعات",
      value: "+12.4%",
      status: "up" as const,
      description: "مقارنة بالفترة السابقة"
    }, {
      title: "نسبة الربح الإجمالي",
      value: `${profitMargin}%`,
      status: "up" as const,
      description: "من إجمالي المبيعات"
    }, {
      title: "متوسط قيمة الفاتورة",
      value: "645 ريال",
      status: "down" as const,
      description: "انخفاض 3.2% عن الشهر السابق"
    }, {
      title: "معدل تكرار الشراء",
      value: "2.8",
      status: "neutral" as const,
      description: "متوسط عدد المشتريات لكل عميل"
    }
  ];

  return {
    salesData,
    profitData,
    customerDebtData,
    supplierCreditData,
    dailySalesData,
    costCenterData,
    totalSales,
    totalExpenses,
    netProfit,
    profitMargin,
    overdueInvoices,
    overdueTotalAmount,
    kpis,
    systemAlerts
  };
};
