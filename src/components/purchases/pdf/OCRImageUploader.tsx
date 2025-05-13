
import React, { useState } from "react";
import { Camera, Image as ImageIcon, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileUploadWithCompression } from "@/components/ui/file-upload/FileUploadWithCompression";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface OCRImageUploaderProps {
  onDataExtracted: (data: any) => void;
}

export const OCRImageUploader: React.FC<OCRImageUploaderProps> = ({ 
  onDataExtracted 
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageSelect = (files: File[]) => {
    if (files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const handleProcessImage = async () => {
    if (!selectedImage) {
      toast.error("يرجى اختيار صورة أولاً");
      return;
    }

    setIsProcessing(true);
    setProgress(10);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("image", selectedImage);

      setProgress(30);

      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ocr-invoice', {
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProgress(80);

      if (error) {
        console.error("OCR Error:", error);
        toast.error("حدث خطأ أثناء معالجة الصورة");
        return;
      }

      setProgress(100);

      if (data?.success && data.data?.invoiceData) {
        toast.success("تم استخراج بيانات الفاتورة بنجاح");
        onDataExtracted(data.data.invoiceData);
      } else {
        toast.error("لم نتمكن من استخراج بيانات الفاتورة بشكل صحيح");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("حدث خطأ أثناء معالجة الصورة");
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setSelectedImage(null);
    }
  };

  const handleCapture = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Use the environment-facing camera
    
    // Handle file selection
    input.onchange = (e) => {
      const files = e.target?.files;
      if (files && files.length > 0) {
        handleImageSelect([files[0]]);
      }
    };
    
    // Trigger the file input
    input.click();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-1">تحليل فاتورة من صورة</h3>
            <p className="text-sm text-gray-500 mb-4">
              قم بتحميل صورة واضحة للفاتورة أو التقط صورة بالكاميرا
            </p>
          </div>

          <div className="flex justify-center space-x-2 rtl:space-x-reverse">
            <Button
              onClick={handleCapture}
              variant="outline"
              className="flex-1"
              type="button"
              disabled={isProcessing}
            >
              <Camera className="h-4 w-4 ml-2" />
              التقاط صورة
            </Button>
          </div>

          <FileUploadWithCompression
            onChange={handleImageSelect}
            value={selectedImage ? [selectedImage] : []}
            multiple={false}
            accept="image/*"
            allowedExtensions={["jpg", "jpeg", "png", "heic", "webp"]}
            maxSize={10}
            autoCompress={true}
            compressionOptions={{
              maxSizeMB: 2,
              maxWidthOrHeight: 1920,
              quality: 0.8
            }}
            showPreview={true}
          />

          {isProcessing && (
            <div className="my-2">
              <div className="flex justify-between text-sm mb-1">
                <span>جاري معالجة الصورة...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleProcessImage}
              disabled={!selectedImage || isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" /> 
                  جاري التحليل...
                </>
              ) : (
                <>
                  <ImageIcon className="ml-2 h-4 w-4" /> 
                  تحليل الصورة
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
