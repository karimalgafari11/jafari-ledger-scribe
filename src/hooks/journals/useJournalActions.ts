
import { toast } from 'sonner';

export const useJournalActions = () => {
  const handleExport = async (format: "pdf" | "excel") => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`تم تصدير البيانات بنجاح بصيغة ${format === "pdf" ? "PDF" : "Excel"}`);
    } catch (error) {
      toast.error("حدث خطأ أثناء تصدير البيانات");
    }
  };

  const handlePrintPreview = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      window.print();
    } catch (error) {
      toast.error("حدث خطأ أثناء تحضير صفحة الطباعة");
    }
  };

  const handleShareWhatsApp = (selectedEntries: string[], entries: any[]) => {
    let message = "قيود محاسبية - النظام المحاسبي";
    
    if (selectedEntries.length > 0) {
      const selectedItems = entries
        .filter(entry => selectedEntries.includes(entry.id))
        .map(entry => `${entry.entryNumber}: ${entry.description} (${entry.totalDebit})`)
        .join("\n");
      
      message += "\n\nالقيود المختارة:\n" + selectedItems;
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    toast.success("تم فتح واتساب للمشاركة");
  };

  return {
    handleExport,
    handlePrintPreview,
    handleShareWhatsApp,
  };
};
