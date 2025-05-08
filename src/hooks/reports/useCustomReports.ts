import { useState, useCallback, useMemo } from 'react';
import { Report, ReportFilter } from '@/types/custom-reports';

// Sample data for custom reports
const sampleCustomReports: Report[] = [
  {
    id: "1", // Changed from number to string
    name: "تقرير المبيعات الشهرية",
    title: "تقرير المبيعات الشهرية",
    description: "تحليل شامل للمبيعات الشهرية حسب المنتج والمنطقة",
    date: "2023-11-15",
    category: "مبيعات",
    favorite: true,
    author: "أحمد محمد",
    type: "تقارير مالية",
    createdAt: new Date('2023-11-10'),
    lastRun: new Date('2023-11-15')
  },
  {
    id: "2", // Changed from number to string
    name: "تقرير المصروفات الربع سنوية",
    title: "تقرير المصروفات الربع سنوية",
    description: "تحليل المصروفات الربع سنوية حسب القسم",
    date: "2023-10-30",
    category: "مصروفات",
    favorite: false,
    author: "سارة أحمد",
    type: "تقارير مالية",
    createdAt: new Date('2023-10-20'),
    lastRun: new Date('2023-10-30')
  },
  {
    id: "3",
    name: "تحليل العملاء الجدد",
    title: "تحليل العملاء الجدد",
    description: "تحليل مفصل للعملاء الجدد وتوزيعهم الجغرافي",
    date: "2023-09-22",
    category: "عملاء",
    favorite: true,
    author: "ليلى خالد",
    type: "تقارير تسويقية",
    createdAt: new Date('2023-09-15'),
    lastRun: new Date('2023-09-22')
  },
  {
    id: "4",
    name: "مقارنة المبيعات السنوية",
    title: "مقارنة المبيعات السنوية",
    description: "مقارنة أداء المبيعات بين السنوات المختلفة",
    date: "2023-08-10",
    category: "مبيعات",
    favorite: false,
    author: "خالد ابراهيم",
    type: "تقارير مالية",
    createdAt: new Date('2023-08-01'),
    lastRun: new Date('2023-08-10')
  },
  {
    id: "5",
    name: "تحليل المخزون الشهري",
    title: "تحليل المخزون الشهري",
    description: "تحليل مستويات المخزون وتحديد المنتجات الأكثر طلباً",
    date: "2023-07-05",
    category: "مخزون",
    favorite: true,
    author: "نورة علي",
    type: "تقارير تشغيلية",
    createdAt: new Date('2023-06-28'),
    lastRun: new Date('2023-07-05')
  },
  {
    id: "6",
    name: "تقرير التدفقات النقدية",
    title: "تقرير التدفقات النقدية",
    description: "تحليل التدفقات النقدية الداخلة والخارجة",
    date: "2023-06-18",
    category: "مالية",
    favorite: false,
    author: "عبدالله سالم",
    type: "تقارير مالية",
    createdAt: new Date('2023-06-10'),
    lastRun: new Date('2023-06-18')
  },
  {
    id: "7",
    name: "تحليل أداء الموظفين",
    title: "تحليل أداء الموظفين",
    description: "تحليل أداء الموظفين وتقييم الكفاءة",
    date: "2023-05-02",
    category: "موارد بشرية",
    favorite: true,
    author: "فاطمة محمد",
    type: "تقارير إدارية",
    createdAt: new Date('2023-04-25'),
    lastRun: new Date('2023-05-02')
  },
  {
    id: "8",
    name: "تقرير رضا العملاء",
    title: "تقرير رضا العملاء",
    description: "قياس مستوى رضا العملاء عن الخدمات والمنتجات",
    date: "2023-04-15",
    category: "عملاء",
    favorite: false,
    author: "يوسف أحمد",
    type: "تقارير تسويقية",
    createdAt: new Date('2023-04-05'),
    lastRun: new Date('2023-04-15')
  },
  {
    id: "9",
    name: "تحليل تكاليف الإنتاج",
    title: "تحليل تكاليف الإنتاج",
    description: "تحليل تفصيلي لتكاليف الإنتاج وتقييم الكفاءة",
    date: "2023-03-01",
    category: "إنتاج",
    favorite: true,
    author: "سارة علي",
    type: "تقارير تشغيلية",
    createdAt: new Date('2023-02-20'),
    lastRun: new Date('2023-03-01')
  },
  {
    id: "10",
    name: "تقرير الميزانية السنوية",
    title: "تقرير الميزانية السنوية",
    description: "تحليل الميزانية السنوية ومقارنتها بالأداء الفعلي",
    date: "2023-02-12",
    category: "مالية",
    favorite: false,
    author: "أحمد يوسف",
    type: "تقارير مالية",
    createdAt: new Date('2023-02-01'),
    lastRun: new Date('2023-02-12')
  }
];

export const useCustomReports = () => {
  const [reports, setReports] = useState<Report[]>(sampleCustomReports);
  const [filters, setFilters] = useState<ReportFilter>({});
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      // Filter by search query
      if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase()) 
          && !report.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (filters.category && filters.category.length > 0) {
        const categories = Array.isArray(report.category) ? report.category : [report.category];
        if (!filters.category.some(cat => categories.includes(cat))) {
          return false;
        }
      }
      
      // Filter by author
      if (filters.author && report.author !== filters.author) {
        return false;
      }
      
      // Filter by favorites
      if (filters.favorites && !report.favorite) {
        return false;
      }
      
      return true;
    });
  }, [reports, filters, searchQuery]);
  
  // Toggle favorite
  const toggleFavorite = useCallback((reportId: string) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId ? { ...report, favorite: !report.favorite } : report
      )
    );
  }, []);
  
  // Delete report
  const deleteReport = useCallback((reportId: string) => {
    setReports(prevReports => prevReports.filter(report => report.id !== reportId));
  }, []);
  
  // Create report
  const createReport = useCallback((newReport: Omit<Report, 'id'>) => {
    const report: Report = {
      ...newReport,
      id: String(Math.max(...reports.map(r => parseInt(r.id))) + 1), // Generate string ID
      date: new Date().toISOString().split('T')[0],
      favorite: false
    };
    
    setReports(prevReports => [...prevReports, report]);
    return report;
  }, [reports]);
  
  // Update filters
  const updateFilters = useCallback((newFilters: Partial<ReportFilter>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  }, []);

  return {
    reports,
    filteredReports,
    filters,
    searchQuery,
    setSearchQuery,
    toggleFavorite,
    deleteReport,
    createReport,
    updateFilters
  };
};
