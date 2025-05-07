
import { toast } from 'sonner';

export const useVendorExport = () => {
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

  return {
    exportReport,
    printReport
  };
};
