
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploadAreaProps {
  selectedFile: File | null;
  isProcessing: boolean;
  uploadProgress: number;
  onFileSelect: (file: File) => void;
  onProcessFile: () => void;
  onSwitchToManual: () => void;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  selectedFile,
  isProcessing,
  uploadProgress,
  onFileSelect,
  onProcessFile,
  onSwitchToManual,
}) => {
  const [isDragging, setIsDragging] = useState(false);

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
  
  // Process selected file
  const handleFileSelection = (file: File) => {
    if (file.type !== 'application/pdf') {
      alert("يرجى تحميل ملف PDF فقط");
      return;
    }
    onFileSelect(file);
  };

  return (
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
            onClick={onProcessFile}
            className="flex-1 bg-blue-500 hover:bg-blue-600"
            disabled={isProcessing}
          >
            استخراج البيانات وعرضها
          </Button>
          <Button
            variant="outline"
            onClick={onSwitchToManual}
            className="flex-1"
          >
            إدخال البيانات يدوياً
          </Button>
        </div>
      )}
    </>
  );
};
