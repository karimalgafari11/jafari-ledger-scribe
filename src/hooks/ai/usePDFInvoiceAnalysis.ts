
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { PDFService } from "@/services/pdfService";

export interface InvoiceAnalysisResult {
  documentType: string; // نوع المستند
  invoiceNumber: string; // رقم الفاتورة
  date: string; // التاريخ
  vendorName: string; // اسم المورد أو العميل
  items: {
    description: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  subtotal: number; // المجموع الفرعي
  tax: number; // الضريبة
  total: number; // الإجمالي
  suggestedJournalEntry: {
    debit: {
      account: string;
      amount: number;
    }[];
    credit: {
      account: string;
      amount: number;
    }[];
  };
}

export const usePDFInvoiceAnalysis = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<InvoiceAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to extract text from PDF and analyze with DeepSeek AI
  const analyzeInvoice = async (file: File): Promise<InvoiceAnalysisResult | null> => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResult(null);
    
    try {
      // Step 1: Upload PDF and extract text
      setProgress(20);
      
      // In a real implementation, we would use a real service
      // For demo purposes, simulate with production-like code
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return Math.min(prev + 10, 90);
        });
      }, 500);
      
      // Call PDF service to analyze the invoice
      // In production, this would make real API calls
      const analysisResult = await PDFService.analyzePDFInvoice(file);
      
      clearInterval(progressInterval);
      setProgress(100);
      setResult(analysisResult);
      
      toast({
        title: "تم تحليل الفاتورة بنجاح",
        description: "تم استخراج البيانات واقتراح القيد المحاسبي"
      });
      
      return analysisResult;
      
    } catch (err) {
      console.error('Error analyzing invoice:', err);
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء تحليل الفاتورة");
      toast({
        title: "فشل تحليل الفاتورة",
        description: err instanceof Error ? err.message : "حدث خطأ أثناء تحليل الفاتورة",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    analyzeInvoice,
    isProcessing,
    progress,
    result,
    error
  };
};
