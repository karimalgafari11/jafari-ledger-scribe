
import React, { useState, useRef } from "react";
import { Upload, File as FileIcon, Image as ImageIcon, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { optimizeFile, CompressedFile, formatFileSize } from "@/utils/fileCompression";
import { validateFile, FileValidationRule } from "@/utils/fileValidation";

export interface FileUploadProps {
  onChange: (files: File[]) => void;
  value?: File[];
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // بالميجابايت
  minSize?: number; // بالميجابايت
  disabled?: boolean;
  allowedExtensions?: string[];
  showPreview?: boolean;
  autoCompress?: boolean;
  compressionOptions?: {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    quality?: number;
  };
  className?: string;
  validationRules?: FileValidationRule;
  onError?: (error: string) => void;
}

export const FileUploadWithCompression: React.FC<FileUploadProps> = ({
  onChange,
  value = [],
  multiple = false,
  accept,
  maxFiles = 5,
  maxSize = 10, // 10MB default
  minSize,
  disabled = false,
  allowedExtensions,
  showPreview = true,
  autoCompress = true,
  compressionOptions,
  className,
  validationRules,
  onError
}) => {
  const [files, setFiles] = useState<File[]>(value || []);
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // التعامل مع السحب والإفلات
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      e.dataTransfer.dropEffect = "copy";
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    await processFiles(droppedFiles);
  };

  // معالجة الملفات التي تم اختيارها
  const processFiles = async (selectedFiles: File[]) => {
    // التحقق من عدد الملفات
    if (!multiple && selectedFiles.length > 1) {
      toast.error("يمكن رفع ملف واحد فقط");
      return;
    }

    if (multiple && files.length + selectedFiles.length > maxFiles) {
      toast.error(`يمكنك رفع ${maxFiles} ملفات كحد أقصى`);
      return;
    }

    setIsProcessing(true);
    const newFiles: File[] = [];
    const newCompressedFiles: CompressedFile[] = [];
    let hasErrors = false;
    
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setProcessingProgress(((i + 1) / selectedFiles.length) * 100);
        
        // التحقق من صحة الملف
        const validationResult = await validateFile(file, {
          ...validationRules,
          maxSize: maxSize * 1024 * 1024,
          minSize: minSize ? minSize * 1024 * 1024 : undefined,
          allowedExtensions
        });
        
        if (!validationResult.valid) {
          toast.error(`خطأ في الملف ${file.name}: ${validationResult.errors.join(', ')}`);
          hasErrors = true;
          continue;
        }
        
        // ضغط الملف إذا كان مطلوبًا
        if (autoCompress) {
          try {
            const compressed = await optimizeFile(file, {
              maxSizeMB: compressionOptions?.maxSizeMB || maxSize,
              maxWidthOrHeight: compressionOptions?.maxWidthOrHeight,
              quality: compressionOptions?.quality
            });
            
            if (compressed.validationResult.valid) {
              newFiles.push(compressed.file);
              newCompressedFiles.push(compressed);
              
              if (compressed.sizeReductionPercent > 0) {
                toast.success(
                  `تم ضغط ${file.name} بنجاح (تقليل ${compressed.sizeReductionPercent}%)`
                );
              }
            } else {
              toast.error(`فشل معالجة الملف ${file.name}`);
              hasErrors = true;
            }
          } catch (error) {
            console.error("Error compressing file:", error);
            toast.error(`فشل ضغط الملف ${file.name}`);
            hasErrors = true;
          }
        } else {
          // استخدام الملف الأصلي بدون ضغط
          newFiles.push(file);
          newCompressedFiles.push({
            file,
            originalFile: file,
            sizeReductionPercent: 0,
            validationResult: { valid: true, errors: [] }
          });
        }
      }
      
      if (!hasErrors || newFiles.length > 0) {
        const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
        const updatedCompressedFiles = multiple 
          ? [...compressedFiles, ...newCompressedFiles] 
          : newCompressedFiles;
        
        setFiles(updatedFiles);
        setCompressedFiles(updatedCompressedFiles);
        onChange(updatedFiles);
      }
      
    } catch (error) {
      console.error("Error processing files:", error);
      onError?.(String(error));
      toast.error("حدث خطأ أثناء معالجة الملفات");
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  // التعامل مع اختيار الملفات من المتصفح
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
    
    // إعادة تعيين حقل الإدخال ليسمح باختيار نفس الملف مرة أخرى
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // حذف ملف
  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    const updatedCompressedFiles = compressedFiles.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    setCompressedFiles(updatedCompressedFiles);
    onChange(updatedFiles);
  };

  // إظهار نوع الملف بشكل مناسب
  const renderFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />;
    }
    return <FileIcon className="h-8 w-8 text-gray-500" />;
  };

  // إظهار معاينة الصورة
  const renderImagePreview = (file: File) => {
    if (!showPreview || !file.type.startsWith("image/")) {
      return renderFileIcon(file);
    }
    
    return (
      <div className="relative h-20 w-20 rounded-md overflow-hidden border">
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="h-full w-full object-cover"
          onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
        />
      </div>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Upload className="h-10 w-10 text-gray-400" />
          <div className="space-y-1">
            <p className="text-sm font-medium">
              اسحب وأفلت الملفات هنا أو انقر للتصفح
            </p>
            <p className="text-xs text-gray-500">
              {allowedExtensions
                ? `الأنواع المدعومة: ${allowedExtensions.map((ext) => "." + ext).join(", ")}`
                : accept
                ? `الأنواع المدعومة: ${accept}`
                : "جميع أنواع الملفات مدعومة"}
            </p>
            <p className="text-xs text-gray-500">
              الحد الأقصى لحجم الملف: {maxSize} ميجابايت
              {!multiple
                ? ""
                : `, الحد الأقصى لعدد الملفات: ${maxFiles}`}
            </p>
            {autoCompress && (
              <p className="text-xs text-blue-600">
                سيتم ضغط الصور تلقائيًا للأداء الأمثل
              </p>
            )}
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />

      {isProcessing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">جاري معالجة الملفات...</span>
            <span className="text-sm text-gray-500">{Math.round(processingProgress)}%</span>
          </div>
          <Progress value={processingProgress} className="h-2" />
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">الملفات المختارة ({files.length})</p>
          <ul className="space-y-2">
            {files.map((file, index) => {
              const compressed = compressedFiles[index];
              const compressionInfo = compressed?.sizeReductionPercent > 0
                ? ` (تم الضغط بنسبة ${compressed.sizeReductionPercent}%)`
                : '';
              
              return (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    {renderImagePreview(file)}
                    <div className="space-y-1 mr-3">
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                        {compressionInfo}
                      </p>
                      {compressed?.sizeReductionPercent > 0 && (
                        <div className="flex items-center text-xs text-green-600">
                          <Check className="h-3 w-3 mr-1" /> تم الضغط
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeFile(index)}
                    disabled={disabled}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
