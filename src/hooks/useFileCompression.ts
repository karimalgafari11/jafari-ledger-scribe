
import { useState } from 'react';
import { optimizeFile, optimizeFiles, CompressedFile } from '@/utils/fileCompression';
import { toast } from 'sonner';

interface FileCompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  quality?: number;
  onCompressionStart?: () => void;
  onCompressionComplete?: (files: CompressedFile[]) => void;
  onCompressionError?: (error: Error) => void;
}

export function useFileCompression(options: FileCompressionOptions = {}) {
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([]);

  const compressFile = async (file: File): Promise<CompressedFile | null> => {
    if (!file) return null;
    
    try {
      options.onCompressionStart?.();
      setIsCompressing(true);
      setCompressionProgress(0);

      const result = await optimizeFile(file, {
        maxSizeMB: options.maxSizeMB,
        maxWidthOrHeight: options.maxWidthOrHeight,
        quality: options.quality
      });

      setCompressedFiles(prev => [...prev, result]);
      setCompressionProgress(100);
      
      if (result.sizeReductionPercent > 0) {
        toast.success(`تم ضغط الملف وتقليل حجمه بنسبة ${result.sizeReductionPercent}%`);
      }
      
      return result;
    } catch (error) {
      console.error('خطأ أثناء ضغط الملف:', error);
      toast.error('حدث خطأ أثناء ضغط الملف');
      options.onCompressionError?.(error as Error);
      return null;
    } finally {
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  };

  const compressMultipleFiles = async (files: File[]): Promise<CompressedFile[]> => {
    if (!files.length) return [];
    
    try {
      options.onCompressionStart?.();
      setIsCompressing(true);
      
      const results: CompressedFile[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const progress = ((i + 1) / files.length) * 100;
        setCompressionProgress(progress);
        
        const result = await optimizeFile(files[i], {
          maxSizeMB: options.maxSizeMB,
          maxWidthOrHeight: options.maxWidthOrHeight,
          quality: options.quality
        });
        
        results.push(result);
      }
      
      setCompressedFiles(prev => [...prev, ...results]);
      
      // حساب إجمالي نسبة الضغط
      const totalOriginalSize = files.reduce((sum, file) => sum + file.size, 0);
      const totalCompressedSize = results.reduce((sum, result) => sum + result.file.size, 0);
      const totalSizeReduction = Math.round((1 - totalCompressedSize / totalOriginalSize) * 100);
      
      if (totalSizeReduction > 0) {
        toast.success(`تم ضغط ${files.length} ملفات وتقليل الحجم الإجمالي بنسبة ${totalSizeReduction}%`);
      }
      
      options.onCompressionComplete?.(results);
      
      return results;
    } catch (error) {
      console.error('خطأ أثناء ضغط الملفات:', error);
      toast.error('حدث خطأ أثناء ضغط الملفات');
      options.onCompressionError?.(error as Error);
      return [];
    } finally {
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  };

  const clearCompressedFiles = () => {
    setCompressedFiles([]);
  };

  return {
    compressFile,
    compressMultipleFiles,
    clearCompressedFiles,
    isCompressing,
    compressionProgress,
    compressedFiles
  };
}
