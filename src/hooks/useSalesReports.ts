
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format, subDays, subMonths } from "date-fns";
import { Invoice } from "@/types/invoices";
import { ar } from "date-fns/locale";
import { toast } from "sonner";

// Sample sales data generator
const generateSalesData = (dateRange: DateRange) => {
  // Generate mock data based on the date range
  const totalSales = Math.floor(Math.random() * 100000) + 150000;
  const transactions = Math.floor(Math.random() * 500) + 800;
  const averageOrder = Math.floor(totalSales / transactions);
  const netProfit = Math.floor(totalSales * (Math.random() * 0.2 + 0.2));

  return {
    totalSales,
    transactions,
    averageOrder,
    netProfit,
    change: Math.floor(Math.random() * 30) - 10, // Between -10 and 20
    transactionChange: Math.floor(Math.random() * 20) - 5, // Between -5 and 15
    averageOrderChange: Math.floor(Math.random() * 16) - 8, // Between -8 and 8
    profitChange: Math.floor(Math.random() * 25) - 5, // Between -5 and 20
  };
};

// Sample revenue data generator
const generateRevenueData = () => {
  // Months in Arabic
  const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  
  // Generate mock revenue data
  const monthlyRevenue = months.map((month) => ({
    month,
    revenue: Math.floor(Math.random() * 50000) + 10000,
    expenses: Math.floor(Math.random() * 20000) + 5000,
    profit: Math.floor(Math.random() * 30000) + 5000,
  }));

  // Products categories for pie chart
  const categories = ["منتجات إلكترونية", "أثاث", "مستلزمات مكتبية", "أجهزة منزلية", "أخرى"];
  const categoryData = categories.map((category) => ({
    category,
    value: Math.floor(Math.random() * 100000) + 10000,
  }));

  return {
    barChart: {
      labels: months,
      datasets: [
        {
          label: "الإيرادات",
          data: monthlyRevenue.map(item => item.revenue),
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
        },
        {
          label: "المصروفات",
          data: monthlyRevenue.map(item => item.expenses),
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
        },
        {
          label: "الأرباح",
          data: monthlyRevenue.map(item => item.profit),
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
        }
      ]
    },
    pieChart: {
      labels: categories,
      datasets: [
        {
          label: "المبيعات حسب الفئة",
          data: categoryData.map(item => item.value),
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
        }
      ]
    },
    lineChart: {
      labels: months,
      datasets: [
        {
          label: "الإيرادات",
          data: monthlyRevenue.map(item => item.revenue),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: "الأرباح",
          data: monthlyRevenue.map(item => item.profit),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }
      ]
    }
  };
};

// Generate top products data
const generateProductData = () => {
  const products = [
    { id: 1, name: "لابتوب HP" },
    { id: 2, name: "طاولة مكتب" },
    { id: 3, name: "كرسي مكتب" },
    { id: 4, name: "طابعة ليزر" },
    { id: 5, name: "شاشة LCD" },
    { id: 6, name: "سماعات رأس" },
    { id: 7, name: "ماوس لاسلكي" },
    { id: 8, name: "لوحة مفاتيح" },
    { id: 9, name: "قرص صلب خارجي" },
    { id: 10, name: "راوتر WiFi" },
  ];

  const productItems = products.map(product => {
    const sales = Math.floor(Math.random() * 50000) + 10000;
    return {
      id: product.id,
      name: product.name,
      quantity: Math.floor(Math.random() * 1000) + 100,
      sales,
      percentage: Math.floor(Math.random() * 20) + 1
    };
  });

  // Sort by sales (highest first)
  productItems.sort((a, b) => b.sales - a.sales);

  // Create chart data
  const pieChartData = {
    labels: productItems.map(p => p.name),
    datasets: [
      {
        label: "المبيعات حسب المنتج",
        data: productItems.map(p => p.sales),
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(231, 233, 237, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ]
      }
    ]
  };

  const lineChartData = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    datasets: [
      {
        label: productItems[0].name,
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000) + 5000),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: productItems[1].name,
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 8000) + 4000),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      }
    ]
  };

  return {
    productItems,
    pieChart: pieChartData,
    lineChart: lineChartData
  };
};

