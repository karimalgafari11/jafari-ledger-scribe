
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export const useOCRAnalysis = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResults, setOcrResults] = useState<any>(null);
  
  const handleOcrComplete = (results: any) => {
    if (!results) {
      toast({
        variant: "destructive",
        title: "خطأ في التحليل",
        description: "لم يتم استخراج البيانات بشكل صحيح"
      });
      return;
    }
    
    setOcrResults(results);
    toast({
      title: "اكتمل التحليل",
      description: `تم استخراج ${results.items?.length || 0} عنصر من الفاتورة بنجاح`
    });
  };
  
  const applyOcrResults = (callback: (data: any) => void) => {
    if (ocrResults) {
      callback(ocrResults);
      toast({
        title: "تم تطبيق البيانات",
        description: "تم استخدام البيانات المحللة في الفاتورة بنجاح"
      });
      
      // Reset OCR results
      setOcrResults(null);
    } else {
      toast({
        variant: "destructive",
        title: "لا توجد بيانات",
        description: "يرجى تحليل الفاتورة أولاً قبل تطبيق البيانات"
      });
    }
  };
  
  return {
    isProcessing,
    setIsProcessing,
    ocrResults,
    setOcrResults,
    handleOcrComplete,
    applyOcrResults
  };
};
