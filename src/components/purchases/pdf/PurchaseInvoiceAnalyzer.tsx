
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PDFInvoiceAnalyzer } from './PDFInvoiceAnalyzer';
import { usePDFAnalysis } from '@/hooks/purchases/usePDFAnalysis';
import { FileText } from 'lucide-react';

interface PurchaseInvoiceAnalyzerProps {
  onDataExtracted: (data: any) => void;
}

export const PurchaseInvoiceAnalyzer: React.FC<PurchaseInvoiceAnalyzerProps> = ({
  onDataExtracted
}) => {
  const {
    isShowingAnalyzer,
    showAnalyzer,
    hideAnalyzer,
    handleAnalysisComplete,
    applyAnalysisResults
  } = usePDFAnalysis();
  
  return (
    <>
      <Button 
        variant="outline"
        className="flex items-center gap-2"
        onClick={showAnalyzer}
      >
        <FileText className="w-4 h-4" />
        تحليل فاتورة PDF
      </Button>
      
      <Dialog open={isShowingAnalyzer} onOpenChange={hideAnalyzer}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>تحليل فاتورة المشتريات</DialogTitle>
            <DialogDescription>
              قم بتحميل فاتورة PDF وسيتم تحليلها واستخراج البيانات منها تلقائياً
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto">
            <PDFInvoiceAnalyzer 
              onDataExtracted={(data) => {
                handleAnalysisComplete(data);
                applyAnalysisResults(onDataExtracted);
              }} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
