
import React, { useState } from "react";
import { FileText, Upload, Check, FileUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PurchaseItem } from "@/types/purchases";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PDFInvoiceUploaderProps {
  onPDFProcessed: (invoiceData: any) => void;
}

export const PDFInvoiceUploader: React.FC<PDFInvoiceUploaderProps> = ({ onPDFProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  
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
    setExtractedData(null);
    setShowPreview(false);
  };
  
  const handleExtractData = async () => {
    if (!selectedFile) {
      toast.error("يرجى اختيار ملف أولاً");
      return;
    }
    
    setIsProcessing(true);
    setUploadProgress(0);
    setShowPreview(false);
    
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
      
      // Generate random number of items between 5 and 15
      const numItems = Math.floor(Math.random() * 10) + 5;
      
      // Mock invoice data extracted from PDF with more items
      const mockInvoiceData = {
        invoiceNumber: `P-${Math.floor(Math.random() * 10000)}`,
        vendorId: "v3",
        vendorName: "مؤسسة الأمانة للتوريدات",
        date: new Date().toISOString().split('T')[0],
        items: Array.from({ length: numItems }, (_, i) => ({
          id: Math.random().toString(36).substring(7),
          productId: Math.random().toString(36).substring(7),
          code: `SKU-${10000 + i}`,
          name: `منتج ${i + 1} - ${['لوحة رقمية', 'جهاز حاسب', 'طابعة', 'شاشة عرض', 'لوحة مفاتيح'][i % 5]}`,
          manufacturer: ['سامسونج', 'إتش بي', 'ديل', 'كانون', 'إبسون'][i % 5],
          size: ['صغير', 'متوسط', 'كبير'][i % 3],
          quantity: Math.floor(Math.random() * 5) + 1,
          price: Math.floor(Math.random() * 1000) + 500,
          get total() { return this.quantity * this.price }
        })),
        subtotal: 0,
        totalAmount: 0
      };
      
      // Calculate subtotal and total
      mockInvoiceData.subtotal = mockInvoiceData.items.reduce((sum, item) => sum + item.total, 0);
      mockInvoiceData.totalAmount = mockInvoiceData.subtotal;
      
      setExtractedData(mockInvoiceData);
      setIsProcessing(false);
      setShowPreview(true);
      toast.success("تم استخراج البيانات من الملف بنجاح");
    } catch (error) {
      clearInterval(interval);
      toast.error("حدث خطأ أثناء معالجة الفاتورة");
      console.error(error);
      setIsProcessing(false);
    }
  };
  
  const handleApplyData = () => {
    if (!extractedData) {
      toast.error("لم يتم استخراج بيانات بعد");
      return;
    }
    
    onPDFProcessed(extractedData);
    toast.success("تم تطبيق البيانات على الفاتورة بنجاح");
    // Reset state
    setSelectedFile(null);
    setExtractedData(null);
    setShowPreview(false);
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
          قم بسحب ملف PDF أو اضغط لاختيار ملف، ثم قم بمعاينة البيانات قبل تطبيقها على الفاتورة
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showPreview ? (
          <>
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
                onClick={handleExtractData}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600"
                disabled={isProcessing}
              >
                <FileText className="mr-2 h-4 w-4" />
                استخراج البيانات ومعاينتها
              </Button>
            )}
          </>
        ) : extractedData && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-bold text-green-800 mb-2">تم استخراج البيانات بنجاح!</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-green-700"><strong>رقم الفاتورة:</strong> {extractedData.invoiceNumber}</p>
                  <p className="text-sm text-green-700"><strong>التاريخ:</strong> {extractedData.date}</p>
                </div>
                <div>
                  <p className="text-sm text-green-700"><strong>المورد:</strong> {extractedData.vendorName}</p>
                  <p className="text-sm text-green-700"><strong>إجمالي المبلغ:</strong> {extractedData.totalAmount.toFixed(2)} ر.س</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">معاينة الأصناف المستخرجة ({extractedData.items.length} صنف):</h3>
              <ScrollArea className="h-[300px] border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead className="w-28 text-center">رمز الصنف</TableHead>
                      <TableHead className="text-center">اسم الصنف</TableHead>
                      <TableHead className="w-16 text-center">الكمية</TableHead>
                      <TableHead className="w-28 text-center">السعر</TableHead>
                      <TableHead className="w-28 text-center">الإجمالي</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extractedData.items.map((item: PurchaseItem, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="text-center">{i + 1}</TableCell>
                        <TableCell className="text-center">{item.code}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-center">{item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-center font-semibold">{item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
            
            <div className="flex justify-between gap-2">
              <Button 
                variant="outline"
                onClick={() => setShowPreview(false)}
              >
                عودة للتحميل
              </Button>
              <Button 
                onClick={handleApplyData}
                className="bg-green-500 hover:bg-green-600"
              >
                <Check className="mr-2 h-4 w-4" />
                تطبيق البيانات على الفاتورة
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
