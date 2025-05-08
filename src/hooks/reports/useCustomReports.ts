
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { Report } from '@/hooks/useReports'; // استخدام النوع الموجود بالفعل

// بيانات وهمية للتقارير المخصصة
const mockReports: Report[] = [
  { 
    id: 1, 
    title: 'تقرير المبيعات الشهري', 
    description: 'تقرير شامل عن أداء المبيعات الشهري موزعة حسب المنتجات والفروع', 
    date: '2023-06-15', 
    category: 'sales', 
    favorite: true 
  },
  { 
    id: 2, 
    title: 'تقرير تحليل الربحية', 
    description: 'تحليل تفصيلي لربحية المنتجات والعملاء', 
    date: '2023-06-10', 
    category: 'financial', 
    favorite: false 
  },
  { 
    id: 3, 
    title: 'تقرير المخزون', 
    description: 'تقرير حالة المخزون والمنتجات الأكثر مبيعاً', 
    date: '2023-06-05', 
    category: 'inventory', 
    favorite: true 
  },
  { 
    id: 4, 
    title: 'تقرير العملاء', 
    description: 'تحليل سلوك العملاء وقيمة العميل', 
    date: '2023-05-28', 
    category: 'customers', 
    favorite: false 
  },
  { 
    id: 5, 
    title: 'تقرير الميزانية السنوي', 
    description: 'الميزانية السنوية والمقارنة مع السنوات السابقة', 
    date: '2023-05-20', 
    category: 'financial', 
    favorite: true 
  },
  { 
    id: 6, 
    title: 'تقرير أداء الموظفين', 
    description: 'تقييم أداء الموظفين والإنتاجية', 
    date: '2023-05-15', 
    category: 'hr', 
    favorite: false 
  }
];

// فئات التقارير
const reportCategories = [
  { id: 'all', name: 'جميع التقارير' },
  { id: 'favorites', name: 'المفضلة' },
  { id: 'financial', name: 'مالية' },
  { id: 'sales', name: 'المبيعات' },
  { id: 'inventory', name: 'المخزون' },
  { id: 'customers', name: 'العملاء' },
  { id: 'hr', name: 'الموارد البشرية' },
  { id: 'projects', name: 'المشاريع' }
];

export const useCustomReports = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // all, favorites, category
  
  // نسخة معدلة من التقارير لتضمين الكاتب
  const enhancedReports = useMemo(() => {
    return reports.map(report => ({
      ...report,
      author: 'أحمد محمد', // يمكن تغييرها لتكون ديناميكية في تطبيق حقيقي
      type: report.category, // لغرض العرض، نستخدم الفئة كنوع أيضاً
      createdAt: new Date(report.date),
      lastRun: Math.random() > 0.3 ? new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))) : undefined
    }));
  }, [reports]);
  
  // إنشاء تقرير جديد
  const createReport = (report: any) => {
    const newReport = {
      id: reports.length + 1,
      title: report.name || 'تقرير جديد',
      description: report.description || '',
      date: new Date().toISOString().slice(0, 10),
      category: report.category || 'custom',
      favorite: false
    };
    
    setReports([...reports, newReport]);
    toast.success('تم إنشاء التقرير بنجاح');
  };
  
  // حذف تقرير
  const deleteReport = (id: string) => {
    const reportId = parseInt(id);
    setReports(reports.filter(report => report.id !== reportId));
    toast.success('تم حذف التقرير بنجاح');
  };
  
  // نسخ تقرير
  const duplicateReport = (id: string) => {
    const reportId = parseInt(id);
    const reportToDuplicate = reports.find(report => report.id === reportId);
    
    if (reportToDuplicate) {
      const duplicatedReport = {
        ...reportToDuplicate,
        id: reports.length + 1,
        title: `${reportToDuplicate.title} (نسخة)`,
        date: new Date().toISOString().slice(0, 10),
        favorite: false
      };
      
      setReports([...reports, duplicatedReport]);
      toast.success('تم نسخ التقرير بنجاح');
    }
  };
  
  // تصدير تقرير
  const exportReport = (id: string) => {
    const reportId = parseInt(id);
    const reportToExport = reports.find(report => report.id === reportId);
    
    if (reportToExport) {
      toast.success(`جاري تصدير التقرير: ${reportToExport.title}`);
      
      // محاكاة لعملية التصدير
      setTimeout(() => {
        toast.success('تم تصدير التقرير بنجاح');
      }, 1500);
    }
  };
  
  // إضافة تقرير للمفضلة أو إزالته منها
  const favoriteReport = (id: string) => {
    const reportId = parseInt(id);
    setReports(reports.map(report => {
      if (report.id === reportId) {
        return { ...report, favorite: !report.favorite };
      }
      return report;
    }));
  };

  return {
    reports: enhancedReports,
    searchQuery,
    setSearchQuery,
    filterBy,
    setFilterBy,
    createReport,
    deleteReport,
    duplicateReport,
    exportReport,
    favoriteReport,
    categories: reportCategories
  };
};