// Generate top customers data
const generateCustomerData = () => {
  const customers = [
    { id: 1, name: "شركة النور للتجارة" },
    { id: 2, name: "مؤسسة التقدم" },
    { id: 3, name: "شركة الأفق" },
    { id: 4, name: "المكتب المتحد" },
    { id: 5, name: "مجموعة النهضة" },
    { id: 6, name: "مؤسسة الإبداع" },
    { id: 7, name: "شركة الجودة" },
    { id: 8, name: "مركز التميز" },
    { id: 9, name: "مجموعة الفرسان" },
    { id: 10, name: "مؤسسة الرواد" },
  ];

  const customerItems = customers.map(customer => {
    const sales = Math.floor(Math.random() * 50000) + 10000;
    return {
      id: customer.id,
      name: customer.name,
      transactions: Math.floor(Math.random() * 50) + 10,
      sales,
      percentage: Math.floor(Math.random() * 15) + 1
    };
  });

  // Sort by sales (highest first)
  customerItems.sort((a, b) => b.sales - a.sales);

  // Create chart data
  const pieChartData = {
    labels: customerItems.map(c => c.name),
    datasets: [
      {
        label: "المبيعات حسب العميل",
        data: customerItems.map(c => c.sales),
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(231, 233, 237, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ]
      }
    ]
  };

  const lineChartData = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    datasets: [
      {
        label: customerItems[0].name,
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000) + 5000),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: customerItems[1].name,
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 8000) + 4000),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      }
    ]
  };

  return {
    customerItems,
    pieChart: pieChartData,
    lineChart: lineChartData
  };
};

// Generate sales by date
const generateSalesByDate = () => {
  const statuses = ['paid', 'pending', 'overdue'];
  const paymentMethods = ['cash', 'credit'];
  const customers = [
    "شركة النور للتجارة",
    "مؤسسة التقدم",
    "شركة الأفق",
    "المكتب المتحد",
    "مجموعة النهضة",
    "مؤسسة الإبداع",
    "شركة الجودة",
    "مركز التميز",
    "مجموعة الفرسان",
    "مؤسسة الرواد"
  ];

  return Array.from({ length: 20 }, (_, i) => {
    const date = subDays(new Date(), Math.floor(Math.random() * 30));
    const formattedDate = format(date, "yyyy/MM/dd", { locale: ar });
    const randomStatusIndex = Math.floor(Math.random() * statuses.length);
    const randomPaymentMethodIndex = Math.floor(Math.random() * paymentMethods.length);
    const randomCustomerIndex = Math.floor(Math.random() * customers.length);

    return {
      invoiceNumber: `INV-${(1000 + i).toString()}`,
      date: formattedDate,
      customer: customers[randomCustomerIndex],
      amount: Math.floor(Math.random() * 5000) + 1000,
      paymentMethod: paymentMethods[randomPaymentMethodIndex],
      status: statuses[randomStatusIndex]
    };
  }).sort((a, b) => {
    // Sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

export const useSalesReports = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subMonths(new Date(), 1),
    to: new Date()
  });
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "quarterly" | "yearly">("monthly");
  const [branch, setBranch] = useState<string>("all");
  
  const [salesData, setSalesData] = useState(generateSalesData(dateRange));
  const [revenueData, setRevenueData] = useState(generateRevenueData());
  const [productDataState, setProductDataState] = useState(generateProductData());
  const [customerDataState, setCustomerDataState] = useState(generateCustomerData());
  const [salesByDate, setSalesByDate] = useState(generateSalesByDate());
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    const timer = setTimeout(() => {
      setSalesData(generateSalesData(dateRange));
      setRevenueData(generateRevenueData());
      setProductDataState(generateProductData());
      setCustomerDataState(generateCustomerData());
      setSalesByDate(generateSalesByDate());
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [dateRange, period, branch]);
  
  const exportReport = (format: "pdf" | "excel" | "csv") => {
    // Simulate export functionality
    console.log(`Exporting report in ${format} format`);
    
    // In a real application, this would generate and download the file
    setTimeout(() => {
      toast.success(`تم تصدير التقرير بنجاح بتنسيق ${format}`);
    }, 500);
  };
  
  return {
    isLoading,
    salesData,
    revenueData,
    productData: productDataState.productItems,
    customerData: customerDataState.customerItems,
    salesByDate,
    dateRange,
    setDateRange,
    period,
    setPeriod,
    branch,
    setBranch,
    exportReport
  };
};
