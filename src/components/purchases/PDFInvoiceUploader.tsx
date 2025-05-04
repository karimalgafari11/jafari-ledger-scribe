
import React, { useState } from "react";
import { FileText, Upload, Check, FileUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PurchaseItem } from "@/types/purchases";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [pdfTextContent, setPdfTextContent] = useState<string>("");
  const [processingMethod, setProcessingMethod] = useState<"auto" | "manual">("auto");

  // Handles drag enter event
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  // Handles drag leave event
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  // Handles drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  // Handles file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileSelection(files[0]);
    }
  };
  
  // Handles file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };
  
  // Processes selected file
  const handleFileSelection = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error("يرجى تحميل ملف PDF فقط");
      return;
    }
    
    setSelectedFile(file);
    setExtractedData(null);
    setShowPreview(false);
    setPdfTextContent("");
    setProcessingMethod("auto");
    setSelectedItems({});
  };
  
  // Extracts data from PDF
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
      // In a real app, this would be an API call to a PDF extraction service
      // For the prototype, we'll simulate reading the PDF and extract text
      const fileContent = await readFileAsArrayBuffer(selectedFile);
      
      // In a real implementation, this would use a PDF parsing library
      // For now, we'll simulate extraction with a more realistic approach
      const extractedText = await simulateExtractTextFromPDF(fileContent);
      setPdfTextContent(extractedText);
      
      // Parse the extracted text to find invoice data
      const parsedData = parseInvoiceDataFromText(extractedText);
      
      clearInterval(interval);
      setUploadProgress(100);
      
      setExtractedData(parsedData);
      setIsProcessing(false);
      setShowPreview(true);

      // Pre-select all items
      const newSelectedItems: Record<string, boolean> = {};
      parsedData.items.forEach((item: PurchaseItem, index: number) => {
        newSelectedItems[index.toString()] = true;
      });
      setSelectedItems(newSelectedItems);
      
      toast.success("تم استخراج البيانات من الملف بنجاح");
    } catch (error) {
      clearInterval(interval);
      toast.error("حدث خطأ أثناء معالجة الفاتورة");
      console.error(error);
      setIsProcessing(false);
    }
  };

  // Read file as ArrayBuffer
  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Simulate extracting text from PDF
  const simulateExtractTextFromPDF = async (buffer: ArrayBuffer): Promise<string> => {
    // In a real implementation, you would use a PDF parsing library
    // For this prototype, we'll return a sample text
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing time
    
    // Return simulated text content that might be found in a PDF invoice
    return `
      فاتورة شراء
      رقم الفاتورة: INV-2023-156
      تاريخ: 2023-10-15
      
      المورد: شركة التقنية للمعدات
      
      الأصناف:
      1. جهاز حاسب HP ProDesk | الكمية: 2 | السعر: 3500 ر.س
      2. طابعة ليزر Canon LBP | الكمية: 1 | السعر: 1200 ر.س
      3. شاشة سامسونج 24 بوصة | الكمية: 3 | السعر: 850 ر.س
      
      الإجمالي: 10,750 ر.س
      الضريبة (15%): 1,612.50 ر.س
      المجموع النهائي: 12,362.50 ر.س
    `;
  };

  // Parse invoice data from text
  const parseInvoiceDataFromText = (text: string) => {
    // This is a simplified parser - in a real app you'd use a more sophisticated approach
    // Extract invoice number
    const invoiceNumberMatch = text.match(/رقم الفاتورة:?\s*([A-Za-z0-9-]+)/);
    const invoiceNumber = invoiceNumberMatch ? invoiceNumberMatch[1] : `P-${Math.floor(Math.random() * 10000)}`;
    
    // Extract date
    const dateMatch = text.match(/تاريخ:?\s*(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
    
    // Extract vendor name
    const vendorMatch = text.match(/المورد:?\s*([^\n]+)/);
    const vendorName = vendorMatch ? vendorMatch[1].trim() : "";
    
    // Extract items - this is a simplified approach
    const itemsSection = text.split('الأصناف:')[1]?.split('الإجمالي')[0] || "";
    const itemLines = itemsSection.split('\n').filter(line => line.trim() && line.includes('|'));
    
    const items = itemLines.map((line, index) => {
      // Parse each line to extract item details
      const nameParts = line.split('|')[0].split('.');
      const name = nameParts.length > 1 ? nameParts.slice(1).join('.').trim() : line.split('|')[0].trim();
      
      // Extract quantity
      const quantityMatch = line.match(/الكمية:?\s*(\d+)/);
      const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
      
      // Extract price
      const priceMatch = line.match(/السعر:?\s*(\d+(?:,\d+)*(?:\.\d+)?)/);
      const priceText = priceMatch ? priceMatch[1].replace(/,/g, '') : "0";
      const price = parseFloat(priceText);
      
      return {
        id: `pdf-item-${index + 1}`,
        productId: `pdf-product-${index + 1}`,
        code: `PDF-${index + 100}`,
        name: name,
        manufacturer: "",
        size: "",
        quantity: quantity,
        price: price,
        discount: 0,
        discountType: "percentage" as const,
        tax: 15, // Default VAT in Saudi Arabia
        total: quantity * price,
        notes: "تم استيراده من PDF"
      };
    });
    
    // Extract subtotal
    const subtotalMatch = text.match(/الإجمالي:?\s*(\d+(?:,\d+)*(?:\.\d+)?)/);
    const subtotalText = subtotalMatch ? subtotalMatch[1].replace(/,/g, '') : "0";
    const subtotal = parseFloat(subtotalText);
    
    // Extract total amount
    const totalMatch = text.match(/المجموع النهائي:?\s*(\d+(?:,\d+)*(?:\.\d+)?)/);
    const totalText = totalMatch ? totalMatch[1].replace(/,/g, '') : "0";
    const totalAmount = parseFloat(totalText);
    
    // Create invoice data object
    return {
      invoiceNumber,
      vendorId: "",
      vendorName,
      date,
      items,
      subtotal: items.reduce((sum, item) => sum + item.total, 0), // Calculate from items
      totalAmount: items.reduce((sum, item) => sum + item.total, 0) * 1.15, // Apply 15% VAT
      tax: 15
    };
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
    toast.success("تم تطبيق البيانات على الفاتورة بنجاح");
    
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
              <div className="mt-4 flex gap-2">
                <Button 
                  onClick={handleExtractData}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  disabled={isProcessing}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  استخراج البيانات وعرضها
                </Button>
                <Button
                  variant="outline"
                  onClick={switchToManualEntry}
                  className="flex-1"
                >
                  إدخال البيانات يدوياً
                </Button>
              </div>
            )}
          </>
        ) : extractedData && (
          <div className="space-y-4">
            {processingMethod === "auto" ? (
              <>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-green-800 mb-2">تم استخراج البيانات بنجاح!</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-green-700"><strong>رقم الفاتورة:</strong> {extractedData.invoiceNumber}</p>
                      <p className="text-sm text-green-700"><strong>التاريخ:</strong> {extractedData.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700"><strong>المورد:</strong> {extractedData.vendorName || "غير محدد"}</p>
                      <p className="text-sm text-green-700"><strong>إجمالي المبلغ:</strong> {extractedData.totalAmount.toFixed(2)} ر.س</p>
                    </div>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">معاينة الأصناف المستخرجة ({extractedData.items.length} صنف):</h3>
                    <div className="flex items-center">
                      <Checkbox 
                        id="select-all" 
                        checked={extractedData.items.every((_: any, i: number) => selectedItems[i.toString()])}
                        onCheckedChange={toggleSelectAll} 
                      />
                      <label htmlFor="select-all" className="mr-2 text-sm font-medium">
                        تحديد الكل
                      </label>
                    </div>
                  </div>
                  <ScrollArea className="h-[300px] border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12 text-center">تحديد</TableHead>
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
                          <TableRow key={i} className={!selectedItems[i.toString()] ? "bg-gray-50 opacity-60" : ""}>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={!!selectedItems[i.toString()]} 
                                onCheckedChange={() => toggleItemSelection(i.toString())}
                              />
                            </TableCell>
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
                
                {pdfTextContent && (
                  <div className="border p-4 rounded-md">
                    <h3 className="font-bold mb-2">النص المستخرج من PDF:</h3>
                    <div className="bg-gray-50 p-4 rounded-md text-xs font-mono whitespace-pre-wrap h-[150px] overflow-auto dirLTR">
                      {pdfTextContent}
                    </div>
                  </div>
                )}
                
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
                    disabled={extractedData.items.length === 0 || Object.values(selectedItems).every(v => !v)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    تطبيق البيانات المحددة
                  </Button>
                </div>
              </>
            ) : (
              // Manual data entry form would be here - simplified for now
              <div className="text-center p-8">
                <p>واجهة الإدخال اليدوي للبيانات</p>
                <Button 
                  variant="outline"
                  onClick={() => setProcessingMethod("auto")}
                  className="mt-4"
                >
                  العودة للمعالجة الآلية
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <style jsx>{`
        .dirLTR {
          direction: ltr;
          text-align: left;
        }
      `}</style>
    </Card>
  );
};
