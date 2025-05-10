
import { useState } from "react";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import {
  transformSalesData,
  transformProfitData,
  transformCategoryData,
  transformDailySalesData
} from "@/utils/chartDataTransformers";
import { FileText, BarChart, Receipt, Database, CreditCard, Users } from "lucide-react";
import { SystemAlert } from "@/types/ai";

export const useDashboard = () => {
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({
    showStats: true,
    showKpis: true,
    showCharts: true,
    showAiWidget: true,
  });

  // Define shortcuts
  const shortcuts: ShortcutItem[] = [
    {
      id: "1",
      name: "إنشاء فاتورة جديدة",
      icon: Receipt,
      route: "/invoices/new",
      enabled: true,
      description: "إنشاء فاتورة جديدة للعملاء"
    },
    {
      id: "2",
      name: "إضافة مصروف جديد",
      icon: FileText,
      route: "/expenses/new",
      enabled: true,
      description: "تسجيل مصروف جديد"
    },
    {
      id: "3",
      name: "عرض التقارير",
      icon: BarChart,
      route: "/reports",
      enabled: true,
      description: "عرض تقارير النظام"
    },
    {
      id: "4",
      name: "دفتر الأستاذ",
      icon: Database,
      route: "/accounting/ledger-module",
      enabled: true,
      description: "عرض وتحليل كافة الحركات المالية"
    },
    {
      id: "5",
      name: "إدارة العملاء",
      icon: Users,
      route: "/customers/module",
      enabled: true,
      description: "إدارة قاعدة بيانات العملاء"
    },
    {
      id: "6",
      name: "الصندوق",
      icon: CreditCard,
      route: "/accounting/cashregister-module",
      enabled: true,
      description: "إدارة عمليات النقد"
    },
  ];

  // Raw data
  const salesData = [
    { name: "يناير", sales: 12000, target: 15000, expenses: 5000 },
    { name: "فبراير", sales: 14000, target: 16000, expenses: 6000 },
    { name: "مارس", sales: 16000, target: 17000, expenses: 7000 },
    { name: "أبريل", sales: 15000, target: 16500, expenses: 6500 },
    { name: "مايو", sales: 17000, target: 18000, expenses: 7500 },
  ];

  const profitData = [
    { name: "يناير", profit: 6000, profitMargin: "50%" },
    { name: "فبراير", profit: 7000, profitMargin: "50%" },
    { name: "مارس", profit: 8000, profitMargin: "50%" },
    { name: "أبريل", profit: 7500, profitMargin: "50%" },
    { name: "مايو", profit: 8500, profitMargin: "50%" },
  ];

  const customerDebtData = [
    { name: "العملاء الجدد", value: 45000, percentage: 30 },
    { name: "العملاء الحاليين", value: 80000, percentage: 55 },
    { name: "العملاء المتوقعين", value: 25000, percentage: 15 },
  ];

  const supplierCreditData = [
    { name: "المورد أ", value: 30000, percentage: 40 },
    { name: "المورد ب", value: 25000, percentage: 30 },
    { name: "المورد ج", value: 20000, percentage: 30 },
  ];

  const costCenterData = [
    { name: "التسويق", value: 15000, percentage: 20 },
    { name: "المبيعات", value: 20000, percentage: 25 },
    { name: "التطوير", value: 30000, percentage: 35 },
    { name: "الإدارة", value: 10000, percentage: 20 },
  ];

  const dailySalesData = [
    { day: "الأحد", sales: 22000 },
    { day: "الاثنين", sales: 24000 },
    { day: "الثلاثاء", sales: 26000 },
    { day: "الأربعاء", sales: 25000 },
    { day: "الخميس", sales: 27000 },
  ];

  const alerts: SystemAlert[] = [
    {
      id: "1",
      title: "تنبيه المخزون",
      message: "المنتج 'أ' وصل إلى الحد الأدنى للمخزون",
      type: "inventory",
      priority: "high",
      severity: "high",
      timestamp: new Date(),
      read: false,
      data: { product: "أ" },
    },
    {
      id: "2",
      title: "تنبيه الفواتير",
      message: "تأخر سداد الفاتورة رقم 123",
      type: "invoices",
      priority: "medium",
      severity: "medium",
      timestamp: new Date(),
      read: false,
      data: { invoice: "123" },
    },
  ];

  // Transform raw data to ChartData format
  const transformedSalesData = transformSalesData(salesData);
  const transformedProfitData = transformProfitData(profitData);
  const transformedCustomerDebtData = transformCategoryData(customerDebtData);
  const transformedSupplierCreditData = transformCategoryData(supplierCreditData);
  const transformedCostCenterData = transformCategoryData(costCenterData);
  const transformedDailySalesData = transformDailySalesData(dailySalesData);

  // Calculate summary data
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalExpenses = salesData.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalSales - totalExpenses;
  const profitMargin = "50.03%";
  const overdueInvoices = 12;
  const overdueTotalAmount = 18500.75;

  // Define KPIs
  const dashboardKpis = [
    {
      title: "نمو المبيعات",
      value: "+12.4%",
      status: "up" as const,
      description: "مقارنة بالفترة السابقة"
    }, {
      title: "نسبة الربح الإجمالي",
      value: "50.03%",
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
    displayOptions,
    setDisplayOptions,
    shortcuts,
    salesData: transformedSalesData,
    profitData: transformedProfitData,
    customerDebtData: transformedCustomerDebtData,
    supplierCreditData: transformedSupplierCreditData,
    costCenterData: transformedCostCenterData,
    dailySalesData: transformedDailySalesData,
    totalSales,
    totalExpenses,
    netProfit,
    profitMargin,
    overdueInvoices,
    overdueTotalAmount,
    dashboardKpis,
    alerts
  };
};
