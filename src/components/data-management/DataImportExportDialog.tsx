
import React, { useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogHeader, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileInput,
  FileOutput,
  HardDriveDownload,
  HardDriveUpload,
  FileSpreadsheet,
  FileText,
  Database 
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface DataImportExportDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  importTitle?: string;
  exportTitle?: string;
  supportedFormats?: string[];
  onImport: (data: any, type: string) => Promise<void> | void;
  onExport: (type: string) => Promise<void> | Blob | string | void;
  allowedExportTypes?: ('excel' | 'csv' | 'pdf' | 'json')[];
  sampleDataUrl?: string;
  entityName?: string;
  importInstructions?: string;
  exportInstructions?: string;
}

export const DataImportExportDialog: React.FC<DataImportExportDialogProps> = ({
  open,
  onClose,
  title = "استيراد / تصدير البيانات",
  importTitle = "استيراد البيانات",
  exportTitle = "تصدير البيانات",
  supportedFormats = ['.xlsx', '.csv'],
  onImport,
  onExport,
  allowedExportTypes = ['excel', 'csv', 'pdf'],
  sampleDataUrl,
  entityName = "البيانات",
  importInstructions,
  exportInstructions
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>("import");
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exportType, setExportType] = useState<string>(allowedExportTypes[0] || 'excel');
  
  const fileAccept = supportedFormats.join(',');
  
  // تعامل مع سحب الملفات
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFileSelection(e.target.files[0]);
    }
  };
  
  const handleFileSelection = (selectedFile: File) => {
    // التحقق من امتداد الملف
    const extension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    if (!supportedFormats.includes(extension)) {
      toast.error(`يرجى اختيار ملف بأحد الصيغ التالية: ${supportedFormats.join(', ')}`);
      return;
    }
    
    setFile(selectedFile);
  };
  
  const handleImport = async () => {
    if (!file) {
      toast.error("يرجى اختيار ملف أولاً");
      return;
    }
    
    setProcessing(true);
    
    // محاكاة التقدم
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      // قراءة الملف باستخدام FileReader
      const fileContent = await readFileContent(file);
      const fileType = file.name.split('.').pop();
      
      // استدعاء وظيفة الاستيراد المقدمة من المكون الأب
      await onImport(fileContent, fileType || 'csv');
      
      setProgress(100);
      toast.success(`تم استيراد ${entityName} بنجاح`);
      
      // إغلاق الحوار بعد فترة
      setTimeout(() => {
        resetState();
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Import error:", error);
      toast.error(`فشل استيراد ${entityName}: ${(error as Error).message}`);
    } finally {
      clearInterval(progressInterval);
      setProcessing(false);
    }
  };
  
  const handleExport = async () => {
    setProcessing(true);
    
    // محاكاة التقدم
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 20;
      });
    }, 200);
    
    try {
      // استدعاء وظيفة التصدير المقدمة من المكون الأب
      const result = await onExport(exportType);
      
      setProgress(100);
      toast.success(`تم تصدير ${entityName} بنجاح`);
      
      // إذا كانت النتيجة Blob، قم بإنشاء رابط تنزيل
      if (result instanceof Blob) {
        const url = URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${entityName.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.${exportType}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      
      // إعادة تعيين بعد فترة
      setTimeout(() => {
        setProgress(0);
        setProcessing(false);
      }, 1000);
    } catch (error) {
      console.error("Export error:", error);
      toast.error(`فشل تصدير ${entityName}: ${(error as Error).message}`);
    } finally {
      clearInterval(progressInterval);
      setProcessing(false);
    }
  };
  
  const readFileContent = (file: File): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result);
        } else {
          reject(new Error("فشل قراءة محتوى الملف"));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("حدث خطأ أثناء قراءة الملف"));
      };
      
      if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  };
  
  const resetState = () => {
    setFile(null);
    setProgress(0);
    setProcessing(false);
  };
  
  const handleDownloadSample = () => {
    if (sampleDataUrl) {
      window.open(sampleDataUrl, '_blank');
      toast.success("جاري تنزيل نموذج الاستيراد");
    } else {
      toast.info("نموذج الاستيراد غير متوفر حالياً");
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            يمكنك استيراد وتصدير {entityName} بصيغ متعددة
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="import">
              <FileInput className="ml-2 h-4 w-4" />
              استيراد
            </TabsTrigger>
            <TabsTrigger value="export">
              <FileOutput className="ml-2 h-4 w-4" />
              تصدير
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="import" className="space-y-4 mt-4">
            <h3 className="text-lg font-medium">{importTitle}</h3>
            {importInstructions && (
              <p className="text-sm text-gray-500 mb-2">{importInstructions}</p>
            )}
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? 'border-primary bg-primary/5' : processing ? 'border-gray-300 bg-gray-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {processing ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <Progress value={progress} className="w-full mb-2" />
                  <p className="text-gray-600">{progress >= 100 ? 'اكتمل' : 'جاري معالجة الملف...'}</p>
                  <p className="text-sm text-gray-500 mt-1">{file?.name}</p>
                </div>
              ) : (
                <>
                  <HardDriveUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <p className="text-sm font-medium">
                      {file ? file.name : "اسحب الملف هنا أو اضغط للاختيار"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {file 
                        ? `${(file.size / 1024).toFixed(2)} كيلوبايت` 
                        : `الصيغ المدعومة: ${supportedFormats.join(', ')}`}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    accept={fileAccept}
                    onChange={handleFileInputChange}
                    disabled={processing}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={processing}
                  >
                    اختيار ملف
                  </Button>
                </>
              )}
            </div>
            
            {sampleDataUrl && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FileSpreadsheet className="text-blue-500 w-5 h-5 ml-2" />
                  <h3 className="text-sm font-medium">نموذج الاستيراد</h3>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  يمكنك تنزيل نموذج ملف الاستيراد لتعبئته بالبيانات المطلوبة
                </p>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="text-blue-500 p-0 h-auto"
                  onClick={handleDownloadSample}
                >
                  تنزيل النموذج
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="export" className="space-y-4 mt-4">
            <h3 className="text-lg font-medium">{exportTitle}</h3>
            {exportInstructions && (
              <p className="text-sm text-gray-500 mb-4">{exportInstructions}</p>
            )}
            
            {processing ? (
              <div className="flex flex-col items-center justify-center py-4 my-8 border rounded-lg bg-gray-50">
                <Progress value={progress} className="w-[80%] mb-2" />
                <p className="text-gray-600">{progress >= 100 ? 'اكتمل التصدير' : 'جاري تصدير البيانات...'}</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {allowedExportTypes.includes('excel') && (
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${exportType === 'excel' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setExportType('excel')}
                    >
                      <div className="flex flex-col items-center">
                        <FileSpreadsheet className={`h-8 w-8 ${exportType === 'excel' ? 'text-primary' : 'text-gray-500'}`} />
                        <p className="mt-2 text-sm font-medium">Excel ملف</p>
                        <p className="text-xs text-gray-500">XLSX</p>
                      </div>
                    </div>
                  )}
                  
                  {allowedExportTypes.includes('csv') && (
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${exportType === 'csv' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setExportType('csv')}
                    >
                      <div className="flex flex-col items-center">
                        <FileText className={`h-8 w-8 ${exportType === 'csv' ? 'text-primary' : 'text-gray-500'}`} />
                        <p className="mt-2 text-sm font-medium">CSV ملف</p>
                        <p className="text-xs text-gray-500">قيم مفصولة بفاصلة</p>
                      </div>
                    </div>
                  )}
                  
                  {allowedExportTypes.includes('pdf') && (
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${exportType === 'pdf' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setExportType('pdf')}
                    >
                      <div className="flex flex-col items-center">
                        <FileText className={`h-8 w-8 ${exportType === 'pdf' ? 'text-primary' : 'text-gray-500'}`} />
                        <p className="mt-2 text-sm font-medium">PDF ملف</p>
                        <p className="text-xs text-gray-500">مستند محمول</p>
                      </div>
                    </div>
                  )}
                  
                  {allowedExportTypes.includes('json') && (
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${exportType === 'json' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setExportType('json')}
                    >
                      <div className="flex flex-col items-center">
                        <Database className={`h-8 w-8 ${exportType === 'json' ? 'text-primary' : 'text-gray-500'}`} />
                        <p className="mt-2 text-sm font-medium">JSON ملف</p>
                        <p className="text-xs text-gray-500">بيانات مهيكلة</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <h4 className="text-sm font-medium mb-2">معلومات حول التصدير</h4>
                  <ul className="text-xs text-gray-500 space-y-1.5">
                    <li className="flex items-start">
                      <span className="ml-1.5">•</span>
                      <span>سيتم تصدير جميع البيانات المعروضة حالياً في الجدول</span>
                    </li>
                    <li className="flex items-start">
                      <span className="ml-1.5">•</span>
                      <span>يمكنك تطبيق الفلترة قبل التصدير للحصول على بيانات محددة</span>
                    </li>
                    <li className="flex items-start">
                      <span className="ml-1.5">•</span>
                      <span>ملف التصدير يحتوي على نفس الأعمدة المعروضة في الجدول</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={processing}
          >
            إلغاء
          </Button>
          {activeTab === "import" ? (
            <Button 
              type="button" 
              onClick={handleImport}
              disabled={!file || processing}
            >
              {processing ? 'جاري الاستيراد...' : 'استيراد'}
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={handleExport}
              disabled={processing}
            >
              {processing ? 'جاري التصدير...' : 'تصدير'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
