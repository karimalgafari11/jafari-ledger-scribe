
import { useState } from "react";
import { toast } from "sonner";
import { usePDFProcessing } from "./usePDFProcessing";
import { PurchaseItem } from "@/types/purchases";

interface UsePDFInvoiceUploaderProps {
  onPDFProcessed: (invoiceData: any) => void;
}

export const usePDFInvoiceUploader = ({ onPDFProcessed }: UsePDFInvoiceUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [processingMethod, setProcessingMethod] = useState<"auto" | "manual">("auto");
  
  const {
    pdfTextContent,
    errorMessage,
    uploadProgress,
    isProcessing,
    processPDFFile,
    setErrorMessage
  } = usePDFProcessing();
  
  // Handles file selection
  const handleFileSelection = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error("يرجى تحميل ملف PDF فقط");
      return;
    }
    
    setSelectedFile(file);
    setExtractedData(null);
    setShowPreview(false);
    setProcessingMethod("auto");
    setSelectedItems({});
    setErrorMessage("");
  };
  
  // Extracts data from PDF
  const handleExtractData = async () => {
    if (!selectedFile) {
      toast.error("يرجى اختيار ملف أولاً");
      return;
    }
    
    setShowPreview(false);
    
    const parsedData = await processPDFFile(selectedFile);
    
    if (parsedData) {
      setExtractedData(parsedData);
      
      // Pre-select all items
      const newSelectedItems: Record<string, boolean> = {};
      parsedData.items.forEach((item: PurchaseItem, index: number) => {
        newSelectedItems[index.toString()] = true;
      });
      setSelectedItems(newSelectedItems);
      
      setShowPreview(true);
    } else {
      setShowPreview(true);
    }
  };
  
  // Toggle item selection
  const toggleItemSelection = (index: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  // Select/deselect all items
  const toggleSelectAll = () => {
    if (!extractedData?.items) return;
    
    const allSelected = extractedData.items.every((_: any, i: number) => selectedItems[i.toString()]);
    
    const newSelectedItems: Record<string, boolean> = {};
    extractedData.items.forEach((_: any, i: number) => {
      newSelectedItems[i.toString()] = !allSelected;
    });
    
    setSelectedItems(newSelectedItems);
  };
  
  // Apply selected data to invoice
  const handleApplyData = () => {
    if (!extractedData) {
      toast.error("لم يتم استخراج بيانات بعد");
      return;
    }
    
    // Filter items based on selection
    const filteredItems = extractedData.items.filter((_: any, i: number) => selectedItems[i.toString()]);
    
    if (filteredItems.length === 0) {
      toast.error("يرجى تحديد صنف واحد على الأقل");
      return;
    }
    
    // Create the final invoice data
    const finalInvoiceData = {
      ...extractedData,
      items: filteredItems,
      subtotal: filteredItems.reduce((sum: number, item: PurchaseItem) => sum + item.total, 0),
      totalAmount: filteredItems.reduce((sum: number, item: PurchaseItem) => {
        const itemTotal = item.total;
        const taxAmount = item.tax ? (itemTotal * (item.tax / 100)) : 0;
        return sum + itemTotal + taxAmount;
      }, 0)
    };
    
    onPDFProcessed(finalInvoiceData);
    toast.success(`تم تطبيق ${filteredItems.length} صنف على الفاتورة بنجاح`);
    
    // Reset state
    setSelectedFile(null);
    setExtractedData(null);
    setShowPreview(false);
    setSelectedItems({});
  };
  
  // Switch to manual data entry
  const switchToManualEntry = () => {
    setProcessingMethod("manual");
  };
  
  // Switch back to auto processing
  const switchToAutoProcessing = () => {
    setProcessingMethod("auto");
  };
  
  return {
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
  };
};
