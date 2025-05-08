
import React, { useState } from 'react';
import { usePDFInvoiceParser } from '@/hooks/purchases/usePDFInvoiceParser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertCircle, CheckCircle, Upload, RefreshCw, Download, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface PDFInvoiceAnalyzerProps {
  onDataExtracted?: (data: any) => void;
}

export const PDFInvoiceAnalyzer: React.FC<PDFInvoiceAnalyzerProps> = ({ onDataExtracted }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>('upload');
  const { toast } = useToast();
  
  const {
    isProcessing,
    progress,
    errorMessage,
    rawText,
    parsedData,
    parseInvoiceFromPDF,
    setErrorMessage
  } = usePDFInvoiceParser();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (file.type !== 'application/pdf') {
        setErrorMessage('يرجى تحميل ملف PDF فقط');
        toast({
          variant: "destructive",
          title: "خطأ في الملف",
          description: "يرجى تحميل ملف PDF فقط",
        });
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setErrorMessage('حجم الملف كبير جداً (الحد الأقصى 10 ميغابايت)');
        toast({
          variant: "destructive",
          title: "خطأ في الملف",
          description: "حجم الملف كبير جداً (الحد الأقصى 10 ميغابايت)",
        });
        return;
      }
      
      setSelectedFile(file);
      setErrorMessage('');
      toast({
        title: "تم تحميل الملف",
        description: "يمكنك الآن تحليل الفاتورة",
      });
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      if (file.type !== 'application/pdf') {
        setErrorMessage('يرجى تحميل ملف PDF فقط');
        toast({
          variant: "destructive",
          title: "خطأ في الملف",
          description: "يرجى تحميل ملف PDF فقط",
        });
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setErrorMessage('حجم الملف كبير جداً (الحد الأقصى 10 ميغابايت)');
        toast({
          variant: "destructive",
          title: "خطأ في الملف",
          description: "حجم الملف كبير جداً (الحد الأقصى 10 ميغابايت)",
        });
        return;
      }
      
      setSelectedFile(file);
      setErrorMessage('');
      toast({
        title: "تم تحميل الملف",
        description: "يمكنك الآن تحليل الفاتورة",
      });
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleAnalyzeClick = async () => {
    if (!selectedFile) return;
    
    try {
      toast({
        title: "جاري تحليل الفاتورة",
        description: "يرجى الانتظار...",
      });
      const data = await parseInvoiceFromPDF(selectedFile);
      if (onDataExtracted) {
        onDataExtracted(data);
      }
      setActiveTab('results');
      toast({
        title: "تم التحليل بنجاح",
        description: "يمكنك الآن استخدام البيانات المستخرجة",
      });
    } catch (error) {
      console.error('Error analyzing PDF:', error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "فشل تحليل الفاتورة، يرجى المحاولة مرة أخرى",
      });
    }
  };
  
  const handleUseDataClick = () => {
    if (parsedData && onDataExtracted) {
      onDataExtracted(parsedData);
      toast({
        title: "تم استخدام البيانات",
        description: "تم تطبيق البيانات المستخرجة بنجاح",
      });
    }
  };
  
  const renderUploadTab = () => {
    return (
      <div className="flex flex-col items-center justify-center p-4 md:p-6">
        <div 
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-12 text-center hover:bg-gray-50 transition-all cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('pdf-file-input')?.click()}
        >
          <input
            type="file"
            id="pdf-file-input"
            className="hidden"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <Upload size={48} className="mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold">اسحب ملف PDF هنا أو انقر للتحميل</h3>
          <p className="mt-2 text-sm text-gray-500">
            PDF فقط، الحجم الأقصى 10 ميغابايت
          </p>
        </div>
        
        {selectedFile && (
          <div className="w-full mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 border rounded-lg bg-gray-50">
              <div className="flex items-center mb-2 sm:mb-0">
                <FileText className="ml-2 text-blue-600" size={24} />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{Math.round(selectedFile.size / 1024)} كيلوبايت</p>
                </div>
              </div>
              <Button 
                variant="default" 
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => setSelectedFile(null)}
              >
                تغيير
              </Button>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleAnalyzeClick} 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
                  جاري التحليل...
                </>
              ) : (
                <>
                  <Eye className="ml-2 h-4 w-4" />
                  تحليل الفاتورة
                </>
              )}
            </Button>
          </div>
        )}
        
        {isProcessing && (
          <div className="w-full mt-6">
            <p className="text-sm text-center mb-2">جاري تحليل الفاتورة... {progress}%</p>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {errorMessage && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>خطأ</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </div>
    );
  };
  
  const renderResultsTab = () => {
    if (!parsedData) {
      return (
        <div className="p-6 text-center">
          <p>لا توجد بيانات محللة. يرجى تحميل وتحليل الفاتورة أولاً.</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => setActiveTab('upload')}
          >
            العودة للتحميل
          </Button>
        </div>
      );
    }
    
    return (
      <div className="p-4 md:p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h3 className="text-lg font-semibold mb-2 sm:mb-0">نتائج التحليل</h3>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={() => setActiveTab('upload')}
              >
                تحميل فاتورة أخرى
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={handleUseDataClick}
              >
                استخدام البيانات
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <FileText size={16} />
                  معلومات الفاتورة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">رقم الفاتورة:</dt>
                    <dd className="font-medium">{parsedData.invoiceNumber || 'غير محدد'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">التاريخ:</dt>
                    <dd className="font-medium">
                      {parsedData.date 
                        ? format(parsedData.date, 'dd MMMM yyyy', { locale: ar })
                        : 'غير محدد'
                      }
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">المورد:</dt>
                    <dd className="font-medium">{parsedData.vendor || 'غير محدد'}</dd>
                  </div>
                  {parsedData.vendorTaxId && (
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">الرقم الضريبي:</dt>
                      <dd className="font-medium">{parsedData.vendorTaxId}</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <FileText size={16} />
                  ملخص المبالغ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">المجموع الفرعي:</dt>
                    <dd className="font-medium">{parsedData.subtotal?.toLocaleString() || 'غير محدد'} ريال</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">الضريبة:</dt>
                    <dd className="font-medium">{parsedData.tax?.toLocaleString() || '0'} ريال</dd>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <dt className="text-sm">الإجمالي:</dt>
                    <dd>{parsedData.totalAmount?.toLocaleString() || 'غير محدد'} ريال</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <FileText size={16} />
                العناصر المكتشفة
              </CardTitle>
              <CardDescription>
                تم العثور على {parsedData.items.length} عنصر
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-500px)] min-h-[240px]">
                <div className="w-full overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>الوصف</TableHead>
                        <TableHead className="text-left">الكمية</TableHead>
                        <TableHead className="text-left">السعر</TableHead>
                        <TableHead className="text-left">الإجمالي</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedData.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-left">{item.quantity}</TableCell>
                          <TableCell className="text-left">{item.price?.toLocaleString()}</TableCell>
                          <TableCell className="text-left">{item.total?.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          {rawText && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <FileText size={16} />
                  النص الخام من الفاتورة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-60 border rounded-md p-4 bg-gray-50">
                  <pre className="text-xs" dir="auto">{rawText}</pre>
                </ScrollArea>
                <Button variant="outline" size="sm" className="mt-2">
                  <Download className="ml-2 h-4 w-4" />
                  تصدير النص
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <Card className="w-full shadow-sm border-teal-100">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
        <CardTitle className="flex items-center gap-2 text-teal-700">
          <FileText /> تحليل فواتير PDF
        </CardTitle>
        <CardDescription>
          قم بتحميل فاتورة PDF لتحليلها واستخراج البيانات تلقائياً
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upload" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">تحميل الفاتورة</TabsTrigger>
            <TabsTrigger value="results" disabled={!parsedData} className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">نتائج التحليل</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">{renderUploadTab()}</TabsContent>
          <TabsContent value="results">{renderResultsTab()}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
