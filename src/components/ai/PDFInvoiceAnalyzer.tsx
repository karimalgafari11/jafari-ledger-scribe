
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Loader2, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePDFInvoiceAnalysis } from "@/hooks/ai/usePDFInvoiceAnalysis";
import { FileUploadWithCompression } from "@/components/ui/file-upload/FileUploadWithCompression";

interface PDFInvoiceAnalyzerProps {
  onAnalysisComplete?: (data: any) => void;
}

export const PDFInvoiceAnalyzer: React.FC<PDFInvoiceAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const {
    analyzeInvoice,
    isProcessing,
    progress,
    result,
    error
  } = usePDFInvoiceAnalysis();
  
  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      if (files[0].type !== 'application/pdf') {
        toast({
          title: "نوع ملف غير صالح",
          description: "يجب اختيار ملف PDF فقط",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(files[0]);
    }
  };
  
  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "لم يتم اختيار ملف",
        description: "يرجى اختيار ملف PDF أولاً",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const analysisResult = await analyzeInvoice(selectedFile);
      if (onAnalysisComplete && analysisResult) {
        onAnalysisComplete(analysisResult);
      }
    } catch (err) {
      toast({
        title: "فشل تحليل الملف",
        description: err instanceof Error ? err.message : "حدث خطأ أثناء تحليل الملف",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText /> تحليل الفواتير والسندات
        </CardTitle>
        <CardDescription>
          قم بتحميل فاتورة أو سند بصيغة PDF وسيقوم المساعد الذكي بتحليلها واستخراج البيانات
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FileUploadWithCompression
            onChange={handleFileChange}
            value={selectedFile ? [selectedFile] : []}
            multiple={false}
            accept="application/pdf"
            allowedExtensions={["pdf"]}
            maxSize={5}
            autoCompress={true}
          />

          {selectedFile && (
            <div className="flex justify-between items-center">
              <p className="text-sm">
                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
              <Button 
                onClick={handleAnalyze} 
                disabled={isProcessing}
                className="gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" /> جاري التحليل...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" /> تحليل الفاتورة
                  </>
                )}
              </Button>
            </div>
          )}

          {isProcessing && (
            <div className="mt-4 space-y-2">
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                جاري تحليل الفاتورة... {progress}%
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 border border-red-200 bg-red-50 rounded-md flex gap-2 items-start mt-4">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">حدث خطأ أثناء التحليل</h4>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="p-4 border border-green-200 bg-green-50 rounded-md flex gap-2 items-start mt-4">
              <Check className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">تم التحليل بنجاح</h4>
                <p className="text-sm text-green-600">
                  تم استخراج البيانات بنجاح. يمكنك الآن مراجعة المعلومات.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
