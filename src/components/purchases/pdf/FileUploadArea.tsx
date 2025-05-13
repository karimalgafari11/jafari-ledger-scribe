
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileUploadWithCompression } from "@/components/ui/file-upload/FileUploadWithCompression";

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
  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <>
      <FileUploadWithCompression
        onChange={handleFileChange}
        value={selectedFile ? [selectedFile] : []}
        multiple={false}
        accept="application/pdf"
        allowedExtensions={["pdf"]}
        maxSize={10}
        autoCompress={true}
        compressionOptions={{
          maxSizeMB: 5,
          quality: 0.8
        }}
        showPreview={true}
      />
      
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
