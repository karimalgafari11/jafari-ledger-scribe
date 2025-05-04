
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
import { v4 as uuidv4 } from "uuid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

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
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    setErrorMessage("");
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
    setErrorMessage("");
    
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
      // Read file as text - in a real app this would use a PDF parsing library
      const fileContent = await readFileAsArrayBuffer(selectedFile);
      
      // Extract text - in real implementation would use PDF.js or similar
      let extractedText;
      try {
        // In a real implementation, this would be an API call to a PDF extraction service
        extractedText = await extractTextFromPDF(fileContent);
        setPdfTextContent(extractedText);
        
        if (!extractedText || extractedText.trim() === "") {
          throw new Error("لم يتم العثور على نص في الملف");
        }
        
      } catch (error) {
        setErrorMessage("فشل في استخراج النص من PDF. الملف قد يكون مشفرًا أو محميًا.");
        clearInterval(interval);
        setUploadProgress(0);
        setIsProcessing(false);
        return;
      }
      
      // Try to parse text to find invoice data
      try {
        const parsedData = parseInvoiceDataFromText(extractedText);
        if (!parsedData.items || parsedData.items.length === 0) {
          setErrorMessage("لم نتمكن من التعرف على أي أصناف في الفاتورة");
          clearInterval(interval);
          setUploadProgress(100);
          setIsProcessing(false);
          setShowPreview(true);
          return;
        }
        
        setExtractedData(parsedData);
        
        // Pre-select all items
        const newSelectedItems: Record<string, boolean> = {};
        parsedData.items.forEach((item: PurchaseItem, index: number) => {
          newSelectedItems[index.toString()] = true;
        });
        setSelectedItems(newSelectedItems);
        
      } catch (error) {
        console.error("Error parsing invoice data:", error);
        setErrorMessage("فشل في تحليل بيانات الفاتورة. تنسيق الملف قد يكون غير مدعوم.");
        clearInterval(interval);
        setUploadProgress(100);
        setIsProcessing(false);
        setShowPreview(true);
        return;
      }
      
      clearInterval(interval);
      setUploadProgress(100);
      setIsProcessing(false);
      setShowPreview(true);
      toast.success("تمت معالجة الملف بنجاح. يرجى مراجعة البيانات قبل التطبيق.");
      
    } catch (error) {
      clearInterval(interval);
      console.error("Error processing PDF:", error);
      toast.error("حدث خطأ أثناء معالجة الفاتورة");
      setErrorMessage("حدث خطأ أثناء معالجة الملف. يرجى المحاولة مرة أخرى أو استخدام ملف آخر.");
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

  // تحسين استخراج النص من ملف PDF - سيتم استبداله بمكتبة حقيقية في التطبيق الفعلي
  const extractTextFromPDF = async (buffer: ArrayBuffer): Promise<string> => {
    // في التطبيق الفعلي، يجب استخدام مكتبة مثل PDF.js أو pdflib لاستخراج النص
    // هذه مجرد محاكاة بسيطة للعملية
    
    // تأخير بسيط لمحاكاة وقت المعالجة
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // إذا كان هناك خطأ في التحميل أو كان الملف فارغًا
    if (buffer.byteLength < 100) {
      throw new Error("الملف فارغ أو تالف");
    }
    
    // في التطبيق الفعلي، هنا سيتم استخراج النص الحقيقي من الملف
    // لأغراض العرض التوضيحي، نعرض محتوى نصي افتراضي
    const sampleText = `فاتورة مشتريات
رقم الفاتورة: 2023-756
تاريخ: 15/10/2023
المورد: شركة الأمل للتوريدات التجارية
رقم الضريبي: 310159632400003

الأصناف:
1. جهاز كمبيوتر مكتبي HP ProDesk | الكمية: 2 | السعر: 3500 ريال
2. طابعة ليزر Canon LBP223DW | الكمية: 1 | السعر: 1250 ريال
3. شاشة سامسونج 24 بوصة | الكمية: 3 | السعر: 850 ريال
4. لوحة مفاتيح وماوس لوجيتك | الكمية: 5 | السعر: 120 ريال

الإجمالي: 10,750 ريال
الضريبة (15%): 1,612.50 ريال
المجموع النهائي: 12,362.50 ريال

ملاحظات: تم الاستلام بواسطة المخزن المركزي
طريقة الدفع: تحويل بنكي`;
    
    return sampleText;
  };

  // تحسين تحليل بيانات الفاتورة من النص المستخرج
  const parseInvoiceDataFromText = (text: string) => {
    console.log("تحليل نص PDF:", text);
    
    if (!text || text.trim() === "") {
      throw new Error("النص المستخرج فارغ");
    }
    
    try {
      // استخراج رقم الفاتورة
      const invoiceNumberMatch = text.match(/رقم الفاتورة:?\s*([A-Za-z0-9-]+)/);
      const invoiceNumber = invoiceNumberMatch ? invoiceNumberMatch[1].trim() : "";
      
      // استخراج التاريخ - يدعم عدة صيغ للتاريخ
      let dateMatch = text.match(/تاريخ:?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/);
      if (!dateMatch) {
        dateMatch = text.match(/تاريخ:?\s*(\d{2,4}[/-]\d{1,2}[/-]\d{1,2})/);
      }
      const dateStr = dateMatch ? dateMatch[1].trim() : "";
      
      // محاولة تحويل التاريخ إلى صيغة yyyy-MM-dd
      let date = "";
      if (dateStr) {
        const parts = dateStr.split(/[/-]/);
        if (parts.length === 3) {
          // إذا كان بصيغة dd/MM/yyyy
          if (parts[0].length <= 2 && parts[2].length === 4) {
            date = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
          } 
          // إذا كان بصيغة yyyy/MM/dd
          else if (parts[0].length === 4) {
            date = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
          } else {
            date = new Date().toISOString().split('T')[0];
          }
        } else {
          date = new Date().toISOString().split('T')[0];
        }
      } else {
        date = new Date().toISOString().split('T')[0];
      }
      
      // استخراج اسم المورد
      const vendorMatch = text.match(/المورد:?\s*([^\n]+)/);
      const vendorName = vendorMatch ? vendorMatch[1].trim() : "";
      
      // استخراج الرقم الضريبي
      const taxIdMatch = text.match(/رقم الضريبي:?\s*([^\n]+)/);
      const taxId = taxIdMatch ? taxIdMatch[1].trim() : "";
      
      // استخراج طريقة الدفع
      const paymentMethodMatch = text.match(/طريقة الدفع:?\s*([^\n]+)/);
      const paymentMethod = paymentMethodMatch ? paymentMethodMatch[1].trim() : "";
      
      // استخراج قسم الأصناف
      const itemsSection = text.includes('الأصناف:') 
        ? text.split('الأصناف:')[1]?.split(/الإجمالي:|المجموع:/)[0] 
        : "";
      
      if (!itemsSection) {
        throw new Error("لم يتم العثور على قسم الأصناف في الفاتورة");
      }
      
      // تقسيم الأصناف إلى أسطر
      const itemLines = itemsSection.split('\n')
        .filter(line => line.trim() && /\d+\./.test(line));
      
      if (itemLines.length === 0) {
        throw new Error("لم يتم التعرف على أي أصناف في قسم الأصناف");
      }
      
      // تحليل كل سطر لاستخراج تفاصيل الصنف
      const items = itemLines.map((line, index) => {
        try {
          // استخراج رقم الصنف واسمه
          const itemNumberMatch = line.match(/(\d+)\.(.+?)\|/);
          const name = itemNumberMatch 
            ? itemNumberMatch[2].trim() 
            : line.split('|')[0].replace(/^\d+\./, '').trim();
          
          // استخراج الكمية
          const quantityMatch = line.match(/الكمية:?\s*(\d+)/);
          const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
          
          // استخراج السعر
          const priceMatch = line.match(/السعر:?\s*(\d+(?:,\d+)*(?:\.\d+)?)/);
          const priceText = priceMatch ? priceMatch[1].replace(/,/g, '') : "0";
          const price = parseFloat(priceText);
          
          // إنشاء معرف فريد للصنف
          const id = `pdf-item-${index + 1}`;
          
          // حساب الإجمالي
          const total = quantity * price;
          
          // إنشاء كائن الصنف
          return {
            id: id,
            productId: `pdf-product-${index + 1}`,
            code: `PDF-${index + 100}`,
            name: name,
            manufacturer: "",
            size: "",
            quantity: quantity,
            price: price,
            discount: 0,
            discountType: "percentage" as const,
            tax: 15, // ضريبة القيمة المضافة الافتراضية في السعودية
            total: total,
            notes: "تم استيراده من PDF"
          };
        } catch (error) {
          console.error(`Error parsing item line: ${line}`, error);
          return null;
        }
      }).filter(item => item !== null); // استبعاد أي عناصر فشل تحليلها
      
      if (items.length === 0) {
        throw new Error("فشل في تحليل أي من الأصناف");
      }
      
      // استخراج المبلغ الإجمالي
      const totalAmountMatch = text.match(/المجموع النهائي:?\s*(\d+(?:,\d+)*(?:\.\d+)?)/);
      const totalAmountText = totalAmountMatch 
        ? totalAmountMatch[1].replace(/,/g, '') 
        : items.reduce((sum, item: any) => sum + item.total * 1.15, 0).toString();
      const totalAmount = parseFloat(totalAmountText);
      
      // استخراج المبلغ الفرعي (قبل الضريبة)
      const subtotalMatch = text.match(/الإجمالي:?\s*(\d+(?:,\d+)*(?:\.\d+)?)/);
      const subtotalText = subtotalMatch
        ? subtotalMatch[1].replace(/,/g, '')
        : items.reduce((sum, item: any) => sum + item.total, 0).toString();
      const subtotal = parseFloat(subtotalText);
      
      // استخراج المعلومات الإضافية
      const notesMatch = text.match(/ملاحظات:?\s*([^\n]+)/);
      const notes = notesMatch ? notesMatch[1].trim() : "";
      
      // إنشاء كائن بيانات الفاتورة
      return {
        invoiceNumber,
        vendorId: "",
        vendorName,
        vendorPhone: "",
        vendorAccountNumber: taxId,
        date,
        items,
        subtotal: isNaN(subtotal) ? items.reduce((sum, item: any) => sum + item.total, 0) : subtotal,
        totalAmount: isNaN(totalAmount) ? items.reduce((sum, item: any) => sum + item.total * 1.15, 0) : totalAmount,
        tax: 15,
        notes,
        paymentMethod: paymentMethod.includes("نقد") ? "cash" : "credit"
      };
    } catch (error) {
      console.error("Error parsing invoice data:", error);
      throw new Error(`فشل في تحليل بيانات الفاتورة: ${error.message}`);
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
        ) : processingMethod === "auto" ? (
          <div className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            {extractedData && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-green-800 mb-2">تم استخراج البيانات</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-green-700"><strong>رقم الفاتورة:</strong> {extractedData.invoiceNumber || "غير معروف"}</p>
                    <p className="text-sm text-green-700"><strong>التاريخ:</strong> {extractedData.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-700"><strong>المورد:</strong> {extractedData.vendorName || "غير محدد"}</p>
                    <p className="text-sm text-green-700"><strong>إجمالي المبلغ:</strong> {extractedData.totalAmount.toFixed(2)} ر.س</p>
                  </div>
                </div>
              </div>
            )}
            
            {extractedData && extractedData.items && extractedData.items.length > 0 && (
              <div className="border p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">الأصناف المستخرجة ({extractedData.items.length} صنف):</h3>
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
            )}
            
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
                disabled={!extractedData || extractedData.items?.length === 0 || Object.values(selectedItems).every(v => !v)}
              >
                <Check className="mr-2 h-4 w-4" />
                تطبيق البيانات المحددة
              </Button>
            </div>
          </div>
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
      </CardContent>
      <style>
        {`.dirLTR {
          direction: ltr;
          text-align: left;
        }`}
      </style>
    </Card>
  );
};
