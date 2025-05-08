
import { useState } from 'react';
import { usePDFInvoiceParser } from './usePDFInvoiceParser';
import { useToast } from '@/hooks/use-toast';

export const usePDFAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isShowingAnalyzer, setIsShowingAnalyzer] = useState(false);
  const { toast } = useToast();
  
  const {
    isProcessing,
    parseInvoiceFromPDF,
    parsedData
  } = usePDFInvoiceParser();
  
  const showAnalyzer = () => {
    setIsShowingAnalyzer(true);
  };
  
  const hideAnalyzer = () => {
    setIsShowingAnalyzer(false);
  };
  
  const handleAnalysisComplete = (results: any) => {
    if (!results) {
      toast({
        variant: "destructive",
        title: "خطأ في التحليل",
        description: "لم يتم استخراج البيانات بشكل صحيح"
      });
      return;
    }
    
    setAnalysisResults(results);
    toast({
      title: "اكتمل التحليل",
      description: `تم استخراج ${results.items?.length || 0} عنصر من الفاتورة بنجاح`
    });
  };
  
  const applyAnalysisResults = (callback: (data: any) => void) => {
    if (analysisResults) {
      callback(analysisResults);
      hideAnalyzer();
      toast({
        title: "تم تطبيق البيانات",
        description: "تم استخدام البيانات المحللة في الفاتورة بنجاح"
      });
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
    analysisResults,
    isShowingAnalyzer,
    showAnalyzer,
    hideAnalyzer,
    handleAnalysisComplete,
    applyAnalysisResults,
    parsedData
  };
};
