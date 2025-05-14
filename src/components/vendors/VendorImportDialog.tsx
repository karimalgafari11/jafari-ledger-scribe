
import React, { useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogHeader, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface VendorImportDialogProps {
  open: boolean;
  onClose: () => void;
}

export const VendorImportDialog: React.FC<VendorImportDialogProps> = ({
  open,
  onClose
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  
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
    // Check if file is Excel or CSV
    const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("يرجى اختيار ملف Excel أو CSV");
      return;
    }
    
    setFile(selectedFile);
  };
  
  const handleImport = () => {
    if (!file) {
      toast.error("يرجى اختيار ملف أولاً");
      return;
    }
    
    setImportStatus('uploading');
    
    // Simulate file upload and processing
    setTimeout(() => {
      // Simulate success
      setImportStatus('success');
      toast.success("تم استيراد البيانات بنجاح");
      
      // Close dialog after delay
      setTimeout(() => {
        onClose();
        setFile(null);
        setImportStatus('idle');
      }, 1500);
    }, 2000);
  };
  
  const handleDownloadTemplate = () => {
    toast.info("جاري تنزيل نموذج ملف الاستيراد");
    // Simulate download
    setTimeout(() => {
      toast.success("تم تنزيل نموذج الاستيراد بنجاح");
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>استيراد بيانات الموردين</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
            } ${importStatus === 'success' ? 'border-green-500 bg-green-50' : ''} ${
              importStatus === 'error' ? 'border-red-500 bg-red-50' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {importStatus === 'uploading' ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-600">جاري معالجة الملف...</p>
              </div>
            ) : importStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <Check className="text-green-600 w-6 h-6" />
                </div>
                <p className="text-green-600 font-medium">تم استيراد البيانات بنجاح</p>
                <p className="text-sm text-gray-500 mt-1">تم استيراد {Math.floor(Math.random() * 50) + 5} مورد</p>
              </div>
            ) : importStatus === 'error' ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                  <AlertCircle className="text-red-600 w-6 h-6" />
                </div>
                <p className="text-red-600 font-medium">فشلت عملية الاستيراد</p>
                <p className="text-sm text-gray-500 mt-1">يرجى التحقق من تنسيق الملف</p>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-sm font-medium">
                    {file ? file.name : "اسحب الملف هنا أو اضغط للاختيار"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {file ? `${(file.size / 1024).toFixed(2)} كيلوبايت` : "Excel أو CSV فقط"}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileInputChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  اختيار ملف
                </Button>
              </>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FileText className="text-blue-500 w-5 h-5 ml-2" />
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
              onClick={handleDownloadTemplate}
            >
              تنزيل النموذج
            </Button>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={importStatus === 'uploading'}
          >
            إلغاء
          </Button>
          <Button 
            type="button" 
            onClick={handleImport}
            disabled={!file || importStatus !== 'idle'}
          >
            استيراد
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
