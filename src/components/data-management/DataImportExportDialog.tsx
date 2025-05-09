
import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { FileUp, FileDown, AlertCircle, UploadCloud, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DataImportExportDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  importTitle: string;
  exportTitle: string;
  supportedFormats: string[];
  allowedExportTypes: string[];
  onImport: (fileContent: string | ArrayBuffer, fileType: string) => Promise<any>;
  onExport: (type: string) => string | void | Promise<void> | Blob;
  entityName: string;
  importInstructions?: string;
  exportInstructions?: string;
}

export const DataImportExportDialog: React.FC<DataImportExportDialogProps> = ({
  open,
  onClose,
  title,
  importTitle,
  exportTitle,
  supportedFormats,
  allowedExportTypes,
  onImport,
  onExport,
  entityName,
  importInstructions,
  exportInstructions,
}) => {
  const [activeTab, setActiveTab] = useState<string>('import');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // معالج تحديد ملف للاستيراد
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      
      // التحقق من صحة امتداد الملف
      if (!supportedFormats.some(format => format.includes(fileExtension))) {
        toast.error(`نوع الملف غير مدعوم. الأنواع المدعومة: ${supportedFormats.join(', ')}`);
        return;
      }
      
      setSelectedFile(file);
    }
  };

  // معالج رفع الملف
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('يرجى تحديد ملف أولاً');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        if (!e.target?.result) {
          toast.error('حدث خطأ أثناء قراءة الملف');
          setIsUploading(false);
          return;
        }
        
        try {
          const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || '';
          await onImport(e.target.result, fileExtension);
          toast.success(`تم استيراد البيانات بنجاح`);
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          onClose();
        } catch (error) {
          console.error('Import error:', error);
          toast.error(`فشل استيراد البيانات: ${(error as Error).message}`);
        } finally {
          setIsUploading(false);
        }
      };
      
      reader.onerror = () => {
        toast.error('حدث خطأ أثناء قراءة الملف');
        setIsUploading(false);
      };
      
      if (selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.json')) {
        reader.readAsText(selectedFile);
      } else {
        reader.readAsArrayBuffer(selectedFile);
      }
    } catch (error) {
      console.error('File processing error:', error);
      toast.error('حدث خطأ أثناء معالجة الملف');
      setIsUploading(false);
    }
  };

  // معالج تصدير البيانات
  const handleExport = async (exportType: string) => {
    if (!allowedExportTypes.includes(exportType)) {
      toast.error(`نوع التصدير غير مدعوم: ${exportType}`);
      return;
    }
    
    setIsExporting(true);
    
    try {
      const result = await onExport(exportType);
      
      if (result instanceof Blob) {
        // إنشاء رابط تنزيل للملف
        const url = URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${entityName}_${new Date().toISOString().split('T')[0]}.${exportType}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success(`تم تصدير البيانات بنجاح بصيغة ${exportType}`);
      } else {
        toast.success(`تم تصدير البيانات بنجاح`);
      }
      
      onClose();
    } catch (error) {
      console.error('Export error:', error);
      toast.error(`فشل تصدير البيانات: ${(error as Error).message}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            يمكنك استيراد البيانات من ملف أو تصديرها إلى مختلف الصيغ
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="import" className="flex items-center">
              <FileUp className="ml-2 h-4 w-4" />
              استيراد
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center">
              <FileDown className="ml-2 h-4 w-4" />
              تصدير
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="import" className="py-4">
            <h3 className="text-lg font-medium mb-4">{importTitle}</h3>
            
            {importInstructions && (
              <Alert className="mb-4 bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-600">
                  {importInstructions}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="file">اختر ملف</Label>
                <Input
                  ref={fileInputRef}
                  id="file"
                  type="file"
                  accept={supportedFormats.join(',')}
                  onChange={handleFileSelect}
                  className="rtl:text-right"
                />
                <p className="text-sm text-muted-foreground">
                  الصيغ المدعومة: {supportedFormats.join(', ')}
                </p>
              </div>
              
              {selectedFile && (
                <div className="text-sm">
                  <span className="font-medium">الملف المحدد:</span> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} كيلوبايت)
                </div>
              )}
              
              <Alert variant="destructive" className="bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  تأكد أن الملف المستورد يتبع التنسيق المطلوب. قد يؤدي استيراد بيانات غير صحيحة إلى مشاكل في النظام.
                </AlertDescription>
              </Alert>
            </div>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={onClose} className="ml-2">
                إلغاء
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="bg-primary hover:bg-primary/90"
              >
                {isUploading ? (
                  <>جاري الاستيراد...</>
                ) : (
                  <>
                    <UploadCloud className="ml-2 h-4 w-4" />
                    استيراد البيانات
                  </>
                )}
              </Button>
            </DialogFooter>
          </TabsContent>
          
          <TabsContent value="export" className="py-4">
            <h3 className="text-lg font-medium mb-4">{exportTitle}</h3>
            
            {exportInstructions && (
              <Alert className="mb-4 bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-600">
                  {exportInstructions}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allowedExportTypes.includes('excel') && (
                <Button
                  variant="outline"
                  onClick={() => handleExport('excel')}
                  disabled={isExporting}
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <FileDown className="h-8 w-8 mb-2 text-green-600" />
                  <span>Excel</span>
                </Button>
              )}
              
              {allowedExportTypes.includes('csv') && (
                <Button
                  variant="outline"
                  onClick={() => handleExport('csv')}
                  disabled={isExporting}
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <FileDown className="h-8 w-8 mb-2 text-blue-600" />
                  <span>CSV</span>
                </Button>
              )}
              
              {allowedExportTypes.includes('pdf') && (
                <Button
                  variant="outline"
                  onClick={() => handleExport('pdf')}
                  disabled={isExporting}
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <FileDown className="h-8 w-8 mb-2 text-red-600" />
                  <span>PDF</span>
                </Button>
              )}
              
              {allowedExportTypes.includes('json') && (
                <Button
                  variant="outline"
                  onClick={() => handleExport('json')}
                  disabled={isExporting}
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <FileDown className="h-8 w-8 mb-2 text-purple-600" />
                  <span>JSON</span>
                </Button>
              )}
            </div>
            
            <DialogFooter className="mt-4">
              <Button onClick={onClose}>إغلاق</Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
