import React, { useState } from "react";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PDFInvoiceUploaderProps {
  onPDFProcessed: (invoiceData: any) => void;
}

export const PDFInvoiceUploader: React.FC<PDFInvoiceUploaderProps> = ({ onPDFProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileSelection(files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };
  
  const handleFileSelection = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error("يرجى تحميل ملف PDF فقط");
      return;
    }
    
    setSelectedFile(file);
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("يرجى اختيار ملف أولاً");
      return;
    }
    
    setIsProcessing(true);
    setUploadProgress(0);
    
    // Simulate progress for better UX
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 100);
    
    try {
      // In a real application, you would send the file to your backend
      // and receive structured data from the PDF analysis
      await simulateFileProcessing();
      
      clearInterval(interval);
      setUploadProgress(100);
      
      // Mock invoice data extracted from PDF
      const mockInvoiceData = {
        invoiceNumber: `P-${Math.floor(Math.random() * 10000)}`,
        vendorId: "v3",
        vendorName: "مؤسسة الأمانة للتوريدات",
        date: new Date().toISOString().split('T')[0],
        items: [
          {
            id: Math.random().toString(36).substring(7),
            productId: Math.random().toString(36).substring(7),
            code: "SKU-12345",
            name: "جهاز حاسب محمول",
            quantity: 2,
            price: 3500,
            total: 7000
          },
          {
            id: Math.random().toString(36).substring(7),
            productId: Math.random().toString(36).substring(7),
            code: "SKU-67890",
            name: "طابعة ليزر",
            quantity: 1,
            price: 1200,
            total: 1200
          }
        ],
        subtotal: 8200,
        totalAmount: 8200
      };
      
      setTimeout(() => {
        toast.success("تم معالجة الفاتورة بنجاح");
        onPDFProcessed(mockInvoiceData);
        setIsProcessing(false);
      }, 500);
    } catch (error) {
      clearInterval(interval);
      toast.error("حدث خطأ أثناء معالجة الفاتورة");
      console.error(error);
      setIsProcessing(false);
    }
  };
  
  // Simulate PDF processing delay
  const simulateFileProcessing = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText /> تحميل فاتورة من ملف PDF
        </CardTitle>
        <CardDescription>
          قم بسحب ملف PDF أو اضغط لاختيار ملف
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("pdf-upload")?.click()}
        >
          <input
            type="file"
            id="pdf-upload"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-600">
              {selectedFile 
                ? `تم اختيار: ${selectedFile.name}` 
                : 'اسحب وأفلت ملف PDF هنا، أو اضغط للتصفح'}
            </p>
            {selectedFile && (
              <p className="text-xs text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
          </div>
        </div>
        
        {isProcessing && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              جاري معالجة فاتورة PDF...
            </p>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}
        
        {selectedFile && !isProcessing && (
          <Button 
            onClick={handleUpload}
            className="mt-4 w-full"
            disabled={isProcessing}
          >
            <FileText className="mr-2 h-4 w-4" />
            معالجة الفاتورة
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
