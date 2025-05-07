
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { mockVendors } from '@/data/mockVendors';

// سنستخدم بيانات وهمية للتجربة
const MOCK_EXPENSES = [
  {
    id: "1",
    description: "طلبية مستلزمات مكتبية",
    amount: 1200,
    date: new Date('2023-07-15'),
    category: "مستلزمات مكتبية",
    paymentMethod: "cash",
    vendor: "شركة المستلزمات المكتبية",
    vendorId: "1"
  },
  {
    id: "2",
    description: "معدات إلكترونية",
    amount: 3500,
    date: new Date('2023-08-20'),
    category: "معدات إلكترونية",
    paymentMethod: "bank",
    vendor: "مؤسسة الإمداد التجارية",
    vendorId: "2"
  },
  {
    id: "3",
    description: "أثاث مكتبي",
    amount: 5000,
    date: new Date('2023-09-05'),
    category: "أثاث مكتبي",
    paymentMethod: "credit",
    vendor: "مؤسسة نور للتجهيزات",
    vendorId: "3"
  },
  {
    id: "4",
    description: "أجهزة حاسب آلي",
    amount: 7500,
    date: new Date('2023-09-15'),
    category: "أجهزة وتقنية",
    paymentMethod: "bank",
    vendor: "شركة تقنيات المستقبل",
    vendorId: "4"
  },
  {
    id: "5",
    description: "منتجات ورقية",
    amount: 750,
    date: new Date('2023-09-25'),
    category: "منتجات ورقية",
    paymentMethod: "cash",
    vendor: "مصنع الجودة للمنتجات الورقية",
    vendorId: "5"
  }
];

export const useVendorReports = () => {
  // إعدادات الفلترة
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 يوم للخلف
    to: new Date()
  });
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // بيانات الموردين
  const vendorData = useMemo(() => {
    return mockVendors;
  }, []);

  // بيانات الرسوم البيانية
  const pieChartData = useMemo(() => {
    return {
      labels: ['مستلزمات مكتبية', 'معدات إلكترونية', 'أثاث مكتبي', 'أجهزة وتقنية', 'منتجات ورقية'],
      datasets: [
        {
          label: 'قيمة المشتريات',
          data: [1200, 3500, 5000, 7500, 750],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
        }
      ]
    };
  }, []);

  const barChartData = useMemo(() => {
    return {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
      datasets: [
        {
          label: 'مشتريات 2023',
          data: [4500, 5900, 8000, 8100, 5600, 5500],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
        },
        {
          label: 'مشتريات 2022',
          data: [3800, 4200, 6800, 7200, 4700, 4800],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
        }
      ]
    };
  }, []);

  const lineChartData = useMemo(() => {
    return {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
      datasets: [
        {
          label: 'عدد طلبات الشراء',
          data: [12, 19, 15, 18, 22, 14],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
        {
          label: 'عدد المشتريات المستلمة',
          data: [9, 15, 12, 17, 19, 11],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
        }
      ]
    };
  }, []);

  // فلترة البيانات
  const filteredExpenses = useMemo(() => {
    return MOCK_EXPENSES.filter(expense => {
      const matchesDate = expense.date >= dateRange.from && expense.date <= dateRange.to;
      const matchesCategory = category === 'all' || expense.category === category;
      const matchesSearch = !searchQuery || 
        expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.vendor.toLowerCase().includes(searchQuery.toLowerCase());
      
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

  const exportReport = () => {
    toast.success('جاري تصدير التقرير...');
    setTimeout(() => {
      toast.success('تم تصدير التقرير بنجاح');
    }, 1500);
  };

  const printReport = () => {
    toast.success('جاري إعداد التقرير للطباعة...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // حساب الإحصائيات
  const totalPurchases = useMemo(() => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  }, [filteredExpenses]);

  const avgPurchaseValue = useMemo(() => {
    if (filteredExpenses.length === 0) return 0;
    return Math.round(totalPurchases / filteredExpenses.length);
  }, [filteredExpenses, totalPurchases]);

  const activeVendorsCount = useMemo(() => {
    return vendorData.filter(vendor => vendor.status === 'نشط').length;
  }, [vendorData]);

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
