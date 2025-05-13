
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";
import { PDFInvoiceAnalyzer } from "@/components/ai/PDFInvoiceAnalyzer";
import { InvoiceAnalysisReview } from "@/components/ai/InvoiceAnalysisReview";
import { InvoiceAnalysisResult } from "@/hooks/ai/usePDFInvoiceAnalysis";
import { useToast } from "@/hooks/use-toast";

const PDFInvoiceProcessorPage: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<InvoiceAnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalysisComplete = (result: InvoiceAnalysisResult) => {
    setAnalysisResult(result);
  };

  const handleSaveData = async (data: InvoiceAnalysisResult): Promise<boolean> => {
    // In a real implementation, this would call API endpoints to save the journal entry
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم حفظ البيانات بنجاح",
        description: "تم حفظ الفاتورة وإنشاء القيد المحاسبي المرتبط بها"
      });
      
      // Reset state to allow new upload
      setTimeout(() => {
        setAnalysisResult(null);
      }, 2000);
      
      return true;
    } catch (error) {
      console.error("Error saving data:", error);
      return false;
    }
  };

  const handleEdit = (data: InvoiceAnalysisResult) => {
    // In a real implementation, this would open a form to edit the data
    toast({
      title: "تحرير البيانات",
      description: "سيتم فتح نموذج لتعديل البيانات (غير مطبق في هذا العرض التوضيحي)"
    });
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <Layout>
      <PageContainer title="معالجة فواتير PDF" description="تحليل الفواتير والسندات الورقية وتحويلها إلى قيود محاسبية">
        <div className="max-w-4xl mx-auto">
          {!analysisResult ? (
            <PDFInvoiceAnalyzer onAnalysisComplete={handleAnalysisComplete} />
          ) : (
            <InvoiceAnalysisReview 
              analysisResult={analysisResult}
              onSave={handleSaveData}
              onEdit={handleEdit}
              onReset={handleReset}
            />
          )}
        </div>
      </PageContainer>
    </Layout>
  );
};

export default PDFInvoiceProcessorPage;
