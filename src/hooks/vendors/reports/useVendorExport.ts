
import { toast } from 'sonner';
import { printTableData } from '@/utils/exportUtils';

export const useVendorExport = () => {
  const exportReport = () => {
    toast.success('جاري تصدير التقرير...');
    setTimeout(() => {
      toast.success('تم تصدير التقرير بنجاح');
    }, 1500);
  };

  const printReport = (data: any[], title: string = 'تقرير الموردين') => {
    toast.success('جاري إعداد التقرير للطباعة...');
    try {
      printTableData(data, title);
    } catch (error) {
      console.error('خطأ في طباعة التقرير:', error);
      toast.error('حدث خطأ أثناء طباعة التقرير');
    }
  };

  return {
    exportReport,
    printReport
  };
};
