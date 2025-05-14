import { useState, useCallback, useMemo } from 'react';
import { Report, ReportFilter } from '@/types/custom-reports';

// Sample data for custom reports
const sampleCustomReports: Report[] = [
  {
    id: "1",
    name: "تقرير المبيعات الشهرية",
    description: "تحليل شامل للمبيعات الشهرية حسب المنتج والمنطقة",
    dateCreated: new Date('2023-11-10'),
    lastModified: new Date('2023-11-15'),
    createdBy: "أحمد محمد",
    favorite: true,
    category: "مبيعات",
    tags: ["مبيعات", "شهري", "تحليل"],
    viewCount: 45,
    author: "أحمد محمد",
    date: "2023-11-15",
    lastRun: new Date('2023-11-15')
  },
  {
    id: "2",
    name: "تقرير المصروفات الربع سنوية",
    description: "تحليل المصروفات الربع سنوية حسب القسم",
    dateCreated: new Date('2023-10-20'),
    lastModified: new Date('2023-10-30'),
    createdBy: "سارة أحمد",
    favorite: false,
    category: "مصروفات",
    tags: ["مصروفات", "ربع سنوي"],
    viewCount: 23,
    author: "سارة أحمد",
    date: "2023-10-30",
    lastRun: new Date('2023-10-30')
  },
  {
    id: "3",
    name: "تحليل العملاء الجدد",
    description: "تحليل مفصل للعملاء الجدد وتوزيعهم الجغرافي",
    dateCreated: new Date('2023-09-15'),
    lastModified: new Date('2023-09-22'),
    createdBy: "ليلى خالد",
    favorite: true,
    category: "عملاء",
    tags: ["عملاء", "جدد", "تحليل"],
    viewCount: 62,
    author: "ليلى خالد",
    date: "2023-09-22",
    lastRun: new Date('2023-09-22')
  },
  {
    id: "4",
    name: "مقارنة المبيعات السنوية",
    description: "مقارنة أداء المبيعات بين السنوات المختلفة",
    dateCreated: new Date('2023-08-01'),
    lastModified: new Date('2023-08-10'),
    createdBy: "خالد ابراهيم",
    favorite: false,
    category: "مبيعات",
    tags: ["مبيعات", "سنوي", "مقارنة"],
    viewCount: 38,
    author: "خالد ابراهيم",
    date: "2023-08-10",
    lastRun: new Date('2023-08-10')
  },
  {
    id: "5",
    name: "تحليل المخزون الشهري",
    description: "تحليل مستويات المخزون وتحديد المنتجات الأكثر طلباً",
    dateCreated: new Date('2023-06-28'),
    lastModified: new Date('2023-07-05'),
    createdBy: "نورة علي",
    favorite: true,
    category: "مخزون",
    tags: ["مخزون", "شهري", "تحليل"],
    viewCount: 51,
    author: "نورة علي",
    date: "2023-07-05",
    lastRun: new Date('2023-07-05')
  },
  {
    id: "6",
    name: "تقرير التدفقات النقدية",
    description: "تحليل التدفقات النقدية الداخلة والخارجة",
    dateCreated: new Date('2023-06-10'),
    lastModified: new Date('2023-06-18'),
    createdBy: "عبدالله سالم",
    favorite: false,
    category: "مالية",
    tags: ["مالية", "تدفقات نقدية"],
    viewCount: 19,
    author: "عبدالله سالم",
    date: "2023-06-18",
    lastRun: new Date('2023-06-18')
  },
  {
    id: "7",
    name: "تحليل أداء الموظفين",
    description: "تحليل أداء الموظفين وتقييم الكفاءة",
    dateCreated: new Date('2023-04-25'),
    lastModified: new Date('2023-05-02'),
    createdBy: "فاطمة محمد",
    favorite: true,
    category: "موارد بشرية",
    tags: ["موارد بشرية", "أداء"],
    viewCount: 73,
    author: "فاطمة محمد",
    date: "2023-05-02",
    lastRun: new Date('2023-05-02')
  },
  {
    id: "8",
    name: "تقرير رضا العملاء",
    description: "قياس مستوى رضا العملاء عن الخدمات والمنتجات",
    dateCreated: new Date('2023-04-05'),
    lastModified: new Date('2023-04-15'),
    createdBy: "يوسف أحمد",
    favorite: false,
    category: "عملاء",
    tags: ["عملاء", "رضا"],
    viewCount: 12,
    author: "يوسف أحمد",
    date: "2023-04-15",
    lastRun: new Date('2023-04-15')
  },
  {
    id: "9",
    name: "تحليل تكاليف الإنتاج",
    description: "تحليل تفصيلي لتكاليف الإنتاج وتقييم الكفاءة",
    dateCreated: new Date('2023-02-20'),
    lastModified: new Date('2023-03-01'),
    createdBy: "سارة علي",
    favorite: true,
    category: "إنتاج",
    tags: ["إنتاج", "تكاليف"],
    viewCount: 88,
    author: "سارة علي",
    date: "2023-03-01",
    lastRun: new Date('2023-03-01')
  },
  {
    id: "10",
    name: "تقرير الميزانية السنوية",
    description: "تحليل الميزانية السنوية ومقارنتها بالأداء الفعلي",
    dateCreated: new Date('2023-02-01'),
    lastModified: new Date('2023-02-12'),
    createdBy: "أحمد يوسف",
    favorite: false,
    category: "مالية",
    tags: ["مالية", "ميزانية"],
    viewCount: 5,
    author: "أحمد يوسف",
    date: "2023-02-12",
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
      if (searchQuery && !report.name.toLowerCase().includes(searchQuery.toLowerCase()) 
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
      id: String(Math.max(...reports.map(r => parseInt(r.id))) + 1),
      dateCreated: new Date(),
      lastModified: new Date(),
      favorite: false,
      viewCount: 0,
      tags: []
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
