import { useState } from "react";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import {
  FileText, BarChart, Receipt, Database, CreditCard, Users, 
  FileUp, FileDown, Bot, Zap
} from "lucide-react";
import { mockBranches } from "@/data/mockSettings";
import { mockUserRoles } from "@/data/mockPermissions";
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
      name: "سند قبض",
      icon: FileUp,
      route: "/receivables/receipt-module",
      enabled: true,
      description: "إنشاء وإدارة سندات القبض من العملاء"
    },
    {
      id: "3",
      name: "سند دفع",
      icon: FileDown,
      route: "/payables/payment-module",
      enabled: true,
      description: "إنشاء وإدارة سندات الدفع للموردين"
    },
    {
      id: "4",
      name: "فاتورة مشتريات",
      icon: FileText,
      route: "/purchases/new",
      enabled: true,
      description: "إنشاء فاتورة مشتريات جديدة"
    },
    {
      id: "5",
      name: "مساعد الذكاء الاصطناعي",
      icon: Bot,
      route: "/ai/assistant-module",
      enabled: true,
      badge: {
        text: "جديد",
        variant: "secondary"
      },
      description: "استخدم مساعد الذكاء الاصطناعي لتحليل البيانات واتخاذ القرارات"
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

  // Alerts data - Fix type to match SystemAlert
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

  // Transformed data for charts - Fix property name from 'name' to 'label'
  const transformedSalesData = {
    labels: salesData.map(item => item.name),
    datasets: [
      {
        label: "المبيعات",
        data: salesData.map(item => item.sales),
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      },
      {
        label: "المستهدف",
        data: salesData.map(item => item.target),
        backgroundColor: 'rgba(153, 102, 255, 0.7)'
      },
      {
        label: "المصروفات",
        data: salesData.map(item => item.expenses),
        backgroundColor: 'rgba(255, 99, 132, 0.7)'
      },
    ]
  };

  const transformedProfitData = {
    labels: profitData.map(item => item.name),
    datasets: [
      {
        label: "الأرباح",
        data: profitData.map(item => item.profit),
        backgroundColor: 'rgba(75, 192, 192, 0.7)'
      }
    ]
  };

  const transformedCustomerDebtData = {
    labels: customerDebtData.map(item => item.name),
    datasets: [
      {
        label: "القيمة",
        data: customerDebtData.map(item => item.value),
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ]
      }
    ]
  };

  const transformedSupplierCreditData = {
    labels: supplierCreditData.map(item => item.name),
    datasets: [
      {
        label: "القيمة",
        data: supplierCreditData.map(item => item.value),
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ]
      }
    ]
  };

  const transformedCostCenterData = {
    labels: costCenterData.map(item => item.name),
    datasets: [
      {
        label: "القيمة",
        data: costCenterData.map(item => item.value),
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ]
      }
    ]
  };

  const transformedDailySalesData = {
    labels: dailySalesData.map(item => item.day),
    datasets: [
      {
        label: "المبيعات اليومية",
        data: dailySalesData.map(item => item.sales),
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      }
    ]
  };

  // Calculate summary data
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalExpenses = salesData.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalSales - totalExpenses;
  const profitMargin = ((netProfit / totalSales) * 100).toFixed(2) + "%";
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
      value: profitMargin,
      status: "up" as const,
      description: "من إجمالي المبيعات"
    }, {
      title: "متوسط قيمة الفاتورة",
      value: "645 ري��ل",
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
