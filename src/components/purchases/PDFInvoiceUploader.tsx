
import React from "react";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePDFInvoiceUploader } from "@/hooks/purchases/usePDFInvoiceUploader";
import { FileUploadArea } from "./pdf/FileUploadArea";
import { ExtractedDataPreview } from "./pdf/ExtractedDataPreview";
import { ManualEntryForm } from "./pdf/ManualEntryForm";

interface PDFInvoiceUploaderProps {
  onPDFProcessed: (invoiceData: any) => void;
}

export const PDFInvoiceUploader: React.FC<PDFInvoiceUploaderProps> = ({ onPDFProcessed }) => {
  const {
    selectedFile,
    extractedData,
    showPreview,
    selectedItems,
    processingMethod,
    pdfTextContent,
    errorMessage,
    uploadProgress,
    isProcessing,
    handleFileSelection,
    handleExtractData,
    toggleItemSelection,
    toggleSelectAll,
    handleApplyData,
    switchToManualEntry,
    switchToAutoProcessing,
    setShowPreview
  } = usePDFInvoiceUploader({ onPDFProcessed });
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText /> تحميل فاتورة من ملف PDF
        </CardTitle>
        <CardDescription>
          قم بسحب ملف PDF أو اضغط لاختيار ملف، ثم قم بمعاينة البيانات قبل تطبيقها على الفاتورة
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showPreview ? (
          <FileUploadArea 
            selectedFile={selectedFile}
            isProcessing={isProcessing}
            uploadProgress={uploadProgress}
            onFileSelect={handleFileSelection}
            onProcessFile={handleExtractData}
            onSwitchToManual={switchToManualEntry}
          />
        ) : processingMethod === "auto" ? (
          <ExtractedDataPreview
            errorMessage={errorMessage}
            extractedData={extractedData}
            selectedItems={selectedItems}
            pdfTextContent={pdfTextContent}
            onToggleItemSelection={toggleItemSelection}
            onToggleSelectAll={toggleSelectAll}
            onApplyData={handleApplyData}
            onBack={() => setShowPreview(false)}
          />
        ) : (
          <ManualEntryForm onSwitchToAuto={switchToAutoProcessing} />
        )}
      </CardContent>
    </Card>
  );
};
